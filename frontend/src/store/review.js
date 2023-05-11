import { csrfFetch } from "./csrf"

// TYPES
const GET_REVIEW = "review/getReview"

// ACTIONS
const getReviews = (reviews) => {
    return {
        type: GET_REVIEW,
        reviews
    }
}

// ACTION THUNK
export const getReviewsThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if (response.ok) {
        const reviews = await response.json()
        dispatch(getReviews(reviews))
        return reviews
    }
}

// INITIAL STATE
const initialState = { spot: {}, user: {} }

// REDUCER
const reviewReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_REVIEW: {
            const newState = {...state, spot: {}, user: {}}
            const reviews = action.reviews.Reviews
            reviews.forEach(review => newState.spot[review.id] = review)
            return newState
        }
        default: return state
    }
}

export default reviewReducer
