
import express from 'express';
const router = express.Router();
import { signin,signup,google, updateUser, deleteUser, signout, teachersignin, updateTeacher, signoutTeacher, deleteTeacher, studentsignin, updateStudent, deleteStudent, signoutStudent} from '../controllers/auth.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


router.post('/signup',signup);
router.post('/signin',signin);
router.post("/google",google);
router.post("/update-user/:id",verifyToken,updateUser);
router.delete('/delete/:id',verifyToken,deleteUser);
router.get('/signout',signout);
router.post('/teacher-sign-in',teachersignin);
router.post("/update-teacher/:id",verifyToken,updateTeacher);
router.delete('/delete-teacher/:id',verifyToken,deleteTeacher);
router.get('/signout-teacher',signoutTeacher);
router.post('/student-sign-in',studentsignin);
router.post('/update-student/:id',verifyToken,updateStudent);
router.post('/delete-student/:id',verifyToken,deleteStudent);
router.get('/signout-student',signoutStudent);


export default router;