const Booking = require('../models/Booking');
const Trip = require('../models/Trip');
const Notification = require('./notificationController'); // Bildirim kontrolcüsünü içeri aktarın

// Rezervasyon oluşturma
exports.createBooking = async (req, res) => {
    const { tripId, seats } = req.body;

    try {
        const trip = await Trip.findById(tripId);

        if (!trip) {
            return res.status(404).json({ msg: 'Trip not found' });
        }

        if (trip.availableSeats < seats) {
            return res.status(400).json({ msg: 'Not enough available seats' });
        }

        const newBooking = new Booking({
            trip: tripId,
            passenger: req.user.id,
            seats
        });

        trip.availableSeats -= seats;
        await trip.save();

        const booking = await newBooking.save();
        res.json(booking);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Tüm rezervasyonları listeleme
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('trip').populate('passenger', ['name', 'email']);
        res.json(bookings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Belirli bir rezervasyonu görüntüleme
exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('trip').populate('passenger', ['name', 'email']);

        if (!booking) {
            return res.status(404).json({ msg: 'Booking not found' });
        }

        res.json(booking);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Booking not found' });
        }
        res.status(500).send('Server error');
    }
};

// Rezervasyonu iptal etme
exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ msg: 'Booking not found' });
        }

        if (booking.passenger.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        const trip = await Trip.findById(booking.trip);
        trip.availableSeats += booking.seats;
        await trip.save();

        await Booking.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Booking removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Booking not found' });
        }
        res.status(500).send('Server error');
    }
};


// Rezervasyon oluşturma
exports.createBooking = async (req, res) => {
    const { tripId, seats } = req.body;

    try {
        const trip = await Trip.findById(tripId);

        if (!trip) {
            return res.status(404).json({ msg: 'Trip not found' });
        }

        if (trip.availableSeats < seats) {
            return res.status(400).json({ msg: 'Not enough available seats' });
        }

        const newBooking = new Booking({
            trip: tripId,
            passenger: req.user.id,
            seats
        });

        trip.availableSeats -= seats;
        await trip.save();

        const booking = await newBooking.save();

        // Bildirim oluşturma
        await Notification.createNotification(trip.driver, 'A new booking has been made for your trip.');

        res.json(booking);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};