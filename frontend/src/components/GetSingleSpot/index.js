import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as spotActions from "../../store/spots";
import * as reviewActions from "../../store/reviews";
import { useEffect } from 'react';
import './GetSingleSpot.css';
import { useParams } from 'react-router-dom';

function GetSingleSpot() {

  // if spot exists
  const spotId = useParams().spotId;
  // console.log('spotId', spotId); // 1
  const dispatch = useDispatch();

  useEffect(() => {
    // get spot info from DB, then put on redux store
    dispatch(spotActions.getSingleSpotDB(spotId))
    // get reviews from DB, then put on redux store
    dispatch(reviewActions.getSpotReviewsDB(spotId))
  }, [dispatch]);

  // get spot info from redux store
  const singleSpot = useSelector((store) => store.spots.singleSpot)
  // console.log('singleSpot in GetSingleSpot component', singleSpot)

  // get reviews from redux store
  const reviews = useSelector((store) => store.reviews.spot)
  console.log('reviews from redux store', reviews)

  // if there is no such spot, show error message
  if (!singleSpot || singleSpot.message) return (<div>Unable to retrieve spots. Please try again shortly.</div>);



  const handleClick = () => {
    alert("Feature coming soon...")
  }

  return (
    <>
      <div className='name'>{singleSpot.name}</div>
      <div className='city-state-country'>{singleSpot.city}, {singleSpot.state}, {singleSpot.country}</div>
      <div className='spot-images'>
        <img className='big-preview-image'
          src={singleSpot.SpotImages.filter((image) => image.preview === true)[0].url}
          alt="spot preview"></img>
        <div className='other-spot-images-container'>
          {
            singleSpot.SpotImages.filter((image) => image.preview === false).map(image => {
              // console.log('image"s url', image.url)
              return <img className='other-spot-images' src={image.url} alt="spot"></img>
            })
          }
        </div>
      </div>
      <div className="owner-description-price-reserve">
        <div className='owner-description'>
          <div className='owner'>Hosted by {singleSpot.Owner.firstName} {singleSpot.Owner.lastName}</div>
          <div className='description'>{singleSpot.description}</div>
        </div>
        <div className='price-rating-review-reserve'>
          <div className='price-rating-review'>
            <div><span id='price'>${singleSpot.price}</span> night</div>
            <div className='rating-review'>
              <i class="fa-solid fa-star"></i>
              {Number(singleSpot.avgStarRating).toFixed(2)}
              {singleSpot.numReviews === 0 ? "" : " - ".concat(singleSpot.numReviews, " ", singleSpot.numReviews === 1 ? "review" : "reviews")}
            </div>
          </div>
          <button className='activated' onClick={handleClick}>Reserve</button>
        </div>
      </div>
      <div className='review-session-container'>
        <div className='rating-review'>
          <i class="fa-solid fa-star"></i>
          {Number(singleSpot.avgStarRating).toFixed(2)}
          {singleSpot.numReviews === 0 ? "" : " - ".concat(singleSpot.numReviews, " ", singleSpot.numReviews === 1 ? "review" : "reviews")}
        </div>
        <div className='reviews-container'>
          {reviews && Object.values(reviews).map(review => {
            return (
              <div className='single-review-container'>
                <div>{review.User.firstName}</div>
                <div className='created-at'>{review.createdAt.split('T')[0]}</div>
                <div>{review.review}</div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default GetSingleSpot;
