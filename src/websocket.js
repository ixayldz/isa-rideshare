const WebSocket = require('ws');
const jwt = require('jsonwebtoken');
const Message = require('./models/Message');

const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws, req) => {
    ws.on('message', async (message) => {
        try {
            const { token, receiverId, content } = JSON.parse(message);
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const senderId = decoded.user.id;

            const newMessage = new Message({
                sender: senderId,
                receiver: receiverId,
                content
            });

            const savedMessage = await newMessage.save();

            // Mesajı gönderen ve alıcıya iletin
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(savedMessage));
                }
            });
        } catch (err) {
            console.error(err.message);
            ws.send(JSON.stringify({ error: 'Server error' }));
        }
    });
});

module.exports = wss;
