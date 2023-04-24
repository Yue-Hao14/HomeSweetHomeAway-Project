import { csrfFetch } from "./csrf";

// action type
const GET_USER_BOOKINGS = 'bookings/getUserBookings';

// action creators
const getUserBookings = (bookings) => {
  return {
    type: GET_USER_BOOKINGS,
    bookings
  }
}

//------------------------------------------------------------------
// thunks
// get all of current user's bookings
export const getUserBookingsDB = () => async (dispatch) => {
  const reponse = await csrfFetch('/api/bookings/current')
  const bookings = await reponse.json();
  console.log("bookings in thunk", bookings)
  dispatch(getUserBookings(bookings))
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
    default:
      return state;
  }
}

export default bookingReducer
