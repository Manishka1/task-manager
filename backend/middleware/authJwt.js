const jwt = require('jsonwebtoken');
exports.verifyToken = (req, res, next) => {
  const auth = req.headers.authorization?.split(' ')[1];
  if (!auth) return res.status(401).json({ message: 'No token provided' });
  try {
    const payload = jwt.verify(auth, process.env.JWT_SECRET);
    req.userId   = payload.id;
    req.userRole = payload.role;
    next();
  } catch {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
exports.isAdmin = (req, res, next) => {
  if (req.userRole !== 'admin')
    return res.status(403).json({ message: 'Require admin role' });
  next();
};

