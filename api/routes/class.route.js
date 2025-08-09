import express from 'express';
import { createClass, deleteClass, getAllClasses, getClass, getClassById, updateClass } from '../controllers/class.controller.js';
const router = express.Router();

router.post("/create",createClass);
router.get("/all/:adminId",getAllClasses);
router.delete("/delete-class/:classId",deleteClass);
router.get('/get-class/:id',getClass);
router.post('/update-class/:classId',updateClass);
router.get('/getClassById/:classId',getClassById);


export default router;
