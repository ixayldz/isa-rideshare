const mongoose = require('mongoose');

const PasswordResetSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600 // Token 1 saat sonra geçersiz olacak
    }
});

module.exports = mongoose.model('PasswordReset', PasswordResetSchema);
