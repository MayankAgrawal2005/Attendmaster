
// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { AdminHeader } from '../components/AdminHeader';

// export const AssingTeacher = () => {
//   const { currentUser } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const params = useParams();
//   const [successMessage, setSuccessMessage] = useState(null);
//   const [error, setError] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [subjectData, setSubjectData] = useState({ name: '' });
//   const [teachers, setTeachers] = useState([]);
//   const [selectedTeacher, setSelectedTeacher] = useState('');

//   const adminId = currentUser._id;

//   const handleChange = (e) => {
//     setSubjectData({ ...subjectData, [e.target.id]: e.target.value });
//   };

//   const handleTeacherChange = (e) => {
//     const selected = teachers.find((t) => t._id === e.target.value);
//     setSelectedTeacher(selected || {});
//   };

//   useEffect(() => {
//     const fetchTeachers = async () => {
//       try {
//         const res = await fetch(`/api/teacher/get-teachers/${adminId}`);
//         const data = await res.json();
//         setTeachers(data);
//       } catch (err) {
//         setError("Failed to load teachers");
//       }
//     };
//     fetchTeachers();
//   }, []);

//   // useEffect(() => {
//   //   const fetchSubject = async () => {
//   //     const subjectId = params.subjectId;
//   //     const res = await fetch(`/api/subject/get-Subject/${subjectId}`);
//   //     const data = await res.json();
//   //     console.log("API RESPONSE:", data);
//   //     if (!data.success) console.log(data.message);
//   //     else setSubjectData({
//   //     name: data.name || data.data?.name || ''
//   //   });

//   //   console.log("Subject Data after fetch:", subjectData);
//   //   };

    
//   //   fetchSubject();
    
//   // }, []);

// useEffect(() => {
//   const fetchSubject = async () => {
//     const res = await fetch(`/api/subject/get-Subject/${params.subjectId}`);
//     const data = await res.json();

//     console.log("API RESPONSE:", data); // ✅ shows DSA-5

//     setSubjectData({ name: data.name }); // ✅ correct
//   };

//   fetchSubject();
// }, []);
  

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const payload = {
//       teacherId: selectedTeacher._id,
//       teachername: selectedTeacher.name,
//       subjectId: params.subjectId,
//       subjectname: subjectData.name,
//     };

//     try {
//       setLoading(true);
//       setSuccessMessage(null);

//       const res = await fetch('/api/teacher/assign-subject', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.message || "Something went wrong!");
//       }

//       const data = await res.json();
//       setLoading(false);
//       setSuccessMessage("Teacher assigned successfully! ✅");
//       setTimeout(() => navigate('/add-class'), 3000);
//     } catch (err) {
//       setLoading(false);
//       setError(err.message);
//       setTimeout(() => setError(null), 3000);
//     }
//   };

//   const handleRemoveTeacher = async () => {
//     if (!subjectData?.teacher?._id) return alert("No teacher assigned to remove.");
//     const teacherId = subjectData.teacher._id;
//     const subjectId = subjectData._id;

//     try {
//       setLoading(true);
//       const response = await fetch("/api/teacher/remove-teacher-toSubject", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ teacherId, subjectId }),
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || "Failed to remove teacher");

//       alert("Teacher removed from subject successfully!");
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-full lg:w-64 bg-slate-200 shadow-xl">
//         <AdminHeader />
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-4 md:p-8">
//         {error && <p className="text-red-500">{error}</p>}
//         {successMessage && <p className="text-green-600">{successMessage}</p>}

//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Form Section */}
//           <div className=" bg-white border-gray-400 border  rounded-3xl w-full max-w-xl p-6">
//             <h1 className="text-center text-[#A4B5D1] text-2xl font-semibold mb-4 uppercase">Subject Credentials</h1>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <input
//                 type="text"
//                 id="name"
//                 placeholder="Subject Name"
//                 value={subjectData.name || ''}
//                 onChange={handleChange}
//                 className="w-full p-3 text-lg border rounded-md"
//                 maxLength={30}
//               />

//               <select
//                 id="teacher"
//                 onChange={handleTeacherChange}
//                 value={selectedTeacher?._id || ""}
//                 className="w-full p-3 text-lg border rounded-md"
//               >
//                 <option value="" disabled>Select a Teacher</option>
//                 {teachers.map((teacher) => (
//                   <option key={teacher._id} value={teacher._id}>
//                     {teacher.name}
//                   </option>
//                 ))}
//               </select>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg uppercase"
//               >
//                 {loading ? 'Saving...' : 'Save'}
//               </button>
//             </form>
//           </div>

