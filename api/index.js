import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js'
import teacherRouter from './routes/teacher.route.js';
import cookieParser from 'cookie-parser';
import studentsRouter from './routes/student.route.js';
import classRouter from './routes/class.route.js';
import subjectRouter from './routes/subject.route.js';
import attendanceRouter from './routes/attendance.route.js';

dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{
    console.log('Error connecting to MongoDB',err);
})

const app = express();

app.use(express.json());

app.use(cookieParser());



app.listen(5000,()=>{
    console.log('Server is running on PORT 5000');
})

// admin route
app.use('/api/auth',authRouter);

// teacher route 
app.use('/api/teacher',teacherRouter);

// student route
app.use('/api/student',studentsRouter);


// class route
app.use('/api/class',classRouter);

// subject route
app.use('/api/subject',subjectRouter);

app.use('/api/attendance',attendanceRouter);


// middleware for checking errors
app.use((err,req,res,next) =>{
    const statusCode = err.statusCode || 500;
    const message=err.message|| 'Internal Server Error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})