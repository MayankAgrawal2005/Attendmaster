



import React, { useState, useEffect } from 'react';
import { TeacherHeader } from './TeacherHeader';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const AttendanceRecord = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [attendanceData, setAttendanceData] = useState([]);
  const [teacherData, setTeacherData] = useState(null);
  const [assignedSubjects, setAssignedSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedClass, setSelectedClass] = useState('');
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');

  useEffect(() => {
    const fetchTeacherData = async () => {
      if (!currentUser?._id) return;
      try {
        setLoading(true);
        const res = await fetch(`/api/teacher/get-teacher/${currentUser?._id}`);
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
        }
        setTeacherData(data);
        setAssignedSubjects(data.assignedSubjects || []);

        const uniqueClasses = [];
        (data.assignedSubjects || []).forEach((subj) => {
          if (Array.isArray(subj.classId)) {
            subj.classId.forEach((cls) => {
              if (!uniqueClasses.some((item) => item._id === cls._id)) {
                uniqueClasses.push(cls);
              }
            });
          }
        });
        setClasses(uniqueClasses);
      } catch (err) {
        setError('Failed to load teacher data');
      } finally {
        setLoading(false);
      }
    };
    fetchTeacherData();
  }, [currentUser?._id]);

  const handleClassChange = (e) => {
    const classId = e.target.value;
    setSelectedClass(classId);
    const filtered = assignedSubjects.filter((subj) =>
      Array.isArray(subj.classId) && subj.classId.some((c) => c._id === classId)
    );
    setFilteredSubjects(filtered);
    setSelectedSubject('');
  };

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const fetchAttendance = async () => {
    if (!selectedClass || !selectedSubject) {
      return alert('Please select class & subject');
    }
    try {
      setLoading(true);
      setError(null);
      setAttendanceData([]);
      const payload = {
        classId: selectedClass,
        subjectId: selectedSubject,
        teacherId: currentUser._id,
      };
      const queryParams = new URLSearchParams(payload).toString();
      const url = `/api/attendance/get-attendance?${queryParams}`;
      const response = await fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
      if (!response.ok) throw new Error('Failed to fetch attendance data');
      const data = await response.json();
      setAttendanceData(data);
    } catch (err) {
      setError(err.message);
      setAttendanceData([]);
      setTimeout(() => setError(null), 4000);
    } finally {
      setLoading(false);
    }
  };

  const exportToExcel = () => {
    if (attendanceData.length === 0) return alert('No attendance data to export!');
    const excelData = attendanceData?.attendanceDoc?.attendanceByDate?.[0]?.records?.map((student) => {
      const row = { Name: student.name, Enrollment: student.enrollment };
      attendanceData?.attendanceDoc?.attendanceByDate?.forEach((dateRecord) => {
        const studentRecord = dateRecord.records.find((rec) => rec.studentId === student.studentId);
        row[new Date(dateRecord.date).toLocaleDateString()] = studentRecord?.status || 'Absent';
      });
      const totalDays = attendanceData?.attendanceDoc?.attendanceByDate?.length || 0;
      const daysPresent = attendanceData?.attendanceDoc?.attendanceByDate?.reduce((count, dateRecord) => {
        const studentRecord = dateRecord.records.find((rec) => rec.studentId === student.studentId);
        return count + (studentRecord?.status === 'Present' ? 1 : 0);
      }, 0);
      row['Percentage'] = `${((daysPresent / totalDays) * 100).toFixed(2)}%`;
      return row;
    });
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    worksheet['!cols'] = [{ wch: 26 }, { wch: 15 }, ...attendanceData?.attendanceDoc?.attendanceByDate?.map(() => ({ wch: 12 })), { wch: 12 }];
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance');
    XLSX.writeFile(workbook, 'Attendance_Record.xlsx');
  };

  const exportToPDF = () => {
    if (!attendanceData?.attendanceDoc?.attendanceByDate?.length) return alert('No attendance data to export!');
    const doc = new jsPDF('landscape');
    doc.setFontSize(18);
    doc.text('Attendance Record', 14, 15);
    const headers = ['Name', 'Enrollment', ...attendanceData.attendanceDoc.attendanceByDate.map((d) => new Date(d.date).toLocaleDateString()), 'Percentage'];
    const students = attendanceData.attendanceDoc.attendanceByDate[0]?.records || [];
    const rows = students.map((student) => {
      const row = [student.name, student.enrollment];
      attendanceData.attendanceDoc.attendanceByDate.forEach((dateRecord) => {
        const studentRecord = dateRecord.records.find((rec) => rec.studentId === student.studentId);
        row.push(studentRecord?.status || 'Absent');
      });
      const totalDays = attendanceData.attendanceDoc.attendanceByDate.length;
      const daysPresent = attendanceData.attendanceDoc.attendanceByDate.reduce((count, dateRecord) => {
        const studentRecord = dateRecord.records.find((rec) => rec.studentId === student.studentId);
        return count + (studentRecord?.status === 'Present' ? 1 : 0);
      }, 0);
      row.push(`${((daysPresent / totalDays) * 100).toFixed(2)}%`);
      return row;
    });
    autoTable(doc, { head: [headers], body: rows, startY: 20, theme: 'grid', styles: { fontSize: 10, cellPadding: 3 }, headStyles: { fillColor: [41, 128, 185], textColor: 255 } });
    doc.save('Attendance_Record.pdf');
  };


  // return (

  //   <div className="flex flex-col lg:flex-row min-h-screen space-y-4 lg:space-y-0 lg:space-x-8">
  //     {/* Sidebar */}
  //     <div className="w-full lg:w-64 bg-white shadow-xl overflow-y-auto border-r border-gray-300">
  //       <TeacherHeader />
  //     </div>

  //     {/* Main Content */}
  //     <div className="flex-1 overflow-y-auto shadow-2xl bg-white p-4 sm:p-6 text-black">
  //       {loading && <p>Loading...</p>}
  //       {error && <p className="text-red-500">{error}</p>}

  //       <div className="mt-4 p-3 w-full border border-gray-300 rounded-2xl">
  //         <h1 className="text-xl sm:text-2xl font-semibold p-3">View Attendance</h1>

  //         {/* Filters */}
  //         <div className="flex flex-col flex-wrap sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0 mt-4">
  //           {/* Class Select */}
  //           <div>
  //             <label className="block mb-1 font-semibold">Select Class:</label>
  //             <select value={selectedClass} onChange={handleClassChange} className="border border-gray-300 p-2 rounded w-full sm:w-80">
  //               <option value="" disabled>-- Choose a Class --</option>
  //               {classes.map((cls) => (
  //                 <option key={cls._id} value={cls._id}>{cls.name}</option>
  //               ))}
  //             </select>
  //           </div>

  //           {/* Subject Select */}
  //           {filteredSubjects.length > 0 && (
  //             <div>
  //               <label className="block mb-1 font-semibold">Select Subject:</label>
  //               <select value={selectedSubject} onChange={handleSubjectChange} className="border border-gray-300 p-2 rounded w-full sm:w-80">
  //                 <option value="" disabled>-- Choose a Subject --</option>
  //                 {filteredSubjects.map((subj) => (
  //                   <option key={subj._id} value={subj._id}>{subj.name}</option>
  //                 ))}
  //               </select>
  //             </div>
  //           )}

  //           {/* Fetch Button */}
  //           <button onClick={fetchAttendance} className="bg-blue-500 text-white p-2 rounded w-full sm:w-40 h-12 mt-6 hover:bg-blue-600">
  //             Fetch Attendance
  //           </button>
  //         </div>

  //         {/* Attendance Table */}
  //         <div className="mt-4 p-3 w-full border border-gray-300 rounded-2xl overflow-x-auto">
  //           {attendanceData.length === 0 ? (
  //             <p>No attendance in the class</p>
  //           ) : (
  //             <>
  //               <table id="attendance-table" className="w-full border border-gray-300 bg-white shadow-md min-w-max">
  //                 <thead className="text-gray-600 border border-gray-300">
  //                   <tr>
  //                     <th className="p-3 text-left">Name</th>
  //                     <th className="p-3 text-left">Enrollment</th>
  //                     {[...new Set(attendanceData?.attendanceDoc?.attendanceByDate?.map(record => record.date))].map(date => (
  //                       <th key={date} className="p-3 text-left">{new Date(date).toLocaleDateString()}</th>
  //                     ))}
  //                     <th className="p-3 text-left">Percentage</th>
  //                   </tr>
  //                 </thead>
  //                 <tbody>
  //                   {attendanceData?.attendanceDoc?.attendanceByDate?.[0]?.records?.map((student) => {
  //                     const totalDays = attendanceData?.attendanceDoc?.attendanceByDate?.length || 0;
  //                     const daysPresent = attendanceData?.attendanceDoc?.attendanceByDate?.reduce((count, dateRecord) => {
  //                       const studentRecord = dateRecord.records.find((rec) => rec.studentId === student.studentId);
  //                       return count + (studentRecord?.status === "Present" ? 1 : 0);
  //                     }, 0);
  //                     const percentage = totalDays > 0 ? ((daysPresent / totalDays) * 100).toFixed(2) : 0;
  //                     return (
  //                       <tr key={student.studentId} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
  //                         <td className="p-3">{student.name}</td>
  //                         <td className="p-3">{student.enrollment}</td>
  //                         {attendanceData?.attendanceDoc?.attendanceByDate?.map((dateRecord) => {
  //                           const studentRecord = dateRecord.records.find((rec) => rec.studentId === student.studentId);
  //                           return (
  //                             <td key={dateRecord.date} className="p-3">
  //                               <input type="checkbox" checked={studentRecord?.status === "Present"} readOnly className="w-5 h-5" />
  //                             </td>
  //                           );
  //                         })}
  //                         <td className="p-3">{percentage}%</td>
  //                       </tr>
  //                     );
  //                   })}
  //                 </tbody>
  //               </table>

  //               {/* Export Buttons */}
  //               <div className="flex flex-col sm:flex-row sm:space-x-4 mt-4 space-y-3 sm:space-y-0">
  //                 <button onClick={exportToExcel} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
  //                   Export to Excel
  //                 </button>
  //                 <button onClick={exportToPDF} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
  //                   Export to PDF
  //                 </button>
  //               </div>
  //             </>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );


  const attendanceDates =
  attendanceData?.attendanceDoc?.attendanceByDate || [];

