const express = require('express');
const { Booking, Spot, SpotImage, Review, User, ReviewImage } = require('../../db/models');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const router = express.Router();

// ------------------------------------------------------
// Delete a spot image
router.delete('/:spotImageId', restoreUser, async (req, res, _next) => {
  const spotImageId = req.params.spotImageId

 // extract logged in/current user object (promise) from restoreUser middleware output
 const { user } = req;
 // convert user object to normal POJO
 const userPOJO = user.toJSON();
 // console.log(userPOJO)
 // get userId of the current user
 const userId = userPOJO.id
 // console.log(userId);



 // check if a spot image can be found, if not, error
 const existingSpotImage = await SpotImage.findByPk(spotImageId)
 if (!existingSpotImage) {
   return res.status(404).json({
     message: "Spot image couldn't be found",
     statusCode: 404
   })
 }


 // check if this spot image belongs to the current user, if not, error
 // find all the spots owned by current user
 const spots = await Spot.findAll({
  where: {
    ownerId: userId
  },
  attributes: ['id']
 })

//  console.log(spots)

 let ownedSpotIdArr = [];
 // iterate through all the spots to get an array of spotId owned by current user
 spots.forEach(spot => {
  spot = spot.toJSON();
  ownedSpotIdArr.push(spot.id)
 });

//  console.log(ownedSpotIdArr)

// get the spotId associated to the spotImage requested
let spotId = await SpotImage.findByPk(spotImageId)
spotId = spotId.dataValues.spotId;
// console.log(spotId)


// check if the spot associated to this spot image is part of the ownedSpotIdArr
// if no, error
 if (!ownedSpotIdArr.includes(spotId)) {
   return res.status(404).json({
     message: "You don't have permission to delete this image",
     statusCode: 404
   })
 }


 // delete spot image
 existingSpotImage.destroy();

 // check the deleted review no long in DB
 const deletedSpotImage = await SpotImage.findByPk(spotImageId)

 if (!deletedSpotImage) {
   return res.status(200).json({
     message: "Successfully deleted",
     statusCode: 200
   })
 }
})




module.exports = router;
