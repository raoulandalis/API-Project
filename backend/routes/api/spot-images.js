const express = require('express')
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');

const { Spot, SpotImage, User, Booking, Review, ReviewImage, sequelize } = require('../../db/models');
const { ResultWithContext } = require('express-validator/src/chain');

//DELETE AN IMAGE FOR A SPOT

router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const user = req.user
    const spotImageId = await SpotImage.findByPk(req.params.imageId, {
        include: {
            model: Spot
        }
    })

    if (!spotImageId) {
        res.status(404)
        return res.json({
            message: "Spot Image couldn't be found"
        })
    }

    if (spotImageId.Spot.ownerId !== user.id) {
        res.status(403)
        return res.json({
            message: "You don't have permission to access this resource."
        })
    } else {
        spotImageId.destroy()
        return res.json({
            message: "Successfully deleted"
        })
    }
})


module.exports = router
