import Class from '../models/class.model.js';
import Student from '../models/student.model.js';
import Teacher from '../models/teacher.model.js';
import Subject from '../models/subject.model.js';
import { errorHandler } from '../utils/error.js';
export const createClass = async(req,res,next)=>{

    try{

        const {name,adminId} = req.body;

        if(!name){
            return res.status(400).json({message:"name is required"})
        }

        if (!adminId) {
            return res.status(400).json({ message: "Admin ID is required" });
        }

        const newClass = new Class({name,adminId});
        await newClass.save();

        res.status(201).json({class:newClass});


    }catch(error){

        
         next(error);
    }

}

// get all classes 

export const getAllClasses = async (req, res, next) => {
    try {
        
        const { adminId } = req.params;

        if (!adminId) {
            return res.status(400).json({ error: "Admin ID is required" });
        }
        const classes = await Class.find({adminId})
            .populate({
                path: "students",
                select: "_id name enrollmentNumber"  // Only fetching _id and name of students
            })
            .populate({
                path: "subjects",
                select: "_id name teacher",
                populate: {
                    path: "teacher",
                    select: "_id name"  // Fetching only _id and name of the teacher
                }
            })
            .populate({
                path: "teachers",
                select: "_id name"  // Only fetching _id and name of teachers
            });

        res.status(200).json(classes);
    } catch (error) {
        next(error);
    }
};

export const getClassById = async (req, res, next) => {
    try {
        const { classId } = req.params; // Get classId from request params

        const classData = await Class.findById(classId)
            .populate({
                path: "students",
                select: "_id name enrollmentNumber"
            })
            .populate({
                path: "subjects",
                select: "_id name teacher",
                populate: {
                    path: "teacher",
                    select: "_id name"
                }
            })
            .populate({
                path: "teachers",
                select: "_id name"
            });

        if (!classData) {
            return res.status(404).json({ message: "Class not found" });
        }

        res.status(200).json(classData);
    } catch (error) {
        next(error);
    }
};



export const deleteClass = async(req,res,next)=>{

    try{

        const {classId} = req.params;


        const classExists = await Class.findById(classId);

        if(!classExists){
            return next(errorHandler(404,'Class not found'))
        }

        await Student.deleteMany({ _id: { $in: classExists.students || [] } });
        await Subject.deleteMany({ _id: { $in: classExists.subjects || [] } });
        await Teacher.updateMany(
            { _id: { $in: classExists.teachers || [] } },
            { $pull: { assignedClasses: classId } }
        );



        await Class.findByIdAndDelete(classId);


        res.status(200).json( {message:"Class deleted Successfully"});
    
    }
    catch(error){
        console.log('error is',error);
        next(error);
    }

}


export const getClass = async(req,res,next)=>{
    try{
  
      const clas = await Class.findById(req.params.id);
      if(!clas){
        return next(errorHandler(404,'class not found'));
        
      }
      res.status(200).json(clas);
  
    }catch(error){
      next(error);
    }
  }
  



  export const updateClass = async(req,res,next)=>{

    try{
  
     
  
      const {classId} = req.params;
  
      const cleanClassId = classId.trim();
      const class1 = await Class.findById(cleanClassId);
  
      if(!class1){
        return next(errorHandler(404,'class not found'));
  
    }
     
    const updateClass = await Class.findByIdAndUpdate(cleanClassId,
  
        req.body,
        {new:true}
    );
  
    res.status(200).json(updateClass);
  
    }catch(error){
      next(error);
    }
  
  }