//           {/* Display Section */}
//           <div className="bg-white rounded-3xl border shadow-md w-full max-w-xl p-6">
//             <h2 className="text-2xl text-center font-bold text-gray-800 mb-6">Assigned Subject to Teacher</h2>

//             <div className="space-y-4">
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-700">Subject:</h3>
//                 <p className="p-2 bg-gray-100 rounded-md">{subjectData.name || 'No Subject'}</p>
//               </div>

//               <div>
//                 <h3 className="text-lg font-semibold text-gray-700">Assigned Teacher:</h3>
//                 <p className="text-xl text-blue-700 font-semibold mt-1">
//                   {subjectData?.teacher?.name || 'No teacher assigned'}
//                 </p>
//               </div>

//               {subjectData?.teacher?._id && (
//                 <button
//                   onClick={handleRemoveTeacher}
//                   disabled={loading}
//                   className="text-red-600 border border-red-600 px-4 py-2 rounded hover:bg-red-600 hover:text-white transition"
//                 >
//                   {loading ? "Removing..." : "Remove Teacher"}
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { AdminHeader } from '../components/AdminHeader';

// export const AssingTeacher = () => {
//   const { currentUser } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const params = useParams();

//   const [successMessage, setSuccessMessage] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // ✅ store full object
//   const [subjectData, setSubjectData] = useState(null);

//   const [teachers, setTeachers] = useState([]);
//   const [selectedTeacher, setSelectedTeacher] = useState(null);

//   const adminId = currentUser._id;

//   // ================= FETCH TEACHERS =================
//   useEffect(() => {
//     const fetchTeachers = async () => {
//       try {
//         const res = await fetch(`/api/teacher/get-teachers/${adminId}`);
//         const data = await res.json();
//         setTeachers(data);
//       } catch (err) {
//         setError("Failed to load teachers");
//       }
//     };
//     fetchTeachers();
//   }, [adminId]);

//   // ================= FETCH SUBJECT =================
//   useEffect(() => {
//     const fetchSubject = async () => {
//       try {
//         const res = await fetch(`/api/subject/get-Subject/${params.subjectId}`);
//         const data = await res.json();

//         console.log("API RESPONSE:", data);

//         setSubjectData(data); // ✅ store full data
//       } catch (err) {
//         setError("Failed to load subject");
//       }
//     };

//     fetchSubject();
//   }, [params.subjectId]);

//   // ✅ Debug updated state (optional)
//   useEffect(() => {
//     if (subjectData) {
//       console.log("Updated subjectData:", subjectData);
//     }
//   }, [subjectData]);

//   // ================= HANDLE TEACHER SELECT =================
//   const handleTeacherChange = (e) => {
//     const selected = teachers.find((t) => t._id === e.target.value);
//     setSelectedTeacher(selected || null);
//   };

//   // ================= SUBMIT =================
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedTeacher) {
//       return setError("Please select a teacher");
//     }

//     const payload = {
//       teacherId: selectedTeacher._id,
//       teachername: selectedTeacher.name,
//       subjectId: subjectData._id,
//       subjectname: subjectData.name,
//     };

//     try {
//       setLoading(true);
//       setError(null);

//       const res = await fetch('/api/teacher/assign-subject', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       if (!res.ok) throw new Error(data.message);

//       setSuccessMessage("Teacher assigned successfully ✅");

//       setTimeout(() => navigate('/add-class'), 2000);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================= REMOVE TEACHER =================
//   const handleRemoveTeacher = async () => {
//     if (!subjectData?.teacher?._id) {
//       return alert("No teacher assigned");
//     }

//     try {
//       setLoading(true);

//       const res = await fetch("/api/teacher/remove-teacher-toSubject", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           teacherId: subjectData.teacher._id,
//           subjectId: subjectData._id,
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);

//       alert("Teacher removed successfully");

//       // 🔥 update UI instantly
//       setSubjectData((prev) => ({ ...prev, teacher: null }));

//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================= UI =================
//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">

//       <div className="w-full lg:w-64 bg-slate-200 shadow-xl">
//         <AdminHeader />
//       </div>

