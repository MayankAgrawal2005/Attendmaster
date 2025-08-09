import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import nodemailer from 'nodemailer';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';
import Teacher from "../models/teacher.model.js";
import Student from "../models/student.model.js";
import dotenv from 'dotenv';

dotenv.config();


export const signup = async(req,res,next)=>{
    const {username,email,password} = req.body; 
     const hashedPassword = bcryptjs.hashSync(password,10);
    const newUser = new User({username,email,password:hashedPassword});

    try{
        await newUser.save(); // save it inside  a database 
        res.status(201).json({
            message:"Signup  successfully",
        });

    }
    catch(err){
       
        next(err);
    }
   
};

export const signin = async(req,res,next)=>{

    const {email,password}= req.body;
   
    try{
   
      const validUser = await User.findOne({email});
      if(!validUser) return next(errorHandler(404,'User not found'));
       const validPassword = bcryptjs.compareSync(password,validUser.password);
       if(!validPassword) return next(errorHandler(401,'Wrong cridentials'));
   
       // token creation
   
       const token = jwt.sign({id:validUser._id,role:'admin'},process.env.JWT_SECRET);
       const {password :pass, ...rest } = validUser._doc;
       res.cookie('access_token',token,{httpOnly:true})
       .status(200)
       .json(rest);
   
      
   
    }catch(error){
       next(error);
    }
   
   }


   export const google = async(req,res,next)=>{


    try{

     const user = await User.findOne({email:req.body.email});
     if(user){
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
        const { password :pass, ...rest } = user._doc;
        res.cookie('access_token',token,{httpOnly:true})
        .status(200)
        .json(rest);
     }   
     
     else{
        const generatedPassword = Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword,10);
        const newUser = new User({username:req.body.name.split(" ").join("").toLowerCase()+Math.random().toString(36)
            .slice(-4),
            email:req.body.email,password:hashedPassword , avatar:req.body.photo});


            await newUser.save();
          const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET);
          const {password:pass,...rest} = newUser._doc;
          res.cookie('access_token',token,{httpOnly:true})
          .status(200)
          .json(rest);

 }

    }
    catch(error){
        next(error);
    }

}

export const updateUser = async(req,res,next)=>{

    if(req.user.id !== req.params.id) return next(errorHandler(401,'you can only update your own account'));

    try{

        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password,10);

        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {

            $set : {
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                avatar:req.body.avatar,
            }
        },{new:true} )

        const {password,...rest} = updatedUser._doc;
        res.status(200).json(rest);

      }
      catch(error){
        next(error);
      }

}

export const deleteUser = async(req,res,next)=>{

    if(req.user.id!==req.params.id) return next(errorHandler(401,'You can only delete your own account'));
 
    try{
  
      await User.findByIdAndDelete(req.params.id);
      res.clearCookie('access_token');
      res.status(200).json('User has been deleted')
 
 
    }catch(error){
     next(error);
    }
 
 }


 export const signout = async(req,res,next)=>{

    try{
        res.clearCookie('access_token');
        res.status(200).json('user has been logged out');

    }catch(error){
        next(error);
    }

}




export const teachersignin = async(req,res,next)=>{

    const {code,password}= req.body;
   
    try{
   
      const validUser = await Teacher.findOne({code})
      .populate("assignedClasses", "_id name")   // Only return _id & name for each class
      .populate({
        path: "assignedSubjects",
        select: "_id name classId", // Include classId along with _id and name
        populate: {
          path: "classId", // Populate the classId field in the Subject schema
          select: "_id name", // Only return _id & name for each class
        },
      });
      
      console.log('valid user is',validUser)

      if(!validUser) return next(errorHandler(404,'User not found'));
      console.log('validusepassword',validUser.password);
      console.log('password',password);


    //    const validPassword = bcryptjs.compareSync(password,validUser.password);
    //    if(!validPassword) return next(errorHandler(401,'Wrong cridentials'));
   
       if (password !== validUser.password) {
        return next(errorHandler(401, 'Wrong credentials'));
    }
       // token creation
   
       const token = jwt.sign({id:validUser._id,role:'teacher'},process.env.JWT_SECRET);
       const {password :pass, ...rest } = validUser._doc;
       res.cookie('access_token',token,{httpOnly:true})
       .status(200)
       .json(rest);
   
      
   
    }catch(error){
       next(error);
    }
   
   }




   export const updateTeacher = async(req,res,next)=>{

    if(req.user.id !== req.params.id) return next(errorHandler(401,'you can only update your own account'));

    try{

        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password,10);

        }

        const updatedUser = await Teacher.findByIdAndUpdate(req.params.id, {

            $set : {
                name:req.body.name,
                email:req.body.email,
                password:req.body.password,
                avatar:req.body.avatar,
            }
        },{new:true} )

        const {password,...rest} = updatedUser._doc;
        res.status(200).json(rest);

      }
      catch(error){
        next(error);
      }

}

export const deleteTeacher = async(req,res,next)=>{

    if(req.user.id!==req.params.id) return next(errorHandler(401,'You can only delete your own account'));
 
    try{
  
      await Teacher.findByIdAndDelete(req.params.id);
      res.clearCookie('access_token');
      res.status(200).json('User has been deleted')
 
 
    }catch(error){
     next(error);
    }
 
 }


 export const signoutTeacher = async(req,res,next)=>{

    try{
        res.clearCookie('access_token');
        res.status(200).json('user has been logged out');

    }catch(error){
        next(error);
    }

}

export const studentsignin = async(req,res,next)=>{

    const {code,password}=req.body;

    try{
   
        const validUser = await Student.findOne({code});
        
        
  
        if(!validUser) return next(errorHandler(404,'User not found'));
         const validPassword = bcryptjs.compareSync(password,validUser.password);
         if(!validPassword) return next(errorHandler(401,'Wrong cridentials'));
     
         // token creation
     
         const token = jwt.sign({id:validUser._id,role:'teacher'},process.env.JWT_SECRET);
         const {password :pass, ...rest } = validUser._doc;
         res.cookie('access_token',token,{httpOnly:true})
         .status(200)
         .json(rest);
     
        
     
      }catch(error){
         next(error);
      }

}

export const updateStudent = async(req,res,next)=>{

    if(req.user.id !== req.params.id) return next(errorHandler(401,'you can only update your own account'));

    try{

        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password,10);

        }

        const updatedUser = await Student.findByIdAndUpdate(req.params.id, {

            $set : {
                name:req.body.name,
                email:req.body.email,
                password:req.body.password,
                avatar:req.body.avatar,
            }
        },{new:true} )

        const {password,...rest} = updatedUser._doc;
        res.status(200).json(rest);

      }
      catch(error){
        next(error);
      }

}


export const deleteStudent = async(req,res,next)=>{

    if(req.user.id!==req.params.id) return next(errorHandler(401,'You can only delete your own account'));
 
    try{
  
      await Student.findByIdAndDelete(req.params.id);
      res.clearCookie('access_token');
      res.status(200).json('User has been deleted')
 
 
    }catch(error){
     next(error);
    }
 
 }

 export const signoutStudent = async(req,res,next)=>{

    try{
        res.clearCookie('access_token');
        res.status(200).json('user has been logged out');

    }catch(error){
        next(error);
    }

}