const maxVisible = 6; // 👈 control visible columns

const totalDays = attendanceDates.length;

// return (
//   <div className="flex min-h-screen bg-[#050816] text-white">
 
  // <style>{`
  //       @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,400&family=Syne:wght@700;800&display=swap');

  //       @keyframes fadeUp {
  //         from { opacity: 0; transform: translateY(36px); }
  //         to   { opacity: 1; transform: translateY(0); }
  //       }
  //       @keyframes floatOrb {
  //         0%, 100% { transform: translateY(0) scale(1); }
  //         50%       { transform: translateY(-28px) scale(1.06); }
  //       }
  //       @keyframes spinSlow {
  //         to { transform: rotate(360deg); }
  //       }
  //       @keyframes pulse-ring {
  //         0%   { transform: scale(0.8); opacity: 0.8; }
  //         100% { transform: scale(2.2); opacity: 0; }
  //       }
  //       @keyframes gradientShift {
  //         0%, 100% { background-position: 0% 50%; }
  //         50%       { background-position: 100% 50%; }
  //       }
  //       @keyframes shimmer {
  //         from { background-position: -200% center; }
  //         to   { background-position:  200% center; }
  //       }
  //       @keyframes ticker {
  //         from { transform: translateX(0); }
  //         to   { transform: translateX(-50%); }
  //       }

  //       .hero-title {
  //         font-family: 'Syne', sans-serif;
  //         font-weight: 800;
  //       }
  //       .shimmer-text {
  //         background: linear-gradient(90deg, #fff 0%, #a78bfa 40%, #e879f9 60%, #fff 100%);
  //         background-size: 200% auto;
  //         -webkit-background-clip: text;
  //         -webkit-text-fill-color: transparent;
  //         animation: shimmer 4s linear infinite;
  //       }
  //       .gradient-border {
  //         background: linear-gradient(#070b14, #070b14) padding-box,
  //                     linear-gradient(135deg, #7c3aed, #a855f7, #ec4899) border-box;
  //         border: 1px solid transparent;
  //       }
  //       .orb { animation: floatOrb 7s ease-in-out infinite; }
  //       .orb-2 { animation: floatOrb 9s ease-in-out infinite reverse; }
  //       .spin-slow { animation: spinSlow 20s linear infinite; }
  //       .ticker-wrap { overflow: hidden; white-space: nowrap; }
  //       .ticker { display: inline-flex; animation: ticker 22s linear infinite; }
  //     `}</style>
//     {/* SIDEBAR */}
//     <div className="hidden lg:block w-64 border-r border-white/10">
//       <TeacherHeader />
//     </div>


//     {/* MAIN */}
//     <div className="flex-1 p-6 space-y-6 overflow-hidden">

