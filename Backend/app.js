const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./db/db');
const cookieParser = require('cookie-parser');

// routes
const userRoutes = require('./routes/user.route');
const captionRoutes = require('./routes/caption.routes');

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/users', userRoutes);
app.use('/captions', captionRoutes);


module.exports = app;