//       <div className="flex-1 p-6">

//         {error && <p className="text-red-500">{error}</p>}
//         {successMessage && <p className="text-green-600">{successMessage}</p>}

//         <div className="flex flex-col lg:flex-row gap-8">

//           {/* FORM */}
//           <div className="bg-white border rounded-2xl w-full max-w-xl p-6">

//             <h1 className="text-center text-xl font-semibold mb-4">
//               Subject Credentials
//             </h1>

//             <form onSubmit={handleSubmit} className="space-y-4">

//               <input
//                 type="text"
//                 value={subjectData?.name || ""}
//                 readOnly
//                 className="w-full p-3 border rounded-md bg-gray-100"
//               />

//               <select
//                 onChange={handleTeacherChange}
//                 value={selectedTeacher?._id || ""}
//                 className="w-full p-3 border rounded-md"
//               >
//                 <option value="">Select a Teacher</option>

//                 {teachers.map((teacher) => (
//                   <option key={teacher._id} value={teacher._id}>
//                     {teacher.name}
//                   </option>
//                 ))}
//               </select>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-blue-500 text-white py-3 rounded-lg"
//               >
//                 {loading ? "Saving..." : "Assign Teacher"}
//               </button>

//             </form>
//           </div>

//           {/* DISPLAY */}
//           <div className="bg-white rounded-2xl shadow-md w-full max-w-xl p-6">

//             <h2 className="text-xl text-center font-bold mb-6">
//               Assigned Subject to Teacher
//             </h2>

//             <div className="space-y-4">

//               <div>
//                 <h3 className="font-semibold">Subject:</h3>
//                 <p className="p-2 bg-gray-100 rounded">
//                   {subjectData?.name || "Loading..."}
//                 </p>
//               </div>

//               <div>
//                 <h3 className="font-semibold">Assigned Teacher:</h3>
//                 <p className="text-blue-600 font-semibold">
//                   {subjectData?.teacher?.name || "No teacher assigned"}
//                 </p>
//               </div>

//               {subjectData?.teacher?._id && (
//                 <button
//                   onClick={handleRemoveTeacher}
//                   className="text-red-600 border border-red-600 px-4 py-2 rounded"
//                 >
//                   Remove Teacher
//                 </button>
//               )}

//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };




// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { AdminHeader } from '../components/AdminHeader';

// export const AssingTeacher = () => {
//   const { currentUser } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const params = useParams();

//   const [successMessage, setSuccessMessage] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const [subjectData, setSubjectData] = useState(null);
//   const [teachers, setTeachers] = useState([]);
//   const [selectedTeacher, setSelectedTeacher] = useState(null);

//   const adminId = currentUser._id;

//   useEffect(() => {
//     const fetchTeachers = async () => {
//       try {
//         const res = await fetch(`/api/teacher/get-teachers/${adminId}`);
//         const data = await res.json();
//         setTeachers(data);
//       } catch {
//         setError("Failed to load teachers");
//       }
//     };
//     fetchTeachers();
//   }, [adminId]);

//   useEffect(() => {
//     const fetchSubject = async () => {
//       try {
//         const res = await fetch(`/api/subject/get-Subject/${params.subjectId}`);
//         const data = await res.json();
//         setSubjectData(data);
//       } catch {
//         setError("Failed to load subject");
//       }
//     };
//     fetchSubject();
//   }, [params.subjectId]);

//   const handleTeacherChange = (e) => {
//     const selected = teachers.find((t) => t._id === e.target.value);
//     setSelectedTeacher(selected || null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedTeacher) {
//       return setError("Please select a teacher");
//     }

//     const payload = {
//       teacherId: selectedTeacher._id,
//       teachername: selectedTeacher.name,
//       subjectId: subjectData._id,
//       subjectname: subjectData.name,
//     };

//     try {
//       setLoading(true);
//       setError(null);

//       const res = await fetch('/api/teacher/assign-subject', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       if (!res.ok) throw new Error(data.message);

//       setSuccessMessage("Teacher assigned successfully ✅");
//       setTimeout(() => navigate({ pathname: `/assign-subject-to-teacher/${subjectData._id}` }), 2000);

//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRemoveTeacher = async () => {
//     if (!subjectData?.teacher?._id) return alert("No teacher assigned");

