import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { useModal } from "../../context/Modal"
import { deleteReviewThunk } from "../../store/review"
import { getReviewsThunk } from "../../store/review"
import { getSpotThunk } from "../../store/spot"

const DeleteReviewModal = ({ spotId, reviewId }) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const {closeModal} = useModal()
    // console.log('this is spot and review', spotId, reviewId)

    const deleteYes = () => {
        dispatch(deleteReviewThunk(reviewId, spotId))
        // dispatch(getSpotThunk(spotId))
        history.push(`/spots/${spotId}`)
        closeModal()
    }

    const deleteNo = () => {
        closeModal()
    }

    return (
        <>
            <div className="delete-review-modal">
                <h3>Confirm Delete</h3>
                <p>Are you sure you want to delete this review?</p>
                <div class="delete-yes-no-buttons">
                    <button id="delete-yes" onClick={deleteYes}>Yes (Delete Review)</button>
                    <button id="delete-no" onClick={deleteNo}>No (Keep Review)</button>
                </div>
            </div>
        </>
    )
}

export default DeleteReviewModal
