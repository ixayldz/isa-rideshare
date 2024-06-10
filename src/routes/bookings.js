const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
    createBooking,
    getAllBookings,
    getBookingById,
    deleteBooking
} = require('../controllers/bookingController');

// @route    POST api/bookings
// @desc     Create a booking
// @access   Private
router.post('/', auth, createBooking);

// @route    GET api/bookings
// @desc     Get all bookings
// @access   Public
router.get('/', getAllBookings);

// @route    GET api/bookings/:id
// @desc     Get booking by ID
// @access   Public
router.get('/:id', getBookingById);

// @route    DELETE api/bookings/:id
// @desc     Delete a booking
// @access   Private
router.delete('/:id', auth, deleteBooking);

module.exports = router;
