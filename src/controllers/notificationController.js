const Notification = require('../models/Notification');

// Bildirim oluşturma
exports.createNotification = async (userId, message) => {
    try {
        const newNotification = new Notification({
            user: userId,
            message
        });

        await newNotification.save();
    } catch (err) {
        console.error(err.message);
    }
};

// Kullanıcının bildirimlerini alma
exports.getNotificationsByUserId = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.user.id });
        res.json(notifications);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Bildirim okundu olarak işaretleme
exports.markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);

        if (!notification) {
            return res.status(404).json({ msg: 'Notification not found' });
        }

        notification.read = true;
        await notification.save();

        res.json(notification);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
