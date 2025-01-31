import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from "../models/userModel.js";
dotenv.config();


export const requireSignin = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: 'Token Needed' , success: false });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Unauthorized' , success: false });
    }
}


export const isAdmin = async (req, res, next) => {
    try {
        const id = req.user.id;
        const user = await User.findById(id);
        if(!user){
            return res.status(400).json({message: "User Not Found", success: false});
        }

        if(user.role !== 'ADMIN'){
            return res.status(400).json({message: "Admin Resource! Access Denied", success: false});
        }
        
        next();
    } catch (error) {
        console.log(error);
    }
}


export const isDonar = async (req, res, next) => {
    try {
        const id = req.user.id;
        const user = await User.findById(id);
        if(!user){
            return res.status(400).json({message: "User Not Found", success: false});
        }

        if(user.role !== 'DONAR'){
            return res.status(400).json({message: "Donar Resource! Access Denied", success: false});
        }
    
        next();

    } catch (error) {
        console.log(error);
        return res.status(400).json({message: "Donar Resource! Access Denied", success: false});
    }
}

export const isNgo = async (req, res, next) => {
    try {
        const id = req.user.id;
        const user = await User.findById(id);

        if(!user){
            return res.status(400).json({message: "User Not Found", success: false});
        }

        if(!user.role === 'NGO'){
            return res.status(400).json({message: "NGO Resource! Access Denied", success: false});
        }

        next();
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: "NGO Resource! Access Denied", success: false});
    }
}   

export const isHelpSeeker = async (req, res, next) => {
    try {
        const id = req.user.id;
        const user = await User.findById(id);
        if(!user){
            return res.status(400).json({message: "User Not Found", success: false});
        }

        if(user.role !== 'HELP_SEEKER'){
            return res.status(400).json({message: "Help Seeker Resource! Access Denied", success: false});
        }

        next();
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: "Help Seeker Resource! Access Denied", success: false});
    }
}


export const isVolunteer = async (req, res, next) => {
    try {
        const id = req.user.id;
        const user = await User.findById(id);
        if(!user){
            return res.status(400).json({message: "User Not Found", success: false});
        }

        if(user.role !== 'VOLUNTEER'){
            return res.status(400).json({message: "Volunteer Resource! Access Denied", success: false});
        }

        next();
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: "Volunteer Resource! Access Denied", success: false});
    }
}
