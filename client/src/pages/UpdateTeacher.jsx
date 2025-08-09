// import React from 'react';
// import { useState,useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate,useParams } from 'react-router-dom';

// export const UpdateTeacher = () => {

//     const [error,setError]=useState(false);
//     const [loading,setLoading] = useState(false);
//       const [formData,setFormData] = useState({
//             name:'',
//             email:'',
//         })

//     const navigate = useNavigate();
//     const params = useParams();

//     const handleChange=(e)=>{
//         setFormData({
//             ...formData,
//             [e.target.id]:e.target.value,
//         })

//     }

//     useEffect(()=>{
//         const fetchTeacher = async()=>{
//             const teacherId = params.teacherId;
//             console.log("Teacher id is",teacherId);
//             const res = await fetch(`/api/teacher/get-teacher/${teacherId}`);
//             const data = await res.json();

//             if(data.success === false){
//                 console.log(data.message);
//              }

//              setFormData(data);
//         }

//         fetchTeacher();
//     },[])

//     const handleSubmit = async(e)=>{
//         e.preventDefault();
//         try{

//             setLoading(true);
//             setError(false);
//             const res = await fetch(`/api/teacher/update-teacher/${params.teacherId}`,{

//                 method:'POST',
//                 headers:{
//                     'Content-Type':'application/json',

//                 },
//                 body:JSON.stringify({
//                     ...formData,
//                 }),

//             });
//             const data = await res.json();
//             setLoading(false);
//             if(data.success == false){
//              setError(data.message);

//             }

//              navigate('/add-teacher');

//         }catch(error){

//             setLoading(false);
//             setError(error.message);
//         }

//     }

//     const handleDelete=async(teacherId)=>{
        
//         try{
//             const res = await fetch(`/api/teacher/delete-teacher/${teacherId}`,{
//                 method:'DELETE'
//             });

//             const data = await res.json();
//             if(data.success===false){
//               console.log(data.message);
//               return; }
//         navigate('/add-teacher');      
            
//         }catch(error){
//             console.log(error.message);
//         }

//     }
   

//     console.log( 'formdata is',formData);
//   return (

    

    
//     <div className='  border border-gray-400 h-[450px] mt-24 rounded-2xl w-[550px] mx-auto flex justify-center '>

// <div className=' mt-12   max-w-[550px] w-[480px]  h-[350px]  rounded-3xl border border-gray-400 mr-2 '>

// <form onSubmit={handleSubmit} >
// <h1 className=' ml-10 mt-10 text-black text-2xl '> Update Teacher </h1>
// <div className='flex flex-col p-2 ml-10 mt-8 gap-4 border-white rounded-lg  '>
//           {/* <label className='text-xl mt-1  text-white mb-4'> Teacher Name:</label> */}
//           <input
//             type='text'
//             maxLength={30}
//             placeholder='name' id='name' onChange={handleChange}
//             value={formData.name || ''}
//            required
//             className='w-[350px] italic text-black border  bg-white text-xl p-2 rounded-md ml-2 mb-4'
//           />

//        {/* <label className='text-xl mt-1  text-white mb-4'>Email:</label> */}
//           <input
//             type='text'
//             maxLength={50}
//             placeholder='email' id='email' onChange={handleChange}
//             value={formData.email || ''}
//            required
//             className='w-[350px] italic border   text-black bg-white text-xl p-2 rounded-md ml-2 mb-4'
//           />
//         </div>


// <div className='ml-14 mt-3 flex gap-14  '>
//  <button disabled={loading} className='bg-green-500 text-bold text-white p-3 w-[150px] rounded-lg uppercase text-center hover:opacity-95 ' >
//        {loading ? 'Updating': 'Update'}
//      </button>

//      <button disabled={loading} onClick={()=>handleDelete(formData._id)} className='bg-red-500 text-bold text-white p-3 w-[150px] rounded-lg uppercase text-center hover:opacity-95 ' >
//        {loading ? 'Deleting': 'Delete'}
//      </button>  



// </div>

// </form>

//    </div>
//    {error && <p className='text-red-500 mt-5' >{error}</p>}
//     </div>
    
//   )
// }
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export const UpdateTeacher = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const navigate = useNavigate();
  const params = useParams();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const res = await fetch(`/api/teacher/get-teacher/${params.teacherId}`);
        const data = await res.json();

        if (data.success === false) {
          console.log(data.message);
        } else {
          setFormData(data);
        }
      } catch (err) {
        console.error("Error fetching teacher:", err);
      }
    };

    fetchTeacher();
  }, [params.teacherId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/teacher/update-teacher/${params.teacherId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
        return;
      }

      navigate('/add-teacher');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const handleDelete = async (teacherId) => {
    try {
      const res = await fetch(`/api/teacher/delete-teacher/${teacherId}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (data.success === false) {
        console.log(data.message);
        return;
      }

      navigate('/add-teacher');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 py-10 bg-gray-50">
      <div className="w-full max-w-xl bg-white border border-gray-300 rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-center mb-6">Update Teacher</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            id="name"
            maxLength={30}
            required
            value={formData.name || ''}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-3 border border-gray-300 rounded-md text-black"
          />
          <input
            type="email"
            id="email"
            maxLength={50}
            required
            value={formData.email || ''}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-md text-black"
          />

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
            <button
              disabled={loading}
              type="submit"
              className="bg-green-500 w-full sm:w-1/2 text-white p-3 rounded-md uppercase hover:bg-green-600 transition"
            >
              {loading ? 'Updating...' : 'Update'}
            </button>

            <button
              disabled={loading}
              type="button"
              onClick={() => handleDelete(formData._id)}
              className="bg-red-500 w-full sm:w-1/2 text-white p-3 rounded-md uppercase hover:bg-red-600 transition"
            >
              {loading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </form>

        {error && (
          <p className="text-center text-red-500 mt-4">{error}</p>
        )}
      </div>
    </div>
  );
};
