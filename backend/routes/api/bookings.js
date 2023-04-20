const express = require('express')
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');

const { Spot, SpotImage, User, Booking, Review, ReviewImage, sequelize } = require('../../db/models');
const { ResultWithContext } = require('express-validator/src/chain');

//GET ALL OF THE CURRENT USERS BOOKINGS

router.get('/current', requireAuth, async (req, res, next) => {
    const user = req.user

    const allBookings = await Booking.findAll({
        where: {
            userId: user.id
        },
        include: {
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
        }
    })

    const allBookingsArr = []

    allBookings.forEach(ele => {
        allBookingsArr.push(ele.toJSON())
    })

    const finalBookings = []
    allBookingsArr.forEach(booking => {

        booking.Spot.SpotImages.forEach(ele => {
            booking.Spot.previewImage = ele.url
        })

        delete booking.Spot.SpotImages
        finalBookings.push(booking)
    })

    return res.json({ Bookings: finalBookings })
})

//EDIT A BOOKING

router.put('/:bookingId', requireAuth, async (req, res, next) => {
    const { startDate, endDate } = req.body
    const user = req.user
    const bookingId = await Booking.findByPk(req.params.bookingId)

    const error = {
        message: "Sorry, this spot is already booked for the specified dates",
        errors: {}
    }

    if (!bookingId) {
        res.status(404)
        return res.json({
            message: "Booking couldn't be found"
        })
    }

    if (bookingId.userId !== user.id) {
        res.status(403)
        return res.json({
            message: "You don't have permission to access this resource."
        })
    }

    if (Date.parse(endDate) < Date.parse(startDate)) {
        res.status(400)
        return res.json({
            message: "Bad Request",
            errors: {
                endDate: "endDate cannot be on or before startDate"
            }
        })
    }

    if (Date.parse(endDate) < Date.now()) {
        res.status(403)
        return res.json({
            message: "Past bookings can't be modified"
        })
    }

    const spot = await Spot.findByPk(bookingId.spotId)

    const allBookings = await Booking.findAll({
        where: {
            spotId: spot.id
        }
    })

    const bookingsArr = []

    allBookings.forEach(ele => {
        bookingsArr.push(ele.toJSON())
    })

    const startDateObj = new Date(startDate)
    const endDateObj = new Date(endDate)

    bookingsArr.forEach(ele => {
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

        if (startDateObj.getTime() > databaseStart.getTime() && endDateObj.getTime() < databaseEnd.getTime()) {
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
        const updatedBooking = await bookingId.update({
            startDate,
            endDate
        })
        await updatedBooking.save()
        return res.json(updatedBooking)
    }
})

//DELETE A BOOKING

router.delete('/:bookingId', requireAuth, async (req, res, next) => {

    const user = req.user
    const bookingId = await Booking.findByPk(req.params.bookingId)

    if (!bookingId) {
        res.status(404)
        return res.json({
            message: "Booking couldn't be found"
        })
    }

    if (Date.parse(bookingId.startDate) < Date.now()) {
        res.status(403)
        return res.json({
            message: "Bookings that have been started can't be deleted"
        })
    }

    if (bookingId.userId !== user.id) {
        res.status(403)
        return res.json({
            message: "You don't have permission to access this resource."
        })
    }

    await bookingId.destroy()
    return res.json({
            message: "Successfully deleted"
        })
})


module.exports = router
