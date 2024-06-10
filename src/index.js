const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
const wss = require('./websocket');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(helmet());
app.use(cors());

// Rate limiting
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 dakika
    max: 10, // 15 dakika içinde 10 istek
    message: 'Too many login attempts from this IP, please try again later'
});

// Database connection
mongoose.connect(process.env.MONGO_URI, {})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Basic route
app.get('/', (req, res) => {
    res.send('Hello, welcome to the Rideshare API!');
});

// auth routes
app.use('/api/auth', authLimiter, require('./routes/auth'));

// user routes
app.use('/api/user', require('./routes/user'));

// trip routes
app.use('/api/trips', require('./routes/trips'));

// booking routes
app.use('/api/bookings', require('./routes/bookings'));

// message routes
app.use('/api/messages', require('./routes/messages'));

// review routes
app.use('/api/reviews', require('./routes/reviews'));

// location routes
app.use('/api/locations', require('./routes/locations'));

// password reset routes
app.use('/api/password-reset', require('./routes/passwordReset'));

// notification routes
app.use('/api/notifications', require('./routes/notifications'));

// favorite routes
app.use('/api/favorite-routes', require('./routes/favoriteRoutes'));

// notification preferences routes
app.use('/api/notification-preferences', require('./routes/notificationPreferences'));

// Create HTTP server
const server = http.createServer(app);

// Handle WebSocket upgrades
server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
