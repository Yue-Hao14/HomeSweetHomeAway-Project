const express = require('express');
const { Spot, SpotImage, Review, User } = require('../../db/models');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const router = express.Router();

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

  return res.json(result)

})


// ------------------------------------------------------
// Get all spots
router.get('/', async (req, res, _next) => {
  let result = {};

  const spots = await Spot.findAll({
    include: [Review, SpotImage]
  });

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

  return res.json(result)
});


// ------------------------------------------------------
// Add an Image to a Spot based on the Spot's id
router.post('/:spotid/images', restoreUser, async (req, res, _next) => {
  // extract logged in/current user object (promise) from restoreUser middleware output
  const { user } = req;

  // convert user object to normal POJO
  const userPOJO = user.toJSON();
  // console.log(userPOJO)

  // get userId of the current user
  const userId = userPOJO.id
  // console.log(userId);

  // extract spotId
  const spotId = req.params.spotid;

  // find all the spots owned by the current user
  const ownedSpots = await Spot.findAll({
    where: {
      ownerId: userId,
      id: spotId
    }
  })

  // if not spots found, then error message
  if(ownedSpots.length === 0) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  }

  // extract url and preview from res.body
  const { url, preview } = req.body;

  // add image to SpotImages table
  const image = await SpotImage.create({
    spotId,
    url,
    preview
  })

  const newImage = await SpotImage.findOne({
    where: {
      url: url
    },
    attributes: {
      exclude: ['spotId']
    }
  })

  return res.json(newImage)

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
  if (!address) {
    error.errors = "Street address is required";
    return res.status(400).json(error)
  };
  if (!city) {
    error.errors = "City is required";
    return res.status(400).json(error)
  };
  if (!state) {
    error.errors = "State is required";
    return res.status(400).json(error)
  };
  if (!country) {
    error.errors = "Country is required";
    return res.status(400).json(error)
  };
  if (!lat) {
    error.errors = "Latitude is required";
    return res.status(400).json(error)
  };
  if (!lng) {
    error.errors = "Longitude is required";
    return res.status(400).json(error)
  };
  if (!name || name.length > 50) {
    error.errors = "Name must be less than 50 characters";
    return res.status(400).json(error)
  };
  if (!description) {
    error.errors = "Description is required";
    return res.status(400).json(error)
  };
  if (!price) {
    error.errors = "Price per day is required";
    return res.status(400).json(error)
  };

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

  const newSpot = await Spot.findOne({
    where: {
      name: name
    }
  })

  return res.json(newSpot)
})


module.exports = router;
