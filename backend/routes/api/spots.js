const express = require('express')
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');

const { Spot, SpotImage, User, Booking, Review, ReviewImage, sequelize } = require('../../db/models');
const { ResultWithContext } = require('express-validator/src/chain');

//GET ALL SPOTS OWNED BY CURRENT USER

router.get('/current', requireAuth, async (req, res, next) => {
    const spots = await Spot.findAll({
        where: {
            ownerId: req.user.id // instance of current user logged in
        },
        include: [{
            model: SpotImage
        },
        {
            model: Review
        }
        ]
    })

    const spotsArr = [];
    spots.forEach(spot => {
        let total = 0
        const spotJSON = spot.toJSON()

        spotJSON.Reviews.forEach(ele => {
            total += ele.stars
        })
        const avg = total / spotJSON.Reviews.length
        spotJSON.avgRating = avg

        spotJSON.SpotImages.forEach(ele => {
            if (ele.preview === true) {
                spotJSON.previewImage = ele.url
            } else {
                spotJSON.previewImage = 'No preview available'
            }
        })

        delete spotJSON.Reviews // deletes Reviews included
        delete spotJSON.SpotImages // deletes SpotImages included
        spotsArr.push(spotJSON)
    })

    return res.json({ Spots: spotsArr })
})

//GET DETAILS FOR A SPOT FROM AN ID
router.get('/:spotId', async (req, res, next) => {
    const spotId = await Spot.findByPk(req.params.spotId, {
        include: [
            {
                model: SpotImage,
                attributes: ['id', 'url', 'preview']
            },
            {
                model: User,
                as: 'Owner',
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Review
            }
        ]
    })

    if (!spotId) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    }

    const spotJSON = spotId.toJSON()

    const totalCount = await Review.count({ //numReviews
        where: {
            spotId: req.params.spotId
        }
    })

    const starCount = await Review.sum('stars', { //starSum
        where: {
            spotId: req.params.spotId
        }
    })

    spotJSON.numReviews = totalCount

    spotJSON.avgStarRating = starCount / totalCount

    delete spotJSON.Reviews

    return res.json(spotJSON)
})

//CREATE A SPOT

router.post('/', requireAuth, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    const error = {
        message: "Bad Request",
        errors: {}
    }

    if (!address) {
        error.errors.address = "Street address is required"
    }

    if (!city) {
        error.errors.city = "City is required"
    }

    if (!state) {
        error.errors.state = "State is required"
    }

    if (!country) {
        error.errors.country = "Country is required"
    }

    if (!lat) {
        error.errors.lat = "Latitude is not valid"
    }

    if (!lng) {
        error.errors.lng = "Longitude is not valid"
    }

    if (!name || name.length > 50) {
        error.errors.name = "Name must be less than 50 characters"
    }

    if (!description) {
        error.errors.description = "Description is required"
    }

    if (!price) {
        error.errors.price = "Price per day is required"
    }

    if (Object.keys(error.errors).length) {
        res.status(400)
        return res.json({
            message: error.message,
            errors: error.errors
        })
    }

    const newSpot = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    res.status(201)
    return res.json(newSpot)
})

//ADD AN IMAGE TO A SPOT BASED ON THE SPOT ID

router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const { url, preview } = req.body

    const user = req.user

    const spotId = await Spot.findByPk(req.params.spotId)

    if (!spotId || spotId.ownerId !== user.id) { // checks if the spotId instance ownderId matches with current user who's logged in
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    }

    const newImage = await SpotImage.create({
        url,
        preview
    })

    return res.json({
        id: newImage.id,
        url: newImage.url,
        preview: newImage.preview
    })
})

//EDIT A SPOT

