const User = require('../models/User');


exports.delete = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete user' });
  }
};
// In user.controller.js
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('email role');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};
