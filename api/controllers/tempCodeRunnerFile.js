export const addTeacher = async(req,res,next)=>{

    const {name,email} = req.body;
   console.log(req.body);
   //  const code = generateCode();
    const password = email.split('@')[0];
    const hashedPassword = bcryptjs.hashSync(password,10);
   
   
    try{
        
       let code;
       let isCodeUnique = false;
   
       while (!isCodeUnique) {
         code = generateCode(); 
         const existingTeacher = await Teacher.findOne({ code }); 
         if (!existingTeacher) {
           isCodeUnique = true; 
         }
       }
    
   
       const newTeacher = new Teacher({ name, email, code, password });
       await newTeacher.save();
    
   
    await transporter.sendMail({
       from:process.env.EMAIL,
       to:email,
       subject:'Your Teacher Login Credentials',
       text:`Your Login Code : ${code} , Password:${password}`
   
    })
   
      res.status(201).json({message:'Teacher added and Credentials sent via email'});
   
   
    }catch(error){
       next(error);
    }
   }
