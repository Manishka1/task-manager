const User = require('../models/User');

exports.getAll = async (req, res, next) => {
  try {
    const users = await User.find().select('email role');
    res.json(users);
  } catch (err) { next(err); }
};

exports.delete = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) { next(err); }
};