router.put('/:spotId', requireAuth, async (req, res, next) => {

    const { address, city, state, country, lat, lng, name, description, price } = req.body

    const user = req.user

    const spotId = await Spot.findByPk(req.params.spotId)

    const error = {
        message: "Bad Request",
        errors: {}
    }

    if (!spotId || spotId.ownerId !== user.id) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    }

    if (!address) {
        error.errors.address = "Street address is required"
    }

    if (!city) {
        error.errors.city = "City is required"
    }

    if (!state) {
        error.errors.state = "State is required"
    }

    if (!country) {
        error.errors.country = "Country is required"
    }

    if (!lat) {
        error.errors.lat = "Latitude is not valid"
    }

    if (!lng) {
        error.errors.lng = "Longitude is not valid"
    }

    if (!name || name.length > 50) {
        error.errors.name = "Name must be less than 50 characters"
    }

    if (!description) {
        error.errors.description = "Description is required"
    }

    if (!price) {
        error.errors.price = "Price per day is required"
    }

    if (Object.keys(error.errors).length) {
        res.status(400)
        return res.json({
            message: error.message,
            errors: error.errors
        })
    }

    await spotId.update({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    // spotId.address = address
    // spotId.city = city
    // spotId.state = state
    // spotId.country = country
    // spotId.lat = lat
    // spotId.lng = lng
    // spotId.name = name
    // spotId.description = description
    // spotId.price = price

    await spotId.save()

    return res.json(spotId)

})

//DELETE A SPOT

router.delete('/:spotId', requireAuth, async (req, res, next) => {

    const user = req.user

    const spotId = await Spot.findByPk(req.params.spotId)

    if (!spotId || spotId.ownerId !== user.id) {
        res.status(404)
        res.json({
            message: "Spot couldn't be found"
        })
    }

    spotId.destroy()

    return res.json({
        message: "Successfully deleted"
    })
})

//GET ALL REVIEWS BY SPOT ID

router.get('/:spotId/reviews', async (req, res, next) => {

    const spotId = await Spot.findByPk(req.params.spotId)

    // SELECT * FROM Reviews WHERE spotId = :spotId
    const spotReview = await Review.findAll({
        where: {
            spotId: req.params.spotId,
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    })

    if (!spotId) {
        res.status(404)
        res.json({
            message: "Spot couldn't be found"
        })
    }

    return res.json({ Reviews: spotReview })
})

//CREATE A REVIEW FOR A SPOT BASED ON SPOT ID

router.post('/:spotId/reviews', requireAuth, async (req, res, next) => {

    const {review, stars} = req.body
    const user = req.user

    const spotId = await Spot.findByPk(req.params.spotId)

    const error = {
        message: "Bad Request",
        errors: {}
    }

    if (!review) {
        error.errors = "Review text is required"
    }

    if(!stars) {
        error.errors = "Stars must be an integer from 1 to 5"
    }

    if (Object.keys(error.errors).length) {
        res.status(400)
        return res.json({
            message: error.message,
            errors: error.errors
        })
    }

    if (!spotId) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    }

    const existingReview = await Review.findOne({
        where: {
            userId: user.id, // current user logged in
            spotId: req.params.spotId // spot from param
        }
    })

    if (existingReview) {   //THESE TWO need to exist for this to be truthy
        res.status(500)
        return res.json({
            message: "User already has a review for this spot"
        })
    }

    const newReview = await Review.create({
        userId: user.id,
        spotId: spotId.id,
        review: review,
        stars: stars
    })

    res.status(201)
    return res.json(newReview)
})

//GET ALL BOOKINGS FOR A SPOT BASED ON THE SPOT ID

router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const user = req.user

    const spotId = await Spot.findByPk(req.params.spotId)

    if (!spotId) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    }

    if (user.id !== spotId.ownerId) {
        const bookings = await Booking.findAll({
            where: {
                spotId: req.params.spotId
            },
            attributes: ['spotId', 'startDate', 'endDate']
        })
        return res.json({Bookings: bookings})
    } else {
        const bookings = await Booking.findAll({
            where: {
                spotId: req.params.spotId
            },
            include: [{
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }]
        })
        return res.json({Bookings: bookings})
    }

})

