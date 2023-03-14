import User from '../models/User.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const createUser = async (req, res, next) => {
    try{
        const userExist = await User.findOne({ email:req.body.email }); 
        if(userExist) return res.status(409).json({ message: "Email Already Exist", success: false, data: []});

        if(req.body.password!== req.body.confirmPassword) return res.status(400).json({ message: "Password Doesn't Match", success: false, data: []});
        const hashPassword = await bcryptjs.hash(req.body.password, 12);
        const newUser = await User.create({ ...req.body, password: hashPassword});
        const token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, process.env.jwtToken, {expiresIn: "3hr"});

        const { password, isAdmin, ...otherDetails }  =newUser._doc;

        return res.status(201).json({ message: "Successfully Created", data: { ...otherDetails }, token, isAdmin, success: true })



    }catch(err){
        next(err)
    }
}

export const loginUser = async (req, res, next) => {
    try{
        const userExist = await User.findOne({ email:req.body.email });
        if(!userExist) return res.status(404).json({ message: "User not exist", data:[], success: false})
        const isPasswordValid = await bcryptjs.compare(req.body.password, userExist.password);
        if(!isPasswordValid) return res.status(400).json({ message: "Credentials not matched",success: false});

        const token = jwt.sign({ id: userExist._id, isAdmin: userExist.isAdmin}, process.env.jwtToken, {expiresIn: "3hr"});

        const { password, isAdmin, ...otherDetails} = userExist._doc;
        return res.status(200).json({ data: { ...otherDetails }, message: "Login Succesful", success: true, token, isAdmin})


    }catch(err){
        next(err)
    }
}