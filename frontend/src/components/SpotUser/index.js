import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './SpotUser.css';
import { useHistory } from 'react-router';
import SpotId from '../SpotId';
import { getAllSpotsThunk } from '../../store/spot';
import { NavLink } from 'react-router-dom';


const SpotUser = () => {

    const user = useSelector((state) => state.session.user)
    const spots = useSelector((state) => state.spots)
    const allSpots = Object.values(spots.allSpots)
    console.log("these are all spots", allSpots)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllSpotsThunk())
    }, [dispatch])

    if (!allSpots) return null

    const spotsUser = allSpots.filter(spot => {
        return spot.ownerId === user.id
    })

    console.log("we own these spots", spotsUser)

    return (
        <>
            <div className="manage">
                <h2>Manage Your Spots</h2>
                <div id="new-spot-manage">
                    <NavLink style={{ textDecoration: "none" }} to="/spots/new">
                        Create a New Spot
                    </NavLink>
                </div>
            </div>
            <div className="manage-spots-grid">
                {spotsUser.map(spot => (
                    <div className="spot-card">
                        <img id="spot-card-img" src={`${spot.previewImage}`} alt="img" />
                        <div className="manage-review"><b>★ {spot.avgRating}</b></div>
                        <div className="manage-city">{spot.city}, {spot.state}</div>
                        <div className="manage-country">{spot.country}</div>
                        <div className="manage-price"><b>${spot.price}</b> night</div>
                        <div className="update-delete-button">
                            <NavLink style={{ textDecoration: "none" }} to={`/spots/${spot.id}/edit`} id="update-button">Update</NavLink>
                            <NavLink style={{ textDecoration: "none" }} to="" id="delete-button">Delete</NavLink>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default SpotUser
