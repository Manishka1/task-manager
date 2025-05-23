const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String },
  status:      { type: String, enum: ['todo','in-progress','done'], default: 'todo' },
  priority:    { type: Number, min:1, max:5, default:3 },
  dueDate:     { type: Date },
  createdBy:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assignedTo:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  documents:   [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }]
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
