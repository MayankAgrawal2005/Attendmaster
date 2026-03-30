
// import React, { useState, useEffect } from 'react';
// import { AdminHeader } from '../components/AdminHeader';
// import { MdCancel } from "react-icons/md";
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';

// export const TeacherRoute = () => {
//   const { currentUser } = useSelector((state) => state.user);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [refresh, setRefresh] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [formData, setFormData] = useState({ name: '', email: '' });
//   const [teachers, setTeachers] = useState([]);

//   const adminId = currentUser._id;

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const res = await fetch('/api/teacher/add-teacher', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ ...formData, adminId }),
//       });

//       const data = await res.json();
//       if (data.success === false) {
//         setLoading(false);
//         setError(data.message);
//         return;
//       }

//       setLoading(false);
//       setError(null);
//       setIsModalOpen(false);
//       setRefresh((prev) => !prev);
//     } catch (error) {
//       setLoading(false);
//       setError(error.message);
//     }
//   };

//   const fetchTeachers = async () => {
//     try {
//       const res = await fetch(`/api/teacher/get-teachers/${adminId}`);
//       const data = await res.json();
//       setTeachers(data);
//     } catch (error) {
//       setError("Failed to load teachers");
//       setTimeout(() => setError(""), 3000);
//     }
//   };

//   useEffect(() => {
//     fetchTeachers();
//   }, [refresh]);

//   return (
//     <div className="  w-full lg:space-x-8 flex flex-col lg:flex-row">
//       {/* Sidebar */}
//       <div className="w-full lg:w-64 bg-slate-200 shadow-xl">
//         <AdminHeader />
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 min-h-screen border border-gray-200 shadow-2xl bg-white p-4 sm:p-6 text-black">
//         {/* Header */}
//         <div className="flex flex-col mt-10 sm:flex-row justify-between items-center mb-4">
//           <h1 className="text-2xl  mb-2 sm:mb-0">Teacher Management</h1>
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition"
//           >
//                  + Add Teacher
//           </button>
//         </div>

//         {/* Modal */}
//         {isModalOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//             <div className="bg-white rounded-xl w-[90%] max-w-md p-6 relative">
//               <button onClick={() => setIsModalOpen(false)} className="absolute top-3 right-3">
//                 <MdCancel className="w-6 h-6 text-gray-600 hover:text-red-500" />
//               </button>
//               <h2 className="text-2xl font-bold mb-1">Add New Teacher</h2>
//               <p className="text-sm text-gray-500 mb-6">Enter the details of the new teacher below</p>
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <input
//                   type="text"
//                   id="name"
//                   placeholder="Name"
//                   onChange={handleChange}
//                   className="w-full border border-black text-black text-lg p-2 rounded-md"
//                 />
//                 <input
//                   type="text"
//                   id="email"
//                   placeholder="Email"
//                   onChange={handleChange}
//                   className="w-full border border-black text-black text-lg p-2 rounded-md"
//                 />
//                 <button
//                   disabled={loading}
//                   className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
//                 >
//                   {loading ? 'Saving...' : 'Add Teacher'}
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* Teachers Directory */}
//         <div className="mt-6 border border-gray-300 rounded-xl p-4">
//           <h2 className="text-2xl text-black ">Teachers Directory</h2>
//           <p className="text-gray-500 mb-4">Manage and view all teachers in the system</p>
//           {error && <p className="text-red-500 mb-4">{error}</p>}

