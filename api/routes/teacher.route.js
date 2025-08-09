import express from 'express';
const router = express.Router();
// import { addTeacher } from '../controllers/auth.controller.js';
import { addTeacher, assignTeacherToClass, assignTeacherToSubject, deleteTeacher, getTeacher, getTeachers, removeTeacherFromSubject, updateTeacher } from '../controllers/teacher.controller.js';

router.post('/add-teacher',addTeacher);
router.post('/assign-class',assignTeacherToClass);
router.post('/assign-subject',assignTeacherToSubject);
router.post('/update-teacher/:teacherId',updateTeacher);
router.delete('/delete-teacher/:teacherId',deleteTeacher);
router.get('/get-teachers/:adminId',getTeachers);
router.get('/get-teacher/:id',getTeacher);
router.post('/remove-teacher-toSubject',removeTeacherFromSubject);
export default router;