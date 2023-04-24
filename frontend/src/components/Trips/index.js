import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as bookingActions from "../../store/bookings";
import { useEffect } from 'react';
import './UserTrips.css'

function GetTrips() {
  const dispatch = useDispatch();
  const trips = useSelector(state => state.bookings.userBookings)

  useEffect(() => {
    dispatch(bookingActions.getUserBookingsDB())
  }, [dispatch])

  console.log(trips)

  return (
    <>
      <h1>Show my trips here</h1>
      {trips &&Object.values(trips).map(trip => (
        <div className='trip-container'>
          <div className='trip-left-container'>
            <div className='trip-spot-name'>{trip.Spot.name}</div>
            <div className='trip-date'>{trip.startDate.slice(0, 10)} - {trip.endDate.slice(0, 10)}</div>
            <button>Change Reservation</button>
            <button>Cancel Reservation</button>
          </div>
          <div className='trip-right-container'>
            <img src={trip.Spot.previewImage} alt="spot" />
          </div>
        </div>
      ))}
    </>

  )
}

export default GetTrips;
