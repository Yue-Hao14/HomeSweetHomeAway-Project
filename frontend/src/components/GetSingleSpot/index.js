import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as spotActions from "../../store/spots";
import { useEffect } from 'react';
import './index.css';
import { useParams } from 'react-router-dom';

function GetSingleSpot() {
  const spotId = useParams().spotId;
  // console.log('spotId', spotId); // 1

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(spotActions.getSingleSpotDB(spotId))
  }, [dispatch]);

  const singleSpot = useSelector((store) => store.spots.singleSpot)
  // console.log('singleSpot in GetSingleSpot component', singleSpot)

  // console.log("image url",singleSpot?.SpotImages.filter((image) => image.preview === true)[0].url )
  if (!singleSpot) return null;

  return (
    <>
      <div>{singleSpot.name}</div>
      <div>{singleSpot.city}, {singleSpot.state}, {singleSpot.country}</div>
      <div className='spot-images'>
        <img className='big-preview-image'
          src={singleSpot.SpotImages.filter((image) => image.preview === true)[0].url}
          alt="spot preview"></img>
        {
          singleSpot.SpotImages.filter((image) => image.preview === false).map(image => {
            // console.log('image"s url', image.url)
            return <img className='other-spot-images' src={image.url} alt="spot"></img>
          })
        }
      </div>
      <div className="owner-description-price-reserve">
        <div className='owner-description'>
          <div className='owner'>Hosted by {singleSpot.Owner.firstName} {singleSpot.Owner.lastName}</div>
          <div className='description'>description blank in db{singleSpot.description}</div>
        </div>
        <div className='price-rating-review-reserve'>
          <div className='price-rating-review'>
            <div className='price'>${singleSpot.price} night</div>
            <div className='rating-review'>
              <i class="fa-solid fa-star"></i>
              {Number(singleSpot.avgStarRating).toFixed(2)} -
              {singleSpot.numReviews} reviews
            </div>
          </div>
          <button>Reserve</button>
        </div>
      </div>
    </>
  )
}

export default GetSingleSpot;
