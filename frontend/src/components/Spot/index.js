import { useDispatch, useSelector } from "react-redux"
import { getAllSpotsThunk } from "../../store/spot"
import { NavLink } from "react-router-dom"
import { useEffect } from "react"
import "./Spot.css"

const Spots = () => {
    const dispatch = useDispatch()
    const spots = useSelector((state) => state.spots)
    const allSpots = Object.values(spots.allSpots)

    useEffect(() => {
        dispatch(getAllSpotsThunk())
    }, [dispatch])

    return (
        <>
            <div className="spots-container">

                {allSpots.map(spot => (
                    <NavLink to={`/spots/${spot.id}`}>
                        <div className="ind-spot">
                            <img id="spot-img" src={`${spot.previewImage}`} alt="img" />
                            <div className="under-img">
                                <div className="city">{spot.city}, {spot.state}</div>
                                <div className="review"><b>🌟 {spot.avgRating}</b></div>
                            </div>
                            {/* <div className="country">{spot.country}</div> */}
                            <div className="price"><b>${spot.price}</b> night</div>
                        </div>
                    </NavLink>
                ))}

            </div>
        </>
    )
}

export default Spots
