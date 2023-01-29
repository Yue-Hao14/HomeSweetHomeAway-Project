const express = require('express');
const { Booking, Spot, SpotImage, Review, User, ReviewImage } = require('../../db/models');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const router = express.Router();

// ------------------------------------------------------
// Delete a review image
router.delete('/:reviewImageId', restoreUser, async (req, res, _next) => {
  const reviewImageId = req.params.reviewImageId

  // extract logged in/current user object (promise) from restoreUser middleware output
  const { user } = req;
  // convert user object to normal POJO
  const userPOJO = user.toJSON();
  // console.log(userPOJO)
  // get userId of the current user
  const userId = userPOJO.id
  // console.log(userId);


  // check if a review image can be found, if not, error
  const existingReviewImage = await ReviewImage.findByPk(reviewImageId)
  if (!existingReviewImage) {
    return res.status(404).json({
      message: "Review image couldn't be found",
      statusCode: 404
    })
  }



  // check if this review image belongs to the current user, if not, error
  // find all the reviews owned by current user
  const reviews = await Review.findAll({
    where: {
      userId: userId
    },
    attributes: ['id']
  })

  //  console.log(spots)

  let ownedReviewIdArr = [];
  // iterate through all the spots to get an array of spotId owned by current user
  reviews.forEach(review => {
    review = review.toJSON();
    ownedReviewIdArr.push(review.id)
  });

  //  console.log(ownedSpotIdArr)

  // get the spotId associated to the spotImage requested
  let reviewId = await ReviewImage.findByPk(reviewImageId)
  reviewId = reviewId.dataValues.reviewId;
  // console.log(reviewId)


  // check if the spot associated to this spot image is part of the ownedSpotIdArr
  // if no, error
  if (!ownedReviewIdArr.includes(reviewId)) {
    return res.status(404).json({
      message: "You don't have permission to delete this image",
      statusCode: 404
    })
  }


   // delete review image
 existingReviewImage.destroy();

 // check the deleted review no long in DB
 const deletedReviewImage = await ReviewImage.findByPk(reviewImageId)

 if (!deletedReviewImage) {
   return res.status(200).json({
     message: "Successfully deleted",
     statusCode: 200
   })
 }
})





module.exports = router;
