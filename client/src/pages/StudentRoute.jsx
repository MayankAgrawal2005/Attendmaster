
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AdminHeader } from '../components/AdminHeader';
import { MdCancel } from "react-icons/md";
import { addActivity } from './activity';
import { showError, showSuccess } from '../styles/toast';
export const StudentRoute = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // 🔥 NEW

  const [studentData, setStudentData] = useState({
    name: '',
    enrollmentNumber: '',
    email: '',
  });

  const [classData, setClassData] = useState({ name: '' });
  const [students, setStudents] = useState([]);

  const navigate = useNavigate();
  const { classId } = useParams();

  const handleChange = (e) => {
    setStudentData({ ...studentData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!studentData.email.endsWith('@gmail.com')) {
    setError('Email must be a @gmail.com address');
    showError('Email must be a @gmail.com address');
    return; // ⛔ stop execution
  }
    try {
      setLoading(true);
      const res = await fetch('/api/student/addandassignStudentToclass', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...studentData, classId }),
      });

      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        showError(data.message);
        setIsModalOpen(false);
        setLoading(false);
        return;
      }

   addActivity(`Student ${studentData.name} added to class`);
      showSuccess(`Student ${studentData.name} added to class successfully`);
      setIsModalOpen(false);
      setRefresh((prev) => !prev);
    
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setIsModalOpen(false);
      setTimeout(() => setError(""), 1000);
      setLoading(false);
    }
  };

  const fetchClass = async () => {
    const res = await fetch(`/api/class/get-class/${classId}`);
    const data = await res.json();
    setClassData(data);
  };

  const fetchStudents = async () => {
    try {
      const res = await fetch(`/api/student/get-studentbyClass/${classId}`);
      const data = await res.json();
      setStudents(data);
    } catch {
      showError("Failed to load students");
      setError("Failed to load students");
    }
  };

  useEffect(() => {
    fetchClass();
    fetchStudents();
  }, [refresh]);

  return (
    <div className="flex min-h-screen bg-[#070b14] text-white">

      {/* SIDEBAR */}
      <div className="">
        <AdminHeader />
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6 md:p-10">

        {/* HEADER */}
        <div className="flex justify-between items-center mt-10 lg:mt-0 mb-8">
          <h1 className="text-3xl hero-title shimmer-text font-bold">{classData.name} Students</h1>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 
            hover:scale-105 transition"
          >
            + Add Student
          </button>
        </div>

        {/* 🔍 SEARCH BAR */}
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Search student..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md p-3 rounded-xl bg-white/5 border border-white/10 
            outline-none focus:ring-2 focus:ring-violet-500 placeholder-gray-400"
          />
        </div>

        {/* {error && <p className="text-red-400 mb-6">{error}</p>} */}

        {/* MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl w-[90%] max-w-md">

              <button onClick={() => setIsModalOpen(false)} className="float-right">
                <MdCancel />
              </button>

              <h2 className="text-lg mb-4">Add Student</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input id="name" placeholder="Name" onChange={handleChange}
                  className="w-full p-3 rounded bg-white/5 border border-white/10" />

                <input id="enrollmentNumber" placeholder="Enrollment"
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-white/5 border border-white/10" />

                <input id="email" placeholder="Email"
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-white/5 border border-white/10" />

                <button className="w-full py-3 bg-gradient-to-r from-violet-600 to-pink-500 rounded">
                  {loading ? "Saving..." : "Add"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* STUDENT TILES */}
        {students.length === 0 ? (
          <p className="text-gray-400">No students added yet.</p>
        ) : (

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {students
              .filter((student) =>
                student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.enrollmentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.email.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((student) => (

                <div
                  key={student._id}
                  className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 
                  hover:scale-105 transition space-y-4"
                >

                  {/* TOP */}
                  <div>
                    <h2 className="text-lg font-semibold">{student.name}</h2>
                    <p className="text-sm text-gray-400">{student.email}</p>
                  </div>

                  {/* MIDDLE */}
                  <div className="grid grid-cols-2 gap-3 text-sm">

                    <div className="bg-white/5 p-2 rounded border border-white/10">
                      <p className="text-gray-400 text-xs">Enroll</p>
                      <p>{student.enrollmentNumber}</p>
                    </div>

                    <div className="bg-white/5 p-2 rounded border border-white/10">
                      <p className="text-gray-400 text-xs">Code</p>
                      <p>{student.code}</p>
                    </div>

                  </div>

                  {/* ACTION */}
                  <Link to={`/update-student/${student._id}`}>
                    <button className="w-full py-2 rounded bg-gradient-to-r from-violet-600 to-pink-500">
                      Update
                    </button>
                  </Link>

                </div>

              ))}

          </div>
        )}

      </div>
    </div>
  );
};