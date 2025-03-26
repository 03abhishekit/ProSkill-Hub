import mongoose from "mongoose";
import User from "../models/userModels.js";
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body);
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(req.body);
      
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Incorrect Email or Password",
        });
      }
  
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(400).json({
          success: false,
          message: "Incorrect email or password",
        });
      }
  
      
      return generateToken(res, user, `Welcome back ${user.username}`);
  
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  };
  

  const logout = async(req,res)=>{
    try{
      return res.status(200).cookie("token", "", {maxAge:0}).json({
        message:"Logged Out successFully",
        success: true,
      })

    }catch(error){
      return res.status(500).json({
        success : false,
        message : "Failed to logout",
        error: error.message,
      })
    }
  }


 const getUserProfile = async(req,res)=>{
    try{
       const userId = req.id;
       const user = await User.findById(userId).select("-password");
       if(!user){
        return res.status(404).json({
          message: "Profile Not Found",
          success:false,
        })
       }
       return res.status(200).json({
          success:true,
          user
      })
    }
    catch(error){
      return res.status(500).json({
        successs : false,
        message : "Failed to load User",
        error: error.message,
      })
    }
 } 


 const updateProfile = async(req,res)=>{
  try{
    const userId = req.id;
    const {username} = req.body;
    const profilePhoto = req.file;

    console.log(req.file); 
    const user = await User.findById(userId);

    if(!user){
      return res.status(404).json({
        message:"User not found",
        success:false
    }) 
    }

    //  Extract public Id of old Image
    if(user.photoURL){
          const publicId = user.photoURL.split("/").pop().split(".")[0];
          deleteMediaFromCloudinary(publicId);
    }

    // upload New Photo
    const cloudResponse = await uploadMedia(profilePhoto.path);
    const photoURL = cloudResponse.secure_url;

    const updatedData = {username, photoURL};
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData,{
      new:true
    }).select("-password");


    return res.status(200).json({
      success:true,
      user:updatedUser,
      message:"Profile updated successfully."
  })
    
  }
  catch(error){
      
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"Failed to update profile"
    })
  }
 }
export { register, login, logout, getUserProfile, updateProfile };
