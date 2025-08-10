



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

  return (
    <div className="flex flex-col lg:flex-row min-h-screen space-y-4 lg:space-y-0 lg:space-x-8">
      {/* Sidebar */}
      <div className="w-full lg:w-64 bg-white shadow-xl overflow-y-auto border-r border-gray-300">
        <TeacherHeader />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto shadow-2xl bg-white p-4 sm:p-6 text-black">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="mt-4 p-3 w-full border border-gray-300 rounded-2xl">
          <h1 className="text-xl sm:text-2xl font-semibold p-3">View Attendance</h1>

          {/* Filters */}
          <div className="flex flex-col flex-wrap sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0 mt-4">
            {/* Class Select */}
            <div>
              <label className="block mb-1 font-semibold">Select Class:</label>
              <select value={selectedClass} onChange={handleClassChange} className="border border-gray-300 p-2 rounded w-full sm:w-80">
                <option value="" disabled>-- Choose a Class --</option>
                {classes.map((cls) => (
                  <option key={cls._id} value={cls._id}>{cls.name}</option>
                ))}
              </select>
            </div>

            {/* Subject Select */}
            {filteredSubjects.length > 0 && (
              <div>
                <label className="block mb-1 font-semibold">Select Subject:</label>
                <select value={selectedSubject} onChange={handleSubjectChange} className="border border-gray-300 p-2 rounded w-full sm:w-80">
                  <option value="" disabled>-- Choose a Subject --</option>
                  {filteredSubjects.map((subj) => (
                    <option key={subj._id} value={subj._id}>{subj.name}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Fetch Button */}
            <button onClick={fetchAttendance} className="bg-blue-500 text-white p-2 rounded w-full sm:w-40 h-12 mt-6 hover:bg-blue-600">
              Fetch Attendance
            </button>
          </div>

          {/* Attendance Table */}
          <div className="mt-4 p-3 w-full border border-gray-300 rounded-2xl overflow-x-auto">
            {attendanceData.length === 0 ? (
              <p>No attendance in the class</p>
            ) : (
              <>
                <table id="attendance-table" className="w-full border border-gray-300 bg-white shadow-md min-w-max">
                  <thead className="text-gray-600 border border-gray-300">
                    <tr>
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3 text-left">Enrollment</th>
                      {[...new Set(attendanceData?.attendanceDoc?.attendanceByDate?.map(record => record.date))].map(date => (
                        <th key={date} className="p-3 text-left">{new Date(date).toLocaleDateString()}</th>
                      ))}
                      <th className="p-3 text-left">Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceData?.attendanceDoc?.attendanceByDate?.[0]?.records?.map((student) => {
                      const totalDays = attendanceData?.attendanceDoc?.attendanceByDate?.length || 0;
                      const daysPresent = attendanceData?.attendanceDoc?.attendanceByDate?.reduce((count, dateRecord) => {
                        const studentRecord = dateRecord.records.find((rec) => rec.studentId === student.studentId);
                        return count + (studentRecord?.status === "Present" ? 1 : 0);
                      }, 0);
                      const percentage = totalDays > 0 ? ((daysPresent / totalDays) * 100).toFixed(2) : 0;
                      return (
                        <tr key={student.studentId} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                          <td className="p-3">{student.name}</td>
                          <td className="p-3">{student.enrollment}</td>
                          {attendanceData?.attendanceDoc?.attendanceByDate?.map((dateRecord) => {
                            const studentRecord = dateRecord.records.find((rec) => rec.studentId === student.studentId);
                            return (
                              <td key={dateRecord.date} className="p-3">
                                <input type="checkbox" checked={studentRecord?.status === "Present"} readOnly className="w-5 h-5" />
                              </td>
                            );
                          })}
                          <td className="p-3">{percentage}%</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* Export Buttons */}
                <div className="flex flex-col sm:flex-row sm:space-x-4 mt-4 space-y-3 sm:space-y-0">
                  <button onClick={exportToExcel} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Export to Excel
                  </button>
                  <button onClick={exportToPDF} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                    Export to PDF
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
