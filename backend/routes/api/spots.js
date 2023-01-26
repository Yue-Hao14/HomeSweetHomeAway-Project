const express = require('express');
const { Spot, SpotImage, Review, User } = require('../../db/models');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const router = express.Router();

// Get details of a spot by id
router.get('/:spotId', async (req, res, _next) => {

  // find spots by spotId
  const spotId = req.params.spotId;

  const spot = await Spot.findByPk(spotId, {
    include: [{
      model: SpotImage,
      attributes: {
        exclude: ['spotId','createdAt','updatedAt']
      }
    }, {
      model: User,
      as: 'Owner',
      attributes: {
        exclude: ['email', 'hashedPassword','username','createdAt','updatedAt']
      }}, Review]
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



// Get all spots
router.get('/', async (req, res, next) => {
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


module.exports = router;