//CREATE A BOOKING FROM A SPOT BASED ON THE SPOT ID

router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const {startDate, endDate} = req.body
    const user = req.user

    const error = {
        message: "Sorry, this spot is already booked for the specified dates",
        errors: {}
    }

    const spotId = await Spot.findByPk(req.params.spotId)

    //spotId doesn't exist
    if (!spotId || spotId.ownerId === user.id) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    }

    //if the end date is the same as start date or if end was before start
    if (Date.parse(endDate) === Date.parse(startDate) || Date.parse(endDate) < Date.parse(startDate)) {
        res.status(400)
        return res.json({
            message: "Bad Request",
            errors: {
                endDate: "endDate cannot be on or before startDate"
            }
        })
    }
    //if start and end already exist
    const allBookings = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        }
    })

    const allBookingsArr =[]

    allBookings.forEach(ele => {
        allBookingsArr.push(ele.toJSON())
    })

    const startDateObj = new Date(startDate)
    const endDateObj = new Date(endDate)

    allBookingsArr.forEach(ele => {
        const databaseStart = new Date(ele.startDate)
        const databaseEnd = new Date(ele.endDate)

        if (startDateObj.getTime() === databaseStart.getTime() || endDateObj.getTime() === databaseEnd.getTime()) {
            error.errors.startDate = "Start date conflicts with an existing booking",
            error.errors.endDate = "End date conflicts with an existing booking"
        }

        if (startDateObj.getTime() > databaseStart.getTime() && startDateObj.getTime() < databaseEnd.getTime() || endDateObj.getTime() > databaseStart.getTime() && endDateObj.getTime() < databaseEnd.getTime()) {
            error.errors.startDate = "Start date conflicts with an existing booking",
            error.errors.endDate = "End date conflicts with an existing booking"
        }
    })

    if (Object.keys(error.errors).length) {
        res.status(403)
        return res.json({
            message: error.message,
            errors: error.errors
        })
    } else {
        const newBooking = await Booking.create({
            spotId: spotId.id,
            userId: user.id,
            startDate: startDate,
            endDate: endDate
        })

        res.status(200)
        return res.json(newBooking)
    }
})

//GET ALL SPOTS

router.get('/', async (req, res, next) => {
    let { page, size, maxLat, minLat, minLng, maxLng, minPrice, maxPrice } = req.query

    page = parseInt(page)
    size = parseInt(size)

    if (!page) {
        page = 1
    }

    if (page <= 0) {
        res.status(400)
        return res.json({
            message: "Bad Request",
            errors: {
                page: "Page must be greater than or equal to 1",
            }
        })
    }

    if (!size) {
        size = 20
    }

    if (size <= 0) {
        res.status(400)
        return res.json({
            message: "Bad Request",
            errors: {
                size: "Size must be greater than or equal to 1",
            }
        })
    }

    let pagination = {}

    if (page >= 1 && size >= 1) {
        pagination.limit = size;
        pagination.offset = size * (page - 1);
    }

    const spots = await Spot.findAll({
        include: [{
            model: SpotImage
        },
        {
            model: Review
        }
        ],
        ...pagination
    })

    const spotsArr = [];
    spots.forEach(spot => {
        let total = 0
        const spotJSON = spot.toJSON()

        spotJSON.Reviews.forEach(ele => {
            total += ele.stars
        })
        const avg = total / spotJSON.Reviews.length
        spotJSON.avgRating = avg

        spotJSON.SpotImages.forEach(ele => {
            if (ele.preview === true) {
                spotJSON.previewImage = ele.url
            } else {
                spotJSON.previewImage = 'No preview available'
            }
        })

        delete spotJSON.Reviews // deletes Reviews included
        delete spotJSON.SpotImages // deletes SpotImages included
        spotsArr.push(spotJSON)
    })

    return res.json({ Spots: spotsArr, page, size })
})




module.exports = router
