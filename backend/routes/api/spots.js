const express = require('express');
const { Spot, SpotImage, Review, User, Booking, ReviewImage } = require('../../db/models');
const spot = require('../../db/models/spot');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const router = express.Router();
const { Op } = require('sequelize');
const {multipleMulterUpload, multiplePublicFileUpload } = require("../../aws");

// ------------------------------------------------------
// Get spots of current user
router.get('/current', restoreUser, async (req, res, _next) => {
  let result = {};

  // extract user object (promise) from restoreUser middleware output
  const { user } = req;

  // convert user to normal POJO
  const userPOJO = user.toJSON();
  // console.log(userPOJO)

  // get userId of the current user
  const userId = userPOJO.id
  // console.log(userId);

  const spots = await Spot.findAll({
    include: [Review, SpotImage],
    where: {
      ownerId: userId
    }
  })

  // initiate spotsArr to host formatted spots
  let spotsArr = [];

  // iterate through each spot object
  spots.forEach(spot => {
    let totalRating = 0;
    let totalCount = 0;

    // convert each spot to a normal POJO
    spot = spot.toJSON();

    // iterate through Review to calculate avgRating
    spot.Reviews.forEach(review => {
      totalCount++;
      totalRating += review.stars
    });
    let avgRating = totalRating / totalCount;
    spot.avgRating = avgRating;

    // iterate through SpotImages to set url to previewImage
    spot.SpotImages.forEach(spotImage => {
      if (spotImage.preview === true) {
        // let previewImage = spotImage.url
        let previewImage = retrievePrivateFile(spotImage.key) // retrieve private file from s3
        spot.previewImage = previewImage
      }
    })

    // remove Review and SpotImage objects
    delete spot.Reviews;
    delete spot.SpotImages;

    // push each formatted spot to spotsArr
    spotsArr.push(spot);
  });

  result.Spots = spotsArr;

  return res.json(result)

})




// ------------------------------------------------------
// Get all Reviews for a Spot based on the Spot's id
router.get('/:spotId/reviews', async (req, res, _next) => {
  let result = {};
  const spotId = req.params.spotId;

  // check if a spot can be found based on spotId
  const spot = await Spot.findByPk(spotId)
  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  }

  // get all the reviews for this spotId
  const reviews = await Review.findAll({
    where: {
      spotId: spotId
    },
    include: [{
      model: User,
      attributes: {
        exclude: ['username', 'hashedPassword', 'email', 'createdAt', 'updatedAt',]
      }
    }, {
      model: ReviewImage,
      attributes: {
        exclude: ['reviewId', 'createdAt', 'updatedAt']
      }
    }]
  })

  result.Reviews = reviews;
  return res.json(result);
})




// ------------------------------------------------------
// Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', restoreUser, async (req, res, _next) => {
  // extract user object (promise) from restoreUser middleware output
  const { user } = req;

  // convert user to normal POJO
  const userPOJO = user.toJSON();
  // console.log(userPOJO)

  // get userId of the current user
  const userId = userPOJO.id
  // console.log(userId);

  // find spots by spotId
  const spotId = req.params.spotId;

  // Check if current user is the owner of the spotId
  const spot = await Spot.findByPk(spotId);
  // console.log(spot)

  // if no spot found, then error message
  // if current user is not the owner of the spot
  // if current user is the owenr of the spot
  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  } else if (spot.ownerId === userId) {
    const Bookings = await Booking.findAll({
      where: {
        spotId: spotId
      },
      include: {
        model: User,
        attributes: {
          exclude: ['username', 'email', 'hashedPassword', 'createdAt', 'updatedAt']
        }
      }
    });
    return res.json({ Bookings });
  } else {
    const Bookings = await Booking.findAll({
      where: {
        spotId: spotId
      },
      attributes: {
        exclude: ['userId', 'createdAt', 'updatedAt']
      }
    });
    return res.json({ Bookings });
  }

})




