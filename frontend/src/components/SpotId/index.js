import { useDispatch, useSelector } from "react-redux"
import { getSpotThunk } from "../../store/spot"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getAllSpotsThunk } from "../../store/spot"
import "./SpotId.css"


const SpotId = () => {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const oneSpot = useSelector((state) => state.spots.singleSpot)
    console.log("LOOK AT ONE SPOT", oneSpot)
    // console.log("LOOK", oneSpot.SpotImages[4].url)

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getSpotThunk(spotId))
        dispatch(getAllSpotsThunk()).then(() => setIsLoaded(true))
    }, [dispatch])

    const handleReserve = () => {
        alert("Feature Coming Soon")
    }

    // const findPreview = () => {
    //     const preview = oneSpot.SpotImages.find((preview) => preview.preview === true)
    //     return preview.url
    // }

    // console.log(findPreview())

    if (!oneSpot) return null

    return isLoaded && (
        <>
            <div className="spotId-container">
                <div className="title-info">
                    <b className="spotId-name">{oneSpot.name}</b>
                    <p className="spotId-location">{oneSpot.city}, {oneSpot.state}, {oneSpot.country}</p>
                </div>
                <div className="image-container">
                    <img id="spotId-main-image" src={oneSpot.SpotImages[4].url} alt="image-screen" />
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
                    Hosted by {oneSpot.Owner.firstName} {oneSpot.Owner.lastName}
                    <p>{oneSpot.description}</p>
                </div>
                <div className="right-description">
                    <div className="price-star">
                        <div><b>${oneSpot.price}</b> night</div>
                        {oneSpot.avgStarRating && (
                            <div>★ {oneSpot.avgStarRating}</div>
                        )}
                    </div>
                    <button onClick={handleReserve} id="reserve-button">Reserve</button>
                </div>
            </div>
        </>
    )

}

export default SpotId
