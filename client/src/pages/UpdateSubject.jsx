// import React from 'react'

// import { useState,useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate,useParams,useLocation } from 'react-router-dom';
// export const UpdateSubject = () => {

//     const [error,setError]=useState(false);
//             const [loading,setLoading] = useState(false);
//               const [subjectData,setSubjectData] = useState({
//                 name:'',
               
//                 })

//         const location = useLocation();
// const classId = location.state?.classId;
// console.log('class id is',classId);
//             const navigate = useNavigate();
//             const params = useParams();
        
//             const handleChange=(e)=>{
//                 setSubjectData({
//                     ...subjectData,
//                     [e.target.id]:e.target.value,
//                 })
        
//             }

//          useEffect(()=>{
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


//         // const classId = subjectData.classId ;
// //         const classId = subjectData.classId && typeof subjectData.classId === "object"
// //     ? subjectData.classId._id || subjectData.classId.id
// //     : subjectData.classId;

// // console.log("Extracted Class ID:", classId);
// // console.log('class id is',classId);



// const handleSubmit = async(e)=>{
//     e.preventDefault();
//     try{

//         setLoading(true);
//         setError(false);
//         const res = await fetch(`/api/subject/update-subject/${params.subjectId}`,{

//             method:'POST',
//             headers:{
//                 'Content-Type':'application/json',

//             },
//             body:JSON.stringify({
//                 ...subjectData,
//             }),

//         });
//         const data = await res.json();
//         setLoading(false);
//         if(data.success == false){
//          setError(data.message);

//         }

//          navigate(`/add-subject/${classId}`);
       

//     }catch(error){

//         setLoading(false);
//         setError(error.message);
//     }

// }


// const handleDelete=async(subjectId)=>{
    
//     try{
//         const res = await fetch(`/api/subject/delete-subject/${subjectId}`,{
//             method:'DELETE'
//         });

//         const data = await res.json();
//         if(data.success===false){
//           console.log(data.message);
//           return; }

//           navigate(`/add-subject/${classId}`); 
       
        
//     }catch(error){
//         console.log(error.message);
//     }

// }


// console.log("Subject data is",subjectData);

//   return (
//     <div>

//     <main className=' border border-gray-400  h-[450px] mt-24 rounded-2xl w-[550px] mx-auto flex justify-center'>
//     <div className='mt-12  max-w-[550px] w-[480px]  h-[350px]  rounded-3xl border border-gray-400 mr-2'>

// <form onSubmit={handleSubmit} >
// <h1 className='  ml-10 mt-10 text-black text-2xl '> Update Subject</h1>
// <div className='flex flex-col p-2 ml-10 mt-8 gap-4 border-white rounded-lg  '>
//           {/* <label className='text-xl mt-1  text-white mb-4'> Teacher Name:</label> */}
//           <input
//             type='text'
//             maxLength={30}
//             placeholder='name' id='name' 
//             onChange={handleChange}
//             value={subjectData.name || ''}
           
//             className='w-[350px] italic text-black bg-white border text-xl p-2 rounded-md ml-2 mb-4'
//           />

        
       
//         </div>


//         <div className='ml-14 mt-3 flex gap-14  '>
//  <button disabled={loading} className='bg-green-500 text-bold text-white p-3 w-[150px] rounded-lg uppercase text-center hover:opacity-95 ' >
//        {loading ? 'Updating': 'Update'}
//      </button>

//      <button disabled={loading} onClick={()=>handleDelete(subjectData._id)} className='bg-red-500 text-bold text-white p-3 w-[150px] rounded-lg uppercase text-center hover:opacity-95 ' >
//        {loading ? 'Deleting': 'Delete'}
//      </button>  



// </div>

// </form>

//    </div>
//     </main>
//     {error && <p className='text-red-500 mt-5' >{error}</p>}
//     </div>
//   )
// }

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

export const UpdateSubject = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subjectData, setSubjectData] = useState({
    name: '',
  });

  const location = useLocation();
  const classId = location.state?.classId;
  const navigate = useNavigate();
  const params = useParams();

  const handleChange = (e) => {
    setSubjectData({
      ...subjectData,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const subjectId = params.subjectId;
        const res = await fetch(`/api/subject/get-Subject/${subjectId}`);
        const data = await res.json();

        if (data.success === false) {
          console.log(data.message);
        } else {
          setSubjectData(data);
        }
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchSubject();
  }, [params.subjectId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/subject/update-subject/${params.subjectId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subjectData),
      });

      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      } else {
        navigate(`/add-subject/${classId}`);
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const handleDelete = async (subjectId) => {
    try {
      const res = await fetch(`/api/subject/delete-subject/${subjectId}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      navigate(`/add-subject/${classId}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-2">Update Subject</h2>
        <p className="text-center text-gray-500 mb-6">Modify the subject name and save your changes</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            maxLength={30}
            placeholder="Subject Name"
            id="name"
            onChange={handleChange}
            value={subjectData.name || ''}
            required
            className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg w-full"
            >
              {loading ? 'Updating...' : 'Update'}
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => handleDelete(subjectData._id)}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg w-full"
            >
              {loading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </form>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
};