// ------------------------------------------------------
// Get details of a spot by id
router.get('/:spotId', async (req, res, _next) => {

  // find spots by spotId
  const spotId = req.params.spotId;

  const spot = await Spot.findByPk(spotId, {
    include: [{
      model: SpotImage,
      attributes: {
        exclude: ['spotId', 'createdAt', 'updatedAt']
      }
    }, {
      model: User,
      as: 'Owner',
      attributes: {
        exclude: ['email', 'hashedPassword', 'username', 'createdAt', 'updatedAt']
      }
    }, Review]
  })

  // if no spot found in db
  // console.log(spot)
  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  }

  const spotPOJO = spot.toJSON();
  // console.log(spotPOJO)

  // iterate through Reviews array to get numReviews and avgStarRating
  const reviewsArr = spotPOJO.Reviews;
  // console.log(reviewsArr)

  let numReviews = 0;
  let totalRating = 0;
  reviewsArr.forEach(review => {
    numReviews++;
    totalRating += review.stars
  });
  const avgStarRating = totalRating / numReviews;
  spotPOJO.numReviews = numReviews;
  spotPOJO.avgStarRating = avgStarRating;

  delete spotPOJO.Reviews;

  return res.json(spotPOJO);
})




// ------------------------------------------------------
// Get all spots
router.get('/', async (req, res, _next) => {
  let result = {};
  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query
  page = Number(page)
  size = Number(size)

  let query = {
    include: [Review, SpotImage],
    where: {}
  }
  // set page and size's default value
  if (!size) size = 20;
  if (!page) page = 0;

  // console.log(typeof page)
  // console.log(typeof size)

  // query filter validation checks and add to query
  // error messages
  const error = {
    messages: "Validation Error",
    statusCode: 400
  }
  const errors = [];

  if (!Number.isInteger(page) || page < 0 || page > 10) {
    errors.push("Page must be greater than or equal to 0 and not greater than 10");
  }
  if (!Number.isInteger(size) || page < 0 || page > 20) {
    errors.push("Size must be greater than or equal to 0 and not greater than 20");
  } else if (page && size) {
    query.limit = size;
    query.offset = size * (page - 1);
  }
  if (isNaN(minLat) && minLat) {
    errors.push("Minimum latitude is invalid");
  } else if (minLat) {
    query.where.lat = {[Op.gte]: minLat}
  }
  if (isNaN(maxLat) && maxLat) {
    errors.push("Maximum latitude is invalid");
  } else if (maxLat) {
    query.where.lat = {[Op.lte]: maxLat}
  }
  if (isNaN(minLng) && minLng) {
    errors.push("Minimum longitude is invalid");
  } else if (minLng) {
    query.where.lng = {[Op.gte]: minLng}
  }
  if (isNaN(maxLng) && maxLng) {
    errors.push("Maximum longitude is invalid");
  } else if (maxLng) {
    query.where.lng = {[Op.lte]: maxLng}
  }
  console.log(minPrice)
  if ((minPrice && isNaN(minPrice)) || minPrice < 0) {
    errors.push("Minimum price must be greater than or equal to 0");
  } else if (minPrice) {
    query.where.price = {[Op.gte]: minPrice}
  }
  if ((maxPrice && isNaN(maxPrice)) || maxPrice < 0) {
    errors.push("Maximum price must be greater than or equal to 0");
  } else if (maxPrice) {
    query.where.price = {[Op.lte]: maxPrice}
  }

  console.log(query)

  error.errors = errors
  if (errors.length > 0) {
    return res.status(400).json(error);
  }


  // find all the spots meet search criterias and pagination
  const spots = await Spot.findAll(query);

  // initiate spotsArr to host formatted spots
  let spotsArr = [];

  // iterate through each spot object
  spots.forEach(spot => {
    let totalRating = 0;
    let totalCount = 0;

    // convert each spot to a normal POJO
    spot = spot.toJSON();

    // iterate through Review to calculate avgRating
    spot.Reviews.forEach(review => {
      totalCount++;
      totalRating += review.stars
    });
    let avgRating = totalRating / totalCount;
    spot.avgRating = avgRating;

    // iterate through SpotImages to set url to previewImage
    spot.SpotImages.forEach(spotImage => {
      if (spotImage.preview === true) {
        let previewImage = spotImage.url
        spot.previewImage = previewImage
      }
    })

    // remove Review and SpotImage objects
    delete spot.Reviews;
    delete spot.SpotImages;

    // push each formatted spot to spotsArr
    spotsArr.push(spot);
  });

  result.Spots = spotsArr;


  // add page and size to result obj
  result.page = page;
  result.size = size;

  return res.json(result)
});


// ------------------------------------------------------
// Add an Image to a Spot based on the Spot's id
// router.post('/:spotid/images', restoreUser, async (req, res, _next) => {
//   // extract logged in/current user object (promise) from restoreUser middleware output
//   const { user } = req;