//     try {
//       setLoading(true);

//       const res = await fetch("/api/teacher/remove-teacher-toSubject", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           teacherId: subjectData.teacher._id,
//           subjectId: subjectData._id,
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);

//       setSubjectData((prev) => ({ ...prev, teacher: null }));

//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-[#070b14] text-white">

//       {/* SIDEBAR */}
//       <div className="hidden md:flex w-64 bg-white/5 backdrop-blur-xl border-r border-white/10">
//         <AdminHeader />
//       </div>

//       {/* MAIN */}
//       <div className="flex-1 p-6 md:p-10">

//         {/* HEADER */}
//         <h1 className="text-3xl font-bold mb-10">
//           Assign Teacher to Subject
//         </h1>

//         {error && <p className="text-red-400 mb-4">{error}</p>}
//         {successMessage && <p className="text-green-400 mb-4">{successMessage}</p>}

//         <div className="grid lg:grid-cols-2 gap-8">

//           {/* LEFT PANEL */}
//           <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl space-y-6">

//             <h2 className="text-xl font-semibold text-center">
//               Assign Teacher
//             </h2>

//             <form onSubmit={handleSubmit} className="space-y-5">

//               {/* SUBJECT */}
//               <div>
//                 <label className="text-sm text-gray-400">Subject</label>
//                 <input
//                   value={subjectData?.name || ""}
//                   readOnly
//                   className="w-full mt-2 p-3 rounded-xl bg-white/5 border border-white/10"
//                 />
//               </div>

//               {/* SELECT */}
//               <div>
//                 <label className="text-sm text-gray-400">Teacher</label>
//                 <select
//                   onChange={handleTeacherChange}
//                   value={selectedTeacher?._id || ""}
//                   className="w-full mt-2 p-3 rounded-xl bg-white/5 border border-white/10"
//                 >
//                   <option value="">Select Teacher</option>

//                   {teachers?.map((teacher) => (
//                     <option key={teacher._id} className='text-black' value={teacher._id}>
//                       {teacher.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* BUTTON */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full py-3 rounded-xl bg-gradient-to-r 
//                 from-violet-600 to-pink-500 hover:scale-105 transition"
//               >
//                 {loading ? "Assigning..." : "Assign Teacher"}
//               </button>

//             </form>
//           </div>

//           {/* RIGHT PANEL */}
//           <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl space-y-6">

//             <h2 className="text-xl font-semibold text-center">
//               Subject Overview
//             </h2>

//             <div className="space-y-4 text-center">

//               <div>
//                 <p className="text-gray-400 text-sm">Subject</p>
//                 <p className="text-lg font-semibold">
//                   {subjectData?.name || "Loading..."}
//                 </p>
//               </div>

//               <div>
//                 <p className="text-gray-400 text-sm">Assigned Teacher</p>
//                 <p className="text-lg font-semibold text-violet-400">
//                   {subjectData?.teacher?.name || "Not Assigned"}
//                 </p>
//               </div>

//               {subjectData?.teacher?._id && (
//                 <button
//                   onClick={handleRemoveTeacher}
//                   className="mt-4 px-6 py-2 rounded-xl border border-red-500 text-red-400 hover:bg-red-500/10 transition"
//                 >
//                   Remove Teacher
//                 </button>
//               )}

//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };


