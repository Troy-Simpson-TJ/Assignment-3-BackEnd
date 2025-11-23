let UserModel  = require('../models/users');

module.exports.getUser = async function (req,res,next) {
    try{
        let user = await UserModel.findOne({ _id:req.params.userId});

        res.json(user);

    } catch (error){
        console.log(error);
        next(error);
    }
}

module.exports.create = async function (req,res,next) {
    try{

        let user = req.body;

        let result = await UserModel.create(user);
        console.log(result);

        res.status(200);
        res.json(
            {
                success: true,
                message: "User created successfully."
            }
        );
    } catch (error){
        console.log(error);
        next(error);
    }
}

module.exports.getAll = async function (req,res,next) {
    try{
        let list = await UserModel.find();

        res.json(list);
    } catch (error){
        console.log(error);
        next(error);
    }
}

module.exports.update = async function (req,res,next) {
    try{
        let updatedUser = UserModel(req.body);
        updatedUser._id = req.params.userId;
        let result = await UserModel.updatedOne({ _id:req.params.userId}, updatedUser);
        console.log(result);

        if (result.modifiedCount > 0) {
            res.status(200);
            res.json(
                {
                    success: true,
                    message: "User updated  successfully."
                }
            );
        } else {
            throw new Error('User not updated. Are you sure it exists?')
        }
    } catch (error){
        console.log(error);
        next(error);
    }
}

module.exports.remove = async function (req,res,next){
    try{
        let result = await UserModel.deleteOne({ _id: req.params.userId});
        console.log(result);

        if(result.deletedCount > 0){
            res.status(200);
            res.json(
                {
                    success: true,
                    message: "User deleted successfully."
                }
            );
        } else {
            throw new Error('User not deleted. Are you sure it exists?')
        }
    } catch (error){
        console.log(error);
        next(error);
    }
}