//       {/* HEADER */}
//       <div className="flex justify-between items-center">
//         {/* <h1 className="text-4xl hero-title shimmer-text">
//           Attendance Records
//         </h1> */}
// <h1
//   className="hero-title text-5xl sm:text-6xl leading-[1.05]"
//   style={{ animation: 'fadeUp 0.7s ease 0.1s both' }}
// >
//   Attendance <br />
//   <span className="shimmer-text">Records</span>
// </h1>
        
//         <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm">
//           {new Date().toDateString()}
//         </div>
//       </div>

//       {/* FILTER */}
//       <div className="gradient-border rounded-2xl p-6 bg-white/5 backdrop-blur-xl">
//         <h2 className="text-lg font-semibold mb-4">Filter & Fetch</h2>

//         <div className="flex flex-col md:flex-row gap-4">

//           <select
//             value={selectedClass}
//             onChange={handleClassChange}
//             className="bg-white/5 border border-white/10 p-3 rounded-xl w-full"
//           >
//             <option className='text-black' value="">Select Class</option>
//             {classes.map((cls) => (
//               <option key={cls._id} value={cls._id} className='bg-black'>
//                 {cls.name}
//               </option>
              
//             ))}
//           </select>

//           <select
//             value={selectedSubject}
//             onChange={handleSubjectChange}
//             className="bg-white/5 border border-white/10 p-3 rounded-xl w-full"
//           >
//             <option className='text-black' value="">Select Subject</option>
//             {filteredSubjects.map((subj) => (
//               <option key={subj._id} value={subj._id} className='bg-black'>
//                 {subj.name}
//               </option>
//             ))}
//           </select>

//           <button
//             onClick={fetchAttendance}
//             className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 hover:scale-105 transition"
//           >
//             Fetch
//           </button>

//         </div>
//       </div>

//       {/* STATS */}
//       {attendanceData?.attendanceDoc && (
//         <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

//           {[
//             {
//               label: "Students",
//               value:
//                 attendanceData.attendanceDoc.attendanceByDate?.[0]?.records
//                   ?.length || 0,
//               color: "text-violet-400",
//             },
//             {
//               label: "Sessions",
//               value:
//                 attendanceData.attendanceDoc.attendanceByDate?.length || 0,
//               color: "text-blue-400",
//             },
//             { label: "Present", value: "—", color: "text-green-400" },
//             { label: "Absent", value: "—", color: "text-red-400" },
//             { label: "Avg %", value: "—", color: "text-yellow-400" },
//           ].map((item, i) => (
//             <div
//               key={i}
//               className="bg-white/5 border border-white/10 p-4 rounded-xl"
//             >
//               <p className="text-sm text-gray-400">{item.label}</p>
//               <h2 className={`text-2xl font-bold ${item.color}`}>
//                 {item.value}
//               </h2>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* TABLE */}
//       <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">

//   {/* 🔥 ONLY ONE SCROLL HERE */}
//   <div className="overflow-x-auto">

//     <table className="min-w-[1200px] w-full">

//       {/* HEADER */}
//       <thead className="bg-white/5">
//         <tr>
//           <th className="p-4 text-left min-w-[200px]">Student</th>
//           <th className="p-4 text-left min-w-[150px]">Enrollment</th>

//           {/* ❌ REMOVED FLEX + SCROLL FROM HERE */}
//           {attendanceData?.attendanceDoc?.attendanceByDate?.map((d) => {
//             const dateObj = new Date(d.date);

//             return (
//               <th
//                 key={d.date}
//                 className="min-w-[110px] text-center py-3 text-xs border-r border-white/10"
//               >
//                 <p className="text-sm font-semibold">
//                   {dateObj.getDate()}
//                 </p>

//                 <p className="text-gray-400 text-[10px]">
//                   {dateObj.toLocaleDateString("en-US", {
//                     weekday: "short",
//                     month: "short",
//                     year: "numeric",
//                   })}
//                 </p>
//               </th>
//             );
//           })}

//           {/* 🔥 STICKY % */}
//           <th className="p-4 text-center min-w-[100px] sticky right-0 bg-[#050816] z-20">
//             %
//           </th>
//         </tr>
//       </thead>

//       {/* BODY */}
//       <tbody>
//         {attendanceData?.attendanceDoc?.attendanceByDate?.[0]?.records?.map(
//           (student, index) => {

//             const totalDays =
//               attendanceData.attendanceDoc.attendanceByDate.length;

//             const daysPresent =
//               attendanceData.attendanceDoc.attendanceByDate.reduce(
//                 (count, dateRecord) => {
//                   const record = dateRecord.records.find(
//                     (r) => r.studentId === student.studentId
//                   );
//                   return count + (record?.status === "Present" ? 1 : 0);
//                 },
//                 0
//               );

//             const percentage = (
//               (daysPresent / totalDays) * 100
//             ).toFixed(1);

//             return (
//               <tr
//                 key={index}
//                 className="border-t border-white/10 hover:bg-white/5 transition"
//               >
//                 <td className="p-4 min-w-[200px]">
//                   {student.name}
//                 </td>

//                 <td className="p-4 text-gray-400 min-w-[150px]">
//                   {student.enrollment}
//                 </td>

//                 {/* ❌ REMOVED INNER SCROLL */}
//                 {attendanceData.attendanceDoc.attendanceByDate.map(
//                   (dateRecord) => {
//                     const record = dateRecord.records.find(
//                       (r) => r.studentId === student.studentId
//                     );

//                     return (
//                       <td
//                         key={dateRecord.date}
//                         className="min-w-[110px] text-center py-3 border-r border-white/10"
//                       >
//                         <span
//                           className={`px-3 py-1 rounded-full text-xs font-semibold
//                           ${
//                             record?.status === "Present"
//                               ? "bg-green-500/20 text-green-400"
//                               : "bg-red-500/20 text-red-400"
//                           }`}
//                         >
//                           {record?.status === "Present" ? "P" : "A"}
//                         </span>
//                       </td>
//                     );
//                   }
//                 )}

//                 {/* 🔥 STICKY % */}
//                 <td className="text-center font-bold text-yellow-400 sticky right-0 bg-[#050816] z-10">
//                   {percentage}%
//                 </td>
//               </tr>
//             );
//           }
//         )}
//       </tbody>

//     </table>
//   </div>

//   {/* EXPORT */}
//   <div className="flex gap-4 p-4 border-t border-white/10">
//     <button
//       onClick={exportToExcel}
//       className="px-5 py-2 bg-green-500/20 text-green-400 rounded-xl hover:bg-green-500/30"
//     >
//       Export Excel
//     </button>

//     <button
//       onClick={exportToPDF}
//       className="px-5 py-2 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30"
//     >
//       Export PDF
//     </button>
//   </div>

// </div>

//     </div>
//   </div>
// );
  

