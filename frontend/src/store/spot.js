import { csrfFetch } from './csrf'

// TYPES
const GET_ALL_SPOTS = 'spot/getAllSpots'

// ACTIONS
const getAllSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        spots
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
        default: return state;
    }
}

export default spotReducer
