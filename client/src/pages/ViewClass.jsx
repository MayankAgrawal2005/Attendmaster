

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminHeader } from '../components/AdminHeader';

export const ViewClass = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [classData, setClassData] = useState(null);
  const classId = params.classId;

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const res = await fetch(`/api/class/getClassById/${classId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
        } else {
          setClassData(data);
        }
      } catch (err) {
        setError("Failed to fetch class data");
      }
    };
    fetchClass();
  }, [classId]);

  if (!classData) return <p className="text-center mt-10 text-white">Loading...</p>;

  // return (
  //   <div className="flex min-h-screen bg-[#070b14] text-white">

  //     {/* SIDEBAR */}
  //     <div className="">
  //       <AdminHeader />
  //     </div>

  //     {/* MAIN */}
  //     <div className="flex-1 mt-12 p-6 md:p-10 space-y-8">

  //       {/* HEADER */}
  //       <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
  //         <h2 className="text-3xl font-bold">{classData.name}</h2>
  //         <p className="text-gray-400 mt-2">
  //           Overview of subjects and students
  //         </p>
  //       </div>

  //       {/* 🔥 SUMMARY CARDS */}
  //       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

  //         <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:scale-105 transition">
  //           <h3 className="text-gray-400 text-sm">Total Subjects</h3>
  //           <p className="text-3xl font-bold mt-2">
  //             {classData.subjects?.length || 0}
  //           </p>
  //         </div>

  //         <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:scale-105 transition">
  //           <h3 className="text-gray-400 text-sm">Total Students</h3>
  //           <p className="text-3xl font-bold mt-2">
  //             {classData.students?.length || 0}
  //           </p>
  //         </div>

  //       </div>

  //       {/* 🔥 SUBJECTS PANEL */}
  //       <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">

  //         <h3 className="text-lg font-semibold mb-4">
  //           Subjects
  //         </h3>

  //         {classData.subjects?.length > 0 ? (
  //           <div className="space-y-3">

  //             {classData.subjects.map((subject) => (
  //               <div
  //                 key={subject._id}
  //                 className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/10"
  //               >
  //                 <span>{subject.name}</span>
  //                 <span className="text-sm text-gray-400">
  //                   {subject.teacher
  //                     ? subject.teacher.name
  //                     : "No teacher"}
  //                 </span>
  //               </div>
  //             ))}

  //           </div>
  //         ) : (
  //           <p className="text-gray-400">No subjects assigned.</p>
  //         )}

  //       </div>

  //       {/* 🔥 STUDENTS PANEL */}
  //       <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">

  //         <h3 className="text-lg font-semibold mb-4">
  //           Students
  //         </h3>

  //         {classData.students?.length > 0 ? (
  //           <div className="space-y-3">

  //             {classData.students.map((student) => (
  //               <div
  //                 key={student._id}
  //                 className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/10"
  //               >
  //                 <span>{student.name}</span>
  //                 <span className="text-sm text-gray-400">
  //                   {student.enrollmentNumber}
  //                 </span>
  //               </div>
  //             ))}

  //           </div>
  //         ) : (
  //           <p className="text-gray-400">No students enrolled.</p>
  //         )}

  //       </div>

  //       {/* ERROR / SUCCESS */}
  //       {error && <p className="text-red-400">{error}</p>}
  //       {successMessage && <p className="text-green-400">{successMessage}</p>}

  //     </div>
  //   </div>
  // );

  return (
  <div className="flex flex-col lg:flex-row min-h-screen bg-[#070b14] text-white">

    {/* SIDEBAR */}
    <div className="w-full lg:w-auto">
      <AdminHeader />
    </div>

    {/* MAIN */}
    <div className="flex-1 mt-14 lg:mt-0 p-4 sm:p-6 md:p-10 space-y-8">

      {/* 🔥 HERO HEADER */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0b0f1a] to-[#111827] border border-white/10 overflow-hidden">
        <div className="absolute inset-0 opacity-20 blur-3xl bg-violet-500/20"></div>

        <div className="relative z-10">
          <p className="text-xs tracking-widest text-gray-400 mb-2">
            • CLASS OVERVIEW
          </p>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-wide">
            {classData.name}
          </h2>

          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Subjects, teachers & enrolled students at a glance
          </p>
        </div>
      </div>

      {/* 🔥 SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

        <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 
        hover:scale-[1.03] transition relative overflow-hidden">
          <p className="text-xs text-gray-400 tracking-widest">
            TOTAL SUBJECTS
          </p>
          <p className="text-3xl sm:text-4xl font-bold mt-2 text-violet-400">
            {classData.subjects?.length || 0}
          </p>
        </div>

        <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 
        hover:scale-[1.03] transition relative overflow-hidden">
          <p className="text-xs text-gray-400 tracking-widest">
            TOTAL STUDENTS
          </p>
          <p className="text-3xl sm:text-4xl font-bold mt-2 text-cyan-400">
            {classData.students?.length || 0}
          </p>
        </div>

      </div>

      {/* 🔥 SUBJECTS PANEL */}
      <div className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden">

        {/* HEADER */}
        <div className="flex justify-between items-center p-4 sm:p-6 border-b border-white/10">
          <h3 className="text-base sm:text-lg font-semibold">
            Subjects
          </h3>

          <span className="text-xs px-3 py-1 rounded-full bg-violet-500/10 text-violet-400">
            {classData.subjects?.length || 0} total
          </span>
        </div>

        {/* LIST */}
        <div className="p-3 sm:p-4 space-y-3">

          {classData.subjects?.length > 0 ? (
            classData.subjects.map((subject) => (

              <div
                key={subject._id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 
                p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
              >
                {/* <span className="text-sm sm:text-base font-medium break-words">
                  {subject.name}
                </span> */}
                <div className="flex items-center gap-3">

  {/* INITIAL CIRCLE */}
  <div className="w-10 h-10 flex items-center justify-center rounded-full 
  bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-semibold">
    {subject.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()}
  </div>

  {/* SUBJECT NAME */}
  <span className="text-sm sm:text-base font-medium break-words">
    {subject.name}
  </span>

</div>

                <span className="text-xs sm:text-sm px-3 py-1 rounded-full 
                bg-yellow-500/10 text-yellow-400 w-fit">
                  {subject.teacher
                    ? subject.teacher.name
                    : "No teacher"}
                </span>
              </div>

            ))
          ) : (
            <p className="text-gray-400 text-sm">No subjects assigned.</p>
          )}

        </div>
      </div>

      {/* 🔥 STUDENTS PANEL */}
      <div className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden">

        {/* HEADER */}
        <div className="flex justify-between items-center p-4 sm:p-6 border-b border-white/10">
          <h3 className="text-base sm:text-lg font-semibold">
            Students
          </h3>

          <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400">
            {classData.students?.length || 0} enrolled
          </span>
        </div>

        {/* LIST */}
        <div className="p-3 sm:p-4 space-y-3">

          {classData.students?.length > 0 ? (
            classData.students.map((student) => (

              <div
                key={student._id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 
                p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
              >
                {/* <span className="text-sm sm:text-base font-medium break-words">
                  {student.name}
                </span> */}

                <div className="flex items-center gap-3">

  {/* INITIAL CIRCLE */}
  <div className="w-10 h-10 flex items-center justify-center rounded-full 
  bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold">
    {student.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()}
  </div>

  {/* NAME */}
  <span className="text-sm sm:text-base font-medium break-words">
    {student.name}
  </span>

</div>

                <span className="text-xs sm:text-sm text-gray-400 break-all">
                  {student.enrollmentNumber}
                </span>
              </div>

            ))
          ) : (
            <p className="text-gray-400 text-sm">No students enrolled.</p>
          )}

        </div>
      </div>

      {/* ERROR / SUCCESS */}
      {error && <p className="text-red-400">{error}</p>}
      {successMessage && <p className="text-green-400">{successMessage}</p>}

    </div>
  </div>
);

};