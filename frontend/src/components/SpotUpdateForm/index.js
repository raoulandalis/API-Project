import React from "react"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { updateSpotThunk } from "../../store/spot"
import "../SpotForm/SpotForm.css"


const SpotUpdateForm = () => {
    const currentUser = useSelector((state) => state.session.user)
    const history = useHistory()
    const dispatch = useDispatch()
    const { spotId } = useParams()

    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [lat, setLat] = useState(1)
    const [lng, setLng] = useState(1)
    // const [image, setImage] = useState('')
    // const [img2, setImg2] = useState('')
    // const [img3, setImg3] = useState('')
    // const [img4, setImg4] = useState('')
    // const [img5, setImg5] = useState('')
    const [validationErrors, setValidationErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)

    if (!currentUser) {
        history.push("/")
    }

    useEffect(() => {
        const errors = {}
        if (!country) errors.country = "Country is required"
        if (country.length < 5 || country.length > 50) errors.country = "Please enter a valid country"

        if (!address) errors.address = "Address is required"
        if (address.length < 10 || address.length > 250) errors.address = "Please enter a valid address"

        if (!city) errors.city = "City is required"
        if (city.length < 5 || city.length > 50) errors.city = "Please enter a valid city"

        if (!state) errors.state = "State is required"
        if (state.length < 5 || state.length > 50) errors.state = "Please enter a valid state"

        if (!description) errors.description = "Description is required"
        if (description.length < 30) errors.description = "Description needs a minimum of 30 characters"

        if (!name) errors.name = "Name is required"
        if (name.length < 5 || name.length > 50) errors.name = "Please enter a valid name"

        if (!price) errors.price = "Price is required"

        // if (!image) errors.image = "Preview image is required"

        setValidationErrors(errors)
    }, [country, address, city, state, description, name, price])

    const onSubmit = async (e) => {
        e.preventDefault()

        setSubmitted(true)

        if (!Object.values(validationErrors).length) {
            const payload = {
                address,
                city,
                state,
                country,
                name,
                description,
                price,
                lat,
                lng
            }

            // console.log(payload)

            const updatedSpot = await dispatch(updateSpotThunk(payload, spotId))

            history.push(`/spots/${updatedSpot.id}`)
        }
    }

    return (
        <>
            <div className="form-container">
                <div className="top-info">
                    <h2>Update your Spot</h2>
                    <h3>Where's your place located?</h3>
                    <p>Guests will only get your exact address once they booked a reservation.</p>
                </div>
                <form className="spot-form" onSubmit={onSubmit}>
                    <label>
                        Country
                        <input
                            id="form-country"
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </label>
                    {validationErrors.country && submitted && <p className="errors">{validationErrors.country}</p>}
                    <label>
                        Street Address
                        <input
                            id="form-address"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </label>
                    {validationErrors.address && submitted && <p className="errors">{validationErrors.address}</p>}
                    <label>
                        City
                        <input
                            id="form-city"
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </label>
                    {validationErrors.city && submitted && <p className="errors">{validationErrors.city}</p>}
                    <label>
                        State
                        <input
                            id="form-state"
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                    </label>
                    {validationErrors.state && submitted && <p className="errors">{validationErrors.state}</p>}
                    <div className="form-words">
                        <h3>Describe your place to guests</h3>
                        <p>Mention the best features of your space, any special amentities like
                            fast wif or parking, and what you love about the neighborhood.
                        </p>
                    </div>
                    <label>
                        <textarea
                            rows="5"
                            cols="50"
                            id="form-description"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                    {validationErrors.description && submitted && <p className="errors">{validationErrors.description}</p>}
                    <div className="form-words">
                        <h3>Create a title for your spot</h3>
                        <p>Catch guests' attention with a spot title that highlights what makes your place special.
                        </p>
                    </div>
                    <label>
                        <input
                            id="form-name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    {validationErrors.name && submitted && <p className="errors">{validationErrors.name}</p>}
                    <div className="form-words">
                        <h3>Set a base price for your spot</h3>
                        <p>Competitive pricing can help your listing stand out and rank higher in search results.
                        </p>
                    </div>
                    <label>
                        $<input
                            id="form-price"
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </label>
                    {validationErrors.price && submitted && <p className="errors">{validationErrors.price}</p>}
                    {/* <div className="form-words">
                    <h3>Liven up your spot with photos</h3>
                        <p>Submit a link to at least one photo to publish your spot
                        </p>
                    </div>
                    <label className="img-link-box">
                        <input
                            className="form-pic"
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                        {validationErrors.images && submitted && <p className="errors">{validationErrors.images}</p>}
                        <input
                            className="form-pic"
                            type="text"
                            value={img2}
                            onChange={(e) => setImg2(e.target.value)}
                        />
                        <input
                            className="form-pic"
                            type="text"
                            value={img3}
                            onChange={(e) => setImg3(e.target.value)}
                        />
                        <input
                            className="form-pic"
                            type="text"
                            value={img4}
                            onChange={(e) => setImg4(e.target.value)}
                        />
                        <input
                            className="form-pic"
                            type="text"
                            value={img5}
                            onChange={(e) => setImg5(e.target.value)}
                        />
                    </label> */}

                    <button type="submit">Create a Spot</button>
                </form>
            </div>
        </>
    )
}

export default SpotUpdateForm
