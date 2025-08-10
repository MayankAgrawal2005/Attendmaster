

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

  return (
    <div className="flex flex-col lg:flex-row min-h-screen overflow-hidden lg:space-x-8">
      {/* Sidebar */}
      <div className="lg:w-64 bg-white shadow-xl flex-shrink-0">
        <StudentHeader />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto border border-gray-200 shadow-2xl bg-white p-4 sm:p-6 text-black">
        <h2 className="text-xl sm:text-2xl font-bold mt-10 mb-4">Student Attendance</h2>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-gray-600">{message}</p>}

        {/* Table Container with Horizontal Scroll on small screens */}
        {!loading && !error && !message && Object.keys(studentAttendance).length > 0 && (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] border-collapse border border-gray-300 mb-4">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2">Subject</th>
                    <th className="border border-gray-300 px-4 py-2">Total Classes</th>
                    <th className="border border-gray-300 px-4 py-2">Present</th>
                    <th className="border border-gray-300 px-4 py-2">Absent</th>
                    <th className="border border-gray-300 px-4 py-2">Attendance %</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(studentAttendance).map(([subject, records]) => {
                    const totalClasses = records.length;
                    const presentCount = records.filter(record => record.status === "Present").length;
                    const absentCount = totalClasses - presentCount;
                    const percentage = calculateAttendancePercentage(records);

                    return (
                      <tr key={subject} className="text-center">
                        <td className="border border-gray-300 px-4 py-2">{subject}</td>
                        <td className="border border-gray-300 px-4 py-2">{totalClasses}</td>
                        <td className="border border-gray-300 px-4 py-2">{presentCount}</td>
                        <td className="border border-gray-300 px-4 py-2">{absentCount}</td>
                        <td className="border border-gray-300 px-4 py-2">{percentage}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Total Attendance Percentage */}
            <div className="mt-6 text-right">
              <p className={`text-lg font-semibold ${totalPercentage >= 75 ? 'text-green-600' : 'text-red-600'}`}>
                Total Attendance: {totalPercentage}%
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
