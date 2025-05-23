const router = require('express').Router();
const { verifyToken }        = require('../middleware/authJwt');
const ctrl                  = require('../controllers/task.controller');

router.use(verifyToken);
router.post('/',    ctrl.create);
router.get('/',     ctrl.findAll);
router.get('/:id',  ctrl.findOne);
router.put('/:id',  ctrl.update);
router.delete('/:id', ctrl.delete);
router.get('/doc/:filename', ctrl.downloadDoc);

module.exports = router;