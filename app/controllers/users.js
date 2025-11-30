let UserModel  = require('../models/users');
const bcrypt = require('bcryptjs');

module.exports.getUser = async function (req,res,next) {
    try{
        // Do not return password field
        let user = await UserModel.findOne({ _id:req.params.userId}).select('-password');

        res.json(user);

    } catch (error){
        console.log(error);
        next(error);
    }
}

module.exports.create = async function (req,res,next) {
    try{

        let user = req.body;

        // Hash password before storing
        if (user.password) {
            user.password = await bcrypt.hash(user.password, 10);
        }

        let result = await UserModel.create(user);
        console.log(result);

        res.status(201);
        res.json(
            {
                success: true,
                message: "User created successfully.",
                userId: result._id
            }
        );
    } catch (error){
        console.log(error);
        next(error);
    }
}

module.exports.getAll = async function (req,res,next) {
    try{
        // Do not return passwords
        let list = await UserModel.find().select('-password');

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
        // Hash password if being updated
        if (req.body.password) {
            updatedUser.password = await bcrypt.hash(req.body.password, 10);
        }

        let result = await UserModel.updateOne({ _id:req.params.userId}, updatedUser);
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
