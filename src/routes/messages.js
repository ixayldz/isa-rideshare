const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
    sendMessage,
    getMessagesByUserId,
    getMessagesBetweenUsers
} = require('../controllers/messageController');

// @route    POST api/messages
// @desc     Send a message
// @access   Private
router.post('/', auth, sendMessage);

// @route    GET api/messages
// @desc     Get messages for user
// @access   Private
router.get('/', auth, getMessagesByUserId);

// @route    GET api/messages/user/:userId
// @desc     Get messages between users
// @access   Private
router.get('/user/:userId', auth, getMessagesBetweenUsers);

module.exports = router;