return (
  <div className="min-h-screen bg-[#050816] text-white flex flex-col md:flex-row">

    {/* SIDEBAR */}
    <TeacherHeader />

    {/* MAIN */}
    <div className="flex-1 lg:ml-64 p-4 sm:p-6 md:p-8 space-y-6 mt-14 lg:mt-0 overflow-hidden">
        

          <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,400&family=Syne:wght@700;800&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatOrb {
          0%, 100% { transform: translateY(0) scale(1); }
          50%       { transform: translateY(-28px) scale(1.06); }
        }
        @keyframes spinSlow {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50%       { background-position: 100% 50%; }
        }
        @keyframes shimmer {
          from { background-position: -200% center; }
          to   { background-position:  200% center; }
        }
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .hero-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
        }
        .shimmer-text {
          background: linear-gradient(90deg, #fff 0%, #a78bfa 40%, #e879f9 60%, #fff 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }
        .gradient-border {
          background: linear-gradient(#070b14, #070b14) padding-box,
                      linear-gradient(135deg, #7c3aed, #a855f7, #ec4899) border-box;
          border: 1px solid transparent;
        }
        .orb { animation: floatOrb 7s ease-in-out infinite; }
        .orb-2 { animation: floatOrb 9s ease-in-out infinite reverse; }
        .spin-slow { animation: spinSlow 20s linear infinite; }
        .ticker-wrap { overflow: hidden; white-space: nowrap; }
        .ticker { display: inline-flex; animation: ticker 22s linear infinite; }
      `}</style>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

        <h1
          className="hero-title text-3xl sm:text-5xl lg:text-6xl leading-tight"
          style={{ animation: 'fadeUp 0.7s ease 0.1s both' }}
        >
          Attendance <br />
          <span className="shimmer-text">Records</span>
        </h1>

        <div className="px-3 sm:px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs sm:text-sm">
          {new Date().toDateString()}
        </div>

      </div>

      {/* FILTER */}
      <div className="gradient-border rounded-2xl p-4 sm:p-6 bg-white/5 backdrop-blur-xl">
        <h2 className="text-base sm:text-lg font-semibold mb-4">Filter & Fetch</h2>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">

          <select
            value={selectedClass}
            onChange={handleClassChange}
            className="bg-white/5 border border-white/10 p-3 rounded-xl w-full"
          >
            <option value="">Select Class</option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id} className="bg-black">
                {cls.name}
              </option>
            ))}
          </select>

          <select
            value={selectedSubject}
            onChange={handleSubjectChange}
            className="bg-white/5 border border-white/10 p-3 rounded-xl w-full"
          >
            <option value="">Select Subject</option>
            {filteredSubjects.map((subj) => (
              <option key={subj._id} value={subj._id} className="bg-black">
                {subj.name}
              </option>
            ))}
          </select>

          <button
            onClick={fetchAttendance}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 hover:scale-105 transition"
          >
            Fetch
          </button>

        </div>
      </div>

      {/* STATS */}
      {attendanceData?.attendanceDoc && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">

          {[
            {
              label: "Students",
              value:
                attendanceData.attendanceDoc.attendanceByDate?.[0]?.records?.length || 0,
              color: "text-violet-400",
            },
            {
              label: "Sessions",
              value:
                attendanceData.attendanceDoc.attendanceByDate?.length || 0,
              color: "text-blue-400",
            },
            { label: "Present", value: "—", color: "text-green-400" },
            { label: "Absent", value: "—", color: "text-red-400" },
            { label: "Avg %", value: "—", color: "text-yellow-400" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 p-3 sm:p-4 rounded-xl"
            >
              <p className="text-xs sm:text-sm text-gray-400">{item.label}</p>
              <h2 className={`text-lg sm:text-2xl font-bold ${item.color}`}>
                {item.value}
              </h2>
            </div>
          ))}

        </div>
      )}

      {/* TABLE */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="min-w-[800px] md:min-w-[1200px] w-full text-sm">

            <thead className="bg-white/5">
              <tr>
                <th className="p-3 sm:p-4 text-left min-w-[180px]">Student</th>
                <th className="p-3 sm:p-4 text-left min-w-[130px]">Enrollment</th>

                {attendanceData?.attendanceDoc?.attendanceByDate?.map((d) => {
                  const dateObj = new Date(d.date);
                  return (
                    <th
                      key={d.date}
                      className="min-w-[100px] text-center py-2 sm:py-3 text-xs border-r border-white/10"
                    >
                      <p className="text-xs sm:text-sm font-semibold">
                        {dateObj.getDate()}
                      </p>
                      <p className="text-gray-400 text-[9px] sm:text-[10px]">
                        {dateObj.toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                        })}
                      </p>
                    </th>
                  );
                })}

                <th className="p-3 sm:p-4 text-center min-w-[90px] sticky right-0 bg-[#050816] z-20">
                  %
                </th>
              </tr>
            </thead>

            <tbody>
              {attendanceData?.attendanceDoc?.attendanceByDate?.[0]?.records?.map(
                (student, index) => {

                  const totalDays =
                    attendanceData.attendanceDoc.attendanceByDate.length;

                  const daysPresent =
                    attendanceData.attendanceDoc.attendanceByDate.reduce(
                      (count, dateRecord) => {
                        const record = dateRecord.records.find(
                          (r) => r.studentId === student.studentId
                        );
                        return count + (record?.status === "Present" ? 1 : 0);
                      },
                      0
                    );

                  const percentage = ((daysPresent / totalDays) * 100).toFixed(1);

                  return (
                    <tr key={index} className="border-t border-white/10 hover:bg-white/5">

                      <td className="p-3 sm:p-4">{student.name}</td>
                      <td className="p-3 sm:p-4 text-gray-400">{student.enrollment}</td>

                      {attendanceData.attendanceDoc.attendanceByDate.map((dateRecord) => {
                        const record = dateRecord.records.find(
                          (r) => r.studentId === student.studentId
                        );

                        return (
                          <td key={dateRecord.date} className="text-center py-2 border-r border-white/10">
                            <span className={`px-2 py-1 rounded-full text-xs
                              ${record?.status === "Present"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-red-500/20 text-red-400"}`}>
                              {record?.status === "Present" ? "P" : "A"}
                            </span>
                          </td>
                        );
                      })}

                      <td className="text-center font-bold text-yellow-400 sticky right-0 bg-[#050816]">
                        {percentage}%
                      </td>

                    </tr>
                  );
                }
              )}
            </tbody>

          </table>
        </div>

        {/* EXPORT */}
        <div className="flex flex-col sm:flex-row gap-3 p-4 border-t border-white/10">

          <button
            onClick={exportToExcel}
            className="w-full sm:w-auto px-5 py-2 bg-green-500/20 text-green-400 rounded-xl hover:bg-green-500/30"
          >
            Export Excel
          </button>

          <button
            onClick={exportToPDF}
            className="w-full sm:w-auto px-5 py-2 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30"
          >
            Export PDF
          </button>

        </div>

      </div>

    </div>
  </div>
);

};