//   // convert user object to normal POJO
//   const userPOJO = user.toJSON();
//   // console.log(userPOJO)

//   // get userId of the current user
//   const userId = userPOJO.id
//   // console.log(userId);

//   // extract spotId
//   const spotId = req.params.spotid;

//   // find all the spots owned by the current user
//   const ownedSpots = await Spot.findAll({
//     where: {
//       ownerId: userId,
//       id: spotId
//     }
//   })

//   // if not spots found, then error message
//   if (ownedSpots.length === 0) {
//     return res.status(404).json({
//       message: "Spot couldn't be found",
//       statusCode: 404
//     })
//   }

//   // extract url and preview from res.body
//   const { url, preview } = req.body;

//   // add image to SpotImages table
//   const image = await SpotImage.create({
//     spotId,
//     url,
//     preview
//   })

//   const newImage = await SpotImage.findByPk(image.dataValues.id,{
//     attributes: {
//       exclude: ['spotId']
//     }
//   })

//   return res.json(newImage)
// })


// ------------------------------------------------------
// Add an Image to a Spot based on the Spot's id to AWS S3
router.post('/:spotId/images', restoreUser, multipleMulterUpload("images"), async (req, res, _next) => {
  const images = await multiplePublicFileUpload(req.files);
  const { preview } = req.body;
    // Save each image to the database
    for (let i = 0; i < images.length; i++) {
        const newImage = {
            url: images[i], // AWS S3 URL of the image
            preview,
            spotId: req.params.spotId,
        };
        await SpotImage.create(newImage);
    }

    return res.sendStatus(200); // Send a 200 status code without any JSON response body
});



// ------------------------------------------------------
// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', restoreUser, async (req, res, _next) => {
  const spotId = req.params.spotId
  const { review, stars } = req.body;

  // extract user object (promise) from restoreUser middleware output
  const { user } = req;
  // convert user to normal POJO
  const userPOJO = user.toJSON();
  // console.log(userPOJO)
  // get userId of the current user
  const userId = userPOJO.id
  // console.log(userId);

  // check if a spot can be found, if not, error
  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  }

  // req.body validation checks
  const error = {
    messages: "Validation Error",
    statusCode: 400
  }
  const errors = [];
  if (!review) {
    errors.push("Review text is required");
  };
  if (typeof stars !== "number" || stars < 1 || stars > 5) {
    errors.push("Stars must be an integer from 1 to 5");
  };
  error.errors = errors
  if (errors.length > 0) {
    return res.status(400).json(error);
  }

  // check if current user has already left a review for this spot
  const existingReview = await Review.findOne({
    where: {
      spotId: spotId,
      userId: userId
    }
  })
  if (existingReview) {
    return res.status(403).json({
      message: "User already has a review for this spot",
      statusCode: 403
    })
  }

  const newReview = await Review.create({
    spotId,
    userId,
    review,
    stars
  });

  const reviewFromDB = await Review.findByPk(newReview.dataValues.id)

  return res.json(reviewFromDB);
})


// ------------------------------------------------------
// Create a Booking for a Spot based on the Spot's id
router.post('/:spotId/bookings', restoreUser, async (req, res, _next) => {
  // get spotId
  const spotId = req.params.spotId;

  // extract user object (promise) from restoreUser middleware output
  const { user } = req;

  // convert user to normal POJO
  const userPOJO = user.toJSON();
  // console.log(userPOJO)

  // get userId of the current user
  const userId = userPOJO.id
  // console.log(userId);

  // data manipulation on startDate and endDate from req.body
  let { startDate, endDate } = req.body;
  startDate = new Date(startDate);
  endDate = new Date(endDate);

  const startDateFormatted = startDate.toDateString();
  const endDateFormatted = endDate.toDateString();
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

  // find spot based on spotId
  const spot = await Spot.findByPk(spotId);

  // if no spot is found, then error message
  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  }

  // if current user is the owner of the spot, then error message
  if (spot.ownerId === userId) {
    return res.status(404).json({
      message: "Owner cannot create booking for your own property",
      statusCode: 404
    })
  }

  // check if booking is conflict with existing bookings
  // get all the booking of current spot
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

  // console.log(currentMonthBookings)
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



  // create booking
  const booking = await Booking.create({
    spotId,
    userId,
    startDate,
    endDate
  })

  const bookingFromDB = await Booking.findByPk(booking.dataValues.id)

  return res.json(bookingFromDB)
})


