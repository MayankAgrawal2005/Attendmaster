

import React, { useEffect, useState } from 'react';
import { StudentHeader } from './StudentHeader';
import { useSelector } from 'react-redux';

export const Studentdashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const studentId = currentUser._id;

  const [studentAttendance, setStudentAttendance] = useState({});
  const [loading, setLoading] = useState(false);

  // 🔥 FETCH ATTENDANCE
  useEffect(() => {
    const fetchAttendance = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/attendance/get-student-attendance/${studentId}`);
        const data = await res.json();

        if (data.attendance) {
          setStudentAttendance(data.attendance);
        } else {
          setStudentAttendance({});
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [studentId]);

  // 🔥 CALCULATIONS
  const calculateAttendancePercentage = (records) => {
    if (!records || records.length === 0) return 0;
    const present = records.filter(r => r.status === "Present").length;
    return ((present / records.length) * 100).toFixed(0);
  };

  const calculateTotalAttendance = () => {
    let total = 0;
    let present = 0;

    Object.values(studentAttendance).forEach((records) => {
      total += records.length;
      present += records.filter(r => r.status === "Present").length;
    });

    if (total === 0) return 0;
    return ((present / total) * 100).toFixed(0);
  };

  const totalPercentage = calculateTotalAttendance();
  const subjects = Object.keys(studentAttendance);

  const atRisk = subjects.filter(
    (sub) => calculateAttendancePercentage(studentAttendance[sub]) < 75
  ).length;

  const onTrack = subjects.length - atRisk;

  function getGreeting() {
    const h = new Date().getHours();
    if (h < 12) return "Good Morning";
    if (h < 18) return "Good Afternoon";
    return "Good Evening";
  }

  // return (
  //   <div className="min-h-screen bg-[#070b14] text-white">

  //     {/* SIDEBAR */}
  //     <StudentHeader />

  //     {/* MAIN */}
  //     <div className="md:ml-64 p-6 sm:p-10 space-y-10">

  //       {/* HEADER */}
  //       <div className="flex justify-between items-center">
  //         <div>
  //           <p className="text-xs text-gray-500 tracking-widest">
  //             ATTENDMASTER • STUDENT PORTAL
  //           </p>
  //           <h1 className="text-3xl sm:text-4xl font-bold">
  //             {getGreeting()}, <span className="text-purple-400">{currentUser?.name}</span>
  //           </h1>
  //         </div>

  //         <div className="flex gap-3 items-center">
  //           <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
  //             {totalPercentage}%
  //           </div>
  //           <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
  //             {currentUser?.name?.charAt(0)}
  //           </div>
  //         </div>
  //       </div>

  //       {/* PROFILE CARD */}
  //       <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center">
  //         <div>
  //           <h2 className="text-xl font-semibold">{currentUser?.name}</h2>
  //           <p className="text-sm text-gray-400">{currentUser?.email}</p>
  //         </div>

  //         <div className="flex gap-6 text-center">
  //           <div>
  //             <p className="text-xl font-bold">{subjects.length}</p>
  //             <p className="text-xs text-gray-400">Subjects</p>
  //           </div>
  //           <div>
  //             <p className="text-xl font-bold text-green-400">{totalPercentage}%</p>
  //             <p className="text-xs text-gray-400">Avg Attend</p>
  //           </div>
  //           <div>
  //             <p className="text-xl font-bold text-green-400">{onTrack}</p>
  //             <p className="text-xs text-gray-400">On Track</p>
  //           </div>
  //           <div>
  //             <p className="text-xl font-bold text-red-400">{atRisk}</p>
  //             <p className="text-xs text-gray-400">At Risk</p>
  //           </div>
  //         </div>
  //       </div>

  //       {/* OVERVIEW */}
  //       <div>
  //         <h2 className="text-sm text-gray-500 mb-4 tracking-widest">OVERVIEW</h2>

  //         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
  //           <Card title="Overall Attendance" value={`${totalPercentage}%`} color="text-green-400" />
  //           <Card title="Subjects" value={subjects.length} color="text-purple-400" />
  //           <Card title="Classes This Month" value="--" color="text-yellow-400" />
  //           <Card title="At Risk" value={atRisk} color="text-red-400" />
  //         </div>
  //       </div>

  //       {/* QUICK ACCESS */}
  //       <div>
  //         <h2 className="text-sm text-gray-500 mb-4 tracking-widest">QUICK ACCESS</h2>

  //         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
  //           <Box title="My Attendance" desc="View records" />
  //           <Box title="Subjects" desc="Browse subjects" />
  //           <Box title="Timetable" desc="Weekly schedule" />
  //           <Box title="Reports" desc="Download reports" />
  //         </div>
  //       </div>

  //       {/* TIMETABLE */}
  //       <div>
  //         <h2 className="text-sm text-gray-500 mb-4 tracking-widest">TODAY'S TIMETABLE</h2>

  //         <div className="p-5 bg-white/5 border border-white/10 rounded-xl space-y-4">
  //           <div className="flex justify-between">
  //             <span>--</span>
  //             <span className="text-gray-400">--</span>
  //           </div>
  //           <div className="flex justify-between">
  //             <span>--</span>
  //             <span className="text-gray-400">--</span>
  //           </div>
  //         </div>
  //       </div>

  //       {/* NOTICE BOARD */}
  //       <div>
  //         <h2 className="text-sm text-gray-500 mb-4 tracking-widest">NOTICE BOARD</h2>

  //         <div className="space-y-4">
  //           <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
  //             📢 Mid-term exams start next week.
  //           </div>
  //           <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
  //             📢 Submit assignments before Friday.
  //           </div>
  //         </div>
  //       </div>

  //     </div>
  //   </div>
  // );
return (
  <div className="min-h-screen bg-[#070b14] text-white flex flex-col md:flex-row">

    {/* SIDEBAR */}
    <div className="">
      <StudentHeader />
    </div>

    {/* MAIN */}
    <div className="flex-1 mt-12 md:mt-0 p-4 sm:p-6 md:p-10 space-y-8 md:space-y-10  mt-14 lg:mt-0 lg:ml-64 ">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

        <div>
          <p className="text-[10px] sm:text-xs text-gray-500 tracking-widest">
            ATTENDMASTER • STUDENT PORTAL
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            {getGreeting()}, <span className="text-purple-400">{currentUser?.name}</span>
          </h1>
        </div>

        <div className="flex gap-3 items-center">
          <div className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm">
            {totalPercentage}%
          </div>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-sm">
            {currentUser?.name?.charAt(0)}
          </div>
        </div>

      </div>

      {/* PROFILE CARD */}
      <div className="p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

        <div>
          <h2 className="text-lg sm:text-xl font-semibold">{currentUser?.name}</h2>
          <p className="text-xs sm:text-sm text-gray-400">{currentUser?.email}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full md:w-auto text-center">
          <div>
            <p className="text-lg sm:text-xl font-bold">{subjects.length}</p>
            <p className="text-[10px] sm:text-xs text-gray-400">Subjects</p>
          </div>
          <div>
            <p className="text-lg sm:text-xl font-bold text-green-400">{totalPercentage}%</p>
            <p className="text-[10px] sm:text-xs text-gray-400">Avg Attend</p>
          </div>
          <div>
            <p className="text-lg sm:text-xl font-bold text-green-400">{onTrack}</p>
            <p className="text-[10px] sm:text-xs text-gray-400">On Track</p>
          </div>
          <div>
            <p className="text-lg sm:text-xl font-bold text-red-400">{atRisk}</p>
            <p className="text-[10px] sm:text-xs text-gray-400">At Risk</p>
          </div>
        </div>

      </div>

      {/* OVERVIEW */}
      <div>
        <h2 className="text-xs sm:text-sm text-gray-500 mb-4 tracking-widest">OVERVIEW</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card title="Overall Attendance" value={`${totalPercentage}%`} color="text-green-400" />
          <Card title="Subjects" value={subjects.length} color="text-purple-400" />
          <Card title="Classes This Month" value="--" color="text-yellow-400" />
          <Card title="At Risk" value={atRisk} color="text-red-400" />
        </div>
      </div>

      {/* QUICK ACCESS */}
      <div>
        <h2 className="text-xs sm:text-sm text-gray-500 mb-4 tracking-widest">QUICK ACCESS</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Box title="My Attendance" desc="View records" />
          <Box title="Subjects" desc="Browse subjects" />
          <Box title="Timetable" desc="Weekly schedule" />
          <Box title="Reports" desc="Download reports" />
        </div>
      </div>

      {/* TIMETABLE */}
      <div>
        <h2 className="text-xs sm:text-sm text-gray-500 mb-4 tracking-widest">TODAY'S TIMETABLE</h2>

        <div className="p-4 sm:p-5 bg-white/5 border border-white/10 rounded-xl space-y-3 sm:space-y-4">
          <div className="flex justify-between text-sm sm:text-base">
            <span>--</span>
            <span className="text-gray-400">--</span>
          </div>
          <div className="flex justify-between text-sm sm:text-base">
            <span>--</span>
            <span className="text-gray-400">--</span>
          </div>
        </div>
      </div>

      {/* NOTICE BOARD */}
      <div>
        <h2 className="text-xs sm:text-sm text-gray-500 mb-4 tracking-widest">NOTICE BOARD</h2>

        <div className="space-y-3 sm:space-y-4">
          <div className="p-3 sm:p-4 bg-white/5 border border-white/10 rounded-xl text-sm sm:text-base">
            📢 Mid-term exams start next week.
          </div>
          <div className="p-3 sm:p-4 bg-white/5 border border-white/10 rounded-xl text-sm sm:text-base">
            📢 Submit assignments before Friday.
          </div>
        </div>
      </div>

    </div>
  </div>
);


};

// 🔥 COMPONENTS
const Card = ({ title, value, color }) => (
  <div className="p-5 bg-white/5 border border-white/10 rounded-xl">
    <p className={`text-3xl font-bold ${color}`}>{value}</p>
    <p className="text-sm text-gray-400 mt-2">{title}</p>
  </div>
);

const Box = ({ title, desc }) => (
  <div className="p-5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 cursor-pointer">
    <h3 className="font-semibold">{title}</h3>
    <p className="text-sm text-gray-400 mt-2">{desc}</p>
  </div>
);



