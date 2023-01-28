const express = require('express');
const { Booking, Spot, SpotImage, Review, User } = require('../../db/models');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const router = express.Router();

// ------------------------------------------------------
// Get all of the Current User's Bookings
router.get('/current', restoreUser, async (req, res, _next) => {
  // extract user object (promise) from restoreUser middleware output
  const { user } = req;

  // convert user to normal POJO
  const userPOJO = user.toJSON();
  // console.log(userPOJO)

  // get userId of the current user
  const userId = userPOJO.id
  // console.log(userId);

  // get all the bookings for current user
  const bookings = await Booking.findAll({
    where: {
      userId: userId
    },
    include: {
      model: Spot,
      attributes: {
        exclude: ['createdAt', 'UpdatedAt']
      },
      include: SpotImage
    }
  });

  let result = {};
  let bookingsList = [];

  // iterate through bookings array
  bookings.forEach(booking => {
    booking = booking.toJSON();
    // console.log(booking)
    const spotImagesArr = booking.Spot.SpotImages;
    let previewImage;
    spotImagesArr.forEach(spotImageObj => {
      if (spotImageObj.preview === true) {
        previewImage = spotImageObj.url
        // console.log(previewImage)
      }
    });

    // assign previewImage to the Spot obj within each booking obj
    booking.Spot.previewImage = previewImage;
    delete booking.Spot.SpotImages;
    // console.log(booking.Spot)
    bookingsList.push(booking)
  });

  result.Bookings = bookingsList;
  return res.json(result);
})

