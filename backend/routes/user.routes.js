const router = require('express').Router();
const { verifyToken, isAdmin } = require('../middleware/authJwt');
const ctrl = require('../controllers/user.controller');

router.use(verifyToken, isAdmin);
router.get('/',    ctrl.getAll);
router.delete('/:id', ctrl.delete);

module.exports = router;