
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AdminHeader } from '../components/AdminHeader';
import { MdCancel } from "react-icons/md";

export const StudentRoute = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        setLoading(false);
        return;
      }

      setIsModalOpen(false);
      setRefresh((prev) => !prev);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(""), 3000);
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
      setError("Failed to load students");
    }
  };

  useEffect(() => {
    fetchClass();
    fetchStudents();
  }, [refresh]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-full lg:w-64 bg-slate-200 shadow-lg">
        <AdminHeader />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <div className="flex flex-col mt-10 sm:flex-row justify-between  sm:items-center  gap-4 mb-6">
          <h1 className="text-2xl text-center">Student Management</h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-[200px]"
            >
              + Add Student
            </button>

            <label className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full sm:w-[200px] text-center cursor-pointer">
              Upload Students
              <input
                type="file"
                accept=".xlsx, .xls, .csv"
                className="hidden"
                onChange={() => {}}
              />
            </label>
          </div>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-auto p-6 relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-3"
              >
                <MdCancel className="w-6 h-6 text-gray-600" />
              </button>

              <h2 className="text-xl font-semibold mb-2">Add New Student</h2>
              <p className="text-sm text-gray-500 mb-4">
                Enter the details below
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  id="name"
                  placeholder="Name"
                  maxLength={30}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded"
                />
                <input
                  type="text"
                  id="enrollmentNumber"
                  placeholder="Enrollment Number"
                  maxLength={12}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded"
                />
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  maxLength={30}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded"
                />
                <button
                  disabled={loading}
                  className="bg-blue-500 w-full text-white p-3 rounded hover:bg-blue-600"
                >
                  {loading ? "Saving..." : "Add Student"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Student Table */}
        <div className="mt-8 bg-white rounded-xl border border-gray-200 shadow-md overflow-auto">
          <h2 className="text-xl font-semibold p-4">{classData.name} - Student List</h2>
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 text-gray-600 border-b">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Enrollment</th>
                <th className="p-3">Email</th>
                <th className="p-3">Actions</th>
                <th className="p-3">Code</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">
                    No students added yet.
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student._id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{student.name}</td>
                    <td className="p-3">{student.enrollmentNumber}</td>
                    <td className="p-3">{student.email}</td>
                    <td className="p-3">
                      <Link to={`/update-student/${student._id}`}>
                        <button className="bg-gray-200 hover:bg-gray-700 text-black hover:text-white px-3 py-1 rounded">
                          Update
                        </button>
                      </Link>
                    </td>
                    <td className="p-3">{student.code}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
