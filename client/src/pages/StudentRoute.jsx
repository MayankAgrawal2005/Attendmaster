// import React from 'react'
// import { Link ,useNavigate} from 'react-router-dom';
// import { useState,useEffect } from 'react';
// import { AdminHeader } from '../components/AdminHeader';
// import { useParams } from 'react-router-dom';
// import { MdCancel } from "react-icons/md";
// import * as XLSX from 'xlsx';
// export const StudentRoute = () => {

//            const [loading,setLoading]=useState(false);
//             const [error,setError]=useState(false);
//             const [refresh, setRefresh] = useState(false);
//             const [isModalOpen, setIsModalOpen] = useState(false); 
//             const [studentData,setStudentData] = useState({
//                 name:'',
//                 enrollmentNumber:'',
//                 email:'',
//             })

            
//             const [classData,setClassData]= useState({
//               name:'',
//             })

            

//             const [students,setStudents]=useState([]);
//             const navigate = useNavigate();
//             const params = useParams();
//             const classId = params.classId;

//             const handleChange=(e)=>{
//                 setStudentData({
//                     ...studentData,
//                     [e.target.id]:e.target.value,
//                 })
//             }



//             const handleSubmit = async(e)=>{

//                  e.preventDefault();
            
//                     try{
            
//                         setLoading(true);
//                         const res = await fetch('/api/student/addandassignStudentToclass',{
            
//                             method:'POST',
//                             headers:{
//                                 'Content-Type':'application/json',
            
//                             },
//                             body:JSON.stringify({
//                                 ...studentData,
//                                  classId,
//                             }),
            
//                         });
            
//                         const data = await res.json();
//                         if(data.success===false){
//                          setLoading(false);
//                          setError(data.message);
                       
//                          return;
//                         }
            
//                         // loading
//                   setLoading(false);
//                   setError(null);
//                   setIsModalOpen(false);
//                   setRefresh(prev => !prev);
//                  console.log(data);
            
//                     }catch(error){
            
//                         setLoading(false);
//                         setError(error.message);

//                         setTimeout(() => {
//                           setError("");
//                       }, 3000);
                  
            
//                     }
            
             

//             }
//             console.log("Student data",studentData);

//             useEffect(()=>{
//                         const fetchClass = async()=>{
//                             const classId = params.classId;
//                             console.log("class id is",classId);
//                             const res = await fetch(`/api/class/get-class/${classId}`);
//                             const data = await res.json();
                
//                             if(data.success === false){
//                                 console.log(data.message);
//                              }
                
//                              setClassData(data);
//                         }
                
//                         fetchClass();
//                     },[])


//                      console.log("classData is",classData);
          


//                const fetchStudents = async()=>{
//                      try{
             
//                          const res = await fetch(`/api/student/get-studentbyClass/${classId}`);
//                          const data = await res.json();
//                          setStudents(data);
             
//                      }catch(error){
//                          setError("Failed to load teachers");        }
//                  }
             
//                  useEffect(() => {
//                     fetchStudents();
//                  }, [refresh]);
            
//                  console.log("students is",students);

             

//                  const handleFileUpload = async (e) => {
//                   const file = e.target.files[0];
//                   if (!file) return;
              
//                   console.log("Selected File:", file.name); // 🛠️ Debugging Step
              
//                   const allowedExtensions = [".csv", ".xlsx", ".xls"];
//                   const allowedMimeTypes = [
//                       "text/csv",
//                       "application/vnd.ms-excel",
//                       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//                   ];
              
//                   const fileName = file.name.toLowerCase();
//                   const fileExtension = fileName.slice(fileName.lastIndexOf('.'));
//                   const isValidExtension = allowedExtensions.some(ext => fileName.trim().endsWith(ext));
//                   const isValidMimeType = allowedMimeTypes.includes(file.type);
              
//                   console.log("File Extension:", fileExtension); // 🛠️ Debugging Step
//                   console.log("File MIME Type:", file.type); // 🛠️ Debugging Step
//                   console.log("Extension Validation Result:", isValidExtension); // 🛠️ Debugging Step
//                   console.log("MIME Type Validation Result:", isValidMimeType); // 🛠️ Debugging Step
              
//                   if (!isValidExtension || !isValidMimeType) {
//                       alert("Please upload a valid CSV or Excel file.");
//                       return;
//                   }
              
//                   const formData = new FormData();
//                   formData.append("file", file); // Append the file
//                   formData.append("classId", classId); // Append classId
              
//                   try {
//                       setLoading(true);
              
//                       // Send file to backend
//                       const res = await fetch("/api/student/add-students", {
//                           method: "POST",
//                           body: formData, // No need to set Content-Type header for FormData
//                       });
              
