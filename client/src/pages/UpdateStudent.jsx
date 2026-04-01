

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { showError, showSuccess } from '../styles/toast'; 
export const UpdateStudent = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState({
    name: '',
    enrollmentNumber: '',
    email: '',
  });

  const navigate = useNavigate();
  const params = useParams();

  const handleChange = (e) => {
    setStudentData({
      ...studentData,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchStudent = async () => {
      const res = await fetch(`/api/student/get-Student/${params.studentId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
      }
      setStudentData(data);
    };
    fetchStudent();
  }, []);

  const classId = studentData.class;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);

      const res = await fetch(`/api/student/update-student/${params.studentId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success === false) {
        setError(data.message);
        showError(data.message);
        return;
      }
      showSuccess(`Student ${studentData.name} updated successfully`);
      navigate(`/add-student/${classId}`);
    } catch (error) {
      setLoading(false);
        showError("Failed to update student");
      setError(error.message);
    }
  };

  const handleDelete = async (studentId) => {
    try {
      const res = await fetch(`/api/student/delete-student/${studentId}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
          showError(data.message);
        return;
      }
      showSuccess(`Student ${studentData.name} deleted successfully`);
      navigate(`/add-student/${classId}`);
    } catch (error) {
      showError("Failed to delete student");
      console.log(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#070b14] px-4 relative overflow-hidden text-white">

      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-violet-600/20 blur-[120px]"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-pink-600/20 blur-[120px]"></div>

      {/* CARD */}
      <div className="relative w-full max-w-md p-8 rounded-3xl 
      bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-center mb-2">
          Update Student
        </h1>
        <p className="text-center text-gray-400 mb-6">
          Modify student details easily
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* NAME */}
          <div className="relative">
            <input
              type="text"
              maxLength={30}
              id="name"
              value={studentData.name || ''}
              onChange={handleChange}
              placeholder=" "
              required
              className="peer w-full p-4 bg-white/5 border border-white/10 rounded-xl 
              outline-none focus:ring-2 focus:ring-violet-500"
            />
            <label className="absolute left-4 top-2 text-gray-400 text-sm transition-all
              peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
              peer-focus:top-2 peer-focus:text-sm">
              
            </label>
          </div>

          {/* EMAIL */}
          <div className="relative">
            <input
              type="text"
              maxLength={50}
              id="email"
              value={studentData.email || ''}
              onChange={handleChange}
              placeholder=" "
              required
              className="peer w-full p-4 bg-white/5 border border-white/10 rounded-xl 
              outline-none focus:ring-2 focus:ring-violet-500"
            />
            <label className="absolute left-4 top-2 text-gray-400 text-sm transition-all
              peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
              peer-focus:top-2 peer-focus:text-sm">
              
            </label>
          </div>

          {/* ENROLLMENT */}
          <div className="relative">
            <input
              type="text"
              maxLength={12}
              id="enrollmentNumber"
              value={studentData.enrollmentNumber || ''}
              onChange={handleChange}
              placeholder=" "
              required
              className="peer w-full p-4 bg-white/5 border border-white/10 rounded-xl 
              outline-none focus:ring-2 focus:ring-violet-500"
            />
            <label className="absolute left-4 top-2 text-gray-400 text-sm transition-all
              peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
              peer-focus:top-2 peer-focus:text-sm">
              
            </label>
          </div>

          {/* ERROR */}
          {/* {error && (
            <p className="text-red-400 text-center text-sm animate-pulse">
              {error}
            </p>
          )} */}

          {/* BUTTONS */}
          <div className="flex gap-4">

            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r 
              from-green-500 to-emerald-500 hover:scale-105 transition shadow-lg"
            >
              {loading ? 'Updating...' : 'Update'}
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => handleDelete(studentData._id)}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r 
              from-red-500 to-pink-500 hover:scale-105 transition shadow-lg"
            >
              {loading ? 'Deleting...' : 'Delete'}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};