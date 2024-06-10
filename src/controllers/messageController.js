const Message = require('../models/Message');

// Mesaj gönderme
exports.sendMessage = async (req, res) => {
    const { receiverId, content } = req.body;

    try {
        const newMessage = new Message({
            sender: req.user.id,
            receiver: receiverId,
            content
        });

        const message = await newMessage.save();
        res.json(message);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Kullanıcıya ait tüm mesajları listeleme
exports.getMessagesByUserId = async (req, res) => {
    try {
        const messages = await Message.find({ $or: [{ sender: req.user.id }, { receiver: req.user.id }] }).populate('sender', ['name', 'email']).populate('receiver', ['name', 'email']);
        res.json(messages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// İki kullanıcı arasındaki mesajları listeleme
exports.getMessagesBetweenUsers = async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [
                { sender: req.user.id, receiver: req.params.userId },
                { sender: req.params.userId, receiver: req.user.id }
            ]
        }).populate('sender', ['name', 'email']).populate('receiver', ['name', 'email']);
        res.json(messages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
