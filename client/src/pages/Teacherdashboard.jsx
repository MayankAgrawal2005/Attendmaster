

// import React from 'react';
// import { TeacherHeader } from './TeacherHeader';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// export const Teacherdashboard = () => {
//   const navigate = useNavigate();
//   const { currentUser } = useSelector((state) => state.user);

//   function getGreeting() {
//     const currentHour = new Date().getHours();
//     if (currentHour < 12) {
//       return 'Good Morning';
//     } else if (currentHour < 18) {
//       return 'Good Afternoon';
//     } else {
//       return 'Good Evening';
//     }
//   }

//   return (
//     <div className="flex flex-col md:flex-row h-screen md:space-x-8">
//       {/* left side */}
//       <div className="w-full md:w-64 bg-slate-200 shadow-xl">
//         <TeacherHeader />
//       </div>

//       {/* right side */}
//       <div className="flex-1 min-h-screen border border-gray-200 shadow-2xl bg-white p-6 text-black">
//         <div className="flex flex-col justify-center items-center min-h-screen space-y-6">
//           <h1 className="text-3xl md:text-5xl text-center md:text-left">
//             Welcome To AttendMaster
//           </h1>
//           <p className="text-xl md:text-2xl font-bold">
//             {getGreeting()} {currentUser?.name}
//           </p>
//           <p className="mt-2 mb-10 text-lg md:text-xl font-mullish text-center md:text-left">
//             Select an option from the sidebar to get started.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };





import React, { useEffect, useState } from 'react';
import { TeacherHeader } from './TeacherHeader';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaChalkboardTeacher, FaUserGraduate, FaChartLine } from "react-icons/fa";

