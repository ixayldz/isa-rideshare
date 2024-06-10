const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getUserProfile, updateProfile } = require('../controllers/userController');

// @route    GET api/user
// @desc     Get user profile
// @access   Private
router.get('/', auth, getUserProfile);

// @route    PUT api/user
// @desc     Update user profile
// @access   Private
router.put('/', auth, updateProfile);

module.exports = router;