// import React, { useState, useEffect } from 'react';
// // import { TeacherHeader } from './TeacherHeader';
// // import { useNavigate } from 'react-router-dom';
// // import { useSelector } from 'react-redux';
// // import * as XLSX from 'xlsx';
// // import jsPDF from 'jspdf';
// // import autoTable from 'jspdf-autotable';

// // ── Demo stubs ────────────────────────────────────────────────────────────────
// const useSelector = (fn) =>
//   fn({ user: { currentUser: { _id: 'demo-teacher-id' } } });

// const mockTeacher = {
//   assignedSubjects: [
//     { _id: 's1', name: 'Mathematics', classId: [{ _id: 'c1', name: 'Class 10-A' }] },
//     { _id: 's2', name: 'Physics',     classId: [{ _id: 'c1', name: 'Class 10-A' }, { _id: 'c2', name: 'Class 11-B' }] },
//     { _id: 's3', name: 'Chemistry',   classId: [{ _id: 'c2', name: 'Class 11-B' }] },
//   ],
// };

// const generateMockAttendance = () => {
//   const students = [
//     { studentId: 'st1', name: 'Aryan Sharma',  enrollment: '2024001' },
//     { studentId: 'st2', name: 'Priya Patel',   enrollment: '2024002' },
//     { studentId: 'st3', name: 'Rahul Verma',   enrollment: '2024003' },
//     { studentId: 'st4', name: 'Sneha Gupta',   enrollment: '2024004' },
//     { studentId: 'st5', name: 'Amit Kumar',    enrollment: '2024005' },
//     { studentId: 'st6', name: 'Divya Singh',   enrollment: '2024006' },
//   ];
//   const dates = Array.from({ length: 10 }, (_, i) => {
//     const d = new Date(); d.setDate(d.getDate() - (9 - i));
//     return d.toISOString();
//   });
//   return {
//     attendanceDoc: {
//       attendanceByDate: dates.map((date) => ({
//         date,
//         records: students.map((s) => ({
//           ...s,
//           status: Math.random() > 0.28 ? 'Present' : 'Absent',
//         })),
//       })),
//     },
//   };
// };

// // ── CSS ───────────────────────────────────────────────────────────────────────
// const STYLES = `
//   @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

//   :root {
//     --bg:       #090b10;
//     --s1:       #0f1117;
//     --s2:       #161921;
//     --s3:       #1c2030;
//     --border:   rgba(255,255,255,0.07);
//     --border2:  rgba(255,255,255,0.13);
//     --accent:   #6c63ff;
//     --accent2:  #a78bfa;
//     --green:    #22d3a8;
//     --red:      #f87171;
//     --gold:     #fbbf24;
//     --blue:     #38bdf8;
//     --text:     #e2e6f0;
//     --muted:    #5a6278;
//     --r:        14px;
//   }

//   .ar-root *, .ar-root *::before, .ar-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

//   .ar-root {
//     font-family: 'DM Mono', monospace;
//     background: var(--bg);
//     color: var(--text);
//     min-height: 100vh;
//   }

//   /* Layout */
//   .ar-layout { display: flex; min-height: 100vh; }

//   /* Sidebar */
//   .ar-sidebar {
//     width: 68px;
//     background: var(--s1);
//     border-right: 1px solid var(--border);
//     display: flex; flex-direction: column; align-items: center;
//     padding: 22px 0; gap: 24px;
//     position: sticky; top: 0; height: 100vh;
//   }
//   .ar-logo {
//     width: 38px; height: 38px;
//     background: linear-gradient(135deg, var(--accent), var(--accent2));
//     border-radius: 11px;
//     display: flex; align-items: center; justify-content: center;
//     font-family: 'Syne', sans-serif; font-weight: 800; font-size: 17px; color: #fff;
//     box-shadow: 0 4px 18px rgba(108,99,255,0.38);
//   }
//   .ar-nav {
//     width: 42px; height: 42px; border-radius: 11px;
//     display: flex; align-items: center; justify-content: center;
//     color: var(--muted); cursor: pointer; transition: all 0.2s;
//   }
//   .ar-nav.on, .ar-nav:hover { background: rgba(108,99,255,0.14); color: var(--accent2); }

//   /* Main */
//   .ar-main { flex: 1; padding: 30px 34px; overflow-x: hidden; }

//   /* Page header */
//   .ar-ph { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 28px; flex-wrap: wrap; gap: 12px; }
//   .ar-breadcrumb { font-size: 11px; color: var(--muted); letter-spacing: 1.4px; text-transform: uppercase; margin-bottom: 6px; }
//   .ar-title {
//     font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 800; letter-spacing: -0.4px;
//     background: linear-gradient(135deg, #fff 30%, var(--accent2));
//     -webkit-background-clip: text; -webkit-text-fill-color: transparent;
//   }
//   .ar-date-badge {
//     font-size: 11px; color: var(--muted);
//     background: var(--s2); border: 1px solid var(--border);
//     padding: 6px 14px; border-radius: 99px; letter-spacing: 1px; white-space: nowrap;
//   }

//   /* Card */
//   .ar-card {
//     background: var(--s1); border: 1px solid var(--border);
//     border-radius: var(--r); padding: 24px; margin-bottom: 18px;
//     position: relative; overflow: hidden;
//   }
//   .ar-card::before {
//     content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
//     background: linear-gradient(90deg, var(--accent), var(--accent2), transparent);
//     opacity: 0.55;
//   }
//   .ar-ct { font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 3px; }
//   .ar-cs { font-size: 11px; color: var(--muted); margin-bottom: 20px; }

//   /* Form */
//   .ar-form-row { display: flex; flex-wrap: wrap; gap: 18px; align-items: flex-end; }
//   .ar-field { display: flex; flex-direction: column; gap: 7px; flex: 1; min-width: 180px; }
//   .ar-label { font-size: 10px; font-weight: 600; color: var(--muted); letter-spacing: 1.5px; text-transform: uppercase; }
//   .ar-select, .ar-input {
//     background: var(--s2); border: 1px solid var(--border2); color: var(--text);
//     border-radius: 10px; padding: 10px 13px;
//     font-family: 'DM Mono', monospace; font-size: 13px;
//     outline: none; transition: border-color 0.2s, box-shadow 0.2s;
//     appearance: none; width: 100%;
//   }
//   .ar-select:focus, .ar-input:focus {
//     border-color: var(--accent); box-shadow: 0 0 0 3px rgba(108,99,255,0.14);
//   }
//   .ar-select option { background: #1a1d27; }

