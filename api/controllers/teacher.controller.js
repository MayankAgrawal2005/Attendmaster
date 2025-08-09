import Teacher from "../models/teacher.model.js";
import Class from "../models/class.model.js";
import Subject from "../models/subject.model.js";
import bcryptjs from "bcryptjs";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { errorHandler } from "../utils/error.js";

dotenv.config();

const generateCode = ()=> Math.floor(100000 + Math.random() * 900000).toString();

const transporter = nodemailer.createTransport({
    service:'gmail',
    secure:true,
    port:465,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.EMAIL_PASSWORD
    }
});


// export const addTeacher = async(req,res,next)=>{

//     const {name,email} = req.body;
//    console.log(req.body);
//    //  const code = generateCode();
//     const password = email.split('@')[0];
//     const hashedPassword = bcryptjs.hashSync(password,10);
   
   
//     try{
        
//        let code;
//        let isCodeUnique = false;
   
//        while (!isCodeUnique) {
//          code = generateCode(); 
//          const existingTeacher = await Teacher.findOne({ code }); 
//          if (!existingTeacher) {
//            isCodeUnique = true; 
//          }
//        }
    
   
//        const newTeacher = new Teacher({ name, email, code, password });
//        await newTeacher.save();
    
   
//     await transporter.sendMail({
//        from:process.env.EMAIL,
//        to:email,
//        subject:'Your Teacher Login Credentials',
//        text:`Your Login Code : ${code} , Password:${password}`
   
//     })
   
//       res.status(201).json({message:'Teacher added and Credentials sent via email'});
   
   
//     }catch(error){
//        next(error);
//     }
//    }

export const addTeacher = async (req, res, next) => {
    const { name, email,adminId } = req.body;
    console.log(req.body);

    const password = email.split('@')[0];
    const hashedPassword = bcryptjs.hashSync(password, 10);

    try {
        // Fetch last teacher code and increment it
        let lastTeacher = await Teacher.findOne().sort({ code: -1 }); // Get last generated code
        let newCode = lastTeacher ? parseInt(lastTeacher.code) + 1 : 11111; // Increment or start from 11111

        // Ensure the generated code is unique
        while (await Teacher.findOne({ code: newCode.toString() })) {
            newCode++; // Increment if the code already exists
        }

        const newTeacher = new Teacher({
            name,
            email,
            code: newCode.toString(),
            password,
            adminId
        });

        await newTeacher.save();

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: 'Your Teacher Login Credentials',
            text: `Your Login Code: ${newCode}, Password: ${password}`
        });

        res.status(201).json({ message: 'Teacher added and credentials sent via email' });

    } catch (error) {
        next(error);
    }
};

 
export const assignTeacherToClass = async(req,res,next)=>{

    try{

      // console.log("Request Body:", req.body);
        const {teacherId,classId,teachername,classname} = req.body;

        if (!teacherId || !classId  || !teachername || !classname) {
          return res.status(400).json({ message: "All fields are required are required" });
      } 


      const teacherExists = await Teacher.findById(teacherId);
      if (!teacherExists) {
          return res.status(404).json({ message: "Teacher not found" });
      }

      const classExists = await Class.findById(classId);
      if (!classExists) {
          return res.status(404).json({ message: "Class not found" });
      }

     const updatedTeacher =    await Teacher.findByIdAndUpdate(teacherId,
            { $addToSet: { assignedClasses:classId} },
            {new:true});


         // Add Teacher to the Class' teachers array
     const updatedClass =    await Class.findByIdAndUpdate(classId, { $addToSet : { teachers: teacherId } } , {new:true});
        return  res.status(200).json({message:"Teacher assigned to Class successfully",
          teacher:updatedTeacher,
          class:updatedClass
        

        });

         
    }
    catch(error){
        next(error);
    }

}


 // assign a teacher to a subject

 export const assignTeacherToSubject = async(req,res,next)=>{

    try{
 
    const {teacherId,subjectId,subjectname,teachername} = req.body;

    if (!teacherId || !subjectId || !subjectname || !teachername) {
      return res.status(400).json({ message: "teacherId and subjectId are required" });
  }


  const teacher = await Teacher.findById(teacherId);
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

      
        const subject = await Subject.findById(subjectId);
        if (!subject) {
            return res.status(404).json({ message: "Subject not found" });
        }

        if(subject.teacher){
          return res.status(400).json({message:"A teacher is already assigned to this subject"});
        }


      const updatedTeacher = await Teacher.findByIdAndUpdate(teacherId,{$addToSet : {assignedSubjects:subjectId}}) ;
      const updatedSubject = await Subject.findByIdAndUpdate(subjectId,{$addToSet:{teacher:teacherId}});

     res.status(200).json({ message: "subject assigned to teacher successfully" ,
      teacher:updatedTeacher,
      subject:updatedSubject
     });





    }catch(error){
        next(error);
    }

 }


 export const removeTeacherFromSubject = async (req, res, next) => {
  try {
    const { teacherId, subjectId } = req.body;

    if (!teacherId || !subjectId) {
      return res.status(400).json({ message: "teacherId and subjectId are required" });
    }

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    // Check if the subject is actually assigned to this teacher
    if (String(subject.teacher) !== teacherId) {
      return res.status(400).json({ message: "This teacher is not assigned to the selected subject" });
    }

    // Remove the subject from the teacher's assignedSubjects list
    await Teacher.findByIdAndUpdate(teacherId, {
      $pull: { assignedSubjects: subjectId }
    });

    // Remove the teacher from the subject
    await Subject.findByIdAndUpdate(subjectId, {
      $unset: { teacher: "" } // Removes the assigned teacher
    });

    res.status(200).json({
      message: "Teacher removed from subject successfully",
      teacherId,
      subjectId
    });

  } catch (error) {
    next(error);
  }
};



