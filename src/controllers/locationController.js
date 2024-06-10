const Location = require('../models/Location');

// Konum güncelleme
exports.updateLocation = async (req, res) => {
    const { latitude, longitude } = req.body;

    try {
        let location = await Location.findOne({ user: req.user.id });

        if (!location) {
            location = new Location({
                user: req.user.id,
                latitude,
                longitude
            });
        } else {
            location.latitude = latitude;
            location.longitude = longitude;
            location.updatedAt = Date.now();
        }

        await location.save();
        res.json(location);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Kullanıcının konumunu alma
exports.getLocationByUserId = async (req, res) => {
    try {
        const location = await Location.findOne({ user: req.params.userId }).populate('user', ['name', 'email']);

        if (!location) {
            return res.status(404).json({ msg: 'Location not found' });
        }

        res.json(location);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
