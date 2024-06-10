const Review = require('../models/Review');
const Trip = require('../models/Trip');
const User = require('../models/User');

// Yorum oluşturma
exports.createReview = async (req, res) => {
    const { revieweeId, tripId, rating, comment } = req.body;

    try {
        const trip = await Trip.findById(tripId);

        if (!trip) {
            return res.status(404).json({ msg: 'Trip not found' });
        }

        if (trip.driver.toString() !== revieweeId && trip.passenger.toString() !== revieweeId) {
            return res.status(400).json({ msg: 'Invalid reviewee' });
        }

        const newReview = new Review({
            reviewer: req.user.id,
            reviewee: revieweeId,
            trip: tripId,
            rating,
            comment
        });

        const review = await newReview.save();

        // Update user's rating
        const reviews = await Review.find({ reviewee: revieweeId });
        const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
        await User.findByIdAndUpdate(revieweeId, { averageRating });

        res.json(review);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Kullanıcıya ait tüm yorumları listeleme
exports.getReviewsByUserId = async (req, res) => {
    try {
        const reviews = await Review.find({ reviewee: req.params.userId }).populate('reviewer', ['name', 'email']).populate('trip');
        res.json(reviews);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Yorumları listeleme
exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate('reviewer', ['name', 'email']).populate('reviewee', ['name', 'email']).populate('trip');
        res.json(reviews);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
