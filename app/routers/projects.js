var express = require('express');
var router = express.Router();

var projectController = require('../controllers/projects');
var auth = require("../middleware/auth");

router.get('/', projectController.getAll);
router.post('/',auth, projectController.create);
router.get('/:projectId', projectController.getProject);
router.put('/:projectId',auth, projectController.update);
router.delete('/:projectId',auth, projectController.remove);

module.exports = router;