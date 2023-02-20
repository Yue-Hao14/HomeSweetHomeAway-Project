import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as spotActions from "../../store/spots";
import { useEffect, useState } from 'react';
import './ManageSpots.css';
import { useHistory } from 'react-router-dom';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteSpotModal from './DeleteSpotModal';

function ManageSpots() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    dispatch(spotActions.getCurrentUserSpotsDB())
  }, [dispatch]);

  const spots = useSelector((store) => store.spots.allSpots)

  const updateSpot = (e) => {
    e.preventDefault();
    const spotId = e.target.value
    history.push(`/spots/${spotId}/edit`)
  }

  const closeMenu = () => setShowMenu(false);

  const routeChange = () => {
    history.push('/spots/new')
  }

  return (
    <>
      <div className='title-container'>
        <h1>Manage Your Spots</h1>
        <button onClick={routeChange} className="deactivated" id="create-spot">Create a New Spot</button>
      </div>
      <div className='all-spots'>
        {spots && Object.values(spots).map((spot) => {
          return (
            <div className='spot-card'>
              {/* <a className='clickable-card' href={`/spots/${spot.id}`}> */}
                <img className="spot-preview" src={spot.previewImage} alt="spot preview"></img>
                <div className='spot-name'>{spot.name}</div>
                <div className="city-state-rating">
                  <div>{spot.city}, {spot.state}</div>
                  <div className='star-rating'>
                    <i class="fa-solid fa-star"></i>
                    <div>{spot.avgRating ? Number(spot.avgRating).toFixed(2) : "New"}</div>
                  </div>
                </div>
                <div className='price-update-delete'>
                  <div><span className='price'>${spot.price}</span> night</div>
                  <div className='update-delete'>
                    <button className='deactivated' id="update-spot" onClick={updateSpot} value={spot.id}>Update</button>
                    <button className='deactivated' id="delete-spot" value={spot.id}>
                      <OpenModalMenuItem
                        itemText="Delete"
                        modalComponent={<DeleteSpotModal spotId={spot.id} />}
                      />
                    </button>
                  </div>
                </div>
              {/* </a> */}
            </div>
          )
        })
        }
      </div>
    </>
  )
}

export default ManageSpots;
