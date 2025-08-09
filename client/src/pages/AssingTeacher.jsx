// import React from 'react';
// import { useState,useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate,useParams } from 'react-router-dom';

// import { AdminHeader } from '../components/AdminHeader';
// export const AssingTeacher = () => {
//      const {currentUser} = useSelector(state=>state.user);
//       const navigate = useNavigate();
//             const params = useParams();
//             const [successMessage, setSuccessMessage] = useState(null);
//         const [error,setError]=useState(false);
//         const [loading,setLoading] = useState(false);
//     const [subjectData,setSubjectData]=useState({
//         name:'',
//     })
//     const adminId = currentUser._id;
//     console.log('admin ID is',adminId);
//     const [selectedTeacher, setSelectedTeacher] = useState("");




//     const [teachers,setTeachers]=useState([]);

//     const handleChange=(e)=>{
//         setSubjectData({
//             ...subjectData,
//             [e.target.id]:e.target.value,
//         })
//     }

  
//     const handleTeacherChange = (e) => {
//       const selectedTeacherData = teachers.find(teacher => teacher._id === e.target.value);
//       setSelectedTeacher(selectedTeacherData || {});
//   };
  


//     // get all teachers data
//         const fetchTeachers = async()=>{
//             try{
    
//                 const res = await fetch(`/api/teacher/get-teachers/${adminId}`);
//                 const data = await res.json();
//                 setTeachers(data);
    
//             }catch(error){
//                 setError("Failed to load teachers");        }
//         }
    
//         useEffect(() => {
//             fetchTeachers();
//         }, []);
    
//         console.log("teachers is ",teachers);

//                    useEffect(()=>{
//                         const fetchSubject = async()=>{
//                             const subjectId = params.subjectId;
//                             console.log("subject id is",subjectId);
//                             const res = await fetch(`/api/subject/get-Subject/${subjectId}`);
//                             const data = await res.json();
                
//                             if(data.success === false){
//                                 console.log(data.message);
//                              }
                
//                              setSubjectData(data);
//                         }
                
//                         fetchSubject();
//                     },[])
        
//         console.log("Subject data is",subjectData);

//         const handleSubmit = async(e)=>{

//             e.preventDefault();
//             const payload = {
//                 teacherId:selectedTeacher._id,
//                 teachername:selectedTeacher.name,
//                 subjectId:params.subjectId,
//                 subjectname:subjectData.name,
//             };

//             console.log('Submitting',payload);

//             try{
            
//                 setLoading(true);
//                 setSuccessMessage(null);
//                 const res = await fetch('/api/teacher/assign-subject',{
    
//                     method:'POST',
//                     headers:{
//                         'Content-Type':'application/json',
    
//                     },
//                     body:JSON.stringify(payload),
    
//                 });

//                 if (!res.ok) {
//                     const errorData = await res.json();
//                     throw new Error(errorData.message || "Something went wrong!");
//                 }

    
//                 const data = await res.json();
//                 if(data.success===false){
//                  setLoading(false);
//                  setError(data.message);
               
//                  return;
//                 }
    
//                 // loading
//           setLoading(false);
//           setError(null);
//           setSuccessMessage("Teacher assigned successfully! ✅")
//           setTimeout(()=>{
        
//             navigate('/add-class');
//           },3000);
          

//          console.log(data);
    
//             }catch(error){
    
//                 setLoading(false);
//                 setError(error.message);
//                 setTimeout(() => setError(null), 3000);
    
//             }
    
//         }

//         const handleRemoveTeacher = async () => {
//             if (!subjectData?.teacher?._id) {
//               return alert("No teacher assigned to remove.");
//             }
        
//             const teacherId = subjectData.teacher._id;
//             const subjectId = subjectData._id;
        
//             setLoading(true);
//             try {
//               const response = await fetch("/api/teacher/remove-teacher-toSubject", {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ teacherId, subjectId }),
//               });
        
//               const data = await response.json();
//               if (!response.ok) {
//                 throw new Error(data.message || "Failed to remove teacher");
//               }
        
//               alert("Teacher removed from subject successfully!");
        
