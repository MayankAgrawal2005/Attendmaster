import Student from "../models/student.model.js";
import Class from "../models/class.model.js";
import bcryptjs from "bcryptjs";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { errorHandler } from "../utils/error.js";
import multer from 'multer';
import express from 'express';
import xlsx from 'xlsx'; // Import xlsx package
import fs from 'fs';
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
  





// Assign a student to a class 

export const assignStudentToClass = async(req,res,next)=>{

    try{

        const {studentId,classId}=req.body;
        
        if (!studentId || !classId) {
            return res.status(400).json({ message: "studentId and classId are required" });
        }

        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        const classData = await Class.findById(classId);
        if (!classData) {
            return res.status(404).json({ message: "Class not found" });
        }
        
        await Student.findByIdAndUpdate(
            studentId,
            { class: classId },
            { new: true }
        );




        await Class.findByIdAndUpdate(classId, { $addToSet: { students: studentId } },{new:true});

        res.status(200).json({message:"Student assigned to class successfully"});


    }catch(error){
        next(error);
    }

}



// export const addStudentToClass = async(req,res,next)=>{

//     try{

//         const {name,enrollmentNumber,email,classId} = req.body;

//         if(!name || !email || !enrollmentNumber || !classId){
//             return res.status(400).json({message:"name,email,enrollmentNumber,classId is required"});
//         }
  
//         const password = email.split('@')[0];
//         const hashedPassword = bcryptjs.hashSync(password,10);

//         let code;
//         let isCodeUnique = false;
    
//         while (!isCodeUnique) {
//           code = generateCode(); 
//           const existingStudent = await Student.findOne({ code }); 
//           if (!existingStudent) {
//             isCodeUnique = true; 
//           }
//         }
     
//         const existingClass = await Class.findById(classId);
//         if (!existingClass) {
//             return res.status(404).json({ message: "Class not found" });
//         }

//         const newStudent = new Student({ name, email, code, password:hashedPassword ,enrollmentNumber,class:classId});
//         await newStudent.save();

//         existingClass.students.push(newStudent._id);
//         await existingClass.save();

//         await transporter.sendMail({
//             from: process.env.EMAIL,
//             to: email,
//             subject: 'Your Student Login Credentials',
//             text: `Your Login Code: ${code}, Password: ${password}`
//         });

//         res.status(201).json({ message: 'Student assigned to class & credentials sent via email' });

//     }catch(error){
//         next(error);
//     }
// }

export const addStudentToClass = async (req, res, next) => {
    try {
        const { name, enrollmentNumber, email, classId } = req.body;

        if (!name || !email || !enrollmentNumber || !classId) {
            return res.status(400).json({ message: "name, email, enrollmentNumber, classId is required" });
        }

        const password = email.split('@')[0];
        const hashedPassword = bcryptjs.hashSync(password, 10);

        // Fetch last student code and increment it
        let lastStudent = await Student.findOne().sort({ code: -1 }); // Get last generated code
        let newCode = lastStudent ? parseInt(lastStudent.code) + 1 : 59000; // Increment or start from 59000

        // Ensure the generated code is unique
        while (await Student.findOne({ code: newCode.toString() })) {
            newCode++; // Increment if the code already exists
        }

        const existingClass = await Class.findById(classId);
        if (!existingClass) {
            return res.status(404).json({ message: "Class not found" });
        }

        const newStudent = new Student({
            name,
            email,
            code: newCode.toString(),
            password: hashedPassword,
            enrollmentNumber,
            class: classId
        });

        await newStudent.save();

        existingClass.students.push(newStudent._id);
        await existingClass.save();

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: 'Your Student Login Credentials',
            text: `Your Login Code: ${newCode}, Password: ${password}`
        });

        res.status(201).json({ message: 'Student assigned to class & credentials sent via email' });

    } catch (error) {
        next(error);
    }
};


export const deleteStudent = async(req,res,next)=>{
    try{

        const {studentId} = req.params;

        const student = await Student.findById(studentId);
        if(!student){
            return res.status(404).json({message:"Student not found"});

        }

        await Class.updateMany({},{$pull:{students:studentId}});

        await Student.findByIdAndDelete(studentId);

        res.status(200).json({message:"Student deleted successfully"});


    }catch(error){
        next(error);
    }
}


// update student

export const updateStudent = async(req,res,next)=>{

    try{

        
    const {studentId} = req.params;

    const student = await Student.findById(studentId);
    if(!student){
        return next(errorHandler(404,'Student not found'));

    }

    const updateStudent = await Student.findByIdAndUpdate(studentId,

        req.body,
        {new:true}
    );

    res.status(200).json(updateStudent);


    }catch(error){

        next(error);

    }




}


export const getStudentByClass = async(req,res,next)=>{
    try{

        const {classId} = req.params;

        const students = await Student.find({class:classId});
        res.status(200).json(students);

    }catch(error){
        next(error);
    }
}

export const getStudent = async(req,res,next)=>{
    try{
  
      const student = await Student.findById(req.params.id);
      if(!student){
        return next(errorHandler(404,'student not found'));
        
      }
      res.status(200).json(student);
  
    }catch(error){
      next(error);
    }
  }



  export const addStudentsFromFile = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Please upload a CSV or Excel file." });
        }

        const { classId } = req.body;
        if (!classId) {
            return res.status(400).json({ message: "Class ID is required." });
        }

        const existingClass = await Class.findById(classId);
        if (!existingClass) {
            return res.status(404).json({ message: "Class not found" });
        }

        let studentsData = [];

        // Check if file is CSV or Excel
        if (req.file.mimetype === 'text/csv') {
            // Process CSV file
            const stream = fs.createReadStream(req.file.path).pipe(csvParser());

            for await (const row of stream) {
                studentsData.push({
                    name: row.name,
                    email: row.email,
                    enrollmentNumber: row.enrollmentNumber
                });
            }
        } else {
            // Process Excel file
            const workbook = xlsx.readFile(req.file.path);
            const sheetName = workbook.SheetNames[0];
            const sheet = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

            studentsData = sheet.map(row => ({
                name: row.name,
                email: row.email,
                enrollmentNumber: row.enrollmentNumber
            }));
        }

        // Remove file after reading
        fs.unlinkSync(req.file.path);

        let lastStudent = await Student.findOne().sort({ code: -1 });
        let newCode = lastStudent ? parseInt(lastStudent.code) + 1 : 59000;

        const newStudents = [];

        for (const student of studentsData) {
            const existingStudent = await Student.findOne({ enrollmentNumber: student.enrollmentNumber });

            if (!existingStudent) {
                const password = student.email.split('@')[0];
                const hashedPassword = bcryptjs.hashSync(password, 10);

                while (await Student.findOne({ code: newCode.toString() })) {
                    newCode++;
                }

                const newStudent = new Student({
                    name: student.name,
                    email: student.email,
                    enrollmentNumber: student.enrollmentNumber,
                    password: hashedPassword,
                    code: newCode.toString(),
                    class: classId
                });

                await newStudent.save();
                existingClass.students.push(newStudent._id);

                // Send Email with credentials
                await transporter.sendMail({
                    from: process.env.EMAIL,
                    to: student.email,
                    subject: 'Your Student Login Credentials',
                    text: `Your Login Code: ${newCode}, Password: ${password}`
                });

                newStudents.push(newStudent);
            }
        }

        await existingClass.save();

        res.status(201).json({
            message: `${newStudents.length} students added successfully.`,
            students: newStudents
        });

    } catch (error) {
        next(error);
    }
};