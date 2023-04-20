const express = require('express')
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');

const { Spot, SpotImage, User, Booking, Review, ReviewImage, sequelize } = require('../../db/models');
const { ResultWithContext } = require('express-validator/src/chain');

//DELETE REVIEW IMAGE

router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const user = req.user
    const reviewImageId = await ReviewImage.findByPk(req.params.imageId, {
        include: {
            model: Review
        }
    })

    if (!reviewImageId) {
        res.status(404)
        return res.json({
            message: "Review couldn't be found"
        })
    }

    if (reviewImageId.Review.userId !== user.id) {
        res.status(404)
        return res.json({
            message: "Review Image couldn't be found"
        })
    } else {
        reviewImageId.destroy()

        return res.json({
            message: "Successfully deleted"
        })
    }

})

module.exports = router