export const updateTeacher = async(req,res,next)=>{

  try{

  
    const {teacherId} = req.params;

    const cleanTeacherId = teacherId.trim();
    const teacher = await Teacher.findById(cleanTeacherId);

    if(!teacher){
      return next(errorHandler(404,'Teacher not found'));

  }
  
  const updateTeacher = await Teacher.findByIdAndUpdate(cleanTeacherId,

      req.body,
      {new:true}
  );

  res.status(200).json(updateTeacher);

  }catch(error){
    next(error);
  }

}


export const deleteTeacher = async(req,res,next)=>{

  try{
    const {teacherId} = req.params;

    const teacherExists = await Teacher.findById(teacherId);
    if(!teacherExists){
      return res.status(404).json({message:"Teacher not found"});
    }

    const subjectsToDelete = await Subject.find({teacher:teacherId})

    const classesToDelete = await Class.find({"teachers._id":teacherId});

    // await Subject.deleteMany({teacher: teacherId });
    await Subject.updateMany(
      { teacher: teacherId }, 
      { $unset: { teacher: "" } } // Removes teacher field from subject
    );

    // await Class.deleteMany({ "teachers._id": teacherId });
    await Class.updateMany(
      { "teachers._id": teacherId }, 
      { $pull: { teachers: { _id: teacherId } } } // Remove teacher from array
  );
  

    await Teacher.findByIdAndDelete(teacherId);

    res.status(200).json({
      message:"Teacher deleted successfully",
      deletedSubjects: subjectsToDelete.length,
      deletedClasses: classesToDelete.length
    });


  }catch(error){
    next(error);
  }

}

export const getTeachers = async(req,res,next)=>{

  try{

    const { adminId } = req.params;
    if (!adminId) {
      return res.status(400).json({ error: "Admin ID is required" });
  }
    const teachers = await Teacher.find({adminId});
    res.status(200).json(teachers);
    

  }catch(error){

    next(error);
  }

}

export const getTeacher = async(req,res,next)=>{
  try{

    const teacher = await Teacher.findById(req.params.id)

    .populate({
      path: "assignedClasses",
      select: "_id name", // Fetching only _id and name of the class
    })
    .populate({
      path: "assignedSubjects",
      select: "_id name classId", // Include classId along with _id and name
      populate: {
        path: "classId", // Populate the classId field in the Subject schema
        select: "_id name", // Only return _id & name for each class
      },
    });



    if(!teacher){
      return next(errorHandler(404,'teacher not found'));
      
    }

    

    res.status(200).json(teacher);

  }catch(error){
    next(error);
  }
}