import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as spotActions from "../../store/spots";
import { useEffect } from 'react';
import './index.css';

function GetAllSpots() {
  const dispatch = useDispatch();

  useEffect(() => { dispatch(spotActions.getAllSpotsDB()) }, [dispatch]);
  const spots = useSelector((store) => store.spots.allSpots)
  console.log('spots in GetAllSpots component', spots)

  return (
    <>
      <div className='all-spots'>
        {spots && Object.values(spots).map((spot) => {
          return (
            <div className='spot-card'>
                <a className='clickable-card' href={`/spots/${spot.id}`}>
                <img className="spot-preview" src={spot.previewImage} alt="spot preview"></img>
                <div className="city-state-rating">
                  <div>{spot.city}, {spot.state}</div>
                  <div className='rating'>
                    <i class="fa-solid fa-star"></i>
                    <div>{spot.avgRating ? Number(spot.avgRating).toFixed(2) : "New"}</div>
                  </div>
                </div>
                <div>
                  <span className='price'>${spot.price}</span> night</div>
            </a>
              </div>
          )
        })
        }
      </div>
    </>
  )


}



export default GetAllSpots;
