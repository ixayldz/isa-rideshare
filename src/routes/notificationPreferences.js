const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
    updateNotificationPreferences,
    getNotificationPreferencesByUserId
} = require('../controllers/notificationPreferenceController');

// @route    PUT api/notification-preferences
// @desc     Update notification preferences
// @access   Private
router.put('/', auth, updateNotificationPreferences);

// @route    GET api/notification-preferences
// @desc     Get notification preferences by user ID
// @access   Private
router.get('/', auth, getNotificationPreferencesByUserId);

module.exports = router;
