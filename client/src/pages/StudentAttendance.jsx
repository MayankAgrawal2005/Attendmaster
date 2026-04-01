

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StudentHeader } from './StudentHeader';


export const StudentAttendance = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const studentId = currentUser._id;

  const [studentAttendance, setStudentAttendance] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchStudentAttendance = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/attendance/get-student-attendance/${studentId}`);
        const data = await res.json();
        console.log('API Response:', data);

        if (data.success === false) {
          setError(data.message);
          setMessage(null);
        } else if (data.message) {
          setMessage(data.message);
          setStudentAttendance({});
        } else {
          setStudentAttendance(data.attendance);
          setMessage(null);
        }
      } catch (error) {
        setError(error.message);
        setMessage(null);
      } finally {
        setLoading(false);
      }
    };
    fetchStudentAttendance();
  }, [studentId]);

  const calculateAttendancePercentage = (subjectAttendance) => {
    if (!subjectAttendance || !Array.isArray(subjectAttendance)) return 0;
    const totalClasses = subjectAttendance.length;
    if (totalClasses === 0) return 0;
    const presentCount = subjectAttendance.filter(record => record.status === "Present").length;
    return ((presentCount / totalClasses) * 100).toFixed(2);
  };

  const calculateTotalAttendancePercentage = () => {
    let totalPresent = 0;
    let totalClasses = 0;

    Object.values(studentAttendance).forEach((records) => {
      totalClasses += records.length;
      totalPresent += records.filter(record => record.status === "Present").length;
    });

    if (totalClasses === 0) return 0;
    return ((totalPresent / totalClasses) * 100).toFixed(2);
  };

  const totalPercentage = calculateTotalAttendancePercentage();



// return (
//   <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#020617] text-white flex">

//     {/* Sidebar */}
//     <div className="w-64   lg:block">
//       <StudentHeader />
//     </div>

//     {/* Main */}
//     <div className="flex-1 p-6 mt-14 space-y-6">

//       {/* HEADER */}
//       <div className="flex justify-between items-center bg-white/5 border border-white/10 rounded-2xl p-6">

//         <div className="flex items-center gap-4">
//           <div className="w-14 h-14 rounded-full bg-purple-500/20 flex items-center justify-center text-xl font-bold">
//             {currentUser?.name?.charAt(0)}
//           </div>

//           <div>
//             <h2 className="text-xl font-semibold">{currentUser?.name}</h2>
//             <p className="text-gray-400 text-sm">
//               ID: {currentUser?._id?.slice(-6)} • Student
//             </p>
//           </div>
//         </div>

//         {/* Circle */}
//         <div className="relative w-20 h-20">
//           <div className="absolute inset-0 rounded-full border-4 border-green-400/20"></div>
//           <div
//             className="absolute inset-0 rounded-full border-4 border-green-400"
//             style={{
//               clipPath: `inset(${100 - totalPercentage}% 0 0 0)`
//             }}
//           ></div>
//           <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
//             {totalPercentage}%
//           </div>
//         </div>

//       </div>

//       {/* STATS */}
//       <div className="grid md:grid-cols-5 gap-4">

//         <StatCard title="Total" value={
//           Object.values(studentAttendance).reduce((a, b) => a + b.length, 0)
//         } />

//         <StatCard title="Present" value={
//           Object.values(studentAttendance).reduce(
//             (a, b) => a + b.filter(r => r.status === "Present").length, 0
//           )
//         } color="text-green-400" />

//         <StatCard title="Absent" value={
//           Object.values(studentAttendance).reduce(
//             (a, b) => a + b.filter(r => r.status === "Absent").length, 0
//           )
//         } color="text-red-400" />

//         <StatCard title="Overall %" value={`${totalPercentage}%`} color="text-cyan-400" />

//         <StatCard title="Risk" value={
//           totalPercentage < 75 ? "Yes" : "No"
//         } color="text-yellow-400" />

//       </div>

//       {/* SUBJECT CARDS */}
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

//         {Object.entries(studentAttendance).map(([subject, records]) => {
//           const total = records.length;
//           const present = records.filter(r => r.status === "Present").length;
//           const absent = total - present;
//           const percent = calculateAttendancePercentage(records);

//           return (
//             <div key={subject} className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">

//               <div className="flex justify-between items-center">
//                 <h3 className="font-semibold">{subject}</h3>
//                 <span className="text-xl font-bold text-cyan-400">{percent}%</span>
//               </div>

//               <p className="text-gray-400 text-sm">{total} sessions</p>

//               <div className="flex gap-4 text-sm">
//                 <span className="text-green-400">{present} present</span>
//                 <span className="text-red-400">{absent} absent</span>
//               </div>

//               {/* Progress */}
//               <div className="w-full h-2 bg-gray-700 rounded-full">
//                 <div
//                   className="h-2 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full"
//                   style={{ width: `${percent}%` }}
//                 ></div>
//               </div>

//             </div>
//           );
//         })}

//       </div>

//       {/* SESSION GRID */}
//       <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">

//         <h2 className="text-lg font-semibold">Session-by-session record</h2>

//         {Object.entries(studentAttendance).map(([subject, records]) => {

//           return (
//             <div key={subject}>
//               <p className="text-sm text-gray-400 mb-2">{subject}</p>

//               <div className="flex flex-wrap gap-2">
//                 {records.map((rec, i) => (
//                   <div
//                     key={i}
//                     className={`w-6 h-6 rounded text-xs flex items-center justify-center
//                       ${rec.status === "Present"
//                         ? "bg-green-500/20 text-green-400"
//                         : "bg-red-500/20 text-red-400"}`}
//                   >
//                     {rec.status === "Present" ? "P" : "A"}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           );
//         })}

