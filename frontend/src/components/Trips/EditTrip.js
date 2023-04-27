import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getUserBookingsDB } from "../../store/bookings";
import { useParams } from 'react-router-dom';

function EditTrip() {
  const dispatch = useDispatch();
  const { bookingId } = useParams();
  const booking = useSelector(state => state.bookings.userBookings[bookingId])
  console.log(booking)

  // hydrate redux store
  useEffect(()=> {
    dispatch(getUserBookingsDB())
  },[dispatch])

  return (
    <>
    <h1>edit trip here</h1>

    </>
  )
}

export default EditTrip;
