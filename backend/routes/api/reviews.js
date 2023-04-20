const express = require('express')
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');

const { Spot, SpotImage, User, Booking, Review, ReviewImage, sequelize } = require('../../db/models');
const { ResultWithContext } = require('express-validator/src/chain');

//ADD AN IMAGE TO A REVIEW BASED ON THE REVIEWS ID

router.post('/:reviewId/images', requireAuth, async (req, res, next) => {

    const {url} = req.body
    const user = req.user

    const reviewId = await Review.findByPk(req.params.reviewId)

    if (!reviewId) {
        res.status(404)
        return res.json({
            message: "Review couldn't be found"
        })
    }

    if (reviewId.userId !== user.id) {
        res.status(403)
        return res.json({
            message: "You don't have permission to access this resource."
        })
    }

    //SELECT * FROM ReviewImages WHERE reviewId = reviewId
    const allReviewImages = await ReviewImage.findAll({
        where: {
            reviewId: req.params.reviewId
        }
    })

    if (allReviewImages.length < 10) {
        const newReviewImage = await ReviewImage.create({
            reviewId: req.params.reviewId,
            url: url
        })
        return res.json({
            id: newReviewImage.id,
            url
        })
    } else {
        res.status(403)
        return res.json({
            message: "Maximum number of images for this resource was reached"
        })
    }

})






module.exports = router
