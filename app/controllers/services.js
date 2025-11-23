let ServiceModel = require('../models/services');

module.exports.getService = async function (req, res, next) {
  try {
    let service = await ServiceModel.findOne({ _id: req.params.serviceId });

    res.json(service);

  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports.create = async function (req, res, next) {
  try {

    let service = req.body;

    let result = await ServiceModel.create(service);
    console.log(result);

    res.status(200);
    res.json(
      {
        success: true,
        message: "Service created successfully."
      }
    );

  } catch (error) {
    console.log(error);
    next(error);
  }

}

module.exports.getAll = async function (req, res, next) {
  try {
    let list = await ServiceModel.find();

    res.json(list);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports.update = async function (req, res, next) {
  try {
    let updatedService = ServiceModel(req.body);
    updatedService._id = req.params.serviceId;
    let result = await ServiceModel.updateOne({ _id: req.params.serviceId }, updatedService);
    console.log(result);

    if (result.modifiedCount > 0) {
      res.status(200);
      res.json(
        {
          success: true,
          message: "Service updated successfully."
        }
      );
    } else {
      throw new Error('Service not updated. Are you sure it exists?')
    }

  } catch (error) {
    console.log(error);
    next(error);
  }
}


module.exports.remove = async function (req, res, next) {
  try {
    let result = await ServiceModel.deleteOne({ _id: req.params.serviceId });
    console.log(result);

    if (result.deletedCount > 0) {
      res.status(200);
      res.json(
        {
          success: true,
          message: "Service deleted successfully."
        }
      );
    } else {
      throw new Error('Service not deleted. Are you sure it exists?')
    }

  } catch (error) {
    console.log(error);
    next(error);
  }
}