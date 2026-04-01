
import React, { useState, useEffect } from 'react';
import { TeacherHeader } from './TeacherHeader';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { showError,showSuccess } from '../styles/toast';

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
          showError(data.message);
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
        showError('Failed to load teacher data');
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
      showError(err.message);
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


  

  const attendanceDates =
  attendanceData?.attendanceDoc?.attendanceByDate || [];

const maxVisible = 6; // 👈 control visible columns

const totalDays = attendanceDates.length;



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