//   /* Buttons */
//   .ar-btn {
//     font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 600;
//     border: none; cursor: pointer; border-radius: 10px;
//     padding: 10px 20px; transition: all 0.2s;
//     display: inline-flex; align-items: center; gap: 7px; white-space: nowrap;
//   }
//   .ar-btn-primary {
//     background: linear-gradient(135deg, var(--accent), var(--accent2));
//     color: #fff; box-shadow: 0 4px 16px rgba(108,99,255,0.32);
//   }
//   .ar-btn-primary:hover { box-shadow: 0 6px 22px rgba(108,99,255,0.48); transform: translateY(-1px); }
//   .ar-btn-excel  { background: rgba(34,211,168,0.12); color: var(--green); border: 1px solid rgba(34,211,168,0.25); }
//   .ar-btn-excel:hover { background: rgba(34,211,168,0.2); }
//   .ar-btn-pdf    { background: rgba(248,113,113,0.1);  color: var(--red);   border: 1px solid rgba(248,113,113,0.25); }
//   .ar-btn-pdf:hover { background: rgba(248,113,113,0.2); }

//   /* Summary stats */
//   .ar-stats { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 20px; }
//   .ar-stat {
//     background: var(--s2); border: 1px solid var(--border);
//     border-radius: 11px; padding: 14px 18px;
//     flex: 1; min-width: 100px;
//   }
//   .ar-sv { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; }
//   .ar-sl { font-size: 10px; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; margin-top: 3px; }
//   .c-acc { color: var(--accent2); }
//   .c-grn { color: var(--green); }
//   .c-red { color: var(--red); }
//   .c-gld { color: var(--gold); }
//   .c-blu { color: var(--blue); }

//   /* ── Attendance Matrix ── */
//   .ar-matrix-wrap { overflow-x: auto; border-radius: 12px; border: 1px solid var(--border); }
//   .ar-matrix {
//     width: 100%; border-collapse: collapse; min-width: 700px;
//   }

//   /* Header rows */
//   .ar-matrix thead tr:first-child { background: var(--s3); }
//   .ar-matrix thead tr:last-child  { background: var(--s2); border-bottom: 1px solid var(--border2); }

//   .ar-matrix th {
//     padding: 10px 12px; text-align: center;
//     font-size: 10px; font-weight: 600; letter-spacing: 1.2px; text-transform: uppercase; color: var(--muted);
//     white-space: nowrap;
//   }
//   .ar-matrix th.sticky-col {
//     text-align: left; position: sticky; left: 0; z-index: 2;
//     background: inherit; min-width: 160px;
//   }
//   .ar-matrix th.sticky-col2 {
//     text-align: left; position: sticky; left: 160px; z-index: 2;
//     background: inherit; min-width: 110px;
//   }

//   /* Body */
//   .ar-matrix tbody tr { border-bottom: 1px solid var(--border); transition: background 0.15s; }
//   .ar-matrix tbody tr:last-child { border-bottom: none; }
//   .ar-matrix tbody tr:hover { background: rgba(255,255,255,0.025); }

//   .ar-matrix td {
//     padding: 11px 12px; font-size: 12px; text-align: center;
//   }
//   .ar-matrix td.sticky-col {
//     text-align: left; position: sticky; left: 0; z-index: 1;
//     background: var(--s1); font-weight: 500;
//     border-right: 1px solid var(--border);
//   }
//   .ar-matrix td.sticky-col2 {
//     text-align: left; position: sticky; left: 160px; z-index: 1;
//     background: var(--s1); color: var(--muted); font-size: 11px;
//     border-right: 1px solid var(--border);
//   }
//   .ar-matrix tbody tr:hover td.sticky-col,
//   .ar-matrix tbody tr:hover td.sticky-col2 { background: #1a1d27; }

//   /* Dot cells */
//   .dot-wrap { display: flex; align-items: center; justify-content: center; }
//   .dot {
//     width: 22px; height: 22px; border-radius: 6px;
//     display: flex; align-items: center; justify-content: center;
//     font-size: 11px; font-weight: 700;
//   }
//   .dot.P { background: rgba(34,211,168,0.18); color: var(--green); }
//   .dot.A { background: rgba(248,113,113,0.12); color: var(--red); }

//   /* Percentage badge */
//   .pct-badge {
//     display: inline-block; padding: 3px 10px; border-radius: 99px;
//     font-size: 12px; font-weight: 700;
//   }
//   .pct-high  { background: rgba(34,211,168,0.15); color: var(--green); }
//   .pct-mid   { background: rgba(251,191,36,0.15);  color: var(--gold); }
//   .pct-low   { background: rgba(248,113,113,0.14); color: var(--red); }

//   /* Student mini-view row (hover tooltip) */
//   .ar-legend { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 14px; }
//   .ar-leg-item { display: flex; align-items: center; gap: 6px; font-size: 11px; color: var(--muted); }

//   /* Error / msg */
//   .ar-err { padding: 10px 16px; border-radius: 10px; font-size: 12px;
//     background: rgba(248,113,113,0.1); border: 1px solid rgba(248,113,113,0.25);
//     color: var(--red); margin-bottom: 14px; }

//   /* Shimmer */
//   @keyframes shimmer {
//     0%   { background-position: -600px 0; }
//     100% { background-position: 600px 0; }
//   }
//   .ar-shimmer {
//     background: linear-gradient(90deg, var(--s1) 25%, var(--s2) 50%, var(--s1) 75%);
//     background-size: 1200px 100%; animation: shimmer 1.5s infinite;
//     border-radius: 8px;
//   }

//   /* Export row */
//   .ar-export-row { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--border); }

//   @media (max-width: 640px) {
//     .ar-main { padding: 18px 14px; }
//     .ar-sidebar { display: none; }
//   }
// `;

// // ── Icon helper ───────────────────────────────────────────────────────────────
// const Ic = ({ d, size = 16 }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
//     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d={d} />
//   </svg>
// );
// const I = {
//   home:     'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10',
//   users:    'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
//   chart:    'M3 3v18h18 M7 16l4-4 4 4 4-4',
//   calendar: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
//   fetch:    'M4 4h16v16H4z M8 2v4M16 2v4M4 10h16',
//   excel:    'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M8 13h8M8 17h8M10 9H8',
//   pdf:      'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6',
//   refresh:  'M23 4v6h-6 M1 20v-6h6 M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15',
// };

