const multer = require('multer');
const Task = require('../models/Task');
const Document = require('../models/Document');
const User = require('../models/User');
const upload = multer({ dest: 'src/uploads/' });

exports.create = [
  upload.array('documents', 3),
  async (req, res, next) => {
    try {
      if (req.userRole !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Admins only' });
      }

      const assignee = await User.findOne({ email: req.body.assignedTo });
      if (!assignee) {
        return res.status(404).json({ message: 'Assignee not found' });
      }

      const data = {
        ...req.body,
        createdBy: req.userId,
        assignedTo: assignee._id,
      };

      const task = await Task.create(data);
      
      if (req.files.length) {
        const docs = req.files.map(f => ({
          filename: f.originalname,
          path: f.path,
          mimetype: f.mimetype,
          task: task._id,
        }));
        const saved = await Document.insertMany(docs);
        task.documents = saved.map(d => d._id);
        await task.save();
      }

      res.status(201).json(task);
    } catch (err) {
      next(err);
    }
  },
];

exports.findAll = async (req, res, next) => {
  console.log("ROLE:", req.userRole);
console.log("TYPE:", typeof req.userRole);
  try {
    const { status, priority, page = 1, size = 10 } = req.query;
    const filter = {};

    if ((req.userRole || "").toLowerCase().trim() !== 'admin'){
      filter.$or = [
        { createdBy: req.userId },
        { assignedTo: req.userId }
      ];
    }

    if (status) filter.status = status;
    if (priority) filter.priority = +priority;

    const tasks = await Task.find(filter)
      .populate('documents')
      .skip((page - 1) * size)
      .limit(+size);

    const total = await Task.countDocuments(filter);

    res.json({ tasks, total });
  } catch (err) {
    next(err);
  }
};



exports.update = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // if admin user hai to update kar sakta, user task nhi update karenga koi bhi
    if (req.userRole !== 'admin' && task.assignedTo.toString() !== req.userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    if (req.body.assignedTo) {
      const assignee = await User.findOne({ email: req.body.assignedTo });
      if (!assignee) {
        return res.status(404).json({ message: 'Assignee not found' });
      }
      req.body.assignedTo = assignee._id;
    }

    Object.assign(task, req.body);
    await task.save();
    res.json(task);
  } catch (err) {
    next(err);
  }
};
 exports.delete = async (req, res, next) => {
   try {
     const task = await Task.findById(req.params.id);
     if (!task) return res.status(404).json({ message: 'Task not found' });
     // admin hi task delete kar sakta
     if (req.userRole !== 'admin' && task.assignedTo.toString() !== req.userId) {
       return res.status(403).json({ message: 'Forbidden' });
     }
     await task.remove();
     res.status(204).end();
   } catch (err) {
    next(err);
   }
 };
exports.downloadDoc = (req, res, next) => {
  try {
    const file = `${__dirname}/../uploads/${req.params.filename}`;
    res.download(file);
  } catch (err) {
    next(err);
  }
};
exports.deleteDoc = async (req, res, next) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Document not found' });

    // admin hi document delete kar sakta
    const task = await Task.findById(doc.task);
    if (req.userRole !== 'admin' && task.assignedTo.toString() !== req.userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await doc.remove();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('documents')
      .populate('assignedTo', 'email');
    
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (req.userRole !== 'admin' && task.assignedTo.toString() !== req.userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    res.json(task);
  } catch (err) {
    next(err);
  }
};
exports.getTasksByStatus = async (req, res, next) => {
  try {
    const { status } = req.params;
    const tasks = await Task.find({ status })
      .populate('documents')
      .populate('assignedTo', 'email');

    if (!tasks.length) return res.status(404).json({ message: 'No tasks found with this status' });

    res.json(tasks);
  } catch (err) {
    next(err);
  }
};
exports.getTasksByPriority = async (req, res, next) => {
  try {
    const { priority } = req.params;
    const tasks = await Task.find({ priority: +priority })
      .populate('documents')
      .populate('assignedTo', 'email');

    if (!tasks.length) return res.status(404).json({ message: 'No tasks found with this priority' });

    res.json(tasks);
  } catch (err) {
    next(err);
  }
};