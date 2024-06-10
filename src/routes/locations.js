const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
    updateLocation,
    getLocationByUserId
} = require('../controllers/locationController');

// @route    POST api/locations
// @desc     Update location
// @access   Private
router.post('/', auth, updateLocation);

// @route    GET api/locations/user/:userId
// @desc     Get location by user ID
// @access   Public
router.get('/user/:userId', getLocationByUserId);

module.exports = router;
