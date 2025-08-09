import express from 'express';
const router = express.Router();
import multer from 'multer';
import {  addStudentToClass,  deleteStudent, getStudent, getStudentByClass, updateStudent,addStudentsFromFile } from '../controllers/student.controller.js';
const upload = multer({ dest: 'uploads/' });
// router.post('/add-student',addStudent);
// router.post('/assign-class',assignStudentToClass);
router.delete('/delete-student/:studentId',deleteStudent);
router.post('/update-student/:studentId',updateStudent);
router.post('/addandassignStudentToclass',addStudentToClass);
router.get('/get-studentbyClass/:classId',getStudentByClass);
router.get('/get-Student/:id',getStudent);
router.post('/add-students', upload.single('file'), addStudentsFromFile);

export default router;