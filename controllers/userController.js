const User = require("../models/user.js");
const bcryptjs = require("bcryptjs");
const cookie = require('cookie');
const jwt = require("jsonwebtoken");


module.exports.register = async (req,res,next)=>{
    const {password}=req.body;
    const hashedPassword = bcryptjs.hashSync(password,10);
    try {
        const existingUser = await User.findOne({email : req.body.email});
        if(existingUser){
            res.status(201).send({message : "User already exists!!", success: true})
            return;
        }
        const user = await User.create({
            name: req.body.name,
            email : req.body.email,
            password : hashedPassword,
            contact : req.body.contact,
            designation : req.body.designation,
            organization : req.body.organization
        });
        res.status(200).send({
            message : "User Registered Successfully !!",
            success : true
        })
    } catch (error) {
        next(error);
    }
};

module.exports.create_session = async (req,res,next)=>{
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).send({message : "User not found!!", success : false})
        }
        const isPassword = bcryptjs.compareSync(password, user.password);
        if(!isPassword){
            return res.status(401).send({message : "Invalid username/password", success : false});
        }
        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET);
        const {password : pass, ...rest} = user._doc;
        res.cookie('jwtToken', token, {httpOnly : true});
        res.status(200).send({messsge :"User logged in", success : true, user : rest, token });

    } catch (error) {
        next(error)
    }
};

module.exports.destroySession = (req, res, next) => {
    try {
        res.clearCookie('jwtToken'); // Clear the cookie named 'jwtToken'
        res.status(200).send({ message: "User signed out !!", success: true, user: null });
    } catch (error) {
        next(error);
    }
};