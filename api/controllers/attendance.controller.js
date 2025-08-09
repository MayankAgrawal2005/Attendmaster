import Attendance from "../models/attendance.model.js";
import { errorHandler } from "../utils/error.js";


export const markAttendance = async(req,res,next)=>{

try{

    const { classId, subjectId, teacherId, date, records } = req.body;

    if (!classId || !subjectId || !teacherId || !date || !records) {
        return next(errorHandler(400, "Missing required fields"));
      }

      // find attendance doc

      let attendanceDoc = await Attendance.findOne({ classId, subjectId, teacherId });
      
      // agar nhi hai to create

      if (!attendanceDoc) {
        attendanceDoc = new Attendance({
          classId,
          subjectId,
          teacherId,
          attendanceByDate: [],
        });
      }

     // check if there is a exists record
     
     const dateString = new Date(date).toISOString().split("T")[0];
     const existingDateIndex = attendanceDoc.attendanceByDate.findIndex(
       (item) => item.date.toISOString().split("T")[0] === dateString
     );

     if (existingDateIndex !== -1) {
        // Update existing date's records
        attendanceDoc.attendanceByDate[existingDateIndex].records = records;
      } else {
        // Push new date record
        attendanceDoc.attendanceByDate.push({
          date,
          records,
        });
      }

      await attendanceDoc.save();

    res.status(200).json({
      message: "Attendance marked/updated successfully",
      attendanceDoc,
    });



     // agar hai to update or push a new record

    
}catch(error){
    next(error);
}

}



// attendance view
export const getAttendance = async (req, res, next) => {
  try {
    const { classId, subjectId, teacherId, date } = req.query;

    if (!classId || !subjectId || !teacherId) {
      return next(errorHandler(400, "classId, subjectId, and teacherId are required"));
    }

    // Find the doc
    const attendanceDoc = await Attendance.findOne({
      classId,
      subjectId,
      teacherId,
    });

    if (!attendanceDoc) {
      return next(errorHandler(404, "Attendance record not found"));
    }

    // If date is provided, filter the attendanceByDate array
    if (date) {
      const dateString = new Date(date).toISOString().split("T")[0];
      const dateRecord = attendanceDoc.attendanceByDate.find(
        (item) => item.date.toISOString().split("T")[0] === dateString
      );

      if (!dateRecord) {
        return next(errorHandler(404, "No attendance found for the given date"));
      }

      return res.status(200).json({ dateRecord });
    }

    // Otherwise return the whole doc
    res.status(200).json({ attendanceDoc });
  } catch (error) {
    next(error);
  }
};




export const getStudentAttendanceBySubjects = async (req, res) => {
    try {
        const { studentId } = req.params;

        // Fetch all attendance records where the student is present in the `records` array
        const attendanceRecords = await Attendance.find({ "attendanceByDate.records.studentId": studentId })
            .populate("subjectId", "name") // Get subject name
            .populate("classId", "name")   // Get class name
            .populate("attendanceByDate.records.studentId", "name enrollment"); // Get student details

        if (!attendanceRecords || attendanceRecords.length === 0) {
            return res.status(404).json({ message: "No attendance records found for this student." });
        }

        // Structure data subject-wise
        const formattedData = {};
        attendanceRecords.forEach((record) => {
            const subjectName = record.subjectId.name;
            if (!formattedData[subjectName]) {
                formattedData[subjectName] = [];
            }

            record.attendanceByDate.forEach((attendance) => {
                const studentRecord = attendance.records.find((r) => r.studentId._id.toString() === studentId);
                if (studentRecord) {
                    formattedData[subjectName].push({
                        date: attendance.date,
                        status: studentRecord.status,
                    });
                }
            });
        });

        res.status(200).json({ studentId, attendance: formattedData });

    } catch (error) {
        console.error("Error fetching student attendance:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
