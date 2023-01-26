const express = require('express');
const { Spot, SpotImage, Review } = require('../../db/models');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const router = express.Router();

// Get spots of current user
router.get('/', restoreUser, async (req, res, next) => {

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