import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminHeader } from '../components/AdminHeader';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400&display=swap');

  :root {
    --bg:         #080810;
    --bg-2:       #0d0d1a;
    --bg-card:    #10101e;
    --bg-input:   #14141f;
    --border:     rgba(255,255,255,0.07);
    --border-hi:  rgba(255,255,255,0.14);
    --accent:     #7c6aff;
    --accent-2:   #ff6aab;
    --gold:       #f5c76e;
    --teal:       #3de8c8;
    --danger:     #ff5e6c;
    --text:       #eeeaf8;
    --muted:      #55516a;
    --radius:     18px;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .at-root {
    display: flex;
    min-height: 100vh;
    background: var(--bg);
    font-family: 'DM Mono', monospace;
    color: var(--text);
  }

  .at-sidebar {
    width: 256px;
    flex-shrink: 0;
    background: var(--bg-2);
    border-right: 1px solid var(--border);
  }

  .at-main {
    flex: 1;
    overflow-y: auto;
    padding: 40px 36px 60px;
    background:
      radial-gradient(ellipse 55% 35% at 85% 8%,  rgba(124,106,255,0.07) 0%, transparent 60%),
      radial-gradient(ellipse 40% 25% at 5%  85%, rgba(255,106,171,0.05) 0%, transparent 60%),
      var(--bg);
  }

  /* ── Page title ── */
  .at-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.9rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    margin-bottom: 6px;
  }

  .at-subtitle {
    font-size: 0.65rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 36px;
  }

  /* ── Alert ── */
  .at-alert {
    padding: 11px 16px;
    border-radius: 10px;
    font-size: 0.7rem;
    letter-spacing: 0.05em;
    margin-bottom: 20px;
    animation: fadeIn 0.3s ease;
  }
  .at-alert.error   { background: rgba(255,94,108,0.1); color: #ff8a96; border: 1px solid rgba(255,94,108,0.2); }
  .at-alert.success { background: rgba(61,232,200,0.1); color: var(--teal); border: 1px solid rgba(61,232,200,0.2); }

  @keyframes fadeIn { from { opacity:0; transform: translateY(-6px); } to { opacity:1; transform:translateY(0); } }

  /* ── Three-column grid ── */
  .at-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
    align-items: start;
  }

  @media (max-width: 900px) {
    .at-grid { grid-template-columns: 1fr; }
  }

  /* ── Panel card ── */
  .at-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 22px;
    overflow: hidden;
    animation: slideUp 0.5s cubic-bezier(0.22,1,0.36,1) both;
  }

  .at-card:nth-child(1) { animation-delay: 0.05s; }
  .at-card:nth-child(2) { animation-delay: 0.12s; }
  .at-card:nth-child(3) { animation-delay: 0.19s; }

  @keyframes slideUp {
    from { opacity:0; transform: translateY(22px); }
    to   { opacity:1; transform: translateY(0); }
  }

  .at-card-header {
    padding: 18px 22px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .at-card-icon {
    width: 30px; height: 30px;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px;
    flex-shrink: 0;
  }

  .at-card-icon.purple { background: rgba(124,106,255,0.15); }
  .at-card-icon.pink   { background: rgba(255,106,171,0.13); }
  .at-card-icon.teal   { background: rgba(61,232,200,0.12);  }

  .at-card-title {
    font-family: 'Syne', sans-serif;
    font-size: 0.9rem;
    font-weight: 700;
  }

  .at-card-body { padding: 22px; }

  /* ── Subject name display ── */
  .at-subject-name {
    font-family: 'Syne', sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text);
    line-height: 1.2;
    margin-bottom: 10px;
  }

  .at-subject-label {
    font-size: 0.58rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 8px;
  }

  .at-subject-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(124,106,255,0.12);
    border: 1px solid rgba(124,106,255,0.25);
    border-radius: 99px;
    padding: 4px 12px;
    font-size: 0.6rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--accent);
    margin-top: 8px;
  }

  /* ── Drop zone ── */
  .at-dropzone {
    min-height: 120px;
    border-radius: 14px;
    border: 2px dashed var(--border);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 20px;
    transition: border-color 0.25s, background 0.25s;
    position: relative;
    margin-top: 16px;
  }

  .at-dropzone.drag-over {
    border-color: var(--accent);
    background: rgba(124,106,255,0.07);
  }

  .at-dropzone-label {
    font-size: 0.6rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--muted);
    text-align: center;
  }

  .at-dropzone-icon {
    font-size: 1.8rem;
    opacity: 0.3;
  }

  /* Assigned teacher card inside dropzone */
  .at-assigned {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
    animation: popIn 0.35s cubic-bezier(0.22,1,0.36,1);
  }

  @keyframes popIn {
    from { opacity:0; transform: scale(0.8); }
    to   { opacity:1; transform: scale(1); }
  }

  .at-assigned-avatar {
    width: 56px; height: 56px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--accent), var(--accent-2));
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: #fff;
    box-shadow: 0 4px 18px rgba(124,106,255,0.35);
  }

  .at-assigned-name {
    font-family: 'Syne', sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--text);
    text-align: center;
  }

  .at-assigned-email {
    font-size: 0.6rem;
    color: var(--muted);
    text-align: center;
  }

  .at-remove-btn {
    background: none;
    border: 1px solid rgba(255,94,108,0.3);
    color: var(--danger);
    border-radius: 8px;
    padding: 5px 14px;
    font-family: 'DM Mono', monospace;
    font-size: 0.58rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s;
    margin-top: 4px;
  }

  .at-remove-btn:hover {
    background: rgba(255,94,108,0.1);
    border-color: var(--danger);
  }

  .at-remove-btn:disabled { opacity: 0.4; cursor: not-allowed; }

  /* ── Teacher bubbles list ── */
  .at-teachers-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 420px;
    overflow-y: auto;
    padding-right: 4px;
  }

  .at-teachers-list::-webkit-scrollbar { width: 4px; }
  .at-teachers-list::-webkit-scrollbar-track { background: transparent; }
  .at-teachers-list::-webkit-scrollbar-thumb { background: var(--border-hi); border-radius: 99px; }

  /* Teacher draggable card */
  .at-teacher-card {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    border-radius: 14px;
    background: rgba(255,255,255,0.03);
    border: 1px solid var(--border);
    cursor: grab;
    user-select: none;
    transition: background 0.2s, border-color 0.2s, transform 0.2s, box-shadow 0.2s;
    animation: rowIn 0.4s ease both;
  }

  .at-teacher-card:nth-child(1) { animation-delay: 0.04s; }
  .at-teacher-card:nth-child(2) { animation-delay: 0.08s; }
  .at-teacher-card:nth-child(3) { animation-delay: 0.12s; }
  .at-teacher-card:nth-child(4) { animation-delay: 0.16s; }
  .at-teacher-card:nth-child(5) { animation-delay: 0.20s; }

  @keyframes rowIn {
    from { opacity:0; transform: translateX(10px); }
    to   { opacity:1; transform: translateX(0); }
  }

  .at-teacher-card:hover {
    background: rgba(124,106,255,0.08);
    border-color: rgba(124,106,255,0.3);
    transform: translateX(-2px);
    box-shadow: 0 4px 20px rgba(124,106,255,0.1);
  }

  .at-teacher-card:active { cursor: grabbing; }

  .at-teacher-card.dragging {
    opacity: 0.4;
    transform: scale(0.96);
  }

  .at-teacher-bubble {
    width: 40px; height: 40px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    flex-shrink: 0;
    border: 2px solid transparent;
  }

  .at-teacher-info { flex: 1; min-width: 0; }

  .at-teacher-name {
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .at-teacher-sub {
    font-size: 0.58rem;
    color: var(--muted);
    letter-spacing: 0.05em;
    margin-top: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .at-drag-hint {
    font-size: 0.6rem;
    letter-spacing: 0.12em;
    color: var(--muted);
    text-align: center;
    padding: 10px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }

  /* color palette for teacher bubbles */
  .tc-0 { background: rgba(124,106,255,0.18); color: #a494ff; border-color: rgba(124,106,255,0.3); }
  .tc-1 { background: rgba(255,106,171,0.15); color: #ff8ec4; border-color: rgba(255,106,171,0.3); }
  .tc-2 { background: rgba(61,232,200,0.13);  color: #3de8c8; border-color: rgba(61,232,200,0.25); }
  .tc-3 { background: rgba(245,199,110,0.13); color: #f5c76e; border-color: rgba(245,199,110,0.25); }
  .tc-4 { background: rgba(255,100,80,0.13);  color: #ff8070; border-color: rgba(255,100,80,0.25); }

  /* Submit btn */
  .at-submit-btn {
    width: 100%;
    padding: 13px;
    border: none;
    border-radius: 12px;
    font-family: 'DM Mono', monospace;
    font-size: 0.68rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    cursor: pointer;
    background: linear-gradient(135deg, var(--accent), var(--accent-2));
    color: #fff;
    box-shadow: 0 4px 22px rgba(124,106,255,0.3);
    transition: all 0.25s;
    margin-top: 18px;
    position: relative;
    overflow: hidden;
  }

  .at-submit-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
    opacity: 0;
    transition: opacity 0.25s;
  }

  .at-submit-btn:hover::after  { opacity: 1; }
  .at-submit-btn:hover         { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(124,106,255,0.4); }
  .at-submit-btn:disabled      { opacity: 0.4; cursor: not-allowed; transform: none; }

  /* Ghost drag element */
  .at-drag-ghost {
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    background: var(--bg-card);
    border: 1px solid rgba(124,106,255,0.5);
    border-radius: 14px;
    padding: 10px 14px;
    display: flex;
    align-items: center;
    gap: 10px;
    box-shadow: 0 8px 32px rgba(124,106,255,0.3);
    transform: rotate(3deg) scale(1.05);
    min-width: 160px;
    opacity: 0.95;
  }
`;

const COLORS = ['tc-0', 'tc-1', 'tc-2', 'tc-3', 'tc-4'];

const initials = (name = '') =>
  name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase() || '?';

export const AssingTeacher = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();

  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [subjectData, setSubjectData] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  // Drag state
  const [dragTeacher, setDragTeacher] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [ghostPos, setGhostPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef(null);

  const adminId = currentUser._id;

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await fetch(`/api/teacher/get-teachers/${adminId}`);
        const data = await res.json();
        setTeachers(data);
      } catch {
        setError("Failed to load teachers");
      }
    };
    fetchTeachers();
  }, [adminId]);

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const res = await fetch(`/api/subject/get-Subject/${params.subjectId}`);
        const data = await res.json();
        setSubjectData(data);
        if (data.teacher) setSelectedTeacher(data.teacher);
      } catch {
        setError("Failed to load subject");
      }
    };
    fetchSubject();
  }, [params.subjectId]);

  // ── Mouse drag handlers ──
  const handleMouseDown = (e, teacher) => {
    e.preventDefault();
    setDragTeacher(teacher);
    setIsDragging(true);
    setGhostPos({ x: e.clientX + 16, y: e.clientY - 20 });
    dragRef.current = teacher;
  };

  useEffect(() => {
    if (!isDragging) return;

    const onMove = (e) => {
      setGhostPos({ x: e.clientX + 16, y: e.clientY - 20 });
    };

    const onUp = (e) => {
      setIsDragging(false);
      setDragTeacher(null);
      // drop handled by onMouseUp on dropzone
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [isDragging]);

  const handleDropzoneMouseUp = () => {
    if (dragRef.current) {
      setSelectedTeacher(dragRef.current);
      dragRef.current = null;
    }
    setDragOver(false);
  };

  // ── Submit ──
  const handleSubmit = async () => {
    if (!selectedTeacher) return setError("Please drag a teacher to the assignment box");

    const payload = {
      teacherId: selectedTeacher._id,
      teachername: selectedTeacher.name,
      subjectId: subjectData._id,
      subjectname: subjectData.name,
    };

    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/teacher/assign-subject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setSuccessMessage("Teacher assigned successfully ✓");
      setTimeout(() => navigate('/add-class'), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveTeacher = async () => {
    if (!subjectData?.teacher?._id) {
      setSelectedTeacher(null);
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/teacher/remove-teacher-toSubject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teacherId: subjectData.teacher._id,
          subjectId: subjectData._id,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setSubjectData((prev) => ({ ...prev, teacher: null }));
      setSelectedTeacher(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>

     
      <style>{styles}</style>

      {/* Drag ghost */}
      {isDragging && dragTeacher && (
        <div
          className="at-drag-ghost"
          style={{ left: ghostPos.x, top: ghostPos.y }}
        >
          <div className={`at-teacher-bubble ${COLORS[teachers.findIndex(t => t._id === dragTeacher._id) % 5]}`}>
            {initials(dragTeacher.name)}
          </div>
          <span style={{ fontFamily: 'DM Mono', fontSize: '0.78rem', color: '#eeeaf8' }}>
            {dragTeacher.name}
          </span>
        </div>
      )}


      


      <div className="at-root">
        {/* Sidebar */}
        {/* <div className="at-sidebar"><AdminHeader /></div> */}

        {/* Main */}
        <div className="at-main">

          <h1 className="hero-title text-3xl md:text-5xl shimmer-text">Assign Teacher</h1>
          <p className="at-subtitle">Drag a teacher and drop onto the assignment zone</p>

          {error          && <div className="at-alert error">{error}</div>}
          {successMessage && <div className="at-alert success">{successMessage}</div>}

          <div className="at-grid">

            {/* ── Col 1: Subject Info ── */}
            <div className="at-card">
              <div className="at-card-header">
                <div className="at-card-icon purple">📘</div>
                <span className="at-card-title">Subject</span>
              </div>
              <div className="at-card-body">
                <div className="at-subject-label">Subject Name</div>
                <div className="at-subject-name">
                  {subjectData?.name || '—'}
                </div>
                <div className="at-subject-badge">
                  <span style={{ width: 5, height: 5, background: 'var(--accent)', borderRadius: '50%', display: 'inline-block' }} />
                  Active Subject
                </div>

                {/* Submit action lives here */}
                <button
                  className="at-submit-btn"
                  onClick={handleSubmit}
                  disabled={loading || !selectedTeacher}
                >
                  {loading ? 'Assigning…' : 'Confirm Assignment'}
                </button>
              </div>
            </div>

            {/* ── Col 2: Drop Zone ── */}
            <div className="at-card">
              <div className="at-card-header">
                <div className="at-card-icon pink">🎯</div>
                <span className="at-card-title">Assignment Zone</span>
              </div>
              <div className="at-card-body">
                <div className="at-subject-label">Drop teacher here</div>

                <div
                  className={`at-dropzone${dragOver ? ' drag-over' : ''}`}
                  onMouseEnter={() => isDragging && setDragOver(true)}
                  onMouseLeave={() => setDragOver(false)}
                  onMouseUp={handleDropzoneMouseUp}
                >
                  {selectedTeacher ? (
                    <div className="at-assigned">
                      <div className="at-assigned-avatar">
                        {initials(selectedTeacher.name)}
                      </div>
                      <div className="at-assigned-name">{selectedTeacher.name}</div>
                      {selectedTeacher.email && (
                        <div className="at-assigned-email">{selectedTeacher.email}</div>
                      )}
                      <button
                        className="at-remove-btn"
                        onClick={handleRemoveTeacher}
                        disabled={loading}
                      >
                        ✕ Remove
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="at-dropzone-icon">👤</div>
                      <div className="at-dropzone-label">
                        {dragOver ? 'Release to assign' : 'No teacher assigned'}
                      </div>
                    </>
                  )}
                </div>

                {/* Subject overview */}
                <div style={{ marginTop: 20, padding: '14px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)' }}>
                  <div className="at-subject-label" style={{ marginBottom: 6 }}>Subject</div>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.9rem' }}>
                    {subjectData?.name || 'Loading…'}
                  </div>
                  <div className="at-subject-label" style={{ marginTop: 12, marginBottom: 4 }}>Assigned Teacher</div>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '0.85rem', color: selectedTeacher ? 'var(--accent)' : 'var(--muted)' }}>
                    {selectedTeacher?.name || 'Not Assigned'}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Col 3: Teachers ── */}
            <div className="at-card">
              <div className="at-card-header">
                <div className="at-card-icon teal">👥</div>
                <span className="at-card-title">Teachers</span>
              </div>
              <div className="at-card-body">
                <div className="at-subject-label" style={{ marginBottom: 14 }}>
                  {teachers.length} available
                </div>

                <div className="at-teachers-list">
                  {teachers.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--muted)', fontSize: '0.7rem', letterSpacing: '0.1em' }}>
                      No teachers found
                    </div>
                  )}
                  {teachers.map((teacher, i) => (
                    <div
                      key={teacher._id}
                      className={`at-teacher-card${dragTeacher?._id === teacher._id ? ' dragging' : ''}`}
                      onMouseDown={(e) => handleMouseDown(e, teacher)}
                      style={{ animationDelay: `${i * 0.06}s` }}
                    >
                      <div className={`at-teacher-bubble ${COLORS[i % 5]}`}>
                        {initials(teacher.name)}
                      </div>
                      <div className="at-teacher-info">
                        <div className="at-teacher-name">{teacher.name}</div>
                        <div className="at-teacher-sub">
                          {teacher.email || teacher.subject || 'Teacher'}
                        </div>
                      </div>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                        <path d="M8 6h8M8 10h8M8 14h4"/>
                        <circle cx="19" cy="19" r="3"/>
                        <path d="M21 21l-1.5-1.5"/>
                      </svg>
                    </div>
                  ))}
                </div>

                <div className="at-drag-hint">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14 8V6a2 2 0 00-4 0v5"/>
                    <path d="M10 11V8a2 2 0 00-4 0v7l-1-1a2 2 0 00-3 0l4 4h10a3 3 0 003-3v-4a2 2 0 00-4 0"/>
                  </svg>
                  Hold &amp; drag to assign
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};