//               // Optional: Refresh subject data to show updated info
//               if (typeof refreshSubject === "function") {
//                 refreshSubject();
//               }
//             } catch (error) {
//               console.error("Error removing teacher:", error);
//               alert(error.message);
//             } finally {
//               setLoading(false);
//             }
//           };
        
//         console.log('Subject name is ',subjectData.name);
//         console.log('Subject id is ',params.subjectId);
//         console.log('selected teacher is ',selectedTeacher);
//        console.log('Selected Teacher name is',selectedTeacher.name);
//        console.log('Selected Teacher id is',selectedTeacher.id);

//   return (


//       <div className='flex h-screen  space-x-8'>

//            <div className='w-64 bg-slate-200 shadow-xl'>
//                  <AdminHeader />
//                </div>
             

        
//          {error && <p className='text-red-500 mt-5' >{error}</p>}  
//          {successMessage && <p className='text-green-700 mt-5'>{successMessage}</p>}

//      <div className='flex-1 min-h-screen border border-gray-200 shadow-2xl  bg-white p-6 text-black'>

       
//  <main className='p-3 min-h-screen flex justify-between  bg-[#001220]'>

 
// {/* left div */}
// <div className=' mt-14 ml-10 max-w-[550px] w-[480px] h-[400px] bg-[#333F5C] rounded-3xl border mr-2 border-white'>



// <form onSubmit={handleSubmit} >
// <h1 className=' text-center mt-10 text-[#A4B5D1] text-2xl uppercase'> Subject Credentials</h1>
// <div className='flex flex-col p-2 ml-10 mt-8 gap-4 border-white rounded-lg  '>
//           {/* <label className='text-xl mt-1  text-white mb-4'> Teacher Name:</label> */}
//           <input
//             type='text'
//             maxLength={30}
//             placeholder='name' id='name' 
//             onChange={handleChange}
//             value={subjectData.name || ''}
//             className='w-[350px] italic text-black bg-white text-xl p-2 rounded-md ml-2 mb-4'
//           />

         
       
// </div>
//  {/* teacher dropdown */}

//  <div  className='flex flex-col p-2 ml-12 mb-8  border-white rounded-lg  ' >
  
 
//  <select
//     id="teacher"
//     onChange={handleTeacherChange}
//     value={selectedTeacher?._id || ""}
//     className="w-[350px] italic text-black bg-white text-xl p-2 rounded-md"
// >
//     <option value="" disabled>Select a Teacher</option>
//     {teachers.map((teacher) => (
//         <option key={teacher._id} value={teacher._id}>
//             {teacher.name}
//         </option>
//     ))}
// </select>

  

//  </div>


// <div className='ml-14 mt-3  '>
//  <button disabled={loading} className='bg-blue-500 text-bold text-white p-3 w-[350px] rounded-lg uppercase text-center hover:opacity-95 ' >
//        {loading ? 'Saving': 'Save'}
//      </button>

// </div>

 

// </form>

//    </div>

// {/* right div */}

// <div className="p-6 bg-white h-[450px] w-[550px] mt-16 mr-14 shadow-lg rounded-lg border border-gray-200">
//   <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Assigned Subject to Teacher</h1>

//   <div className="flex flex-col gap-4">
   
//     {/* Assigned Class */}
//     <div className="bg-gray-100 p-4 rounded-md shadow-sm">
//       <h3 className="text-lg font-semibold text-gray-700"> Subject</h3>
//       {subjectData?.classId ? (  // Ensure classId exists
//         <p className="text-gray-700 font-medium p-2 bg-gray-300 rounded-md shadow-sm">
//           {subjectData.name}
//         </p>
//       ) : (
//         <p className="text-gray-500 mt-2">No assigned subject</p>
//       )}
//     </div>

//     {/* Assigned Teacher */}
//     <div className="bg-blue-100 p-4 rounded-md shadow-sm">
//       <h3 className="text-lg font-semibold text-gray-700">Assigned Teacher:</h3>
      
//       <p className="text-xl font-bold text-blue-700 mt-1">
//         {subjectData?.teacher?.name || "No teacher assigned"}
//       </p>

