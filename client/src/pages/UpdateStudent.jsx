

// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

// export const UpdateStudent = () => {
//   const [error, setError] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [studentData, setStudentData] = useState({
//     name: '',
//     enrollmentNumber: '',
//     email: '',
//   });

//   const navigate = useNavigate();
//   const params = useParams();

//   const handleChange = (e) => {
//     setStudentData({
//       ...studentData,
//       [e.target.id]: e.target.value,
//     });
//   };

//   useEffect(() => {
//     const fetchStudent = async () => {
//       const res = await fetch(`/api/student/get-Student/${params.studentId}`);
//       const data = await res.json();
//       if (data.success === false) {
//         console.log(data.message);
//       }
//       setStudentData(data);
//     };
//     fetchStudent();
//   }, []);

//   const classId = studentData.class;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       setError(false);

//       const res = await fetch(`/api/student/update-student/${params.studentId}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(studentData),
//       });

//       const data = await res.json();
//       setLoading(false);

//       if (data.success === false) {
//         setError(data.message);
//         return;
//       }

//       navigate(`/add-student/${classId}`);
//     } catch (error) {
//       setLoading(false);
//       setError(error.message);
//     }
//   };

//   const handleDelete = async (studentId) => {
//     try {
//       const res = await fetch(`/api/student/delete-student/${studentId}`, {
//         method: 'DELETE',
//       });

//       const data = await res.json();
//       if (data.success === false) {
//         console.log(data.message);
//         return;
//       }

//       navigate(`/add-student/${classId}`);
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
//       <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
//         <h1 className="text-2xl font-bold text-center text-gray-900">Update Student</h1>
//         <p className="text-center text-gray-500 mt-2">Modify student details and save your changes</p>

//         <form onSubmit={handleSubmit} className="mt-6 space-y-4">
//           <input
//             type="text"
//             maxLength={30}
//             placeholder="Name"
//             id="name"
//             onChange={handleChange}
//             value={studentData.name || ''}
//             required
//             className="w-full p-3 border rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           <input
//             type="text"
//             maxLength={50}
//             placeholder="Email"
//             id="email"
//             onChange={handleChange}
//             value={studentData.email || ''}
//             required
//             className="w-full p-3 border rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           <input
//             type="text"
//             maxLength={12}
//             placeholder="Enrollment Number"
//             id="enrollmentNumber"
//             onChange={handleChange}
//             value={studentData.enrollmentNumber || ''}
//             required
//             className="w-full p-3 border rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           {error && <p className="text-red-500 text-center text-sm">{error}</p>}

//           <div className="flex justify-between gap-4 mt-4">
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-1/2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-md transition"
//             >
//               {loading ? 'Updating...' : 'Update'}
//             </button>

//             <button
//               type="button"
//               disabled={loading}
//               onClick={() => handleDelete(studentData._id)}
//               className="w-1/2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-md transition"
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
import { useNavigate, useParams } from 'react-router-dom';

export const UpdateStudent = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState({
    name: '',
    enrollmentNumber: '',
    email: '',
  });

  const navigate = useNavigate();
  const params = useParams();

  const handleChange = (e) => {
    setStudentData({
      ...studentData,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchStudent = async () => {
      const res = await fetch(`/api/student/get-Student/${params.studentId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
      }
      setStudentData(data);
    };
    fetchStudent();
  }, []);

  const classId = studentData.class;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);

      const res = await fetch(`/api/student/update-student/${params.studentId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success === false) {
        setError(data.message);
        return;
      }

      navigate(`/add-student/${classId}`);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const handleDelete = async (studentId) => {
    try {
      const res = await fetch(`/api/student/delete-student/${studentId}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      navigate(`/add-student/${classId}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#070b14] px-4 relative overflow-hidden text-white">

      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-violet-600/20 blur-[120px]"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-pink-600/20 blur-[120px]"></div>

      {/* CARD */}
      <div className="relative w-full max-w-md p-8 rounded-3xl 
      bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-center mb-2">
          Update Student
        </h1>
        <p className="text-center text-gray-400 mb-6">
          Modify student details easily
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* NAME */}
          <div className="relative">
            <input
              type="text"
              maxLength={30}
              id="name"
              value={studentData.name || ''}
              onChange={handleChange}
              placeholder=" "
              required
              className="peer w-full p-4 bg-white/5 border border-white/10 rounded-xl 
              outline-none focus:ring-2 focus:ring-violet-500"
            />
            <label className="absolute left-4 top-2 text-gray-400 text-sm transition-all
              peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
              peer-focus:top-2 peer-focus:text-sm">
              
            </label>
          </div>

          {/* EMAIL */}
          <div className="relative">
            <input
              type="text"
              maxLength={50}
              id="email"
              value={studentData.email || ''}
              onChange={handleChange}
              placeholder=" "
              required
              className="peer w-full p-4 bg-white/5 border border-white/10 rounded-xl 
              outline-none focus:ring-2 focus:ring-violet-500"
            />
            <label className="absolute left-4 top-2 text-gray-400 text-sm transition-all
              peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
              peer-focus:top-2 peer-focus:text-sm">
              
            </label>
          </div>

          {/* ENROLLMENT */}
          <div className="relative">
            <input
              type="text"
              maxLength={12}
              id="enrollmentNumber"
              value={studentData.enrollmentNumber || ''}
              onChange={handleChange}
              placeholder=" "
              required
              className="peer w-full p-4 bg-white/5 border border-white/10 rounded-xl 
              outline-none focus:ring-2 focus:ring-violet-500"
            />
            <label className="absolute left-4 top-2 text-gray-400 text-sm transition-all
              peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
              peer-focus:top-2 peer-focus:text-sm">
              
            </label>
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-red-400 text-center text-sm animate-pulse">
              {error}
            </p>
          )}

          {/* BUTTONS */}
          <div className="flex gap-4">

            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r 
              from-green-500 to-emerald-500 hover:scale-105 transition shadow-lg"
            >
              {loading ? 'Updating...' : 'Update'}
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => handleDelete(studentData._id)}
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