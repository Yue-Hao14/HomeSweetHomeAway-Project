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
        exclude: ['username', 'hashedPassword', 'email', 'createdAt', 'updatedAt',]
      }
    }, {
      model: Spot,
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      include: SpotImage
    }, {
      model: ReviewImage,
      attributes: {
        exclude: ['reviewId', 'createdAt', 'updatedAt']
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



// ------------------------------------------------------
// Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', restoreUser, async (req, res, _next) => {
  const reviewId = req.params.reviewId

  // extract logged in/current user object (promise) from restoreUser middleware output
  const { user } = req;
  // convert user object to normal POJO
  const userPOJO = user.toJSON();
  // console.log(userPOJO)
  // get userId of the current user
  const userId = userPOJO.id
  // console.log(userId);

  // check if a review can be found, if not, error
  const review = await Review.findOne({
    where: {
      id: reviewId
    }
  })
  if (!review) {
    return res.status(404).json({
      message: "Review couldn't be found",
      statusCode: 404
    })
  }


  // check if review belongs to current user, if not, error
  const reviewOfUser = await Review.findOne({
    where: {
      userId: userId,
      id: reviewId
    }
  })
  if (!reviewOfUser) {
    return res.status(404).json({
      message: "You don't have permission to add an image for this review",
      statusCode: 404
    })
  }


  // check # of reviewImages associated to this review, if already 10, error
  const reviewImages = await ReviewImage.findAll({
    where: {
      reviewId: reviewId
    }
  })
  if (reviewImages.length === 10) {
    return res.status(403).json({
      message: "Maximum number of images for this resource was reached",
      statusCode: 403
    })
  }


  // add this reviewImage
  const { url } = req.body;
  const image = await ReviewImage.create({
    reviewId,
    url
  })

  const newImage = await ReviewImage.findByPk(image.dataValues.id,{
    attributes: {
      exclude: ['reviewId', 'createdAt', 'updatedAt']
    }
  })

  return res.json(newImage);
})



// ------------------------------------------------------
// Edit a review
router.put('/:reviewId', restoreUser, async (req, res, _next) => {
  const reviewId = req.params.reviewId;
  const { review, stars } = req.body;

  // extract logged in/current user object (promise) from restoreUser middleware output
  const { user } = req;
  // convert user object to normal POJO
  const userPOJO = user.toJSON();
  // console.log(userPOJO)
  // get userId of the current user
  const userId = userPOJO.id
  // console.log(userId);


  // check if a review can be found, if not, error
  const existingReview = await Review.findOne({
    where: {
      id: reviewId
    }
  })
  if (!existingReview) {
    return res.status(404).json({
      message: "Review couldn't be found",
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
  if (!Number.isInteger(stars) || stars < 1 || stars > 5) {
    errors.push("Stars must be an integer from 1 to 5");
  };
  error.errors = errors
  if (errors.length > 0) {
    return res.status(400).json(error);
  }


  // check if review belongs to the current user, if not, error
  const reviewOfUser = await Review.findOne({
    where: {
      userId: userId,
      id: reviewId
    }
  })
  if (!reviewOfUser) {
    return res.status(404).json({
      message: "You don't have permission to edit this review",
      statusCode: 404
    })
  }


  // update existing review
  await existingReview.update({
    review: review,
    stars: stars
  })

  const updatedReview = await Review.findByPk(reviewId);

  return res.json(updatedReview)
})




// ------------------------------------------------------
// Delete a review
router.delete('/:reviewId', restoreUser, async (req, res, _next) => {
  const reviewId = req.params.reviewId;

  // extract logged in/current user object (promise) from restoreUser middleware output
  const { user } = req;
  // convert user object to normal POJO
  const userPOJO = user.toJSON();
  // console.log(userPOJO)
  // get userId of the current user
  const userId = userPOJO.id
  // console.log(userId);


  // check if a review can be found, if not, error
  const existingReview = await Review.findByPk(reviewId)
  if (!existingReview) {
    return res.status(404).json({
      message: "Review couldn't be found",
      statusCode: 404
    })
  }


  // check if review belongs to the current user, if not, error
  const reviewOfUser = await Review.findOne({
    where: {
      userId: userId,
      id: reviewId
    }
  })
  if (!reviewOfUser) {
    return res.status(404).json({
      message: "You don't have permission to delete this review",
      statusCode: 404
    })
  }


  // delete review
  existingReview.destroy();

  // check the deleted review no long in DB
  const deletedReview = await Review.findByPk(reviewId)

  if (!deletedReview) {
    return res.status(200).json({
      message: "Successfully deleted",
      statusCode: 200
    })
  }
})





module.exports = router;
