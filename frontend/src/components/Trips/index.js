import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as bookingActions from "../../store/bookings";
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import './UserTrips.css'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import CancelReservationModal from './CancelTripModal';
import PostReviewModal from '../GetSingleSpot/PostReviewModal';


function GetTrips() {
  const dispatch = useDispatch();
  const history = useHistory();
  const trips = useSelector(state => state.bookings.userBookings)
  const [showMenu, setShowMenu] = useState(false);
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [pastTrips, setPastTrips] = useState([])

  useEffect(() => {
    dispatch(bookingActions.getUserBookingsDB())
  }, [dispatch])

  useEffect(() => {
    if (trips) {
      let futureTrips = [], oldTrips = [];
      Object.values(trips).forEach(trip => {
        if (Date.parse(trip.startDate) <= new Date()) oldTrips.push(trip)
        if (Date.parse(trip.startDate) > new Date()) futureTrips.push(trip)
      })
      setUpcomingTrips(futureTrips);
      setPastTrips(oldTrips);
    }
  }, [trips])

  const handleChangeReservation = (e) => {
    e.preventDefault();
    const spotId = trips[e.target.value].spotId
    history.push(`/trips/${e.target.value}/${spotId}/edit`)
  }

  const closeMenu = () => setShowMenu(false);

  const handleDeleteReservation = (e) => {
    e.preventDefault();
  }

  return (
    <>
      <h1>My Trips</h1>
      <h2 className='trip-sub-header'>Upcoming trips</h2>
      {upcomingTrips && upcomingTrips.map(trip => (
        <div className='trip-container'>
          <div className='trip-left-container'>
            <div className='trip-spot-name'>{trip.Spot.name}</div>
            <div className='trip-date'>Date: {trip.startDate.slice(0, 10)} to {trip.endDate.slice(0, 10)}</div>
            <div className='trip-address'>Address: {trip.Spot.address} {trip.Spot.city} , {trip.Spot.state}</div>
            <button className="change-reservation activated" value={trip.id} onClick={handleChangeReservation}>Change Reservation</button>
            <button className="cancel-reservation activated">
              <OpenModalMenuItem
                itemText="Cancel Reservation"
                onItemClick={closeMenu}
                modalComponent={<CancelReservationModal bookingId={trip.id} />}
              />
            </button>
          </div>
          <div className='trip-right-container'>
            <img src={trip.Spot.previewImage} alt="spot" />
          </div>
        </div>
      ))}
      <h2 className='trip-sub-header'>Past trips</h2>
      {pastTrips &&
        pastTrips.map(trip => (
          <div className='trip-container'>
            <div className='trip-left-container'>
              <div className='trip-spot-name'>{trip.Spot.name}</div>
              <div className='trip-date'>Date: {trip.startDate.slice(0, 10)} to {trip.endDate.slice(0, 10)}</div>
              <div className='trip-address'>Address: {trip.Spot.address} {trip.Spot.city} , {trip.Spot.state}</div>
              <button className='activated' id='trip-post-review'>
                <OpenModalMenuItem
                  itemText="Post Your Review"
                  modalComponent={<PostReviewModal spotId={trip.spotId} />}
                />
              </button>
            </div>
            <div className='trip-right-container'>
              <img src={trip.Spot.previewImage} alt="spot" />
            </div>
          </div>
        ))
      }
    </>

  )
}

export default GetTrips;
