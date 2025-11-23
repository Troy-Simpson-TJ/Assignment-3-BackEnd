let ProjectModel = require('../models/projects');

module.exports.getProject = async function (req, res, next) {
  try {
    let project = await ProjectModel.findOne({ _id: req.params.projectId });

    res.json(project);

  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports.create = async function (req, res, next) {
  try {

    let project = req.body;

    let result = await ProjectModel.create(project);
    console.log(result);

    res.status(200);
    res.json(
      {
        success: true,
        message: "Project created successfully."
      }
    );

  } catch (error) {
    console.log(error);
    next(error);
  }

}

module.exports.getAll = async function (req, res, next) {
  try {
    let list = await ProjectModel.find();

    res.json(list);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports.update = async function (req, res, next) {
  try {
    let updatedProject = ProjectModel(req.body);
    updatedProject._id = req.params.projectId;
    let result = await ProjectModel.updateOne({ _id: req.params.projectId }, updatedProject);
    console.log(result);

    if (result.modifiedCount > 0) {
      res.status(200);
      res.json(
        {
          success: true,
          message: "Project updated successfully."
        }
      );
    } else {
      throw new Error('Project not updated. Are you sure it exists?')
    }

  } catch (error) {
    console.log(error);
    next(error);
  }
}


module.exports.remove = async function (req, res, next) {
  try {
    let result = await ProjectModel.deleteOne({ _id: req.params.projectId });
    console.log(result);

    if (result.deletedCount > 0) {
      res.status(200);
      res.json(
        {
          success: true,
          message: "Project deleted successfully."
        }
      );
    } else {
      throw new Error('Project not deleted. Are you sure it exists?')
    }

  } catch (error) {
    console.log(error);
    next(error);
  }
}