var express = require('express');
var router = express.Router();

var serviceController = require('../controllers/services');
const auth = require('../../middleware/auth');

router.get('/', serviceController.getAll);
router.post('/',auth, serviceController.create);
router.get('/:serviceId', serviceController.getService);
router.put('/:serviceId',auth, serviceController.update);
router.delete('/:serviceId',auth, serviceController.remove);

module.exports = router;