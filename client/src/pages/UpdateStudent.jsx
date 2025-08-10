

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
        return;
      }

      navigate(`/add-student/${classId}`);
    } catch (error) {
      setLoading(false);
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
        return;
      }

      navigate(`/add-student/${classId}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-900">Update Student</h1>
        <p className="text-center text-gray-500 mt-2">Modify student details and save your changes</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            maxLength={30}
            placeholder="Name"
            id="name"
            onChange={handleChange}
            value={studentData.name || ''}
            required
            className="w-full p-3 border rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            maxLength={50}
            placeholder="Email"
            id="email"
            onChange={handleChange}
            value={studentData.email || ''}
            required
            className="w-full p-3 border rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            maxLength={12}
            placeholder="Enrollment Number"
            id="enrollmentNumber"
            onChange={handleChange}
            value={studentData.enrollmentNumber || ''}
            required
            className="w-full p-3 border rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {error && <p className="text-red-500 text-center text-sm">{error}</p>}

          <div className="flex justify-between gap-4 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-1/2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-md transition"
            >
              {loading ? 'Updating...' : 'Update'}
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => handleDelete(studentData._id)}
              className="w-1/2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-md transition"
            >
              {loading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

