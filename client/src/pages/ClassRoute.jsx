// import React from 'react';
// import { useEffect,useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { AdminHeader } from '../components/AdminHeader';
// import { Navigate } from 'react-router-dom';
// import { MdCancel } from "react-icons/md";
// import { useSelector } from 'react-redux';
// export const ClassRoute = () => {
//       const navigate = useNavigate();
//        const [loading,setLoading]=useState(false);
//         const [error,setError]=useState(false);
//         const [classes,setClasses]=useState([]);
//           const {currentUser} = useSelector(state=>state.user);
//         const [isModalOpen, setIsModalOpen] = useState(false);
//  const [refresh, setRefresh] = useState(false);
//         const [classData,setClassData] = useState({
//             name:'',
        
//         })

//         const adminId = currentUser._id;
//         console.log('admin ID is',adminId);

//         const handleChange=(e)=>{
//             setClassData({
//                 ...classData,
//                 [e.target.id]:e.target.value,
//             })
//         }
    
// console.log('class data is ',classData);
//     const handleSubmit = async(e)=>{

//         e.preventDefault();

//         try{

//             setLoading(true);
//             const res = await fetch('/api/class/create',{

//                 method:'POST',
//                 headers:{
//                     'Content-Type':'application/json',

//                 },
//                 body:JSON.stringify({
//                   ...classData,
//                   adminId
//                 }),

//             });

//             const data = await res.json();
//             if(data.success===false){
//              setLoading(false);
//              setError(data.message);
           
//              return;
//             }

//             // loading
//       setLoading(false);
//       setError(null);
//       setIsModalOpen(false);
//       setRefresh(prev => !prev);
//      console.log(data);

//         }catch(error){

//             setLoading(false);
//             setError(error.message);

//             setTimeout(() => {
//               setError("");
//           }, 3000);
      

//         }

//  }



//    const fetchClasses = async()=>{
//          try{
 
//              const res = await fetch(`/api/class/all/${adminId}`);
//              const data = await res.json();
//              setClasses(data);
 
//          }catch(error){
//              setError("Failed to load Classes");        }
//      }
 
//      useEffect(() => {
//         fetchClasses();
//      }, [classes]);

//      console.log("classes is",classes);

//      const handleSelectChange = (event) => {
//       const selectedValue = event.target.value;
//       if (selectedValue) {
//         navigate(selectedValue);
//       }
//     };
    
//   return (
//     <div className='flex h-screen  space-x-8'>
//    <div className='w-64 overflow-y-auto bg-slate-200 shadow-xl'>
//            <AdminHeader />
//          </div>

//  <div className='flex-1 min-h-screen border border-gray-200 shadow-2xl  bg-white p-6 text-black'>

//  <div className='flex justify-between'>
//  <h1 className='text-2xl mt-2'>Class Management</h1>

// <button
//          onClick={() => setIsModalOpen(true)}
//          className='bg-blue-500 text-white w-[200px] h-[60px] p-2 rounded-lg hover:bg-blue-600'
//        >
//         +  Add Class
//        </button>
//  </div>
 
//    <main className='p-3 min-h-screen flex  bg-white '>

//    {isModalOpen && (

// <div className='fixed inset-0  bg-opacity-100 '>

// <div className='fixed inset-0 flex justify-center items-center '>

// <div className=' p-6  rounded-lg w-[500px]'>

//   <div className=' mt-14 ml-10 max-w-[550px] w-[480px] h-[425px]  bg-white border-black rounded-3xl border mr-2'>

// <form onSubmit={handleSubmit} >

// <div className='flex justify-end'>
// <button className='p-2  '
// onClick={()=>setIsModalOpen(false)}>
// <MdCancel className=' w-[24px] h-[40px]' />
// </button>
// </div>

// <h1 className=' p-2 ml-5 text-2xl '> Add new Class</h1>
// <p className='ml-6 text-gray-500'>Enter the details of the new Class below</p>
// <div className='flex flex-col p-2 ml-10 mt-8 gap-4 border-white rounded-lg  '>
//           {/* <label className='text-xl mt-1  text-white mb-4'> Teacher Name:</label> */}
//           <input
//             type='text'
//             maxLength={30}
//             placeholder='name' id='name' 
//             onChange={handleChange}
           
//             className='w-[350px] italic text-black border  text-xl p-2 rounded-md ml-2 mb-4'
//           />

       
//         </div>


// <div className='ml-14 mt-3  '>
//  <button disabled={loading} className='bg-blue-500 text-bold text-white p-3 w-[350px] rounded-lg uppercase text-center hover:opacity-95 ' >
//        {loading ? 'Saving': 'Add Class'}
//      </button>

// </div>

// </form>

//    </div>
//    </div>

//    </div>

// </div>
//    )}
// {/* right side */}

//   <div className='flex flex-col   w-full gap-4'>

//   <div className="mt-10 p-3 w-full h-full text-white border border-gray-300 rounded-2xl  ">
                    
//                     <h2 className="text-2xl text-black p-3">class directory</h2>
//                     <p className='text-gray-400 p-3'>Manage and view all classes in the system</p>
//                     {classes.length === 0 ? (
//                         <p>No Class added yet.</p>

