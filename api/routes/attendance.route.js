import express from 'express';
import { getAttendance, getStudentAttendanceBySubjects, markAttendance } from '../controllers/attendance.controller.js';
const router = express.Router();

router.post('/mark-attendance',markAttendance);
router.get('/get-attendance',getAttendance);
router.get('/get-student-attendance/:studentId',getStudentAttendanceBySubjects);

export default router;