const NotificationPreference = require('../models/NotificationPreference');

// Bildirim tercihlerini güncelleme
exports.updateNotificationPreferences = async (req, res) => {
    const { emailNotifications, smsNotifications, pushNotifications } = req.body;

    try {
        let preferences = await NotificationPreference.findOne({ user: req.user.id });

        if (!preferences) {
            preferences = new NotificationPreference({
                user: req.user.id,
                emailNotifications,
                smsNotifications,
                pushNotifications
            });
        } else {
            if (emailNotifications !== undefined) preferences.emailNotifications = emailNotifications;
            if (smsNotifications !== undefined) preferences.smsNotifications = smsNotifications;
            if (pushNotifications !== undefined) preferences.pushNotifications = pushNotifications;
        }

        await preferences.save();
        res.json(preferences);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Kullanıcının bildirim tercihlerini alma
exports.getNotificationPreferencesByUserId = async (req, res) => {
    try {
        const preferences = await NotificationPreference.findOne({ user: req.user.id });
        res.json(preferences);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
