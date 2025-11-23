var express = require('express');
var router = express.Router();

var contactController = require('../controllers/contacts');

router.get('/', contactController.getAll);
router.post('/', contactController.create);
router.get('/:contactId', contactController.getContact);
router.put('/:contactId', contactController.update);
router.delete('/:contactId', contactController.remove);

module.exports = router;