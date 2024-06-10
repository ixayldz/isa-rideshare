const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
    createReview,
    getReviewsByUserId,
    getAllReviews
} = require('../controllers/reviewController');

// @route    POST api/reviews
// @desc     Create a review
// @access   Private
router.post('/', auth, createReview);

// @route    GET api/reviews/user/:userId
// @desc     Get reviews by user ID
// @access   Public
router.get('/user/:userId', getReviewsByUserId);

// @route    GET api/reviews
// @desc     Get all reviews
// @access   Public
router.get('/', getAllReviews);

module.exports = router;
