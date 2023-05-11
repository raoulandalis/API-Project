import {useDispatch, useSelector} from "react-redux"
import { useState, useEffect } from "react"
import { getReviewsThunk } from "../../store/review"
import { getSpotThunk } from "../../store/spot"
import './SpotIdReview.css'

const SpotIdReview = ({spotId}) => {
    console.log(spotId)
    const review = useSelector((state) => state.reviews)
    const reviewArr = Object.values(review.spot)
    // console.log('this is a review', reviewArr)
    const user = useSelector((state) => state.session.user)
    const dispatch = useDispatch()
    const [month, setMonth] = useState('')

    const randomMonth = () => {
        const num = Math.floor(Math.random() * 12)

        let month;

        if (num === 0) {
            month = "January"
        } else if (num === 1) {
            month = "February"
        }
        else if (num === 2) {
            month = "March"
        }
        else if (num === 3) {
            month = "April"
        }
        else if (num === 4) {
            month = "May"
        }
        else if (num === 5) {
            month = "June"
        }
        else if (num === 6) {
            month = "July"
        }
        else if (num === 7) {
            month = "August"
        }
        else if (num === 8) {
            month = "September"
        }
        else if (num === 9) {
            month = "October"
        }
        else if (num === 10) {
            month = "November"
        } else {
            month = "December"
        }
        setMonth(month)
    }

    useEffect(() => {
        dispatch(getReviewsThunk(spotId))
        randomMonth()
    }, [dispatch])

    return (
        <>
        <div className="all-reviews-grid">
            {reviewArr.map((review) => (
                <>
                <h3 className="review-name">{review.User.firstName}</h3>
                <h5>{month} 2022</h5>
                <h4>{review.review}</h4>
                </>
            ))}
        </div>
        </>
    )
}

export default SpotIdReview
