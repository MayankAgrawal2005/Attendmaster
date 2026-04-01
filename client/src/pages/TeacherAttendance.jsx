
import React, { useState, useEffect } from 'react';
import { TeacherHeader } from './TeacherHeader';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { showError,showSuccess } from '../styles/toast';

export const TeacherAttendance = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [currentTime, setCurrentTime] = useState(new Date());
  const [teacherData, setTeacherData] = useState(null);
  const [assignedSubjects, setAssignedSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchEnrollment, setSearchEnrollment] = useState('');
  const [searchMessage, setSearchMessage] = useState('');

  // Fetch teacher data
  useEffect(() => {
    const fetchTeacherData = async () => {
      if (!currentUser?._id) return;
      try {
        setLoading(true);
        const res = await fetch(`/api/teacher/get-teacher/${currentUser._id}`);
        const data = await res.json();
        if (data.success === false) return;

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
      } catch {
        setError('Failed to load teacher data');
      } finally {
        setLoading(false);
      }
    };
    fetchTeacherData();
  }, [currentUser?._id]);

  // Class change handler
  const handleClassChange = async (e) => {
    const classId = e.target.value;
    setSelectedClass(classId);

    const filtered = assignedSubjects.filter((subj) =>
      Array.isArray(subj.classId) && subj.classId.some((c) => c._id === classId)
    );
    setFilteredSubjects(filtered);
    setSelectedSubject('');

    try {
      setLoading(true);
      const res = await fetch(`/api/class/getClassById/${classId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to load students');

      setStudents(data.students || []);
      // setAttendanceRecords(
      //   (data.students || []).map((stu) => ({
      //     studentId: stu._id,
      //     status: 'Absent',
      //     name: stu.name,
      //     enrollment: stu.enrollmentNumber,
      //   }))
      // );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handleToggleStatus = (studentId) => {
    setAttendanceRecords((prev) =>
      prev.map((rec) =>
        rec.studentId === studentId
          ? { ...rec, status: rec.status === 'Present' ? 'Absent' : 'Present' }
          : rec
      )
    );
  };

  const handleSelectAll = () => {
    const allPresent = attendanceRecords.every((rec) => rec.status === 'Present');
    setAttendanceRecords((prev) =>
      prev.map((rec) => ({
        ...rec,
        status: allPresent ? 'Absent' : 'Present',
      }))
    );
  };

  const handleSubmitAttendance = async () => {
    if (!selectedClass || !selectedSubject || !date) {
      return alert('Please select class, subject, and date!');
    }
    try {
      setLoading(true);
      const payload = {
        classId: selectedClass,
        subjectId: selectedSubject,
        teacherId: currentUser._id,
        date,
        records: attendanceRecords,
      };
      const res = await fetch('/api/attendance/mark-attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const resultData = await res.json();
      if (!res.ok) throw new Error( resultData.message || 'Failed to mark attendance');

      showSuccess('Attendance marked successfully!');
    } catch (err) {
      showError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchEnrollment = () => {
    const enrollmentList = searchEnrollment.split(',').map((en) => en.trim());
    let foundStudents = [];
    let notFoundEnrollments = [];

    enrollmentList.forEach((enrollment) => {
      const formattedEnrollment = enrollment.padStart(3, '0');
      const student = students.find((stu) =>
        stu.enrollmentNumber.endsWith(formattedEnrollment)
      );
      if (student) {
        handleToggleStatus(student._id);
        foundStudents.push(student.name);
      } else {
        notFoundEnrollments.push(formattedEnrollment);
      }
    });

    let message = '';
    if (foundStudents.length > 0) {
      message += `Attendance marked for: ${foundStudents.join(', ')}. `;
    }
    if (notFoundEnrollments.length > 0) {
      message += `Enrollment not found for: ${notFoundEnrollments.join(', ')}.`;
    }

    setSearchMessage(message);
    setTimeout(() => setSearchMessage(''), 5000);
    setSearchEnrollment('');
  };

  const presentStudentsCount = attendanceRecords.filter(
    (rec) => rec.status === 'Present'
  ).length;


useEffect(() => {
  const fetchAttendance = async () => {
    if (!selectedClass || !selectedSubject || !date || students.length === 0) return;

    try {
      const res = await fetch(
        `/api/attendance/get-attendance?classId=${selectedClass}&subjectId=${selectedSubject}&teacherId=${currentUser._id}&date=${date}`
      );

      const data = await res.json();

      if (!res.ok) {
        // fallback if error
        setAttendanceRecords(
          students.map((stu) => ({
            studentId: stu._id,
            status: 'Absent',
            name: stu.name,
            enrollment: stu.enrollmentNumber,
          }))
        );
        return;
      }

      // 🔥 STEP 5 LOGIC HERE
      if (data.dateRecord) {
        setAttendanceRecords(data.dateRecord.records);
      } else {
        setAttendanceRecords(
          students.map((stu) => ({
            studentId: stu._id,
            status: 'Absent',
            name: stu.name,
            enrollment: stu.enrollmentNumber,
          }))
        );
      }

    } catch (err) {
      console.log(err);
    }
  };

  fetchAttendance();
}, [selectedClass, selectedSubject, date, students]);
  



return (
  <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#020617] text-white flex flex-col md:flex-row">

    {/* Sidebar */}
    <TeacherHeader />

    {/* Main */}
    <div className="flex-1 lg:ml-64 p-4 sm:p-6 md:p-8 space-y-6 mt-14 lg:mt-0">

     
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

        <h1 className="hero-title text-3xl sm:text-5xl lg:text-6xl leading-tight">
          Mark <br />
          <span className="shimmer-text">Attendance</span>
        </h1>

        <div className="text-xs sm:text-sm text-gray-400 bg-white/5 px-3 sm:px-4 py-2 rounded-xl border border-white/10">
          {new Date().toDateString()}
        </div>

      </div>

      {/* SESSION SETUP */}
      <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6">
        <h2 className="text-base sm:text-lg font-semibold mb-2 shimmer-text">Session Setup</h2>
        <p className="text-gray-400 text-xs sm:text-sm mb-4">
          Select class, subject and date
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">

          <select
            value={selectedClass}
            onChange={handleClassChange}
            className="p-3 rounded-xl bg-[#111827] border border-white/10 w-full"
          >
            <option value="">Choose Class</option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.name}
              </option>
            ))}
          </select>

          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="p-3 rounded-xl bg-[#111827] border border-white/10 w-full"
          >
            <option value="">Choose Subject</option>
            {filteredSubjects.map((subj) => (
              <option key={subj._id} value={subj._id}>
                {subj.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-3 rounded-xl bg-[#111827] border border-white/10 w-full"
          />

        </div>
      </div>

      {/* STUDENT STATS */}
      {students.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <StatBox title="Total" value={students.length} />
            <StatBox title="Present" value={presentStudentsCount} color="text-green-400" />
            <StatBox title="Absent" value={students.length - presentStudentsCount} color="text-red-400" />
            <StatBox
              title="Attendance"
              value={`${Math.round((presentStudentsCount / students.length) * 100)}%`}
              color="text-yellow-400"
            />
          </div>

          {/* SEARCH */}
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={searchEnrollment}
              onChange={(e) => setSearchEnrollment(e.target.value)}
              placeholder="mark attendance by enrollment (e.g. 1, 26, 111)"
              className="flex-1 p-3 rounded-xl bg-white/5 border border-white/10"
            />
            <button
              onClick={handleSearchEnrollment}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20"
            >
              Mark Attendance
            </button>
          </div>

          {/* ACTION BAR */}
          <div className="flex justify-center sm:justify-end">
            <button
              onClick={handleSelectAll}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-green-600/20 border border-green-500 text-green-400 hover:bg-green-600/30"
            >
              Mark All Present
            </button>
          </div>

          {/* TABLE */}
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-x-auto">

            <table className="min-w-[600px] w-full text-sm">
              <thead className="bg-white/5 text-gray-400">
                <tr>
                  <th className="p-3 sm:p-4 text-left">#</th>
                  <th className="p-3 sm:p-4 text-left">Student</th>
                  <th className="p-3 sm:p-4 text-left">Enrollment</th>
                  <th className="p-3 sm:p-4 text-left">Status</th>
                  <th className="p-3 sm:p-4 text-left">Toggle</th>
                </tr>
              </thead>

              <tbody>
                {students.map((stu, index) => {
                  const record = attendanceRecords.find(
                    (r) => r.studentId === stu._id
                  );
                  const isPresent = record?.status === 'Present';

                  return (
                    <tr key={stu._id} className={`border-t border-white/5 ${isPresent ? 'bg-green-500/5' : ''}`}>
                      <td className="p-3 sm:p-4">{index + 1}</td>
                      <td className="p-3 sm:p-4">{stu.name}</td>
                      <td className="p-3 sm:p-4 text-gray-400">{stu.enrollmentNumber}</td>

                      <td className="p-3 sm:p-4">
                        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs
                          ${isPresent ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                          {isPresent ? 'Present' : 'Absent'}
                        </span>
                      </td>

                      <td className="p-3 sm:p-4">
                        <div
                          onClick={() => handleToggleStatus(stu._id)}
                          className={`w-10 sm:w-12 h-5 sm:h-6 flex items-center rounded-full cursor-pointer
                          ${isPresent ? 'bg-green-500' : 'bg-gray-600'}`}
                        >
                          <div
                            className={`w-4 sm:w-5 h-4 sm:h-5 bg-white rounded-full transform
                            ${isPresent ? 'translate-x-5 sm:translate-x-6' : 'translate-x-1'}`}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

          </div>

          {/* FOOTER */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">

            <p className="text-xs sm:text-sm text-gray-400">
              {presentStudentsCount} present out of {students.length}
            </p>

            <button
              onClick={handleSubmitAttendance}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90"
            >
              Submit Attendance
            </button>

          </div>
        </>
      )}
    </div>
  </div>
);


};


const StatBox = ({ title, value, color = "text-white" }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
    <p className="text-xs text-gray-400">{title}</p>
    <h2 className={`text-2xl font-bold mt-2 ${color}`}>{value}</h2>
  </div>
);