// // ── Component ─────────────────────────────────────────────────────────────────
// export const AttendanceRecord = () => {
//   const { currentUser } = useSelector((s) => s.user);

//   const [attendanceData,    setAttendanceData]    = useState([]);
//   const [assignedSubjects,  setAssignedSubjects]  = useState([]);
//   const [classes,           setClasses]           = useState([]);
//   const [loading,           setLoading]           = useState(false);
//   const [fetchLoading,      setFetchLoading]      = useState(false);
//   const [error,             setError]             = useState(null);
//   const [selectedClass,     setSelectedClass]     = useState('');
//   const [filteredSubjects,  setFilteredSubjects]  = useState([]);
//   const [selectedSubject,   setSelectedSubject]   = useState('');
//   const [activeStudent,     setActiveStudent]     = useState(null); // hover highlight

//   useEffect(() => {
//     const load = async () => {
//       setLoading(true);
//       try {
//         // const res  = await fetch(`/api/teacher/get-teacher/${currentUser._id}`);
//         // const data = await res.json();
//         const data = mockTeacher;
//         setAssignedSubjects(data.assignedSubjects || []);
//         const uniq = [];
//         (data.assignedSubjects || []).forEach((s) =>
//           Array.isArray(s.classId) && s.classId.forEach((c) => {
//             if (!uniq.some((x) => x._id === c._id)) uniq.push(c);
//           })
//         );
//         setClasses(uniq);
//       } catch { setError('Failed to load teacher data'); }
//       finally   { setLoading(false); }
//     };
//     load();
//   }, [currentUser?._id]);

//   const handleClassChange = (e) => {
//     const id = e.target.value;
//     setSelectedClass(id);
//     setFilteredSubjects(assignedSubjects.filter(
//       (s) => Array.isArray(s.classId) && s.classId.some((c) => c._id === id)
//     ));
//     setSelectedSubject('');
//     setAttendanceData([]);
//   };

//   const handleSubjectChange = (e) => {
//     setSelectedSubject(e.target.value);
//     setAttendanceData([]);
//   };

//   const fetchAttendance = async () => {
//     if (!selectedClass || !selectedSubject) return alert('Please select class & subject');
//     try {
//       setFetchLoading(true); setError(null); setAttendanceData([]);
//       // const res  = await fetch(`/api/attendance/get-attendance?classId=...`);
//       // const data = await res.json();
//       await new Promise((r) => setTimeout(r, 600));
//       const data = generateMockAttendance();
//       setAttendanceData(data);
//     } catch (err) {
//       setError(err.message);
//       setTimeout(() => setError(null), 4000);
//     } finally { setFetchLoading(false); }
//   };

//   // ── Export helpers (real XLSX / jsPDF logic unchanged) ─────────────────────
//   const exportToExcel = () => {
//     if (!attendanceData?.attendanceDoc) return alert('No data to export!');
//     // XLSX.writeFile(…) — keep original logic
//     alert('Excel export triggered (plug in XLSX library)');
//   };
//   const exportToPDF = () => {
//     if (!attendanceData?.attendanceDoc) return alert('No data to export!');
//     // jsPDF + autoTable — keep original logic
//     alert('PDF export triggered (plug in jsPDF library)');
//   };

//   // ── Derived data ───────────────────────────────────────────────────────────
//   const byDate   = attendanceData?.attendanceDoc?.attendanceByDate || [];
//   const dates    = byDate.map((d) => d.date);
//   const students = byDate[0]?.records || [];

//   const studentStats = students.map((stu) => {
//     const present = byDate.reduce((n, dr) => {
//       const r = dr.records.find((r) => r.studentId === stu.studentId);
//       return n + (r?.status === 'Present' ? 1 : 0);
//     }, 0);
//     const pct = dates.length ? (present / dates.length) * 100 : 0;
//     return { ...stu, present, absent: dates.length - present, pct };
//   });

//   const classPresent = studentStats.reduce((n, s) => n + s.present, 0);
//   const classTotal   = students.length * dates.length;
//   const classPct     = classTotal ? ((classPresent / classTotal) * 100).toFixed(1) : '—';

//   const todayStr = new Date().toLocaleDateString('en-IN', {
//     weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
//   });

//   const fmtDate = (iso) => {
//     const d = new Date(iso);
//     return { day: d.getDate(), mon: d.toLocaleString('en', { month: 'short' }), wd: d.toLocaleString('en', { weekday: 'short' }) };
//   };

//   const pctClass = (p) => p >= 75 ? 'pct-high' : p >= 50 ? 'pct-mid' : 'pct-low';

//   return (
//     <>
//       <style>{STYLES}</style>
//       <div className="ar-root">
//         <div className="ar-layout">

//           {/* Sidebar */}
//           <aside className="ar-sidebar">
//             <div className="ar-logo">A</div>
//             <div className="ar-nav"><Ic d={I.home}     size={19} /></div>
//             <div className="ar-nav on"><Ic d={I.chart}  size={19} /></div>
//             <div className="ar-nav"><Ic d={I.users}    size={19} /></div>
//             <div className="ar-nav"><Ic d={I.calendar} size={19} /></div>
//           </aside>

//           {/* Main */}
//           <main className="ar-main">

//             {/* Page Header */}
//             <div className="ar-ph">
//               <div>
//                 <p className="ar-breadcrumb">Dashboard / Attendance Records</p>
//                 <h1 className="ar-title">Attendance Records</h1>
//               </div>
//               <span className="ar-date-badge">{todayStr}</span>
//             </div>

//             {error && <div className="ar-err">{error}</div>}

//             {/* ── Filter Card ── */}
//             <div className="ar-card">
//               <div className="ar-ct">Filter & Fetch</div>
//               <div className="ar-cs">Select class and subject to load attendance data</div>

//               <div className="ar-form-row">
//                 <div className="ar-field">
//                   <label className="ar-label">Class</label>
//                   <select className="ar-select" value={selectedClass} onChange={handleClassChange}>
//                     <option value="" disabled>— Choose Class —</option>
//                     {classes.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
//                   </select>
//                 </div>

//                 {filteredSubjects.length > 0 && (
//                   <div className="ar-field">
//                     <label className="ar-label">Subject</label>
//                     <select className="ar-select" value={selectedSubject} onChange={handleSubjectChange}>
//                       <option value="" disabled>— Choose Subject —</option>
//                       {filteredSubjects.map((s) => <option key={s._id} value={s._id}>{s.name}</option>)}
//                     </select>
//                   </div>
//                 )}

