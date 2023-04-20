const express = require('express')
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');

const { Spot, SpotImage, User, Booking, Review, ReviewImage, sequelize } = require('../../db/models');
const { ResultWithContext } = require('express-validator/src/chain');

//GET ALL REVIEWS OF THE CURRENT USER

router.get('/current', requireAuth, async (req, res, next) => {

    const user = req.user

    const allReviews = await Review.findAll({
        where: {
            userId: user.id
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
                include: [
                    {
                        model: SpotImage,
                        where: {
                            preview: true
                        }
                    }
            ]
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
    ]
    })

    const allReviewsArr = []

    allReviews.forEach(ele => {
        allReviewsArr.push(ele.toJSON())
    })

    const finalReviews = []
    allReviewsArr.forEach(review => {

        review.Spot.SpotImages.forEach(ele => {
            review.Spot.previewImage = ele.url
        })

        delete review.Spot.SpotImages
        finalReviews.push(review)
    })

    return res.json({Reviews: finalReviews})
})

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

//EDIT A REVIEW

router.put('/:reviewId', requireAuth, async (req, res, next) => {

    const {review, stars} = req.body
    const user = req.user
    const reviewId = await Review.findByPk(req.params.reviewId)

    const error = {
        message: "Bad Request",
        errors: {}
    }

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

    if (!review) {
        error.errors.review = "Review text is required"
    }

    if (!stars || stars < 1 || stars > 5) {
        error.errors.stars = "Stars must be an integer from 1 to 5"
    }

    if (Object.keys(error.errors).length) {
        res.status(400)
        return res.json({
            message: error.message,
            errors: error.errors
        })
    }

    const newReview = await reviewId.update({
        review,
        stars
    })

    await reviewId.save()

    return res.json(newReview)
})

//DELETE A REVIEW
router.delete('/:reviewId', requireAuth, async (req, res, next) => {
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

    reviewId.destroy()

    return res.json({
        message: "Successfully deleted"
    })
})


module.exports = router
