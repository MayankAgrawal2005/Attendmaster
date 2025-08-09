import express from 'express';
import { assignSubjectToClass, createSubject, deleteSubject, getSubject, getSubjectByClass, updateSubject } from '../controllers/subject.controller.js';

const router = express.Router();

router.post("/create",createSubject);
router.post("/assign-class",assignSubjectToClass);
router.post("/update-subject/:subjectId",updateSubject);
router.delete("/delete-subject/:subjectId",deleteSubject);
router.get("/get-subjectbyclass/:classId",getSubjectByClass);
router.get('/get-Subject/:id',getSubject);



export default router;