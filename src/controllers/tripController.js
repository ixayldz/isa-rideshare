const Trip = require('../models/Trip');

// Seyahat oluşturma
exports.createTrip = async (req, res) => {
    const { origin, destination, date, availableSeats, price } = req.body;

    try {
        const newTrip = new Trip({
            driver: req.user.id,
            origin,
            destination,
            date,
            availableSeats,
            price
        });

        const trip = await newTrip.save();
        res.json(trip);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Tüm seyahatleri listeleme
exports.getAllTrips = async (req, res) => {
    try {
        const trips = await Trip.find().populate('driver', ['name', 'email']);
        res.json(trips);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Belirli bir seyahati görüntüleme
exports.getTripById = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id).populate('driver', ['name', 'email']);

        if (!trip) {
            return res.status(404).json({ msg: 'Trip not found' });
        }

        res.json(trip);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Trip not found' });
        }
        res.status(500).send('Server error');
    }
};

// Seyahati güncelleme
exports.updateTrip = async (req, res) => {
    const { origin, destination, date, availableSeats, price } = req.body;

    try {
        let trip = await Trip.findById(req.params.id);

        if (!trip) {
            return res.status(404).json({ msg: 'Trip not found' });
        }

        // Check if user owns the trip
        if (trip.driver.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        trip = await Trip.findByIdAndUpdate(
            req.params.id,
            { $set: { origin, destination, date, availableSeats, price } },
            { new: true }
        );

        res.json(trip);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Trip not found' });
        }
        res.status(500).send('Server error');
    }
};

// Seyahati silme
exports.deleteTrip = async (req, res) => {
    try {
        let trip = await Trip.findById(req.params.id);

        if (!trip) {
            return res.status(404).json({ msg: 'Trip not found' });
        }

        // Check if user owns the trip
        if (trip.driver.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await Trip.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Trip removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Trip not found' });
        }
        res.status(500).send('Server error');
    }
};

// Seyahat arama ve filtreleme
exports.searchTrips = async (req, res) => {
    const { origin, destination, date } = req.query;

    try {
        const query = {};

        if (origin) query.origin = new RegExp(origin, 'i');
        if (destination) query.destination = new RegExp(destination, 'i');
        if (date) query.date = { $gte: new Date(date).setHours(0, 0, 0), $lte: new Date(date).setHours(23, 59, 59) };

        const trips = await Trip.find(query).populate('driver', ['name', 'email']);
        res.json(trips);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
