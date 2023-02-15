import { csrfFetch } from "./csrf";

// action type
const GET_SPOTS = 'spots/getSpots';
const GET_SINGLE_SPOT = 'spots/getSingleSpot'
// const GET_CURRENT_USER_SPOTS = 'spots/getCurrentUserSpots'

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

// const getCurrentUserSpots = (spots) => {
//   return {
//     type: GET_CURRENT_USER_SPOTS,
//     spots
//   }
// }


// thunk action creators
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
  dispatch(getSingleSpot(singleSpot));
}

// get all spots owned by the current user
export const getCurrentUserSpotsDB = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots/current');
  const spots = await response.json();
    console.log('spot in thunk from db', spots)
  dispatch(getSpots(spots));
}


// create a spot thunk
export const createSpotDB = (spotInfo, imageInfo) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(spotInfo)
  })
  const newSpot = await response.json();

  console.log('newSpot in thunk from db', newSpot)
  const spotId = newSpot.id

  // initiate createSpotImageDB thunk to
  // add spot images to DB and redux store
  dispatch(createSpotImageDB(spotId, imageInfo))
  return spotId;
}


// add spot image thunk
export const createSpotImageDB = (spotId, imageInfo) => async (dispatch) => {
  // put all image urls into an array
  const imageArr = Object.values(imageInfo);
  // remove/take out first image url which is the previewImage url
  const previewImageUrl = imageArr.shift()
  const previewImageObj = {
    url:previewImageUrl,
    preview: true
  }
  // add preview image to db
  await csrfFetch(`/api/spots/${spotId}/images`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(previewImageObj)
  })

  //take care of the rest of spot images
  imageArr.forEach(async (url) => {
    if (url.length > 0) {
      await csrfFetch(`/api/spots/${spotId}/images`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          url,
          preview: false
        })
      })
    }
  })
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
      console.log('allSpots in reducer', allSpots)
      newState.allSpots = allSpots
      return newState;
    case GET_SINGLE_SPOT:
      newState = { ...state };
      newState.singleSpot = action.singleSpot;
      // console.log('singleSpot newState in reducer', newState)
      return newState;
    default:
      return state;
  }
}

export default spotReducer;