//           {teachers.length === 0 ? (
//             <p>No teachers added yet.</p>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full table-auto text-left border border-gray-300">
//                 <thead className="bg-gray-100 text-gray-700">
//                   <tr>
//                     <th className="p-3">Name</th>
//                     <th className="p-3">Email</th>
//                     <th className="p-3">Actions</th>
//                     <th className="p-3">Code</th>
//                     <th className="p-3">Password</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {teachers.map((teacher, index) => (
//                     <tr key={index} className="border-b hover:bg-gray-50">
//                       <td className="p-3">{teacher.name}</td>
//                       <td className="p-3">{teacher.email}</td>
//                       <td className="p-3 space-x-2">
//                         <Link to={`/update-teacher/${teacher._id}`}>
//                           <button className="bg-gray-200 hover:bg-gray-700 text-black hover:text-white px-3 py-1 rounded">
//                             Update
//                           </button>
//                         </Link>
//                       </td>
//                       <td className="p-3">{teacher.code}</td>
//                       <td className="p-3">{teacher.password}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useState, useEffect } from 'react';
import { AdminHeader } from '../components/AdminHeader';
import { MdCancel } from "react-icons/md";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const TeacherRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [teachers, setTeachers] = useState([]);

  const adminId = currentUser._id;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/teacher/add-teacher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, adminId }),
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
      setRefresh((prev) => !prev);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const fetchTeachers = async () => {
    try {
      const res = await fetch(`/api/teacher/get-teachers/${adminId}`);
      const data = await res.json();
      setTeachers(data);
    } catch (error) {
      setError("Failed to load teachers");
      setTimeout(() => setError(""), 3000);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, [refresh]);

  // return (
  //   <div className="flex  min-h-screen bg-[#070b14] text-white relative overflow-hidden">

  //     {/* 🔥 BACKGROUND GLOW */}
  //     <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-violet-600/20 blur-[120px]"></div>
  //     <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-pink-600/20 blur-[120px]"></div>

  //     {/* SIDEBAR */}
  //     <div className=" ">
  //       <AdminHeader />
  //     </div>

  //     {/* MAIN */}
  //     <div className="flex-1 mt-10 lg:mt-0 p-6 md:p-10 relative z-10">

  //       {/* HEADER */}
  //       <div className="flex justify-between items-center mb-10">
  //         <h1 className="text-xl hero-title md:text-5xl leading-tight  font-bold shimmer-text">Teacher Management</h1>

  //         <button
  //           onClick={() => setIsModalOpen(true)}
  //           className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 
  //           hover:scale-105 transition shadow-lg"
  //         >
  //           + Add Teacher
  //         </button>
  //       </div>

  //       {/* MODAL */}
  //       {isModalOpen && (
  //         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">

  //           <div className="relative w-[90%] max-w-md p-6 rounded-3xl 
  //           bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">

  //             <button onClick={() => setIsModalOpen(false)} className="absolute top-3 right-3">
  //               <MdCancel className="w-6 h-6 text-gray-400 hover:text-red-400" />
  //             </button>

  //             <h2 className="text-xl font-semibold mb-4">Add Teacher</h2>

  //             <form onSubmit={handleSubmit} className="space-y-4">

  //               <input
  //                 type="text"
  //                 id="name"
  //                 placeholder="Name"
  //                 onChange={handleChange}
  //                 className="w-full p-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:ring-2 focus:ring-violet-500"
  //               />

  //               <input
  //                 type="text"
  //                 id="email"
  //                 placeholder="Email"
  //                 onChange={handleChange}
  //                 className="w-full p-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:ring-2 focus:ring-violet-500"
  //               />

  //               <button
  //                 disabled={loading}
  //                 className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-pink-500"
  //               >
  //                 {loading ? 'Saving...' : 'Add Teacher'}
  //               </button>

  //             </form>
  //           </div>
  //         </div>
  //       )}

  //       {/* ERROR */}
  //       {error && <p className="text-red-400 mb-6">{error}</p>}

  //       {/* 🔥 PREMIUM BLOCK UI */}
  //       {teachers.length === 0 ? (
  //         <p className="text-gray-400">No teachers added yet.</p>
  //       ) : (

  //         <div className="space-y-6">

  //           {teachers.map((teacher, index) => (

  //             <div
  //               key={index}
  //               className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl 
  //               border border-white/10 shadow-xl transition-all duration-300 
  //               hover:scale-[1.02] overflow-hidden"
  //             >

  //               {/* GLOW */}
  //               <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
  //               transition bg-gradient-to-r from-violet-500/10 to-pink-500/10 blur-xl"></div>

  //               <div className="relative z-10 space-y-4">



  //                 {/* TOP */}

  //                <div className='flex justify-between'>
  //                    <div>
  //                   <h2 className="text-lg font-semibold">{teacher.name}</h2>
  //                   <p className="text-gray-400 text-sm">{teacher.email}</p>
  //                 </div>
 
  //                 <div>
  // <Link to={`/update-teacher/${teacher._id}`}>
  //                     <button className="px-5 py-2 rounded-lg bg-gradient-to-r 
  //                     from-violet-600 to-pink-500 hover:scale-105 transition">
  //                       Update
  //                     </button>
  //                   </Link>
  //                 </div>
  //                </div>

               
               
                


  //                 {/* DIVIDER */}
  //                 <div className="h-[1px] bg-white/10"></div>

  //                 {/* MIDDLE */}
  //                 <div className="grid grid-cols-2 gap-4 text-sm">

  //                   <div className="bg-white/5 p-3 rounded-lg border border-white/10">
  //                     <p className="text-gray-400 text-md">Code</p>
  //                     <p className="font-medium">{teacher.code}</p>
  //                   </div>

  //                   <div className="bg-white/5 p-3 rounded-lg border border-white/10">
  //                     <p className="text-gray-400 text-md">Password</p>
  //                     <p className="font-medium">{teacher.password}</p>
  //                   </div>

  //                 </div>

  //                 {/* DIVIDER */}
  //                 <div className="h-[1px] bg-white/10"></div>

  //                 {/* ACTION */}
  //                 <div className="flex justify-end">
  //                   {/* <Link to={`/update-teacher/${teacher._id}`}>
  //                     <button className="px-5 py-2 rounded-lg bg-gradient-to-r 
  //                     from-violet-600 to-pink-500 hover:scale-105 transition">
  //                       Update
  //                     </button>
  //                   </Link> */}
  //                 </div> 

  //               </div>

  //             </div>

  //           ))}

  //         </div>
  //       )}

  //     </div>
  //   </div>
  // );

  return (
  <div className="flex flex-col lg:flex-row min-h-screen bg-[#070b14] text-white relative overflow-hidden">

    {/* 🔥 BACKGROUND GLOW */}
    <div className="absolute top-[-120px] left-[-120px] w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-violet-600/20 blur-[120px]"></div>
    <div className="absolute bottom-[-120px] right-[-120px] w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-pink-600/20 blur-[120px]"></div>

    {/* SIDEBAR */}
    <div className="w-full lg:w-auto">
      <AdminHeader />
    </div>

    {/* MAIN */}
    <div className="flex-1 mt-16 lg:mt-0 p-4 sm:p-6 md:p-10 relative z-10">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-5xl hero-title leading-tight font-bold shimmer-text">
          Teacher Management
        </h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 
          hover:scale-105 transition shadow-lg"
        >
          + Add Teacher
        </button>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 px-4">

          <div className="relative w-full max-w-md p-6 rounded-3xl 
          bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">

            <button onClick={() => setIsModalOpen(false)} className="absolute top-3 right-3">
              <MdCancel className="w-6 h-6 text-gray-400 hover:text-red-400" />
            </button>

            <h2 className="text-xl font-semibold mb-4">Add Teacher</h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                id="name"
                placeholder="Name"
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:ring-2 focus:ring-violet-500"
              />

              <input
                type="text"
                id="email"
                placeholder="Email"
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:ring-2 focus:ring-violet-500"
              />

              <button
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-pink-500"
              >
                {loading ? 'Saving...' : 'Add Teacher'}
              </button>

            </form>
          </div>
        </div>
      )}

      {/* ERROR */}
      {error && <p className="text-red-400 mb-6">{error}</p>}

      {/* CONTENT */}
      {teachers.length === 0 ? (
        <p className="text-gray-400">No teachers added yet.</p>
      ) : (

        <div className="space-y-6">

          {teachers.map((teacher, index) => (

            <div
              key={index}
              className="group relative p-4 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-xl 
              border border-white/10 shadow-xl transition-all duration-300 
              hover:scale-[1.02] overflow-hidden"
            >

              {/* GLOW */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
              transition bg-gradient-to-r from-violet-500/10 to-pink-500/10 blur-xl"></div>

              <div className="relative z-10 space-y-4">

                {/* TOP */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold">{teacher.name}</h2>
                    <p className="text-gray-400 text-xs sm:text-sm">{teacher.email}</p>
                  </div>

                  <Link to={`/update-teacher/${teacher._id}`} className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto px-5 py-2 rounded-lg bg-gradient-to-r 
                    from-violet-600 to-pink-500 hover:scale-105 transition">
                      Update
                    </button>
                  </Link>
                </div>

                {/* DIVIDER */}
                <div className="h-[1px] bg-white/10"></div>

                {/* MIDDLE */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">

                  <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                    <p className="text-gray-400 text-md">Code</p>
                    <p className="font-medium break-all">{teacher.code}</p>
                  </div>

                  <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                    <p className="text-gray-400 text-md">Password</p>
                    <p className="font-medium break-all">{teacher.password}</p>
                  </div>

                </div>

                {/* DIVIDER */}
                <div className="h-[1px] bg-white/10"></div>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  </div>
);
};