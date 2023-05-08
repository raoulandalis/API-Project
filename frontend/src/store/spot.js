import { csrfFetch } from './csrf'

// TYPES
const GET_ALL_SPOTS = 'spot/getAllSpots'
const GET_SPOT = 'spot/getSpot'

// ACTIONS
const getAllSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        spots
    }
}

const getSpot = (spot) => {
    return {
        type: GET_SPOT,
        spot
    }
}

// ACTION THUNKS
export const getAllSpotsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');

    if (response.ok) {
        let spots = await response.json()
        spots = spots.Spots
        dispatch(getAllSpots(spots))
        return spots
    }
}

export const getSpotThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`)

    if (response.ok) {
        const spot = await response.json()
        dispatch(getSpot(spot))
        return spot
    }
}

// INITIAL STATE
const initialState = { allSpots: {}, singleSpot: { SpotImages: [] } }

// REDUCER
const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SPOTS: {
            let allSpots = {}
            action.spots.forEach(spot => allSpots[spot.id] = spot)
            return { allSpots: { ...allSpots }, singleSpot: { ...state.singleSpot } }
        };
        case GET_SPOT: {
            let newState = {...state, singleSpot: {...state.singleSpot}} //creates copy of state and the key we're going to change
            let oneSpot = {...action.spot, SpotImages: [state.singleSpot.SpotImages]} //spreads fetched spot data, and copies spot images (currently empty)
            action.spot.SpotImages.forEach((image, i) => { //iterates through fetched spot data and keys into images, iterates and assigns each image to empty spot images array
                oneSpot.SpotImages[i] = image;
            })
            newState.singleSpot = oneSpot; //reassigns spot/spot images into single spot in new copy
            return newState
        };
        default: return state;
    }
}

export default spotReducer
