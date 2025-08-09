import React from 'react'
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate,useParams } from 'react-router-dom';
import { AdminHeader } from '../components/AdminHeader';
export const AssingnClass = () => {

    const navigate = useNavigate();
            const params = useParams();
            const [successMessage, setSuccessMessage] = useState(null);
            const [error,setError]=useState(false);
            const [loading,setLoading] = useState(false);

            const [teacherData,setTeacherData]=useState({
                    name:'',
                    
                })
 
            const [selectedClass, setSelectedClass] = useState("");

             const [classes,setClasses]=useState([]);   

             const handleChange=(e)=>{
                setTeacherData({
                    ...teacherData,
                    [e.target.id]:e.target.value,
                })
            }
        
            const handleClassChange=(e)=>{
                const selectedClassData = JSON.parse(e.target.value);
                setSelectedClass(selectedClassData);
            }


              const fetchClasses = async()=>{
                        try{
                
                            const res = await fetch('/api/class/all');
                            const data = await res.json();
                            setClasses(data);
                
                        }catch(error){
                            setError("Failed to load teachers");        }
                    }
                
                    useEffect(() => {
                        fetchClasses();
                    }, []);
                
                    console.log("classes is ",classes);


                     useEffect(()=>{
                                    const fetchTeacher = async()=>{
                                       const teacherId = params.teacherId;
                                          console.log("teacherId is",teacherId);
                                          const res = await fetch(`/api/teacher/get-teacher/${teacherId}`);
                                              const data = await res.json();
                                    
                                                if(data.success === false){
                                                    console.log(data.message);
                                                 }
                                    
                                                 setTeacherData(data);
                                            }
                                    
                                            fetchTeacher();
                                        },[])
                            
                            console.log("teacher data is",teacherData);
             
          const handleSubmit = async(e)=>{
            e.preventDefault();
            const payload = {
                classId:selectedClass.id,
                classname:selectedClass.name,
                teacherId:params.teacherId,
                teachername:teacherData.name,
            };

            console.log('Submitting',payload);

            try{
            
                setLoading(true);
                setSuccessMessage(null);
                const res = await fetch('/api/teacher/assign-class',{
    
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
    
                    },
                    body:JSON.stringify(payload),
    
                });
    
                const data = await res.json();
                if(data.success===false){
                 setLoading(false);
                 setError(data.message);
               
                 return;
                }
    
                // loading
          setLoading(false);
          setError(null);
          setSuccessMessage("✅ Class has been successfully assigned to the teacher you can see all details in view class!"); 
          setTimeout(()=>{
        
            navigate('/add-class');
          },3000);
          
         console.log(data);
    
            }catch(error){
    
                setLoading(false);
                setError(error.message);
    
            }

          }     


          console.log('Teacher name is ',teacherData.name);
        console.log('teacher id is ',params.teacherId);
        console.log('selected class is ',selectedClass);
       console.log('Selected class name is',selectedClass.name);
       console.log('Selected class id is',selectedClass.id);
        console.log('teacher data assignclass is',teacherData.assignedClasses);

                            

  return (
    <div>
        <AdminHeader/>
        {successMessage && <p className="text-green-500 font-bold mt-2">{successMessage}</p>}  

     <main className='p-3 min-h-screen flex justify-between  bg-[#001220]'>

    

     <div className=' mt-14 ml-10 max-w-[550px] w-[480px] h-[400px] bg-[#333F5C] rounded-3xl border mr-2 border-white'>



<form onSubmit={handleSubmit} >
<h1 className=' text-center mt-10 text-[#A4B5D1] text-2xl uppercase'> Teacher Credentials</h1>
<div className='flex flex-col p-2 ml-10 mt-8 gap-4 border-white rounded-lg  '>
          {/* <label className='text-xl mt-1  text-white mb-4'> Teacher Name:</label> */}
          <input
            type='text'
            maxLength={30}
            placeholder='name' id='name' 
            onChange={handleChange}
            value={teacherData.name || ''}
            className='w-[350px] italic text-black bg-white text-xl p-2 rounded-md ml-2 mb-4'
          />

         
       
</div>
 {/*class dropdown */}

 <div  className='flex flex-col p-2 ml-12 mb-8  border-white rounded-lg  ' >
  
 
        <select
        //   value={selectedTeacher}

        
         id='teacher'
          onChange={handleClassChange}
          value={selectedClass}
          className="w-[350px] italic text-black bg-white text-xl p-2 rounded-md"
        >
          <option value="" disabled selected>Select a Class</option>
         
          {classes.map((clas) => (
            <option key={clas._id} value={JSON.stringify({ id: clas._id, name: clas.name })}>
              {clas.name}
             
            </option>
            
          ))}
        </select>
  

 </div>


<div className='ml-14 mt-3  '>
 <button disabled={loading} className='bg-blue-500 text-bold text-white p-3 w-[350px] rounded-lg uppercase text-center hover:opacity-95 ' >
       {loading ? 'Saving': 'Save'}
     </button>

</div>

</form>

   </div>


   {/* right div */}

   <div className="p-6 bg-white h-[450px] w-[550px] mt-16 mr-14 shadow-lg rounded-lg border border-gray-200">
  <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Assigned Teacher to Class</h1>

  <div className="flex flex-col gap-4">
    {/* Assigned Classes */}
    <div className="bg-gray-100 p-4 rounded-md shadow-sm">
      <h3 className="text-lg font-semibold text-gray-700">Assigned Classes:</h3>
      {teacherData?.assignedClasses?.length > 0 ? (
        <ul className="list-disc list-inside mt-2 text-gray-600">
          {teacherData.assignedClasses.map((cls) => (
            <li key={cls._id} className="text-gray-700 font-medium p-2 bg-gray-300 rounded-md shadow-sm">
              {cls.name}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 mt-2">No assigned classes</p>
      )}
    </div>

    {/* Teacher Details */}
    <div className="bg-blue-100 p-4 rounded-md shadow-sm">
      <h3 className="text-lg font-semibold text-gray-700">Assigned Teacher:</h3>
      <p className="text-xl font-bold text-blue-700 mt-1">{teacherData.name}</p>
    </div>
  </div>
</div>

     </main>

    </div>
  )
}
