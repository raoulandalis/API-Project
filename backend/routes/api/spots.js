const express = require('express')
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');

const { Spot, SpotImage, User, Booking, Review, ReviewImage, sequelize } = require('../../db/models');

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

    return res.json ({Spots: spotsArr})
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
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Review
            }
        ]
    })

    const spot = spotId.toJSON()
    let total = 0

    // spot.Review.forEach(ele => {
    //     total += ele.star
    // })

    // const avg = total / spot.Review.length

    // spot.numReviews = total

    return res.json(spot)
})

//GET ALL SPOTS

router.get('/', async (req, res, next) => {
    let {page, size, maxLat, minLat, minLng, maxLng, minPrice, maxPrice} = req.query

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

    return res.json ({Spots: spotsArr, page, size})
})




module.exports = router
