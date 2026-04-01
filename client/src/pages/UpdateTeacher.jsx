


import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { showError,showSuccess } from '../styles/toast';

export const UpdateTeacher = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const navigate = useNavigate();
  const params = useParams();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const res = await fetch(`/api/teacher/get-teacher/${params.teacherId}`);
        const data = await res.json();

        if (data.success === false) {
          console.log(data.message);
        } else {
          setFormData(data);
        }
      } catch (err) {
        showError("Failed to load teacher");
        console.error("Error fetching teacher:", err);
      }
    };

    fetchTeacher();
  }, [params.teacherId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/teacher/update-teacher/${params.teacherId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        showError(data.message);
        setError(data.message);
        return;
      }
      showSuccess(`Teacher ${formData.name} updated successfully`);
      navigate('/add-teacher');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const handleDelete = async (teacherId) => {
    try {
      const res = await fetch(`/api/teacher/delete-teacher/${teacherId}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (data.success === false) {
        showError(data.message);
        console.log(data.message);
        return;
      }
      showSuccess(`Teacher ${formData.name} deleted successfully`);
      navigate('/add-teacher');
    } catch (error) {
        showError("Failed to delete teacher");
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 py-10 bg-[#070b14] text-white relative overflow-hidden">

      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-violet-600/20 blur-[120px]"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-pink-600/20 blur-[120px]"></div>

      {/* CARD */}
      <div className="relative w-full max-w-xl p-8 rounded-3xl 
      bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">

        <h1 className="text-3xl font-bold text-center mb-6">
          Update Teacher
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* NAME INPUT */}
          <div className="relative">
            <input
              type="text"
              id="name"
              maxLength={30}
              required
              value={formData.name || ''}
              onChange={handleChange}
              placeholder=" "
              className="peer w-full p-4 bg-white/5 border border-white/10 rounded-xl 
              outline-none focus:ring-2 focus:ring-violet-500"
            />
            <label
              className="absolute left-4 top-2 text-gray-400 text-sm transition-all
              peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
              peer-focus:top-2 peer-focus:text-sm"
            >
              
            </label>
          </div>

          {/* EMAIL INPUT */}
          <div className="relative">
            <input
              type="email"
              id="email"
              maxLength={50}
              required
              value={formData.email || ''}
              onChange={handleChange}
              placeholder=" "
              className="peer w-full p-4 bg-white/5 border border-white/10 rounded-xl 
              outline-none focus:ring-2 focus:ring-violet-500"
            />
            <label
              className="absolute left-4 top-2 text-gray-400 text-sm transition-all
              peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
              peer-focus:top-2 peer-focus:text-sm"
            >
              
            </label>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4">

            <button
              disabled={loading}
              type="submit"
              className="flex-1 py-3 rounded-xl bg-gradient-to-r 
              from-green-500 to-emerald-500 hover:scale-105 transition shadow-lg"
            >
              {loading ? 'Updating...' : 'Update'}
            </button>

            <button
              disabled={loading}
              type="button"
              onClick={() => handleDelete(formData._id)}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r 
              from-red-500 to-pink-500 hover:scale-105 transition shadow-lg"
            >
              {loading ? 'Deleting...' : 'Delete'}
            </button>

          </div>

        </form>

        {/* ERROR */}
        {/* {error && (
          <p className="text-center text-red-400 mt-5 animate-pulse">
            {error}
          </p>
        )} */}

      </div>
    </div>
  );
};