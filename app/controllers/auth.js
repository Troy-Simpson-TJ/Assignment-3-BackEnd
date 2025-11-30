const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const JWT_SECRET = process.env.JWT_SECRET || "SecretPass321";

exports.signup = async(req,res) => {
    try{
        const {firstName, lastName, email, username, password} = req.body;

        if(!email || !password || !username)
            return res.status(400).json({message: "Email, username and password are required"});

        
        const existingUser = await User.findOne({email});
        if (existingUser)
            return res.status(400).json({message: "Email already exists"});

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            firstname,
            lastname,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "Account created successfully",
            user: {
                id: newUser._id,
                email: newUser.email,
                username: newUser.username
            }
        });
    }
    catch (err){
        res.status(500).json({message: "Signup failed", error: err.message});
    }
};

exports.login = async (req,res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if(!user)
            return res.status(400).json({message: "Invalid email or password"});
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({message: "Invalid email or password"});

        const token = jwt.sign(
            {id: user._id, email: user.email},
            JWT_SECRET,
            {expiresIn: "1d"}
        );

        res.json({
            message: "Login successful",
            token,
            user:{
                id: user._id,
                email: user.email
            }
        });
    }
    catch (err){
        res.status(500).json({message: "Login failed", error: err.message});
    }
};