// ------------------------------------------------------
// Edit a Booking
router.put('/:bookingId', restoreUser, async (req, res, _next) => {
  const bookingId = req.params.bookingId;

  // extract user object (promise) from restoreUser middleware output
  const { user } = req;
  // convert user to normal POJO
  const userPOJO = user.toJSON();
  // console.log(userPOJO)
  // get userId of the current user
  const userId = userPOJO.id
  // console.log(userId);

  // find booking by bookingId and convert to normal POJO
  let booking = await Booking.findByPk(bookingId);

  // if no booking is found based on bookingId, error
  if (!booking) {
    return res.status(404).json({
      message: "Booking couldn't be found",
      statusCode: 404
    })
  }

  booking = booking.toJSON();

  // check if current user owns this booking, if not, error
  if (booking.userId !== userId) {
    return res.status(404).json({
      message: "This is not your booking."
    })
  }

  // extract startDate and endDate from req.body
  // convert them to a Date format
  let { startDate, endDate } = req.body;
  startDate = new Date(startDate);
  endDate = new Date(endDate);
  // console.log(startDate)

  // if endDate earlier than startDate, error message
  if (endDate.getTime() <= startDate.getTime()) {
    return res.status(400).json({
      message: "Validation error",
      statusCode: 400,
      errors: [
        "endDate cannot be on or before startDate"
      ]
    })
  }


  // check if it's a past booking
  const today = new Date();
  if (endDate.getTime() <= today.getTime()) {
    return res.status(403).json({
      message: "Past bookings can't be modified",
      statusCode: 403
    })
  }


  // check if booking is conflict with existing bookings
  // get all the booking of current spot
  const spotId = booking.spotId;
  const spotBookingsArr = await Booking.findAll({
    where: {
      spotId: spotId
    }
  })
  // console.log(spotBookingsArr)

  // extract the month and year of new booking
  const currentMonth = startDate.getMonth()
  // console.log(currentMonth)
  const currentYear = startDate.getFullYear();


  // filter for bookings that has the same month and next month and year of this new booking
  let currentMonthBookings = [];
  let nextMonthBookings = [];
  spotBookingsArr.forEach(existingBooking => {
    existingBooking = existingBooking.toJSON();

    let bookingStartDate = existingBooking.startDate
    bookingStartDate = new Date(bookingStartDate)
    let bookingEndDate = existingBooking.endDate
    bookingEndDate = new Date(bookingEndDate)
    let bookingMonth = bookingStartDate.getMonth();
    let bookingYear = bookingStartDate.getFullYear();

    // push same month booking to array
    if (bookingMonth === currentMonth && bookingYear === currentYear) {
      currentMonthBookings.push({
        startDate: bookingStartDate,
        endDate: bookingEndDate
      })
    }

    // push same month booking to array
    if (bookingMonth === (currentMonth + 1) && bookingYear === currentYear) {
      nextMonthBookings.push({
        startDate: bookingStartDate,
        endDate: bookingEndDate
      })
    }
  });

  console.log(currentMonthBookings)
  // console.log(nextMonthBookings)

  // edge case: if new booking across 2 years, then take existing Dec and Jan of next yr's bookings to compare


  // iterate through existing same month's bookings
  // compare existing same month booking with this new one
  currentMonthBookings.forEach(booking => {
    // if new startDate earlier than existing startDate but new endDate later than existing startDate, error
    if (startDate.getTime() < booking.startDate.getTime() &&
    endDate.getTime() >= booking.endDate.getTime()) {
      return res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
        statusCode: 403,
        errors: [
          "End date conflicts with an existing booking"
        ]
      })
    };

    // if new startDate equal to existing startDate, error
    if (startDate.getTime() === booking.startDate.getTime()) {
      return res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
        statusCode: 403,
        errors: [
          "Start date conflicts with an existing booking"
        ]
      })
    };

    // if new startDate later than existing start and new endDate earlier than existing end, error on both
    if (startDate.getTime() > booking.startDate.getTime() &&
    endDate.getTime() < booking.endDate.getTime()) {
      return res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
        statusCode: 403,
        errors: [
          "Start date conflicts with an existing booking",
          "End date conflicts with an existing booking"
        ]
      })
    };

    // if new startDate later than existing startDate but earlier than existing endDate, error
    if (startDate.getTime() > booking.startDate.getTime() &&
    startDate.getTime() < booking.endDate.getTime()) {
      return res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
        statusCode: 403,
        errors: [
          "Start date conflicts with an existing booking"
        ]
      })
    };

    // if new startDate earlier than existing startDate but new endDate later than existing startDate, error
    if (startDate.getTime() < booking.startDate.getTime() &&
    endDate.getTime() > booking.startDate.getTime()) {
      return res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
        statusCode: 403,
        errors: [
          "End date conflicts with an existing booking"
        ]
      })
    };

  });


  // once all same month's booking has checked against new booking, move on to check next booking
  nextMonthBookings.forEach(booking => {
    // if new startDate earlier than existing startDate but new endDate later than existing startDate, error
    if (startDate.getTime() < booking.startDate.getTime() &&
      endDate.getTime() >= booking.endDate.getTime()) {
      return res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
        statusCode: 403,
        errors: [
          "End date conflicts with an existing booking"
        ]
      })
    };

    // if new startDate equal to existing startDate, error
    if (startDate.getTime() = booking.startDate.getTime()) {
      return res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
        statusCode: 403,
        errors: [
          "Start date conflicts with an existing booking"
        ]
      })
    };

    // if new startDate later than existing startDate but earlier than existing endDate, error
    if (startDate.getTime() > booking.startDate.getTime() &&
      startDate.getTime() < booking.endDate.getTime()) {
      return res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
        statusCode: 403,
        errors: [
          "Start date conflicts with an existing booking"
        ]
      })
    };

    // if new startDate earlier than existing startDate but new endDate later than existing startDate, error
    if (startDate.getTime() < booking.startDate.getTime() &&
      endDate.getTime() > booking.startDate.getTime()) {
      return res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
        statusCode: 403,
        errors: [
          "End date conflicts with an existing booking"
        ]
      })
    };

    // if new startDate later than existing start and new endDate earlier than existing end, error on both
    if (startDate.getTime() > booking.startDate.getTime() &&
      endDate.getTime() < booking.endDate.getTime()) {
      return res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
        statusCode: 403,
        errors: [
          "Start date conflicts with an existing booking",
          "End date conflicts with an existing booking"
        ]
      })
    };
  });

  // update existing booking
  const bookingObj = await Booking.findByPk(bookingId)
  await bookingObj.update({
    startDate: startDate,
    endDate: endDate
  })

  const updatedBooking = await Booking.findByPk(bookingId);

  return res.json(updatedBooking);
})



module.exports = router;
