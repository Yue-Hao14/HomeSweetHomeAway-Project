import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as bookingActions from "../../store/bookings";
import { useEffect } from 'react';

function GetTrips() {
  const dispatch = useDispatch();
  const trips = useSelector(state => state.bookings.userBookings)

  useEffect(() => {
    dispatch(bookingActions.getUserBookingsDB())
  },[dispatch])


  
  return (
    <h1>Show my trips here</h1>
  )
}

export default GetTrips;
