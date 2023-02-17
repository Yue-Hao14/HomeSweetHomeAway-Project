import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as spotActions from "../../store/spots";
import * as reviewActions from "../../store/reviews";
import { useEffect } from 'react';
import './GetSingleSpot.css';
import { useParams } from 'react-router-dom';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import PostReviewModal from "../GetSingleSpot/PostReviewModal";

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
  const reviewsSpot = useSelector((store) => store.reviews.spot)
  console.log('reviews from redux store', reviewsSpot)

  // get user info from redux store
  const sessionUser = useSelector(state => state.session.user);

  // if there is no such spot, show error message
  if (!singleSpot || singleSpot.message) return (<div>Unable to retrieve spots. Please try again shortly.</div>);


  const checkUserOwner = () => {
    let result;
    if (sessionUser) {
      result = sessionUser.id !== singleSpot.ownerId
    }
    console.log('result from checkUserOwner', result)
    return result;
  }


  // check if logged-in user has posted a review for this spot yet
  const checkUserReview = () => {
    let result = true;
    if (sessionUser) {
      result = Object.values(reviewsSpot).find(review => {
        return review.userId === sessionUser.id
      })
    }
    console.log('result from checkUserReview', result)
    return result;
  }

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

        {/* when there is no review and logged-in user is not the owner */}
        {!reviewsSpot && sessionUser && checkUserOwner() &&
          (<div>Be the first to post a review</div>)
        }

        {/* when there is review and logged-in user has not posted a review and is not owner */}
        {reviewsSpot && !checkUserReview() && sessionUser?.id !== singleSpot.ownerId ?
          (<div>
            <button>
              <OpenModalMenuItem
              itemText="Post Your Review"
              modalComponent={<PostReviewModal spotId={spotId} />}
              />
            </button>
          </div>)
          : ""}

        <div className='reviews-container'>
          {reviewsSpot && Object.values(reviewsSpot).map(review => {
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
