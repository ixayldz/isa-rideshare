const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
    createTrip,
    getAllTrips,
    getTripById,
    updateTrip,
    deleteTrip,
    searchTrips // Yeni eklenen fonksiyonu burada ekleyin
} = require('../controllers/tripController');

// @route    POST api/trips
// @desc     Create a trip
// @access   Private
router.post('/', auth, createTrip);

// @route    GET api/trips
// @desc     Get all trips
// @access   Public
router.get('/', getAllTrips);

// @route    GET api/trips/:id
// @desc     Get trip by ID
// @access   Public
router.get('/:id', getTripById);

// @route    PUT api/trips/:id
// @desc     Update a trip
// @access   Private
router.put('/:id', auth, updateTrip);

// @route    DELETE api/trips/:id
// @desc     Delete a trip
// @access   Private
router.delete('/:id', auth, deleteTrip);

// @route    GET api/trips/search
// @desc     Search trips
// @access   Public
router.get('/search', searchTrips); // Yeni eklenen arama rotası

module.exports = router;
