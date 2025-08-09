import mongoose from "mongoose";

const attendanceRecordSchema = new mongoose.Schema({
    date: {
      type: Date,
      required: true,
    },
    records: [
      {
        studentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
          required: true,
        },
        status: {
          type: String,
          enum: ["Present", "Absent"],
          default: "Absent",
        },

        name:{
          type:String,
        },

        enrollment:{
          type:String,
        },

      },
    ],
  });

  const attendanceSchema = new mongoose.Schema({
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    attendanceByDate: [attendanceRecordSchema], // Stores an array of daily records
  }); 

  export default mongoose.model("Attendance", attendanceSchema);