//       </div>

//     </div>
//   </div>
// );

return (
  <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#020617] text-white flex flex-col lg:flex-row">

    {/* Sidebar */}
    <div className="w-full lg:w-64 lg:min-h-screen">
      <StudentHeader />
    </div>

    {/* Main */}
    <div className="flex-1 p-4 sm:p-6 mt-14 lg:mt-0 space-y-5 sm:space-y-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6">

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-purple-500/20 flex items-center justify-center text-lg sm:text-xl font-bold">
            {currentUser?.name?.charAt(0)}
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-semibold">{currentUser?.name}</h2>
            <p className="text-gray-400 text-xs sm:text-sm">
              ID: {currentUser?._id?.slice(-6)} • Student
            </p>
          </div>
        </div>

        {/* Circle */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20">
          <div className="absolute inset-0 rounded-full border-4 border-green-400/20"></div>
          <div
            className="absolute inset-0 rounded-full border-4 border-green-400"
            style={{
              clipPath: `inset(${100 - totalPercentage}% 0 0 0)`
            }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center text-xs sm:text-sm font-bold">
            {totalPercentage}%
          </div>
        </div>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">

        <StatCard title="Total" value={
          Object.values(studentAttendance).reduce((a, b) => a + b.length, 0)
        } />

        <StatCard title="Present" value={
          Object.values(studentAttendance).reduce(
            (a, b) => a + b.filter(r => r.status === "Present").length, 0
          )
        } color="text-green-400" />

        <StatCard title="Absent" value={
          Object.values(studentAttendance).reduce(
            (a, b) => a + b.filter(r => r.status === "Absent").length, 0
          )
        } color="text-red-400" />

        <StatCard title="Overall %" value={`${totalPercentage}%`} color="text-cyan-400" />

        <StatCard title="Risk" value={
          totalPercentage < 75 ? "Yes" : "No"
        } color="text-yellow-400" />

      </div>

      {/* SUBJECT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {Object.entries(studentAttendance).map(([subject, records]) => {
          const total = records.length;
          const present = records.filter(r => r.status === "Present").length;
          const absent = total - present;
          const percent = calculateAttendancePercentage(records);

          return (
            <div key={subject} className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 space-y-3">

              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-sm sm:text-base">{subject}</h3>
                <span className="text-lg sm:text-xl font-bold text-cyan-400">{percent}%</span>
              </div>

              <p className="text-gray-400 text-xs sm:text-sm">{total} sessions</p>

              <div className="flex gap-3 sm:gap-4 text-xs sm:text-sm">
                <span className="text-green-400">{present} present</span>
                <span className="text-red-400">{absent} absent</span>
              </div>

              {/* Progress */}
              <div className="w-full h-2 bg-gray-700 rounded-full">
                <div
                  className="h-2 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>

            </div>
          );
        })}

      </div>

      {/* SESSION GRID */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 space-y-4">

        <h2 className="text-base sm:text-lg font-semibold">Session-by-session record</h2>

        {Object.entries(studentAttendance).map(([subject, records]) => {

          return (
            <div key={subject}>
              <p className="text-xs sm:text-sm text-gray-400 mb-2">{subject}</p>

              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {records.map((rec, i) => (
                  <div
                    key={i}
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded text-[10px] sm:text-xs flex items-center justify-center
                      ${rec.status === "Present"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"}`}
                  >
                    {rec.status === "Present" ? "P" : "A"}
                  </div>
                ))}
              </div>
            </div>
          );
        })}

      </div>

    </div>
  </div>
);

};

const StatCard = ({ title, value, color = "text-white" }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
    <p className="text-xs text-gray-400">{title}</p>
    <h2 className={`text-2xl font-bold mt-2 ${color}`}>{value}</h2>
  </div>
);





