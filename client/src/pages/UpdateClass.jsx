

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const UpdateClass = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [classData, setClassData] = useState({ name: '' });

  const navigate = useNavigate();
  const params = useParams();

  const handleChange = (e) => {
    setClassData({
      ...classData,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const res = await fetch(`/api/class/get-class/${params.classId}`);
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
        } else {
          setClassData(data);
        }
      } catch (err) {
        setError('Failed to load class data');
      }
    };
    fetchClass();
  }, [params.classId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/class/update-class/${params.classId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(classData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
        return;
      }
      navigate('/add-class');
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  const handleDelete = async (classId) => {
    try {
      const res = await fetch(`/api/class/delete-class/${classId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      navigate('/add-class');
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-50">
      <div className="w-full max-w-xl bg-white border border-gray-300 shadow-xl rounded-2xl p-6">
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-semibold text-center mb-2 text-gray-800">
            Update Class
          </h1>
          <p className="text-gray-500 text-center mb-6">
            Modify the class name and save your changes
          </p>

          <input
            type="text"
            id="name"
            placeholder="Enter class name"
            maxLength={30}
            value={classData.name}
            onChange={handleChange}
            required
            className="w-full p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-6"
          />

          {error && (
            <p className="text-center text-red-500 mb-4">{error}</p>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 text-white uppercase font-semibold py-3 px-6 rounded-md w-full sm:w-1/2 transition"
            >
              {loading ? 'Updating...' : 'Update'}
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => handleDelete(classData._id)}
              className="bg-red-500 hover:bg-red-600 text-white uppercase font-semibold py-3 px-6 rounded-md w-full sm:w-1/2 transition"
            >
              {loading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
