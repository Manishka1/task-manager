const mongoose = require('mongoose');

const docSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  path:     { type: String, required: true },
  mimetype: { type: String, required: true },
  task:     { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Document', docSchema);