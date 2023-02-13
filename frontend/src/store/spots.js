
// action type
const GET_SPOTS = 'spots/getSpots';


// normal action creators
const getSpots = (spots) => {
  return {
    type: GET_SPOTS,
    spots
  }
}


// thunk acrion creators
// get all spots thunk
export const getAllSpotsDB = () => async(dispatch) => {
  const response = await fetch('/api/spots');
  const spots = await response.json();
  console.log('spots in thunk from db', spots)
  dispatch(getSpots(spots));
  return;
}



// reducers
const initialState = {};
const spotReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case GET_SPOTS:
    newState = {...state};
    const allSpots = {};
    action.spots.Spots.forEach(element => {
      allSpots[element.id] = element;
    });
    console.log('allSpots in reducer', allSpots)
    newState.allSpots = allSpots
    return newState;
    default:
      return state;
  }
}

export default spotReducer;
