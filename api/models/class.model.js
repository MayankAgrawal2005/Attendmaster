import mongoose from "mongoose";



const classSchema = new mongoose.Schema({

  name:
   { type: String, 
    required: true, 
    unique: true 
},
  teachers: [
    { type: mongoose.Schema.Types.ObjectId,
         ref: "Teacher" }],
          // Assigned ki hai class  Teachers ko 


  students: [
    { type: mongoose.Schema.Types.ObjectId,
     ref: "Student" }], // Students in Class


  subjects: [{ type: mongoose.Schema.Types.ObjectId, 
    ref: "Subject" }],

    adminId: {  
      type: mongoose.Schema.Types.ObjectId, // Reference to Admin
      ref: "User",
      required: true
  } 
   
});

const Class = mongoose.model("Class", classSchema);

export default Class;
