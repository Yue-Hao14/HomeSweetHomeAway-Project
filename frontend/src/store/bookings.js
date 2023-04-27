import { csrfFetch } from "./csrf";

// action type
const GET_USER_BOOKINGS = 'bookings/getUserBookings';
const GET_SPOT_BOOKINGS = 'bookings/getSpotBookings';

// action creators
const getUserBookings = (bookings) => {
  return {
    type: GET_USER_BOOKINGS,
    bookings
  }
}

const getSpotBookings = (bookings) => {
  return {
    type: GET_SPOT_BOOKINGS,
    bookings
  }
}

//------------------------------------------------------------------
// thunks
// get all of current user's bookings
export const getUserBookingsDB = () => async (dispatch) => {
  const reponse = await csrfFetch('/api/bookings/current')
  const bookings = await reponse.json();
  // console.log("bookings in thunk", bookings)
  dispatch(getUserBookings(bookings))
  return
}

// get current spot's bookings
export const getSpotBookingsDB = (spotId) => async (dispatch) => {
  const reponse = await csrfFetch(`/api/spots/${spotId}/bookings`)
  const bookings = await reponse.json();
  // console.log("spotBookings in thunk", bookings)
  dispatch(getSpotBookings(bookings))
  return
}



//------------------------------------------------------------------
// reducer
const initialState = {};
const bookingReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_USER_BOOKINGS:
      newState = { ...state };
      const userBookings = {};
      action.bookings.Bookings.forEach(booking => {
        userBookings[booking.id] = booking;
      });
      newState.userBookings = userBookings;
      return newState;
    case GET_SPOT_BOOKINGS:
      newState = { ...state };
      const spotBookings = {};
      action.bookings.Bookings.forEach(booking => {
        spotBookings[booking.id] = booking;
      });
      newState.spotBookings = spotBookings;
      return newState;
    default:
      return state;
  }
}

export default bookingReducer
