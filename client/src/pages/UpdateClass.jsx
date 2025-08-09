// import React from 'react';
// import { Link,useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import { useEffect } from 'react';
// import { useParams } from 'react-router-dom';


// export const UpdateClass = () => {

//       const [error,setError]=useState(false);
//         const [loading,setLoading] = useState(false);
//      const [classData,setClassData] = useState(
//     {
//         name:'',
//     }
//    );

//    const navigate = useNavigate();
//    const params = useParams();

//     const handleChange=(e)=>{
//         setClassData({
//             ...classData,
//             [e.target.id]:e.target.value,
//         })
//     }

//      useEffect(()=>{
//             const fetchClass = async()=>{
//                 const classId = params.classId;
//                 console.log("classId is",classId);
//                 const res = await fetch(`/api/class/get-class/${classId}`);
//                 const data = await res.json();
    
//                 if(data.success === false){
//                     console.log(data.message);
//                  }
    
//                  setClassData(data);
//             }
    
//             fetchClass();
//         },[])


//         const handleSubmit = async(e)=>{
//             e.preventDefault();
//             try{
    
//                 setLoading(true);
//                 setError(false);
//                 const res = await fetch(`/api/class/update-class/${params.classId}`,{
    
//                     method:'POST',
//                     headers:{
//                         'Content-Type':'application/json',
    
//                     },
//                     body:JSON.stringify({
//                         ...classData,
//                     }),
    
//                 });
//                 const data = await res.json();
//                 setLoading(false);
//                 if(data.success == false){
//                  setError(data.message);
    
//                 }
    
//                  navigate('/add-class');
    
//             }catch(error){
    
//                 setLoading(false);
//                 setError(error.message);
//             }
    
//         }


//         const handleDelete=async(classId)=>{
        
//             try{
//                 const res = await fetch(`/api/class/delete-class/${classId}`,{
//                     method:'DELETE'
//                 });
    
//                 const data = await res.json();
//                 if(data.success===false){
//                   console.log(data.message);
//                   return; }
//             navigate('/add-class');      
                
//             }catch(error){
//                 console.log(error.message);
//             }
    
//         }
       

//   return (
//     <div className=' border border-gray-400 h-[450px] mt-24 rounded-2xl w-[550px] mx-auto flex justify-center '>

// <div className=' mt-12  max-w-[550px] w-[480px] border-gray-400 h-[350px]  rounded-3xl border mr-2 '>

// <form onSubmit={handleSubmit} >
// <h1 className='  ml-10 mt-10 text-black text-2xl '> Update Class</h1>
// <div className='flex flex-col p-2 ml-10 mt-8 gap-4 border-white rounded-lg  '>
//           {/* <label className='text-xl mt-1  text-white mb-4'> Teacher Name:</label> */}
//           <input
//             type='text'
//             maxLength={30}
//             placeholder='name' id='name' onChange={handleChange}
//             value={classData.name || ''}
//            required
//             className='w-[350px] italic text-black bg-white border text-xl p-2 rounded-md ml-2 mb-4'
//           />

      
         
//         </div>


// <div className='ml-14 mt-3 flex gap-14  '>
//  <button disabled={loading} className='bg-green-500 text-bold text-white p-3 w-[150px] rounded-lg uppercase text-center hover:opacity-95 ' >
//        {loading ? 'Updating': 'Update'}
//      </button>

//      <button disabled={loading} onClick={()=>handleDelete(classData._id)} className='bg-red-500 text-bold text-white p-3 w-[150px] rounded-lg uppercase text-center hover:opacity-95 ' >
//        {loading ? 'Deleting': 'Delete'}
//      </button>  



// </div>

// </form>

//    </div>
//     </div>
//   )
// }

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const UpdateClass = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [classData, setClassData] = useState({ name: '' });

  const navigate = useNavigate();
  const params = useParams();

  const handleChange = (e) => {
    setClassData({
      ...classData,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const res = await fetch(`/api/class/get-class/${params.classId}`);
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
        } else {
          setClassData(data);
        }
      } catch (err) {
        setError('Failed to load class data');
      }
    };
    fetchClass();
  }, [params.classId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/class/update-class/${params.classId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(classData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
        return;
      }
      navigate('/add-class');
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  const handleDelete = async (classId) => {
    try {
      const res = await fetch(`/api/class/delete-class/${classId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      navigate('/add-class');
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-50">
      <div className="w-full max-w-xl bg-white border border-gray-300 shadow-xl rounded-2xl p-6">
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-semibold text-center mb-2 text-gray-800">
            Update Class
          </h1>
          <p className="text-gray-500 text-center mb-6">
            Modify the class name and save your changes
          </p>

          <input
            type="text"
            id="name"
            placeholder="Enter class name"
            maxLength={30}
            value={classData.name}
            onChange={handleChange}
            required
            className="w-full p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-6"
          />

          {error && (
            <p className="text-center text-red-500 mb-4">{error}</p>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 text-white uppercase font-semibold py-3 px-6 rounded-md w-full sm:w-1/2 transition"
            >
              {loading ? 'Updating...' : 'Update'}
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => handleDelete(classData._id)}
              className="bg-red-500 hover:bg-red-600 text-white uppercase font-semibold py-3 px-6 rounded-md w-full sm:w-1/2 transition"
            >
              {loading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
