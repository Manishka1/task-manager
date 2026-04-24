const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const { verifyToken } = require('../middleware/verifyToken');
const  adminMiddleware  = require('../middleware/adminMiddleware');
const  checkOwnershipOrAdmin  = require('../middleware/ownershipMiddleware');

router.use(verifyToken);

router.post('/', adminMiddleware, taskController.create);

router.get('/', taskController.findAll);

router.get('/:id', checkOwnershipOrAdmin, taskController.getTaskById);
router.put('/:id', checkOwnershipOrAdmin, taskController.update);
router.delete('/:id', adminMiddleware, taskController.delete);
router.get('/doc/:filename', taskController.downloadDoc);

module.exports = router;