//                     ) : (
//                           <table className='w-full ml-4 border  border-gray-300  bg-white  shadow-md'>

//                           <thead className=' text-gray-600  border border-gray-300'>
//         <tr>
//           <th className='p-3 text-left'>Name</th>
          
//           <th className='p-3 text-left'>Actions</th>

//           <th className='p-3 text-left'>Manage</th>
//         </tr>
//       </thead>

//                   <tbody>      
//                         {classes.map((clas, index) => (

//                               <tr
//                               key={index}
//                               className='border-b border-gray-200 hover:bg-gray-50 transition-colors'>

                             
                             
//                                  <td className=" p-3   text-black">{clas.name}</td>

                                
     
//                                  <td className=" p-3 flex items-center space-x-2" >
//                                  <Link to={`/update-class/${clas._id}`}> 
//                                 <div className="group  text-center">
//                                   <button className="bg-gray-200 text-black hover:bg-gray-700 p-2 rounded transition">
//                                     Update
//                                   </button>
//                                      </div>
//                                      </Link>
//                                      </td>
                                 
                               
// <td>
//     <div className=" ">
//                <select 
//         className="text-black border p-2 bg-white-500  cursor-pointer rounded-md"
//         onChange={handleSelectChange}
//         defaultValue="" 
//       >
//         <option value="" disabled>Manage Class</option>
//         <option value={`/add-student/${clas._id}`}>Add Student</option>
//         <option value={`/add-subject/${clas._id}`}>Add Subject</option>
//         <option value={`/view-class/${clas._id}`}>View Class</option>

//       </select>
//     </div>

//     </td>                       
                                   
//                                    </tr>       ))}
                                           

//                                              </tbody>      </table>  )}
//      </div>

//    </div>
  


//    </main>

// </div>

//    {error && <p className='text-red-500 mt-5' >{error}</p>}
//     </div>
//   )
// }

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AdminHeader } from '../components/AdminHeader';
import { MdCancel } from "react-icons/md";
import { useSelector } from 'react-redux';

export const ClassRoute = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [classes, setClasses] = useState([]);
  const { currentUser } = useSelector(state => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [classData, setClassData] = useState({ name: '' });

  const adminId = currentUser._id;

  const handleChange = (e) => {
    setClassData({
      ...classData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/class/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...classData, adminId }),
      });

      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }

      setLoading(false);
      setError(null);
      setIsModalOpen(false);
      setRefresh(prev => !prev);
    } catch (error) {
      setLoading(false);
      setError(error.message);
      setTimeout(() => setError(""), 3000);
    }
  };

  const fetchClasses = async () => {
    try {
      const res = await fetch(`/api/class/all/${adminId}`);
      const data = await res.json();
      setClasses(data);
    } catch (error) {
      setError("Failed to load Classes");
    }
  };

  useEffect(() => {
    fetchClasses();
  }, [refresh]);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue) {
      navigate(selectedValue);
    }
  };

  return (
    <div className="min-h-screen space-x-8 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="w-full lg:w-64 bg-slate-200 shadow-xl">
        <AdminHeader />
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-screen border border-gray-200 shadow-2xl bg-white p-4 sm:p-6 text-black">
        <div className="flex flex-col gap-3 mt-10 sm:flex-row sm:justify-between">
          <h1 className="text-xl md:text-2xl text-center  ">Class Management</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white w-full sm:w-48 h-12 rounded-lg hover:bg-blue-600"
          >
            + Add Class
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white w-[90%] max-w-md rounded-2xl p-6 relative">
              <button
                className="absolute top-3 right-3"
                onClick={() => setIsModalOpen(false)}
              >
                <MdCancel className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-bold mb-1">Add New Class</h1>
              <p className="text-gray-500 mb-6">Enter class details below</p>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  id="name"
                  placeholder="Class Name"
                  maxLength={30}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-md mb-4 text-black"
                />
                <button
                  disabled={loading}
                  className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
                >
                  {loading ? "Saving..." : "Add Class"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && <p className="text-red-500 mt-5">{error}</p>}

        {/* Class Table */}
        <div className="mt-10 bg-white border border-gray-300 rounded-2xl p-4">
          <h2 className="text-2xl text-black mb-1">Class Directory</h2>
          <p className="text-gray-500 mb-4">Manage and view all classes</p>

          {classes.length === 0 ? (
            <p className="text-gray-600">No classes added yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border border-gray-300 text-left">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="p-3">Name</th>
                    <th className="p-3">Actions</th>
                    <th className="p-3">Manage</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map((clas, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="p-3 text-black">{clas.name}</td>
                      <td className="p-3">
                        <Link to={`/update-class/${clas._id}`}>
                          <button className="bg-gray-200 hover:bg-gray-700 text-black hover:text-white p-2 rounded">
                            Update
                          </button>
                        </Link>
                      </td>
                      <td className="p-3">
                        <select
                          className="text-black border p-2 rounded-md"
                          onChange={handleSelectChange}
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Manage Class
                          </option>
                          <option value={`/add-student/${clas._id}`}>Add Student</option>
                          <option value={`/add-subject/${clas._id}`}>Add Subject</option>
                          <option value={`/view-class/${clas._id}`}>View Class</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
