require('dotenv').config();
require('./config/db');      // connect to MongoDB

const express       = require('express');
const cors          = require('cors');
const path          = require('path');
const authRoutes    = require('./routes/auth.routes');
const userRoutes    = require('./routes/user.routes');
const taskRoutes    = require('./routes/task.routes');
const errorHandler  = require('./middleware/errorHandler');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Static folder for uploaded PDFs
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Error handler (must be last)
app.use(errorHandler);

module.exports = app;