import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


export const register = async (req, res) => {
    try {
        const {name, email, password, role, phoneNumber, address, profilePicture, organizationName} = req.body;

        if(!name || !email || !password || !role || !phoneNumber || !address){
            return res.status(400).json({message: "All Fields Are Required", success: false});
        }

        const existingUser = await User.findOne({
            email
        });

        if(existingUser){
            return res.status(400).json({message: "User Already Exists", success: false});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role,
            phoneNumber,
            address,
            profilePicture,
            organizationName
        });

        await user.save();

        return res.status(201).json({message: "User Created Successfully", success: true});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error", success: false});
        
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({message: "User Not Found", success: false});
        }

        // if(user.isVerified === false){
        //     return res.status(400).json({message: "Verification Mail sent Successfully! Please Verify Your Email", success: false});
        // }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({message: "Invalid Credentials", success: false});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});

        return res.status(200).json({
            success: true,
            message: 'Login Successfully',
            user: { 
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phoneNumber: user.phoneNumber,
                address: user.address,
                profilePicture: user.profilePicture,
                organizationName: user.organizationName,
                isVerified: user.isVerified
             },
            token
        });


        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error", success: false});
    }
}



export const verifyEmail = async (req, res) => {
    try {
        const {token} = req.params;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if(!user){
            return res.status(400).json({message: "User Not Found", success: false});
        }
        user.isVerified = true;
        await user.save();
        return res.status(200).json({message: "Email Verified Successfully", success: true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error", success: false});
    }
}


export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const {name, phoneNumber, address, profilePicture} = req.body;
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({message: "User Not Found", success: false});
        }
        user.name = name;
        user.phoneNumber = phoneNumber;
        user.address = address;
        user.profilePicture = profilePicture;
        await user.save();
        return res.status(200).json({message: "Profile Updated Successfully", success: true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error", success: false});
    }
}


export const resetPassword = async (req, res) => {
    try {
        const {token} = req.params;
        const {password} = req.body;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if(!user){
            return res.status(400).json({message: "User Not Found", success: false});
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({message: "Password Reset Successfully", success: true});
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error", success: false});
    }
}