// ------------------------------------------------------
// Create a spot
router.post('/', restoreUser, async (req, res, _next) => {
  // extract user object (promise) from restoreUser middleware output
  const { user } = req;

  // convert user to normal POJO
  const userPOJO = user.toJSON();
  // console.log(userPOJO)

  // get userId of the current user
  const userId = userPOJO.id
  // console.log(userId);

  const { address, city, state, country, lat, lng, name, description, price } = req.body

  // error messages
  const error = {
    messages: "Validation Error",
    statusCode: 400
  }

  const errors = [];
  if (!address) {
    errors.push("Street address is required");
  };
  if (!city) {
    errors.push("City is required");
  };
  if (!state) {
    errors.push("State is required");
  };
  if (!country) {
    errors.push("Country is required");
  };
  if (!lat) {
    errors.push("Latitude is required");
  };
  if (!lng) {
    errors.push("Longitude is required");
  };
  if (!name || name.length > 50) {
    errors.push("Name must be less than 50 characters");
  };
  if (!description) {
    errors.push("Description is required");
  };
  if (!price) {
    errors.push("Price per day is required");
  };

  error.errors = errors
  if (errors.length > 0) {
    return res.status(400).json(error);
  }

  const spot = await Spot.create({
    ownerId: userId,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
  })

  console.log(spot.dataValues.id)
  const spotId = spot.dataValues.id;
  console.log(spotId)

  const newSpot = await Spot.findByPk(spotId)

  return res.json(newSpot)
})


// ------------------------------------------------------
// Edit a Spot
router.put('/:spotId', restoreUser, async (req, res, _next) => {
  const spotId = req.params.spotId;

  // extract user object (promise) from restoreUser middleware output
  const { user } = req;
  // convert user to normal POJO
  const userPOJO = user.toJSON();
  // console.log(userPOJO)
  // get userId of the current user
  const userId = userPOJO.id
  // console.log(userId);

  // find spot by spotId
  let spot = await Spot.findByPk(spotId);

  // if no spot is found based on spotId, error
  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  }
  // convert to normal POJO
  spot = spot.toJSON();

  // check if current user owns this spot, if not, error
  if (spot.ownerId !== userId) {
    return res.status(404).json({
      message: "This is not your spot."
    })
  }


  // Body validaiton error
  // extract from req.body
  const { address, city, state, country, lat, lng, name, description, price } = req.body
  // error messages
  const error = {
    messages: "Validation Error",
    statusCode: 400
  }
  const errors = [];
  if (!address) {
    errors.push("Street address is required");
  };
  if (!city) {
    errors.push("City is required");
  };
  if (!state) {
    errors.push("State is required");
  };
  if (!country) {
    errors.push("Country is required");
  };
  if (!lat) {
    errors.push("Latitude is required");
  };
  if (!lng) {
    errors.push("Longitude is required");
  };
  if (!name || name.length > 50) {
    errors.push("Name must be less than 50 characters");
  };
  if (!description) {
    errors.push("Description is required");
  };
  if (!price) {
    errors.push("Price per day is required");
  };
  // assign errors to the error object
  error.errors = errors
  // return error response
  if (errors.length > 0) {
    return res.status(400).json(error);
  }


  // update spot
  const spotObj = await Spot.findByPk(spotId);
  await spotObj.update({
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
  })

  const updatedSpot = await Spot.findByPk(spotId);

  return res.json(updatedSpot);
})


// ------------------------------------------------------
// Delete a Spot
router.delete('/:spotId', restoreUser, async (req, res, _next) => {
  const spotId = req.params.spotId;

  // extract user object (promise) from restoreUser middleware output
  const { user } = req;
  // convert user to normal POJO
  const userPOJO = user.toJSON();
  // console.log(userPOJO)
  // get userId of the current user
  const userId = userPOJO.id
  // console.log(userId);

  // find spot by spotId
  let spot = await Spot.findByPk(spotId);

  // if no spot is found based on spotId, error
  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  }
  // convert to normal POJO
  spot = spot.toJSON();

  // check if current user owns this spot, if not, error
  if (spot.ownerId !== userId) {
    return res.status(404).json({
      message: "This is not your spot."
    })
  }

  // delete a spot
  const spotObj = await Spot.findByPk(spotId);
  spotObj.destroy();

  return res.json({
    message: "Successfully deleted",
    statusCode: 200
  })


})

module.exports = router;
