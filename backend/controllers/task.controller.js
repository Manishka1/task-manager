const multer   = require('multer');
const Task     = require('../models/Task');
const Document = require('../models/Document');
const upload   = multer({ dest: 'src/uploads/' });

exports.create = [
  upload.array('documents', 3),
  async (req, res, next) => {
    try {
      const data = {
        ...req.body,
        createdBy:  req.userId,
        assignedTo: req.body.assignedTo || req.userId
      };
      const task = await Task.create(data);
      if (req.files.length) {
        const docs = req.files.map(f => ({
          filename: f.originalname,
          path:     f.path,
          mimetype: f.mimetype,
          task:     task._id
        }));
        const saved = await Document.insertMany(docs);
        task.documents = saved.map(d=>d._id);
        await task.save();
      }
      res.status(201).json(task);
    } catch (err) { next(err); }
  }
];

exports.findAll = async (req, res, next) => {
  try {
    const { status, priority, page=1, size=10 } = req.query;
    const filter = {};
    if (req.userRole!=='admin') filter.createdBy = req.userId;
    if (status)   filter.status   = status;
    if (priority) filter.priority = +priority;

    const tasks = await Task.find(filter)
      .populate('documents')
      .skip((page-1)*size)
      .limit(+size);
    const total = await Task.countDocuments(filter);

    res.json({ tasks, total });
  } catch (err) { next(err); }
};

exports.findOne = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).populate('documents');
    if (!task) return res.status(404).end();
    if (req.userRole!=='admin' && task.createdBy.toString()!==req.userId)
      return res.status(403).end();
    res.json(task);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).end();
    if (req.userRole!=='admin' && task.createdBy.toString()!==req.userId)
      return res.status(403).end();
    Object.assign(task, req.body);
    await task.save();
    res.json(task);
  } catch (err) { next(err); }
};

exports.delete = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).end();
    if (req.userRole!=='admin' && task.createdBy.toString()!==req.userId)
      return res.status(403).end();
    await task.remove();
    res.status(204).end();
  } catch (err) { next(err); }
};

exports.downloadDoc = (req, res) => {
  const file = `${__dirname}/../uploads/${req.params.filename}`;
  res.download(file);
};