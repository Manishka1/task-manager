const Task = require('../models/Task');

const checkOwnershipOrAdmin = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.createdBy.toString() !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = checkOwnershipOrAdmin;