//                 <div className="ar-field" style={{ maxWidth: 180 }}>
//                   <label className="ar-label">&nbsp;</label>
//                   <button className="ar-btn ar-btn-primary" onClick={fetchAttendance} disabled={fetchLoading}>
//                     <Ic d={fetchLoading ? I.refresh : I.fetch} size={14} />
//                     {fetchLoading ? 'Loading…' : 'Fetch Records'}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* ── Skeleton while fetching ── */}
//             {fetchLoading && (
//               <div className="ar-card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
//                 {[...Array(5)].map((_, i) => (
//                   <div key={i} className="ar-shimmer" style={{ height: 40, opacity: 1 - i * 0.15 }} />
//                 ))}
//               </div>
//             )}

//             {/* ── Data card ── */}
//             {!fetchLoading && students.length > 0 && (
//               <div className="ar-card">

//                 {/* Summary stats */}
//                 <div className="ar-stats">
//                   <div className="ar-stat">
//                     <div className="ar-sv c-acc">{students.length}</div>
//                     <div className="ar-sl">Students</div>
//                   </div>
//                   <div className="ar-stat">
//                     <div className="ar-sv c-blu">{dates.length}</div>
//                     <div className="ar-sl">Sessions</div>
//                   </div>
//                   <div className="ar-stat">
//                     <div className="ar-sv c-grn">{classPresent}</div>
//                     <div className="ar-sl">Total Present</div>
//                   </div>
//                   <div className="ar-stat">
//                     <div className="ar-sv c-red">{classTotal - classPresent}</div>
//                     <div className="ar-sl">Total Absent</div>
//                   </div>
//                   <div className="ar-stat">
//                     <div className="ar-sv c-gld">{classPct}%</div>
//                     <div className="ar-sl">Class Avg</div>
//                   </div>
//                 </div>

//                 {/* Legend */}
//                 <div className="ar-legend">
//                   <div className="ar-leg-item">
//                     <div className="dot P" style={{ width: 18, height: 18, fontSize: 10 }}>P</div>
//                     <span>Present</span>
//                   </div>
//                   <div className="ar-leg-item">
//                     <div className="dot A" style={{ width: 18, height: 18, fontSize: 10 }}>A</div>
//                     <span>Absent</span>
//                   </div>
//                   <div className="ar-leg-item">
//                     <span className="pct-badge pct-high" style={{ fontSize: 10, padding: '2px 8px' }}>≥75%</span>
//                     <span>Good</span>
//                   </div>
//                   <div className="ar-leg-item">
//                     <span className="pct-badge pct-mid" style={{ fontSize: 10, padding: '2px 8px' }}>50–74%</span>
//                     <span>Moderate</span>
//                   </div>
//                   <div className="ar-leg-item">
//                     <span className="pct-badge pct-low" style={{ fontSize: 10, padding: '2px 8px' }}>&lt;50%</span>
//                     <span>At Risk</span>
//                   </div>
//                 </div>

//                 {/* Matrix table */}
//                 <div className="ar-matrix-wrap">
//                   <table className="ar-matrix">
//                     <thead>
//                       {/* Date header row */}
//                       <tr>
//                         <th className="sticky-col" style={{ background: 'var(--s3)' }}>Student</th>
//                         <th className="sticky-col2" style={{ background: 'var(--s3)', left: 160 }}>Enrollment</th>
//                         {dates.map((d) => {
//                           const { day, mon, wd } = fmtDate(d);
//                           return (
//                             <th key={d} style={{ minWidth: 52 }}>
//                               <div style={{ lineHeight: 1.4 }}>
//                                 <div style={{ color: 'var(--text)', fontSize: 13, fontWeight: 700 }}>{day}</div>
//                                 <div style={{ fontSize: 9 }}>{mon}</div>
//                                 <div style={{ fontSize: 9, color: 'var(--accent2)' }}>{wd}</div>
//                               </div>
//                             </th>
//                           );
//                         })}
//                         <th style={{ minWidth: 80 }}>Present</th>
//                         <th style={{ minWidth: 80 }}>Absent</th>
//                         <th style={{ minWidth: 90 }}>Pct %</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {studentStats.map((stu) => (
//                         <tr
//                           key={stu.studentId}
//                           onMouseEnter={() => setActiveStudent(stu.studentId)}
//                           onMouseLeave={() => setActiveStudent(null)}
//                           style={activeStudent === stu.studentId
//                             ? { background: 'rgba(108,99,255,0.07)' } : {}}
//                         >
//                           <td className="sticky-col"
//                             style={activeStudent === stu.studentId
//                               ? { background: '#171a27' } : {}}>
//                             {stu.name}
//                           </td>
//                           <td className="sticky-col2"
//                             style={{ left: 160,
//                               ...(activeStudent === stu.studentId ? { background: '#171a27' } : {}) }}>
//                             {stu.enrollment}
//                           </td>

//                           {byDate.map((dr) => {
//                             const r = dr.records.find((x) => x.studentId === stu.studentId);
//                             const isP = r?.status === 'Present';
//                             return (
//                               <td key={dr.date}>
//                                 <div className="dot-wrap">
//                                   <div className={`dot ${isP ? 'P' : 'A'}`}>
//                                     {isP ? 'P' : 'A'}
//                                   </div>
//                                 </div>
//                               </td>
//                             );
//                           })}

//                           <td>
//                             <span style={{ color: 'var(--green)', fontWeight: 700 }}>{stu.present}</span>
//                             <span style={{ color: 'var(--muted)', fontSize: 10 }}>/{dates.length}</span>
//                           </td>
//                           <td>
//                             <span style={{ color: 'var(--red)', fontWeight: 700 }}>{stu.absent}</span>
//                           </td>
//                           <td>
//                             <span className={`pct-badge ${pctClass(stu.pct)}`}>
//                               {stu.pct.toFixed(1)}%
//                             </span>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>

//                 {/* Export row */}
//                 <div className="ar-export-row">
//                   <button className="ar-btn ar-btn-excel" onClick={exportToExcel}>
//                     <Ic d={I.excel} size={14} /> Export Excel
//                   </button>
//                   <button className="ar-btn ar-btn-pdf" onClick={exportToPDF}>
//                     <Ic d={I.pdf} size={14} /> Export PDF
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Empty state */}
//             {!fetchLoading && attendanceData.length === 0 && !error && (
//               <div className="ar-card" style={{ textAlign: 'center', padding: '48px 24px' }}>
//                 <div style={{ fontSize: 36, marginBottom: 12 }}>📋</div>
//                 <div style={{ color: 'var(--muted)', fontSize: 13 }}>
//                   Select a class and subject, then click <strong style={{ color: 'var(--accent2)' }}>Fetch Records</strong> to load attendance data.
//                 </div>
//               </div>
//             )}

//           </main>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AttendanceRecord;