//     </div>
//     <div className="mt-4">
//         {subjectData?.teacher?._id && (
//           <button
//             onClick={handleRemoveTeacher}
//             className="text-red-500 border border-red-500 px-3 py-1 rounded hover:bg-red-500 hover:text-white transition"
//             disabled={loading}
//           >
//             {loading ? "Removing..." : "Remove Teacher"}
//           </button>
//         )}
//       </div>
    
//   </div>

// </div>

 

//  </main>
       
//  </div>  




 
//     </div>
//   )
// }


import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminHeader } from '../components/AdminHeader';

export const AssingTeacher = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subjectData, setSubjectData] = useState({ name: '' });
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');

  const adminId = currentUser._id;

  const handleChange = (e) => {
    setSubjectData({ ...subjectData, [e.target.id]: e.target.value });
  };

  const handleTeacherChange = (e) => {
    const selected = teachers.find((t) => t._id === e.target.value);
    setSelectedTeacher(selected || {});
  };

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await fetch(`/api/teacher/get-teachers/${adminId}`);
        const data = await res.json();
        setTeachers(data);
      } catch (err) {
        setError("Failed to load teachers");
      }
    };
    fetchTeachers();
  }, []);

  useEffect(() => {
    const fetchSubject = async () => {
      const subjectId = params.subjectId;
      const res = await fetch(`/api/subject/get-Subject/${subjectId}`);
      const data = await res.json();
      if (!data.success) console.log(data.message);
      else setSubjectData(data);
    };
    fetchSubject();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      teacherId: selectedTeacher._id,
      teachername: selectedTeacher.name,
      subjectId: params.subjectId,
      subjectname: subjectData.name,
    };

    try {
      setLoading(true);
      setSuccessMessage(null);

      const res = await fetch('/api/teacher/assign-subject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Something went wrong!");
      }

      const data = await res.json();
      setLoading(false);
      setSuccessMessage("Teacher assigned successfully! ✅");
      setTimeout(() => navigate('/add-class'), 3000);
    } catch (err) {
      setLoading(false);
      setError(err.message);
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleRemoveTeacher = async () => {
    if (!subjectData?.teacher?._id) return alert("No teacher assigned to remove.");
    const teacherId = subjectData.teacher._id;
    const subjectId = subjectData._id;

    try {
      setLoading(true);
      const response = await fetch("/api/teacher/remove-teacher-toSubject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teacherId, subjectId }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to remove teacher");

      alert("Teacher removed from subject successfully!");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-full lg:w-64 bg-slate-200 shadow-xl">
        <AdminHeader />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-600">{successMessage}</p>}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Section */}
          <div className=" bg-white border-gray-400 border  rounded-3xl w-full max-w-xl p-6">
            <h1 className="text-center text-[#A4B5D1] text-2xl font-semibold mb-4 uppercase">Subject Credentials</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                id="name"
                placeholder="Subject Name"
                value={subjectData.name || ''}
                onChange={handleChange}
                className="w-full p-3 text-lg border rounded-md"
                maxLength={30}
              />

              <select
                id="teacher"
                onChange={handleTeacherChange}
                value={selectedTeacher?._id || ""}
                className="w-full p-3 text-lg border rounded-md"
              >
                <option value="" disabled>Select a Teacher</option>
                {teachers.map((teacher) => (
                  <option key={teacher._id} value={teacher._id}>
                    {teacher.name}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg uppercase"
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            </form>
          </div>

          {/* Display Section */}
          <div className="bg-white rounded-3xl border shadow-md w-full max-w-xl p-6">
            <h2 className="text-2xl text-center font-bold text-gray-800 mb-6">Assigned Subject to Teacher</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Subject:</h3>
                <p className="p-2 bg-gray-100 rounded-md">{subjectData.name || 'No Subject'}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700">Assigned Teacher:</h3>
                <p className="text-xl text-blue-700 font-semibold mt-1">
                  {subjectData?.teacher?.name || 'No teacher assigned'}
                </p>
              </div>

              {subjectData?.teacher?._id && (
                <button
                  onClick={handleRemoveTeacher}
                  disabled={loading}
                  className="text-red-600 border border-red-600 px-4 py-2 rounded hover:bg-red-600 hover:text-white transition"
                >
                  {loading ? "Removing..." : "Remove Teacher"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
