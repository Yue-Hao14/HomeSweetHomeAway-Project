import { csrfFetch } from "./csrf";
import { getSingleSpotDB } from "./spots";

//------------------------------------------------------------------
// action types
const GET_SPOT_REVIEWS = 'reviews/getReviews'

// normal action creators
const getSpotReviews = (spotReviews) => {
  return {
    type: GET_SPOT_REVIEWS,
    spotReviews
  }
}


//------------------------------------------------------------------
// thunk action creators
// get reviews based on spotId from DB
export const getSpotReviewsDB = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}/reviews`);
  const spotReviews = await response.json();

  return dispatch(getSpotReviews(spotReviews));
}


// post a review based on spotId to DB
export const postSpotReviewDB = (spotId, reviewInfo) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reviewInfo)
  })

  dispatch(getSpotReviewsDB(spotId))
  dispatch(getSingleSpotDB(spotId))
  return;
}


//------------------------------------------------------------------
// reducers
const initialState = {};
const reviewReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_SPOT_REVIEWS:
      newState = {...state};
      const spot = {};
      action.spotReviews.Reviews.forEach(review => {
        spot[review.id] = review;
      });
      newState.spot = spot;
      return newState;
    default:
      return state;
  }
}

export default reviewReducer;
