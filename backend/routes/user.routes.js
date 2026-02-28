// routes/user.routes.js

const express = require('express');
const verifyToken = require('../middleware/authJwt');
const adminMiddleware = require('../middleware/adminMiddleware');
const userController = require('../controllers/user.controller');

const router = express.Router();

// Only admins can access these routes
router.use(verifyToken, adminMiddleware);

// Routes
router.get('/', userController.getAllUsers);
router.delete('/:id', userController.delete);

module.exports = router;

