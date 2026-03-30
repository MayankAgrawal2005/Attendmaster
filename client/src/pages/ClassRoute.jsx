

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AdminHeader } from '../components/AdminHeader';
import { MdCancel } from "react-icons/md";
import { useSelector } from 'react-redux';

export const ClassRoute = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [classes, setClasses] = useState([]);
  const { currentUser } = useSelector(state => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [classData, setClassData] = useState({ name: '' });

  const adminId = currentUser._id;

  const handleChange = (e) => {
    setClassData({
      ...classData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/class/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...classData, adminId }),
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
      setRefresh(prev => !prev);
    } catch (error) {
      setLoading(false);
      setError(error.message);
      setTimeout(() => setError(""), 3000);
    }
  };

  const fetchClasses = async () => {
    try {
      const res = await fetch(`/api/class/all/${adminId}`);
      const data = await res.json();
      setClasses(data);
    } catch (error) {
      setError("Failed to load Classes");
    }
  };

  useEffect(() => {
    fetchClasses();
  }, [refresh]);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue) {
      navigate(selectedValue);
    }
  };

 
  
return (
  <div className="flex min-h-screen bg-[#070b14] text-white relative overflow-hidden">

    {/* BACKGROUND */}
    <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-violet-600/20 blur-[120px]"></div>
    <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-pink-600/20 blur-[120px]"></div>

    {/* SIDEBAR */}
    <div className=" ">
      <AdminHeader />
    </div>

    {/* MAIN */}
    <div className="flex-1 p-6 mt-12 sm:p-10 relative z-10">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-xl md:text-4xl shimmer-text hero-title font-bold tracking-wide">
          Class Management
        </h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 
          hover:scale-105 transition shadow-lg"
        >
          + Add Class
        </button>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60  backdrop-blur-sm flex justify-center items-center z-50">
          <div className="relative w-[90%] max-w-md p-6 rounded-3xl 
          bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">

            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              <MdCancel className="w-6 h-6" />
            </button>

            <h2 className="text-xl font-semibold mb-4">Create Class</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="name"
                placeholder="Class Name"
                maxLength={30}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10 mb-4 outline-none focus:ring-2 focus:ring-violet-500"
              />

              <button
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-pink-500"
              >
                {loading ? "Saving..." : "Add Class"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ERROR */}
      {error && <p className="text-red-400 mb-6">{error}</p>}

      {/* 🔥 UNIQUE LIST UI */}
      {classes.length === 0 ? (
        <div className="text-center text-gray-400 mt-16 sm:mt-20 text-sm sm:text-base">
          No classes added yet.
        </div>
      ) : (

        <div className="space-y-4 sm:space-y-6">

          {classes.map((clas, index) => (

            <div
              key={index}
              className="group relative p-4 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-xl 
              border border-white/10 shadow-xl overflow-hidden transition-all duration-300
              hover:scale-[1.02]"
            >

              {/* LEFT LINE */}
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b 
              from-violet-500 to-pink-500 opacity-70"></div>

              {/* HOVER */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
              transition bg-gradient-to-r from-violet-500/10 to-pink-500/10 blur-xl"></div>

              {/* CONTENT */}
              <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

                {/* LEFT */}
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold tracking-wide">
                    {clas.name}
                  </h2>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1">
                    Manage students, subjects & attendance
                  </p>
                </div>

                {/* RIGHT */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 
                opacity-100  lg:opacity-0 sm:opacity-100 sm:group-hover:opacity-100 transition">

                  <Link to={`/update-class/${clas._id}`}>
                    <button className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg bg-white/10 hover:bg-violet-600 transition">
                      Update
                    </button>
                  </Link>

                  <select
                    onChange={handleSelectChange}
                    defaultValue=""
                    className="bg-white/5 border border-white/10 p-2 rounded-lg outline-none text-xs sm:text-sm"
                  >
                    <option value="" disabled>Manage</option>
                    <option value={`/add-student/${clas._id}`} className="text-black">Students</option>
                    <option value={`/add-subject/${clas._id}`} className="text-black">Subjects</option>
                    <option value={`/view-class/${clas._id}`} className="text-black">View</option>
                  </select>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  </div>
);

  
};


