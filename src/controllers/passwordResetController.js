const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs'); // Eksik olan bu satırı ekleyin
const User = require('../models/User');
const PasswordReset = require('../models/PasswordReset');

// Şifre sıfırlama talebi
exports.requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const token = crypto.randomBytes(32).toString('hex');
        const passwordReset = new PasswordReset({
            user: user._id,
            token
        });

        await passwordReset.save();

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset Request',
            text: `You requested a password reset. Please use the following token to reset your password: ${token}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return res.status(500).send('Server error');
            }
            res.json({ msg: 'Password reset email sent' });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Şifre sıfırlama
exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const passwordReset = await PasswordReset.findOne({ token });

        if (!passwordReset) {
            return res.status(400).json({ msg: 'Invalid or expired token' });
        }

        const user = await User.findById(passwordReset.user);

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        await PasswordReset.deleteOne({ token });

        res.json({ msg: 'Password reset successful' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
