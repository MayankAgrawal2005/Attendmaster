import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema({

  name: { type: String, required: true },

  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
   // Subject is taught by a teacher

  classId: [ 
    { type: mongoose.Schema.Types.ObjectId, ref: "Class" } 
  ],
  // Subject belongs to a class
});


//  assignedClasses:
//      [{ type: mongoose.Schema.Types.ObjectId,
//          ref: "Class" }
//         ],


// const Student = mongoose.model('Student', studentSchema);

const Subject = mongoose.model('Subject',SubjectSchema);

export default Subject;
// module.exports = mongoose.model("Subject", SubjectSchema);
