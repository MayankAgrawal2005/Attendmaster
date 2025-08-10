
import React, { useState, useEffect } from 'react';
import { AdminHeader } from '../components/AdminHeader';
import { MdCancel } from "react-icons/md";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const TeacherRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [teachers, setTeachers] = useState([]);

  const adminId = currentUser._id;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/teacher/add-teacher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, adminId }),
      });

      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }

      setLoading(false);
      setError(null);
      setIsModalOpen(false);
      setRefresh((prev) => !prev);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const fetchTeachers = async () => {
    try {
      const res = await fetch(`/api/teacher/get-teachers/${adminId}`);
      const data = await res.json();
      setTeachers(data);
    } catch (error) {
      setError("Failed to load teachers");
      setTimeout(() => setError(""), 3000);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, [refresh]);

  return (
    <div className="  w-full lg:space-x-8 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="w-full lg:w-64 bg-slate-200 shadow-xl">
        <AdminHeader />
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-screen border border-gray-200 shadow-2xl bg-white p-4 sm:p-6 text-black">
        {/* Header */}
        <div className="flex flex-col mt-10 sm:flex-row justify-between items-center mb-4">
          <h1 className="text-2xl  mb-2 sm:mb-0">Teacher Management</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition"
          >
                 + Add Teacher
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl w-[90%] max-w-md p-6 relative">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-3 right-3">
                <MdCancel className="w-6 h-6 text-gray-600 hover:text-red-500" />
              </button>
              <h2 className="text-2xl font-bold mb-1">Add New Teacher</h2>
              <p className="text-sm text-gray-500 mb-6">Enter the details of the new teacher below</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  id="name"
                  placeholder="Name"
                  onChange={handleChange}
                  className="w-full border border-black text-black text-lg p-2 rounded-md"
                />
                <input
                  type="text"
                  id="email"
                  placeholder="Email"
                  onChange={handleChange}
                  className="w-full border border-black text-black text-lg p-2 rounded-md"
                />
                <button
                  disabled={loading}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                >
                  {loading ? 'Saving...' : 'Add Teacher'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Teachers Directory */}
        <div className="mt-6 border border-gray-300 rounded-xl p-4">
          <h2 className="text-2xl text-black ">Teachers Directory</h2>
          <p className="text-gray-500 mb-4">Manage and view all teachers in the system</p>
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {teachers.length === 0 ? (
            <p>No teachers added yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto text-left border border-gray-300">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Actions</th>
                    <th className="p-3">Code</th>
                    <th className="p-3">Password</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((teacher, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-3">{teacher.name}</td>
                      <td className="p-3">{teacher.email}</td>
                      <td className="p-3 space-x-2">
                        <Link to={`/update-teacher/${teacher._id}`}>
                          <button className="bg-gray-200 hover:bg-gray-700 text-black hover:text-white px-3 py-1 rounded">
                            Update
                          </button>
                        </Link>
                      </td>
                      <td className="p-3">{teacher.code}</td>
                      <td className="p-3">{teacher.password}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
