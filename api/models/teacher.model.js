import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        //   required: true,
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
        type: String, // 6-digit authentication code
        required: true,
    },

    assignedClasses:
     [{ type: mongoose.Schema.Types.ObjectId,
         ref: "Class" }
        ],

    assignedSubjects:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subject"
    }],

    avatar:{
   type:String,
   default:"https://tse4.mm.bing.net/th?id=OIP.xo-BCC1ZKFpLL65D93eHcgHaGe&pid=Api&P=0&h=180"
  },

  adminId: {  
    type: mongoose.Schema.Types.ObjectId, // Reference to Admin
    ref: "User",
    required: true
}


    
}, { timestamps: true });

const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher;
