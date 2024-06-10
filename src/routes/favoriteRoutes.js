const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
    addFavoriteRoute,
    getFavoriteRoutesByUserId,
    deleteFavoriteRoute
} = require('../controllers/favoriteRouteController');

// @route    POST api/favorite-routes
// @desc     Add favorite route
// @access   Private
router.post('/', auth, addFavoriteRoute);

// @route    GET api/favorite-routes
// @desc     Get favorite routes by user ID
// @access   Private
router.get('/', auth, getFavoriteRoutesByUserId);

// @route    DELETE api/favorite-routes/:id
// @desc     Delete favorite route
// @access   Private
router.delete('/:id', auth, deleteFavoriteRoute);

module.exports = router;
