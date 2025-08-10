
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

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
        setError(data.message);
        return;
      }

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
        console.log(data.message);
        return;
      }

      navigate('/add-teacher');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 py-10 bg-gray-50">
      <div className="w-full max-w-xl bg-white border border-gray-300 rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-center mb-6">Update Teacher</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            id="name"
            maxLength={30}
            required
            value={formData.name || ''}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-3 border border-gray-300 rounded-md text-black"
          />
          <input
            type="email"
            id="email"
            maxLength={50}
            required
            value={formData.email || ''}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-md text-black"
          />

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
            <button
              disabled={loading}
              type="submit"
              className="bg-green-500 w-full sm:w-1/2 text-white p-3 rounded-md uppercase hover:bg-green-600 transition"
            >
              {loading ? 'Updating...' : 'Update'}
            </button>

            <button
              disabled={loading}
              type="button"
              onClick={() => handleDelete(formData._id)}
              className="bg-red-500 w-full sm:w-1/2 text-white p-3 rounded-md uppercase hover:bg-red-600 transition"
            >
              {loading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </form>

        {error && (
          <p className="text-center text-red-500 mt-4">{error}</p>
        )}
      </div>
    </div>
  );
};
