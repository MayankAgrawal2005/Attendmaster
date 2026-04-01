
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AdminHeader } from '../components/AdminHeader';
import { MdCancel } from 'react-icons/md';
import { showError, showSuccess } from '../styles/toast';
export const SubjectRoute = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [subjectData, setSubjectData] = useState({ name: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classData, setClassData] = useState({ name: '' });
  const [subjects, setSubjects] = useState([]);

  const navigate = useNavigate();
  const { classId } = useParams();

  const handleChange = (e) => {
    setSubjectData({ ...subjectData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/subject/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...subjectData, classId }),
      });

      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
          showError(data.message);
        return;
      }
      showSuccess(`Subject ${subjectData.name} added successfully`);
      setLoading(false);
      setError(null);
      setIsModalOpen(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    const fetchClass = async () => {
      const res = await fetch(`/api/class/get-class/${classId}`);
      const data = await res.json();
      if (data.success === false) console.log(data.message);
      setClassData(data);
    };
    fetchClass();
  }, [classId]);

  const fetchSubjects = async () => {
    try {
      const res = await fetch(`/api/subject/get-subjectbyClass/${classId}`);
      const data = await res.json();
      if (!Array.isArray(data)) {
        console.error('Invalid data format:', data);
        setTimeout(() => setError('Failed to load subjects.'), 3000);
        return;
      }
      setSubjects(data);
    } catch (error) {
      showError("Failed to load subjects");
      setError('Failed to load subjects');
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, [isModalOpen]);

  // return (
  //   <div className="flex min-h-screen bg-[#070b14] text-white">

  //     {/* SIDEBAR */}
  //     <div className="hidden md:flex w-64 bg-white/5 backdrop-blur-xl border-r border-white/10">
  //       <AdminHeader />
  //     </div>

  //     {/* MAIN */}
  //     <div className="flex-1 p-6 md:p-10">

  //       {/* HEADER */}
  //       <div className="flex justify-between items-center mb-10">
  //         <h1 className="text-3xl font-bold">{classData.name} Subjects</h1>

  //         <button
  //           onClick={() => setIsModalOpen(true)}
  //           className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 
  //           hover:scale-105 transition"
  //         >
  //           + Add Subject
  //         </button>
  //       </div>

  //       {error && <p className="text-red-400 mb-6">{error}</p>}

  //       {/* 🔥 SUBJECT PANELS */}
  //       {subjects.length === 0 ? (
  //         <p className="text-gray-400">No Subject added yet.</p>
  //       ) : (

  //         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

  //           {subjects.map((subject) => (

  //             <div
  //               key={subject._id}
  //               className="group p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 
  //               hover:scale-105 transition text-center space-y-6 relative overflow-hidden"
  //             >

  //               {/* GLOW */}
  //               <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
  //               transition bg-gradient-to-r from-violet-500/10 to-pink-500/10 blur-xl"></div>

  //               {/* NAME */}
  //               <h2 className="text-xl font-semibold relative z-10">
  //                 {subject.name}
  //               </h2>

  //               {/* ACTIONS */}
  //               <div className="flex flex-col gap-3 relative z-10">

  //                 <Link to={`/update-subject/${subject._id}`} state={{ classId }}>
  //                   <button className="w-full py-2 rounded-lg bg-white/10 hover:bg-violet-600 transition">
  //                     Update
  //                   </button>
  //                 </Link>

  //                 <Link to={`/assign-subject-to-teacher/${subject._id}`}>
  //                   <button className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
  //                     Assign Teacher
  //                   </button>
  //                 </Link>

  //               </div>

  //             </div>

  //           ))}

  //         </div>
  //       )}

  //     </div>

  //     {/* MODAL */}
  //     {isModalOpen && (
  //       <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">

  //         <div className="bg-white/5 backdrop-blur-xl border border-white/10 
  //         p-6 rounded-2xl w-full max-w-md">

  //           <div className="flex justify-end">
  //             <button onClick={() => setIsModalOpen(false)}>
  //               <MdCancel className="text-2xl text-gray-400 hover:text-red-400" />
  //             </button>
  //           </div>

  //           <h2 className="text-xl text-center mb-4">Add Subject</h2>

  //           <form onSubmit={handleSubmit} className="space-y-4">
  //             <input
  //               type="text"
  //               maxLength={30}
  //               placeholder="Subject Name"
  //               id="name"
  //               onChange={handleChange}
  //               className="w-full p-3 rounded-xl bg-white/5 border border-white/10 outline-none"
  //             />

  //             <button
  //               disabled={loading}
  //               className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-pink-500"
  //             >
  //               {loading ? 'Saving...' : 'Add Subject'}
  //             </button>
  //           </form>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );
return (
  <div className="flex flex-col md:flex-row min-h-screen bg-[#070b14] text-white">

    {/* SIDEBAR */}
    <div className="">
      <AdminHeader />
    </div>

    {/* MAIN */}
    <div className="flex-1 p-4 sm:p-6 mt-14 lg:mt-0 md:p-10">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <h1 className="text-xl hero-title shimmer-text sm:text-2xl md:text-3xl font-bold">
          {classData.name} Subjects
        </h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 
          hover:scale-105 transition"
        >
          + Add Subject
        </button>
      </div>

      {/* {error && <p className="text-red-400 mb-6">{error}</p>} */}

      {/* SUBJECT PANELS */}
      {subjects.length === 0 ? (
        <p className="text-gray-400">No Subject added yet.</p>
      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

          {subjects.map((subject) => (

            <div
              key={subject._id}
              className="group p-4 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 
              hover:scale-105 transition text-center space-y-6 relative overflow-hidden"
            >

              {/* GLOW */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
              transition bg-gradient-to-r from-violet-500/10 to-pink-500/10 blur-xl"></div>

              {/* NAME */}
              <h2 className="text-lg sm:text-xl font-semibold relative z-10 break-words">
                {subject.name}
              </h2>

              {/* ACTIONS */}
              <div className="flex flex-col gap-3 relative z-10">

                <Link to={`/update-subject/${subject._id}`} state={{ classId }}>
                  <button className="w-full py-2 rounded-lg bg-white/10 hover:bg-violet-600 transition">
                    Update
                  </button>
                </Link>

                <Link to={`/assign-subject-to-teacher/${subject._id}`}>
                  <button className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
                    Assign Teacher
                  </button>
                </Link>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>

    {/* MODAL */}
    {isModalOpen && (
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 
        p-6 rounded-2xl w-full max-w-md">

          <div className="flex justify-end">
            <button onClick={() => setIsModalOpen(false)}>
              <MdCancel className="text-2xl text-gray-400 hover:text-red-400" />
            </button>
          </div>

          <h2 className="text-lg sm:text-xl text-center mb-4">Add Subject</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              maxLength={30}
              placeholder="Subject Name"
              id="name"
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 outline-none"
            />

            <button
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-pink-500"
            >
              {loading ? 'Saving...' : 'Add Subject'}
            </button>
          </form>
        </div>
      </div>
    )}
  </div>
);
};