export const Teacherdashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [classesCount, setClassesCount] = useState(0);
  const [studentsCount, setStudentsCount] = useState(0);
  const [attendancePercent, setAttendancePercent] = useState(0);
  const [loading, setLoading] = useState(false);

  function getGreeting() {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return 'Good Morning';
    if (currentHour < 18) return 'Good Afternoon';
    return 'Good Evening';
  }

  // 🔥 FETCH ALL DASHBOARD DATA
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!currentUser?._id) return;

      try {
        setLoading(true);

        // 1️⃣ Teacher data
        const res = await fetch(`/api/teacher/get-teacher/${currentUser._id}`);
        const teacher = await res.json();

        const assignedSubjects = teacher.assignedSubjects || [];

        // 2️⃣ Unique classes
        const uniqueClasses = [];
        assignedSubjects.forEach((subj) => {
          subj.classId?.forEach((cls) => {
            if (!uniqueClasses.some((c) => c._id === cls._id)) {
              uniqueClasses.push(cls);
            }
          });
        });

        setClassesCount(uniqueClasses.length);

        let totalStudents = 0;
        let totalPresent = 0;
        let totalRecords = 0;

        // 3️⃣ Loop classes
        for (let cls of uniqueClasses) {

          // students
          const classRes = await fetch(`/api/class/getClassById/${cls._id}`);
          const classData = await classRes.json();

          totalStudents += classData.students?.length || 0;

          // attendance
          const query = new URLSearchParams({
            classId: cls._id,
            teacherId: currentUser._id,
          }).toString();

          const attRes = await fetch(`/api/attendance/get-attendance?${query}`);
          const attData = await attRes.json();

          if (attData?.attendanceDoc?.attendanceByDate) {
            attData.attendanceDoc.attendanceByDate.forEach((date) => {
              date.records.forEach((rec) => {
                totalRecords++;
                if (rec.status === "Present") totalPresent++;
              });
            });
          }
        }

        setStudentsCount(totalStudents);

        const percent =
          totalRecords > 0
            ? ((totalPresent / totalRecords) * 100).toFixed(1)
            : 0;

        setAttendancePercent(percent);

      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [currentUser?._id]);

  // return (
  //   <div className="min-h-screen bg-[#070b14] text-white">

  //     {/* 🔥 SIDEBAR */}
  //     <TeacherHeader />

  //     {/* 🔥 MAIN */}
  //     <div className="md:ml-64 p-6 sm:p-10 space-y-8">

  //       {/* 🔥 WELCOME CARD */}
  //       <div className="p-6 sm:p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col gap-4">

  //         <h1 className="text-2xl sm:text-3xl font-semibold">
  //           {getGreeting()}, <span className="text-green-400">{currentUser?.name}</span>
  //         </h1>

  //         <p className="text-gray-400 text-sm sm:text-base">
  //           Welcome to AttendMaster. Manage your classes, track attendance,
  //           and monitor student performance — all in one place.
  //         </p>

  //         <div className="flex flex-wrap gap-3 mt-2">
  //           <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
  //             ● Active
  //           </span>
  //           <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
  //             ● Teacher Panel
  //           </span>
  //         </div>

  //       </div>

  //       {/* 🔥 STATS */}
  //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

  //         {/* CARD 1 */}
  //         <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-lg hover:scale-105 transition">
  //           <FaChalkboardTeacher className="text-2xl mb-3 text-blue-400" />
  //           <h3 className="text-gray-400 text-sm">My Classes</h3>
  //           <p className="text-3xl font-bold mt-2">
  //             {loading ? '...' : classesCount}
  //           </p>
  //           <div className="mt-4 h-[40px] bg-white/5 rounded-lg"></div>
  //         </div>

  //         {/* CARD 2 */}
  //         <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-lg hover:scale-105 transition">
  //           <FaUserGraduate className="text-2xl mb-3 text-green-400" />
  //           <h3 className="text-gray-400 text-sm">Students</h3>
  //           <p className="text-3xl font-bold mt-2">
  //             {loading ? '...' : studentsCount}
  //           </p>
  //           <div className="mt-4 h-[40px] bg-white/5 rounded-lg"></div>
  //         </div>

  //         {/* CARD 3 */}
  //         <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-lg hover:scale-105 transition">
  //           <FaChartLine className="text-2xl mb-3 text-purple-400" />
  //           <h3 className="text-gray-400 text-sm">Attendance</h3>
  //           <p className="text-3xl font-bold mt-2">
  //             {loading ? '...' : `${attendancePercent}%`}
  //           </p>
  //           <div className="mt-4 h-[40px] bg-white/5 rounded-lg"></div>
  //         </div>

  //       </div>

  //       {/* 🔥 ACTION SECTION */}
  //       <div className="p-6 rounded-2xl bg-gradient-to-r from-green-600/20 to-emerald-500/10 border border-white/10 backdrop-blur-xl text-center">

  //         <h2 className="text-xl font-semibold mb-2">
  //           Ready to manage your class?
  //         </h2>

  //         <p className="text-gray-400 text-sm mb-4">
  //           Use the sidebar to navigate between attendance, students and subjects.
  //         </p>

  //         <button
  //           onClick={() => navigate('/teacherattendance')}
  //           className="px-6 py-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 hover:scale-105 transition"
  //         >
  //           Mark Attendance
  //         </button>

  //       </div>

  //     </div>
  //   </div>
  // );


  return (
  <div className="min-h-screen bg-[#070b14] text-white flex flex-col md:flex-row">

    {/* 🔥 SIDEBAR */}
    <div >
      <TeacherHeader />
    </div>

    {/* 🔥 MAIN */}
    <div className="flex-1 p-4 sm:p-6 md:p-10 space-y-6 sm:space-y-8  mt-14 lg:mt-0 lg:ml-64 ">

      {/* 🔥 WELCOME CARD */}
      <div className="p-5 sm:p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col gap-4">

        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">
          {getGreeting()}, <span className="text-green-400">{currentUser?.name}</span>
        </h1>

        <p className="text-gray-400 text-xs sm:text-sm md:text-base">
          Welcome to AttendMaster. Manage your classes, track attendance,
          and monitor student performance — all in one place.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-2">
          <span className="px-2 sm:px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs sm:text-sm">
            ● Active
          </span>
          <span className="px-2 sm:px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs sm:text-sm">
            ● Teacher Panel
          </span>
        </div>

      </div>

      {/* 🔥 STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

        {/* CARD 1 */}
        <div className="p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-lg hover:scale-105 transition">
          <FaChalkboardTeacher className="text-xl sm:text-2xl mb-2 sm:mb-3 text-blue-400" />
          <h3 className="text-gray-400 text-xs sm:text-sm">My Classes</h3>
          <p className="text-2xl sm:text-3xl font-bold mt-2">
            {loading ? '...' : classesCount}
          </p>
          <div className="mt-3 sm:mt-4 h-[30px] sm:h-[40px] bg-white/5 rounded-lg"></div>
        </div>

        {/* CARD 2 */}
        <div className="p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-lg hover:scale-105 transition">
          <FaUserGraduate className="text-xl sm:text-2xl mb-2 sm:mb-3 text-green-400" />
          <h3 className="text-gray-400 text-xs sm:text-sm">Students</h3>
          <p className="text-2xl sm:text-3xl font-bold mt-2">
            {loading ? '...' : studentsCount}
          </p>
          <div className="mt-3 sm:mt-4 h-[30px] sm:h-[40px] bg-white/5 rounded-lg"></div>
        </div>

        {/* CARD 3 */}
        <div className="p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-lg hover:scale-105 transition">
          <FaChartLine className="text-xl sm:text-2xl mb-2 sm:mb-3 text-purple-400" />
          <h3 className="text-gray-400 text-xs sm:text-sm">Attendance</h3>
          <p className="text-2xl sm:text-3xl font-bold mt-2">
            {loading ? '...' : `${attendancePercent}%`}
          </p>
          <div className="mt-3 sm:mt-4 h-[30px] sm:h-[40px] bg-white/5 rounded-lg"></div>
        </div>

      </div>

      {/* 🔥 ACTION SECTION */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-green-600/20 to-emerald-500/10 border border-white/10 backdrop-blur-xl text-center">

        <h2 className="text-lg sm:text-xl font-semibold mb-2">
          Ready to manage your class?
        </h2>

        <p className="text-gray-400 text-xs sm:text-sm mb-4">
          Use the sidebar to navigate between attendance, students and subjects.
        </p>

        <button
          onClick={() => navigate('/teacherattendance')}
          className="px-5 sm:px-6 py-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 hover:scale-105 transition text-sm sm:text-base"
        >
          Mark Attendance
        </button>

      </div>

    </div>


  </div>
);
};