const mongoose = require("mongoose");
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req,res){
    try{
        const {name, email, password} = req.body;

    const user = await userModel.findOne({email});

    if(user){
        return res.status(400).json({
            success : false,
            message : "User already exists",
            user
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.create({
        email,
        name,
        password : hashedPassword
    });

    res.status(200).json({
        success : true,
        message : "User registered successfuly",
        user : {
            name : name,
            email : email
        }
    })
    }catch(error){
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
};

async function loginUser(req,res){
   try{
     const {email, password} = req.body;

    const user = await userModel.findOne({email});

    if(!user){
        return res.status(400).json({
            success : false,
            message : "User not found"
        })
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if(!passwordMatch){
        return res.status(400).json({
            success : false,
            message : "Invalid password"
        })
    }

    const token = jwt.sign(
        {id : user._id},
        process.env.JWT_SECRET,
        {expiresIn : "3D"}
    )

    res.status(200).json({
        success : true,
        message : "Login successful",
        user,
        token
    })
   }catch(error){
    res.status(500).json({
        success : false,
        message : error.message
    })
   }
};

module.exports = {registerUser, loginUser};