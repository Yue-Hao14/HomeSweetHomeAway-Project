
// action type
const GET_SPOTS = 'spots/getSpots';
const GET_SINGLE_SPOT = 'spots/getSingleSpot'

// normal action creators
const getSpots = (spots) => {
  return {
    type: GET_SPOTS,
    spots
  }
}

const getSingleSpot = (singleSpot) => {
  return {
    type: GET_SINGLE_SPOT,
    singleSpot
  }
}


// thunk acrion creators
// get all spots thunk
export const getAllSpotsDB = () => async (dispatch) => {
  const response = await fetch('/api/spots');
  const spots = await response.json();
  // console.log('spots in thunk from db', spots)
  dispatch(getSpots(spots));
  return;
}

// get a single spot thunk
export const getSingleSpotDB = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}`);
  const singleSpot = await response.json();
  // console.log('spot in thunk from db', singleSpot)
  dispatch(getSingleSpot(singleSpot))
}



// reducers
const initialState = {};
const spotReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_SPOTS:
      newState = { ...state };
      const allSpots = {};
      action.spots.Spots.forEach(element => {
        allSpots[element.id] = element;
      });
      // console.log('allSpots in reducer', allSpots)
      newState.allSpots = allSpots
      return newState;
    case GET_SINGLE_SPOT:
      newState = { ...state};
      newState.singleSpot = action.singleSpot;
      // console.log('singleSpot newState in reducer', newState)
      return newState;
    default:
      return state;
  }
}

export default spotReducer;
