

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// export const UpdateClass = () => {
//   const [error, setError] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [classData, setClassData] = useState({ name: '' });

//   const navigate = useNavigate();
//   const params = useParams();

//   const handleChange = (e) => {
//     setClassData({
//       ...classData,
//       [e.target.id]: e.target.value,
//     });
//   };

//   useEffect(() => {
//     const fetchClass = async () => {
//       try {
//         const res = await fetch(`/api/class/get-class/${params.classId}`);
//         const data = await res.json();
//         if (data.success === false) {
//           console.log(data.message);
//         } else {
//           setClassData(data);
//         }
//       } catch (err) {
//         setError('Failed to load class data');
//       }
//     };
//     fetchClass();
//   }, [params.classId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       setError(false);
//       const res = await fetch(`/api/class/update-class/${params.classId}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(classData),
//       });
//       const data = await res.json();
//       setLoading(false);
//       if (data.success === false) {
//         setError(data.message);
//         return;
//       }
//       navigate('/add-class');
//     } catch (err) {
//       setLoading(false);
//       setError(err.message);
//     }
//   };

//   const handleDelete = async (classId) => {
//     try {
//       const res = await fetch(`/api/class/delete-class/${classId}`, {
//         method: 'DELETE',
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         console.log(data.message);
//         return;
//       }
//       navigate('/add-class');
//     } catch (err) {
//       console.log(err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-50">
//       <div className="w-full max-w-xl bg-white border border-gray-300 shadow-xl rounded-2xl p-6">
//         <form onSubmit={handleSubmit}>
//           <h1 className="text-2xl font-semibold text-center mb-2 text-gray-800">
//             Update Class
//           </h1>
//           <p className="text-gray-500 text-center mb-6">
//             Modify the class name and save your changes
//           </p>

//           <input
//             type="text"
//             id="name"
//             placeholder="Enter class name"
//             maxLength={30}
//             value={classData.name}
//             onChange={handleChange}
//             required
//             className="w-full p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-6"
//           />

//           {error && (
//             <p className="text-center text-red-500 mb-4">{error}</p>
//           )}

//           <div className="flex flex-col sm:flex-row gap-4">
//             <button
//               type="submit"
//               disabled={loading}
//               className="bg-green-500 hover:bg-green-600 text-white uppercase font-semibold py-3 px-6 rounded-md w-full sm:w-1/2 transition"
//             >
//               {loading ? 'Updating...' : 'Update'}
//             </button>
//             <button
//               type="button"
//               disabled={loading}
//               onClick={() => handleDelete(classData._id)}
//               className="bg-red-500 hover:bg-red-600 text-white uppercase font-semibold py-3 px-6 rounded-md w-full sm:w-1/2 transition"
//             >
//               {loading ? 'Deleting...' : 'Delete'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };


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
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-[#070b14] text-white relative overflow-hidden">

      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-violet-600/20 blur-[120px]"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-pink-600/20 blur-[120px]"></div>

      {/* CARD */}
      <div className="relative w-full max-w-xl p-8 rounded-3xl 
      bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">

        <form onSubmit={handleSubmit}>

          {/* TITLE */}
          <h1 className="text-3xl font-bold text-center mb-2">
            Update Class
          </h1>

          <p className="text-gray-400 text-center mb-8">
            Modify class name and manage it easily
          </p>

          {/* INPUT */}
          <div className="relative mb-6">
            <input
              type="text"
              id="name"
              placeholder=" "
              maxLength={30}
              value={classData.name}
              onChange={handleChange}
              required
              className="peer w-full p-4 bg-white/5 border border-white/10 rounded-xl 
              outline-none focus:ring-2 focus:ring-violet-500 text-white"
            />

            {/* FLOATING LABEL */}
            <label
              className="absolute left-4 top-2 text-gray-400 text-sm transition-all
              peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
              peer-focus:top-2 peer-focus:text-sm"
            >
              
            </label>
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-center text-red-400 mb-4 animate-pulse">
              {error}
            </p>
          )}

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4">

            {/* UPDATE */}
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r 
              from-green-500 to-emerald-500 hover:scale-105 transition shadow-lg"
            >
              {loading ? 'Updating...' : 'Update'}
            </button>

            {/* DELETE */}
            <button
              type="button"
              disabled={loading}
              onClick={() => handleDelete(classData._id)}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r 
              from-red-500 to-pink-500 hover:scale-105 transition shadow-lg"
            >
              {loading ? 'Deleting...' : 'Delete'}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};