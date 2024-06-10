const mongoose = require('mongoose');

const NotificationPreferenceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    emailNotifications: {
        type: Boolean,
        default: true
    },
    smsNotifications: {
        type: Boolean,
        default: false
    },
    pushNotifications: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('NotificationPreference', NotificationPreferenceSchema);
