import { useDispatch, useSelector } from "react-redux"
import { getSpotThunk } from "../../store/spot"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getAllSpotsThunk } from "../../store/spot"
import SpotIdReview from "./SpotIdReview"
import Radiant from "../../assets/radiant-new-removebg-preview.png"
import "./SpotId.css"
import "./SpotIdReview.css"


const SpotId = () => {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const oneSpot = useSelector((state) => state.spots.singleSpot)
    // console.log("hello", oneSpot)
    // console.log("LOOK AT ONE SPOT", oneSpot)
    // console.log("LOOK", oneSpot.SpotImages[4].url)

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getSpotThunk(spotId))
        dispatch(getAllSpotsThunk()).then(() => setIsLoaded(true))

        const interval = setInterval(() => {

        }, 3000)

        return () => {
            clearInterval(interval)
        }

    }, [dispatch])

    const handleReserve = () => {
        alert("Feature Coming Soon")
    }

    // let previewImg;

    // if(oneSpot.SpotImages.length) {
    // previewImg = oneSpot.SpotImages.find(img => img.preview === true)
    // }

    // const previewImg = oneSpot?.SpotImages?.find(img => img.preview === true)

    // console.log('-------->', previewImg.url)

    // console.log('------->', oneSpot.SpotImages[0])

    if (!oneSpot.SpotImages) return null

    return isLoaded && (
        <>
            <div className="spotId-container">
                <div className="title-info">
                    <h2 className="spotId-name">{oneSpot.name}</h2>
                    <p className="spotId-location">{oneSpot.city}, {oneSpot.state}, {oneSpot.country}</p>
                </div>
                <div className="image-container">

                    <img id="spotId-main-image" src={oneSpot?.SpotImages?.find(img => img.preview === true)?.url} alt="image-screen" />

                    <div className="image-grid">
                        {oneSpot.SpotImages[0] && (
                            <img className="more-image" id="top-left" src={oneSpot.SpotImages[0].url} />
                        )}
                        {oneSpot.SpotImages[1] && (
                            <img className="more-image" id="top-right" src={oneSpot.SpotImages[1].url} />
                        )}
                        {oneSpot.SpotImages[2] && (
                            <img className="more-image" id="bottom-left" src={oneSpot.SpotImages[2].url} />
                        )}
                        {oneSpot.SpotImages[3] && (
                            <img className="more-image" id="bottom-right" src={oneSpot.SpotImages[3].url} />
                        )}
                    </div>
                </div>
            </div>
            <div className="description-container">
                <div className="left-description">
                    Hosted by {oneSpot?.Owner?.firstName} {oneSpot?.Owner?.lastName}
                    <p>{oneSpot.description}</p>
                </div>
                <div className="right-description">
                    <div className="price-star">
                        <div><b>${oneSpot.price}</b> night</div>
                        {oneSpot.avgStarRating && (
                            <>
                                <div className="inside-price-star">
                                    <div><img id="radiant-spot" src={Radiant} /></div>
                                    <div>
                                        <div>{oneSpot.avgStarRating?.toFixed(1)}</div>
                                    </div>
                                    <div id="num-reviews">{oneSpot.numReviews} reviews</div>
                                </div>
                            </>
                        )}
                    </div>
                    <button onClick={handleReserve} id="reserve-button">Reserve</button>
                </div>
            </div>
            <div className="reviews-container">
                <div className="top-reviews">
                    <div><img id="radiant-spot" src={Radiant} /></div>
                    <div>{oneSpot.avgStarRating?.toFixed(1)} · {oneSpot.numReviews} reviews</div>
                </div>
                <SpotIdReview spotId={spotId} />
            </div>
        </>
    )

}

export default SpotId
