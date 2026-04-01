

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { showError, showSuccess } from '../styles/toast';

export const UpdateSubject = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subjectData, setSubjectData] = useState({
    name: '',
  });

  const location = useLocation();
  const classId = location.state?.classId;
  const navigate = useNavigate();
  const params = useParams();

  const handleChange = (e) => {
    setSubjectData({
      ...subjectData,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const subjectId = params.subjectId;
        const res = await fetch(`/api/subject/get-Subject/${subjectId}`);
        const data = await res.json();

        if (data.success === false) {
          console.log(data.message);
        } else {
          setSubjectData(data);
        }
      } catch (err) {
        showError("Failed to load subject");
        console.error(err.message);
      }
    };

    fetchSubject();
  }, [params.subjectId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/subject/update-subject/${params.subjectId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subjectData),
      });

      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
          
        setError(data.message);
        showError(data.message);
      } else {
          showSuccess(`Subject ${subjectData.name} updated successfully`);
        navigate(`/add-subject/${classId}`);
      }
    } catch (error) {
      setLoading(false);
      showError("Failed to update subject");
      setError(error.message);
    }
  };

  const handleDelete = async (subjectId) => {
    try {
      const res = await fetch(`/api/subject/delete-subject/${subjectId}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        showError(data.message);
        return;
      }
      showSuccess(`Subject ${subjectData.name} deleted successfully`);
      navigate(`/add-subject/${classId}`);
    } catch (error) {
      showError("Failed to delete subject");
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070b14] p-4 text-white relative overflow-hidden">

      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-violet-600/20 blur-[120px]"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-pink-600/20 blur-[120px]"></div>

      {/* CARD */}
      <div className="relative w-full max-w-md p-8 rounded-3xl 
      bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">

        {/* HEADER */}
        <h2 className="text-3xl font-bold text-center mb-2">
          Update Subject
        </h2>
        <p className="text-center text-gray-400 mb-6">
          Modify subject details easily
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* INPUT */}
          <div className="relative">
            <input
              type="text"
              maxLength={30}
              id="name"
              onChange={handleChange}
              value={subjectData.name || ''}
              placeholder=" "
              required
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

          {/* ERROR */}
          {error && (
            <p className="text-red-400 text-center animate-pulse">
              {error}
            </p>
          )}

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4">

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
              onClick={() => handleDelete(subjectData._id)}
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