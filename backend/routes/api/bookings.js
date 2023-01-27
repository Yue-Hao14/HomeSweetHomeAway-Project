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
      if(spotImageObj.preview === true) {
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





module.exports = router;
