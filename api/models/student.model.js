import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    code: {
        type: String, 
        required: true,
    },

    enrollmentNumber: {
        type: String, 
        required: true,
        unique: true,  
    },

    avatar:{
   type:String,
   default:"https://tse4.mm.bing.net/th?id=OIP.xo-BCC1ZKFpLL65D93eHcgHaGe&pid=Api&P=0&h=180"
  },
   
    class:
     { type: mongoose.Schema.Types.ObjectId,
         ref: "Class" }, 
         // Reference to Class model

//   attendance:
//    [
//     { date: String, status: String }
// ] 
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);

export default Student;

