

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { showError, showSuccess } from '../styles/toast';

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
        showError("Failed to load class data");
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
          showError(data.message);
        setError(data.message);
        return;
      }
      showSuccess(`Class ${classData.name} updated successfully`);
      navigate('/add-class');
    } catch (err) {
      setLoading(false);
      showError("Failed to update class");
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
        showError(data.message);
        console.log(data.message);
        return;
      }
      showSuccess(`Class ${classData.name} deleted successfully`);
      navigate('/add-class');
    } catch (err) {
      console.log(err.message);
      showError("Failed to delete class");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-[#070b14] text-white relative overflow-hidden">

      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-violet-600/20 blur-[120px]"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-pink-600/20 blur-[120px]"></div>

      {/* CARD */}
      <div className="relative w-full max-w-xl p-8 rounded-3xl 
      bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">

        <form onSubmit={handleSubmit}>

          {/* TITLE */}
          <h1 className="text-3xl font-bold text-center mb-2">
            Update Class
          </h1>

          <p className="text-gray-400 text-center mb-8">
            Modify class name and manage it easily
          </p>

          {/* INPUT */}
          <div className="relative mb-6">
            <input
              type="text"
              id="name"
              placeholder=" "
              maxLength={30}
              value={classData.name}
              onChange={handleChange}
              required
              className="peer w-full p-4 bg-white/5 border border-white/10 rounded-xl 
              outline-none focus:ring-2 focus:ring-violet-500 text-white"
            />

            {/* FLOATING LABEL */}
            <label
              className="absolute left-4 top-2 text-gray-400 text-sm transition-all
              peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
              peer-focus:top-2 peer-focus:text-sm"
            >
              
            </label>
          </div>

          {/* ERROR */}
          {/* {error && (
            <p className="text-center text-red-400 mb-4 animate-pulse">
              {error}
            </p>
          )} */}

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4">

            {/* UPDATE */}
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r 
              from-green-500 to-emerald-500 hover:scale-105 transition shadow-lg"
            >
              {loading ? 'Updating...' : 'Update'}
            </button>

            {/* DELETE */}
            <button
              type="button"
              disabled={loading}
              onClick={() => handleDelete(classData._id)}
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