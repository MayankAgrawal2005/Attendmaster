import Subject from "../models/subject.model.js";
import Class from "../models/class.model.js";
import Teacher from "../models/teacher.model.js";
import { errorHandler } from "../utils/error.js";
export const createSubject =  async(req,res,next)=>{

    try{

        const {name,classId}= req.body;

        if(!name || !classId) {

            return res.status(400).json({message:"Name,ClassId are required"})
        }


        const classExists = await Class.findById(classId);
        if (!classExists) {
            return res.status(404).json({ message: "Class not found" });
        }


        const newSubject = new Subject({name,classId});

        await newSubject.save();

        await Class.findByIdAndUpdate(classId, { $addToSet: { subjects: newSubject._id } });

        // await Teacher.findByIdAndUpdate(teacherId, { $addToSet: { assignedSubjects: newSubject._id } });

        res.status(201).json({message:"Subject created successfully",subject:newSubject});


    }catch(error){
        next(error);
    }


}


export const updateSubject = async(req,res,next)=>{

    const {subjectId}  = req.params;
    const subject = Subject.findById(subjectId);

    if(!subject){
        return next(errorHandler("Subject is not found"));

    }

    const updateSubject = await Subject.findByIdAndUpdate(subjectId,

        req.body,
        {new:true}
    );

     res.status(200).json(updateSubject)

}







   
//    assign a subject to a class

export const assignSubjectToClass = async(req,res,next) =>{

    try{

        const {subjectId,classId} = req.body;

        await Subject.findByIdAndUpdate(subjectId,{classId});

        res.status(200).json({message:"Subject assigned to class successfully"});


    }catch(error){
        next(error);
    }

}


// delete subject 

export const deleteSubject = async(req,res,next)=>{
    try{

        const {subjectId} = req.params;


        const subject =  await Subject.findById(subjectId);
        if(!subject){
            return next(errorHandler(404,'Subject not found'));

        }

        const {classId} = subject;

        await Class.findByIdAndUpdate(classId, { $pull: { subjects: subjectId } });

        // await Teacher.findByIdAndUpdate(teacher, { $pull: { assignedSubjects: subjectId } });

        await Subject.findByIdAndDelete(subjectId);

        res.status(200).json({ message: "Subject deleted successfully" });



    }catch(error){
        next(error);
    }
}


export const getSubjectByClass = async(req,res,next)=>{
    try{

        const {classId} = req.params;

        const subjects = await Subject.find({classId:classId});
        res.status(200).json(subjects);

    }catch(error){
        next(error);
    }
}




export const getSubject = async(req,res,next)=>{
    try{
  
      const subject = await Subject.findById(req.params.id)
      .populate("teacher", "name")  // Populate teacher's name
      .populate("classId", "name");
      if(!subject){
        return next(errorHandler(404,'subject not found'));
        
      }
      res.status(200).json(subject);
  
    }catch(error){
      next(error);
    }
  }