//                       const responseData = await res.json();
//                       console.log("API Response:", responseData); // 🛠️ Debugging Step
              
//                       if (!res.ok) {
//                           throw new Error(responseData.message || "Failed to upload students.");
//                       }
              
//                       setRefresh(prev => !prev);
//                       alert("Students uploaded successfully!");
              
//                   } catch (error) {
//                       console.error("File Upload Error:", error);
//                       alert(error.message || "An error occurred while uploading students.");
//                   } finally {
//                       setLoading(false);
//                   }
//               };
//   return ( 
//     <div className='flex   space-x-8' >

//     <div className='w-64 overflow-y-auto bg-slate-200 min-h-screen shadow-xl'>
//           <AdminHeader />
//         </div>
     
//   <div className='flex-1 min-h-screen border border-gray-200 shadow-2xl  bg-white p-6 text-black'>

//   <div className='flex justify-between'>
//  <h1 className='text-2xl mt-2'>Student Management</h1>
//  {error && <p className='text-red-500 mt-5' >{error}</p>}

//       <button
//          onClick={() => setIsModalOpen(true)}
//          className='bg-blue-500 text-white w-[200px] h-[60px] p-2 rounded-lg hover:bg-blue-600'
//        >
//         +  Add Student
//        </button>

//        <label className="bg-green-500 text-white w-[200px] h-[60px] p-2 rounded-lg hover:bg-green-600 flex items-center justify-center cursor-pointer">
//                             Upload Students
//                             <input type="file" accept=".xlsx, .xls, .csv" className="hidden" onChange={handleFileUpload} />
//                         </label>
//  </div>

  
//   <main className='p-3 min-h-screen flex justify-between  bg-white'>


//     {/* left div */}

// {isModalOpen && (



// <div className='fixed inset-0  bg-opacity-100 '>

// <div className='fixed inset-0 flex justify-center items-center'>

//  <div className=' p-6  rounded-lg w-[500px]'>

 
//   <div className=' mt-14 ml-10 max-w-[550px] w-[480px] h-[475px] bg-white rounded-3xl border border-black mr-2 '>

// <form onSubmit={handleSubmit} >

// <div className='flex justify-end'>
// <button className='p-2  '
// onClick={()=>setIsModalOpen(false)}>
// <MdCancel className=' w-[24px] h-[40px]' />
// </button>
// </div>

// <h1 className=' p-2 ml-5 text-2xl '> Add new Student</h1>
// <p className='ml-6 text-gray-500'>Enter the details of the new Students below</p>
// <div className='flex flex-col p-2 ml-10 mt-8 gap-4 border-white rounded-lg  '>
//           {/* <label className='text-xl mt-1  text-white mb-4'> Teacher Name:</label> */}
//           <input
//             type='text'
//             maxLength={30}
//             placeholder='name' id='name' 
//             onChange={handleChange}
           
//             className='w-[350px] italic text-black border bg-white text-xl p-2 rounded-md ml-2 mb-4'
//           />

//           <input
//             type='text'
//             maxLength={12}
//             placeholder='enrollmentNumber' id='enrollmentNumber' 
//             onChange={handleChange}
           
//             className='w-[350px] italic text-black border bg-white text-xl p-2 rounded-md ml-2 mb-4'
//           />

//             <input
//             type='text'
//             maxLength={30}
//             placeholder='email' id='email' 
//             onChange={handleChange}
           
//             className='w-[350px] italic text-black border bg-white text-xl p-2 rounded-md ml-2 mb-4'
//           />

       
//         </div>


// <div className='ml-14 mt-3  '>
//  <button disabled={loading} className='bg-blue-500 text-bold text-white p-3 w-[350px] rounded-lg uppercase text-center hover:opacity-95 ' >
//        {loading ? 'Saving': 'Add Student'}
//      </button>

// </div>

// </form>

//    </div>
//    </div>

//    </div>

//    </div>

//   )}

// {/* 
// right div */}

// <div className='flex flex-col  w-full gap-4'>

//   <div className="mt-4 p-3 w-full h-full text-white border border-gray-300 rounded-2xl  ">
//                     <h2 className="text-2xl text-black p-3"> {classData.name} - Student List</h2>
//                     <p className='text-gray-400 p-3'>Manage and view all students in the system</p>
//                     {students.length === 0 ? (
//                         <p>No Studnet added yet.</p>

//                     ) : (

//                         <table className='w-full ml-4 border  border-gray-300  bg-white  shadow-md'>

