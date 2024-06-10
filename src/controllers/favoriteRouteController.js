const FavoriteRoute = require('../models/FavoriteRoute');

// Favori rota ekleme
exports.addFavoriteRoute = async (req, res) => {
    const { origin, destination } = req.body;

    try {
        const newFavoriteRoute = new FavoriteRoute({
            user: req.user.id,
            origin,
            destination
        });

        const favoriteRoute = await newFavoriteRoute.save();
        res.json(favoriteRoute);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Kullanıcının favori rotalarını alma
exports.getFavoriteRoutesByUserId = async (req, res) => {
    try {
        const favoriteRoutes = await FavoriteRoute.find({ user: req.user.id });
        res.json(favoriteRoutes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Favori rota silme
exports.deleteFavoriteRoute = async (req, res) => {
    try {
        const favoriteRoute = await FavoriteRoute.findById(req.params.id);

        if (!favoriteRoute) {
            return res.status(404).json({ msg: 'Favorite route not found' });
        }

        if (favoriteRoute.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await FavoriteRoute.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Favorite route removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
