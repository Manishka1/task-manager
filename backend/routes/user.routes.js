const express = require('express');
const verifyToken = require('../middleware/authJwt');
const adminMiddleware = require('../middleware/adminMiddleware');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.use(verifyToken, adminMiddleware);

router.get('/', userController.getAllUsers);
router.delete('/:id', userController.delete);

module.exports = router;