//                         <thead className=' text-gray-600  border border-gray-300'>
//         <tr>
//           <th className='p-3 text-left'>Name</th>
//           <th className='p-3 text-left'>Enrollment</th>
//           <th className='p-3 text-left'>Email</th>
//           <th className='p-3 text-left'>Actions</th>
//           <th className='p-3 text-left'>Code</th>
//         </tr>
//       </thead>
//                         <tbody>

                       
         
//                             {students.map((student, index) => (

                                
//                               <tr 
//                               key={index}
//                               className='border-b border-gray-200 hover:bg-gray-50 transition-colors' >

//                         <td className=" p-3   text-black">{student.name}</td>

//                         <td className=" p-3   text-black">{student.enrollmentNumber}</td>

//                         <td className=" p-3   text-black">{student.email}</td>
   
    
    
    
//                             <td className='p-3 flex items-center space-x-2'>
//                                  <Link to={`/update-student/${student._id}`}>
//                                 <div className="group  text-center">
//                                   <button className="bg-gray-200 hover:bg-gray-700 text-black p-2 rounded transition">
//                                     Update
//                                   </button>
//                                      </div>
//                                      </Link>
                                 
//                                      </td> 

//                                      <td className=" p-3   text-black">{student.code}</td>
                          

//                                  </tr>
//                                           ))}
//                                           </tbody>       
//                                           </table>            )}
//      </div>

//    </div>
  
//   </main>
//   </div>


//     </div>
//   )
// }

// (Keep your existing imports)
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AdminHeader } from '../components/AdminHeader';
import { MdCancel } from "react-icons/md";

export const StudentRoute = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [studentData, setStudentData] = useState({
    name: '',
    enrollmentNumber: '',
    email: '',
  });

  const [classData, setClassData] = useState({ name: '' });
  const [students, setStudents] = useState([]);

  const navigate = useNavigate();
  const { classId } = useParams();

  const handleChange = (e) => {
    setStudentData({ ...studentData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/student/addandassignStudentToclass', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...studentData, classId }),
      });

      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }

      setIsModalOpen(false);
      setRefresh((prev) => !prev);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(""), 3000);
      setLoading(false);
    }
  };

  const fetchClass = async () => {
    const res = await fetch(`/api/class/get-class/${classId}`);
    const data = await res.json();
    setClassData(data);
  };

  const fetchStudents = async () => {
    try {
      const res = await fetch(`/api/student/get-studentbyClass/${classId}`);
      const data = await res.json();
      setStudents(data);
    } catch {
      setError("Failed to load students");
    }
  };

  useEffect(() => {
    fetchClass();
    fetchStudents();
  }, [refresh]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-full lg:w-64 bg-slate-200 shadow-lg">
        <AdminHeader />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <div className="flex flex-col mt-10 sm:flex-row justify-between  sm:items-center  gap-4 mb-6">
          <h1 className="text-2xl text-center">Student Management</h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-[200px]"
            >
              + Add Student
            </button>

            <label className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full sm:w-[200px] text-center cursor-pointer">
              Upload Students
              <input
                type="file"
                accept=".xlsx, .xls, .csv"
                className="hidden"
                onChange={() => {}}
              />
            </label>
          </div>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-auto p-6 relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-3"
              >
                <MdCancel className="w-6 h-6 text-gray-600" />
              </button>

              <h2 className="text-xl font-semibold mb-2">Add New Student</h2>
              <p className="text-sm text-gray-500 mb-4">
                Enter the details below
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  id="name"
                  placeholder="Name"
                  maxLength={30}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded"
                />
                <input
                  type="text"
                  id="enrollmentNumber"
                  placeholder="Enrollment Number"
                  maxLength={12}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded"
                />
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  maxLength={30}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded"
                />
                <button
                  disabled={loading}
                  className="bg-blue-500 w-full text-white p-3 rounded hover:bg-blue-600"
                >
                  {loading ? "Saving..." : "Add Student"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Student Table */}
        <div className="mt-8 bg-white rounded-xl border border-gray-200 shadow-md overflow-auto">
          <h2 className="text-xl font-semibold p-4">{classData.name} - Student List</h2>
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 text-gray-600 border-b">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Enrollment</th>
                <th className="p-3">Email</th>
                <th className="p-3">Actions</th>
                <th className="p-3">Code</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">
                    No students added yet.
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student._id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{student.name}</td>
                    <td className="p-3">{student.enrollmentNumber}</td>
                    <td className="p-3">{student.email}</td>
                    <td className="p-3">
                      <Link to={`/update-student/${student._id}`}>
                        <button className="bg-gray-200 hover:bg-gray-700 text-black hover:text-white px-3 py-1 rounded">
                          Update
                        </button>
                      </Link>
                    </td>
                    <td className="p-3">{student.code}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
