import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './SpotUser.css';
import { getAllSpotsThunk } from '../../store/spot';
import { NavLink, useHistory } from 'react-router-dom';
import DeleteModal from '../DeleteModal';
import OpenModalButton from '../OpenModalButton';
import Radiant from "../../assets/radiant-new-removebg-preview.png"


const SpotUser = () => {

    const user = useSelector((state) => state.session.user)
    const spots = useSelector((state) => state.spots.allSpots)
    const allSpots = Object.values(spots)
    const history = useHistory()
    console.log("these are all spots", allSpots)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllSpotsThunk())
    }, [dispatch])

    const spotsUser = allSpots.filter(spot => {
        return spot.ownerId === user.id
    })

    // if(!allSpots) return null
    if(!user) {
        history.push("/")
        return null
    }

    return (
        <>
            <div className="manage">
                <h2>Manage Your Spots</h2>
                <div id="new-spot-manage">
                    <NavLink id ="manage-spot-button" style={{ textDecoration: "none" }} to="/spots/new">
                        Create a New Spot
                    </NavLink>
                </div>
            </div>
            <div className="manage-spots-grid">
                {spotsUser.map(spot => (
                    <div className="spot-card">
                        <img id="spot-card-img" src={`${spot.previewImage}`} alt="img" />
                        <div className="manage-review">
                            <img id="radiant-spot" src={Radiant}/>
                            <b>{spot.avgRating.toFixed(1)}</b>
                        </div>
                        <div className="manage-city">{spot.city}, {spot.state}</div>
                        <div className="manage-country">{spot.country}</div>
                        <div className="manage-price"><b>${spot.price}</b> night</div>
                        <div className="update-delete-button">
                            <NavLink style={{ textDecoration: "none" }} to={`/spots/${spot.id}/edit`} id="update-button">Update</NavLink>
                            {/* <NavLink style={{ textDecoration: "none" }} to="" id="delete-button">Delete</NavLink> */}
                            <OpenModalButton
                                buttonText='Delete'
                                modalComponent={
                                    <DeleteModal spotId={spot.id}/>
                                }
                            />
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default SpotUser
