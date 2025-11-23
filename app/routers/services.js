var express = require('express');
var router = express.Router();

var serviceController = require('../controllers/services');

router.get('/', serviceController.getAll);
router.post('/', serviceController.create);
router.get('/:serviceId', serviceController.getService);
router.put('/:serviceId', serviceController.update);
router.delete('/:serviceId', serviceController.remove);

module.exports = router;