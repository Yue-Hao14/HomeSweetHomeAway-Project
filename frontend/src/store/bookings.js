import { csrfFetch } from "./csrf";

// action type
const GET_USER_BOOKINGS = 'bookings/getUserBookings';
const GET_SPOT_BOOKINGS = 'bookings/getSpotBookings';
const ADD_SPOT_BOOKING = 'bookings/addSpotBooking';
const UPDATE_SPOT_BOOKING = 'bookings/updateSpotBooking';

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

const addSpotBooking = (booking) => {
  return {
    type: ADD_SPOT_BOOKING,
    booking
  }
}

const updateSpotBooking = (booking) => {
  return {
    type: UPDATE_SPOT_BOOKING,
    booking
  }
}

//------------------------------------------------------------------
// thunks
// get all of current user's bookings
export const getUserBookingsDB = () => async (dispatch) => {
  const reponse = await csrfFetch('/api/bookings/current');
  const bookings = await reponse.json();
  // console.log("bookings in thunk", bookings)
  dispatch(getUserBookings(bookings));
  return;
}

// get current spot's bookings
export const getSpotBookingsDB = (spotId) => async (dispatch) => {
  const reponse = await csrfFetch(`/api/spots/${spotId}/bookings`);
  const bookings = await reponse.json();
  console.log("spotBookings in thunk", bookings)
  dispatch(getSpotBookings(bookings));
  return;
}

// add a new booking
export const addSpotBookingDB = (spotId, newBooking) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newBooking)
  });
  const booking = await response.json();
  // console.log("bookings in addSpotBookingDB", bookings)
  dispatch(addSpotBooking(booking));
  return;
}

// update an existing booking
export const updateSpotBookingDB = (bookingId, updatedBooking) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedBooking)
  });
  const booking = await response.json();
  dispatch(updateSpotBooking(booking));
  return;
}

// delete a booking
export const deleteSpotBookingDB = (bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "DELETE",
  });
  console.log(response)
  const message = await response.json();
  if (message.statusCode < 400) {
    dispatch(getUserBookingsDB());
    return message
  } else return message;
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
    case ADD_SPOT_BOOKING:
      newState = { ...state };
      newState.spotBookings[action.booking.id] = action.booking;
      return newState;
    case UPDATE_SPOT_BOOKING:
      newState = { ...state };
      newState.spotBookings[action.booking.id] = action.booking;
      return newState;
    default:
      return state;
  }
}

export default bookingReducer
