const express = require('express');
const { Booking, Spot, SpotImage, Review, User, ReviewImage } = require('../../db/models');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const router = express.Router();

// ------------------------------------------------------
// Get all of the Current User's Bookings
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

  // get all the reviews of the current user
  const reviews = await Review.findAll({
    where: {
      userId: userId
    },
    include: [{
      model: User,
      attributes: {
        exclude: ['username','hashedPassword','email','createdAt','updatedAt',]
      }
    },{
      model: Spot,
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      include: SpotImage
    }, {
      model: ReviewImage,
      attributes: {
        exclude: ['reviewId','createdAt', 'updatedAt']
      }
    }]
  })

  // create a new array to host edited reviews
  let reviewsArr = [];

  // iterate through reviews array to create previewImage on each Spot object
  // and remove SpotImages
  reviews.forEach(review => {
    review = review.toJSON();
    const spot = review.Spot;
    const spotImages = spot.SpotImages; // an array

    // iterate through spotImages array
    spotImages.forEach(spotImage => {
      if (spotImage.preview === true) {
        let previewImage = spotImage.url;
        spot.previewImage = previewImage;
      }
    });

    // remove SpotImages
    delete review.Spot.SpotImages

    // push each edited review to reviewsArr
    // console.log(review)
    reviewsArr.push(review)
  });



  result.Reviews = reviewsArr
  return res.json(result)
})


module.exports = router;
