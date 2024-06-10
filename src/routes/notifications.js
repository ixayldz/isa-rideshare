const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
    getNotificationsByUserId,
    markAsRead
} = require('../controllers/notificationController');

// @route    GET api/notifications
// @desc     Get notifications for user
// @access   Private
router.get('/', auth, getNotificationsByUserId);

// @route    PUT api/notifications/:id
// @desc     Mark notification as read
// @access   Private
router.put('/:id', auth, markAsRead);

module.exports = router;
