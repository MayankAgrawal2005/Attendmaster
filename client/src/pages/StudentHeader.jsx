

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaBars, FaCalendarDays, FaRegCalendarCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

export const StudentHeader = () => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* 🔥 MOBILE BUTTON */}
      <div className="lg:hidden fixed top-4 left-4 z-[100]">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 backdrop-blur-md rounded-lg bg-black/70 text-white"
        >
          {menuOpen ? <IoClose size={20} /> : <FaBars size={18} />}
        </button>
      </div>

      {/* 🔥 SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-64 z-[99]
        bg-[#070b14] text-white border-r border-gray-800
        transform transition-transform duration-300 
        ${menuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0`}
      >

        {/* LOGO */}
        <div className="p-5 border-b border-gray-800">
          <Link to="/student-dashboard">
            <div className="flex items-center gap-2">
              <FaCalendarDays className="text-green-400 text-xl" />
              <h1 className="text-lg font-bold ml-1">
                Attend<span className="text-green-400">Master</span>
              </h1>
            </div>
          </Link>
        </div>

        {/* MENU */}
        <div className="p-4 flex flex-col justify-between h-[85%]">

          <div className="space-y-4">

            {/* ATTENDANCE */}
            <Link
              to="/student-attendance"
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 p-3 mt-14 rounded-lg transition
              ${
                location.pathname === '/student-attendance'
                  ? 'bg-green-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <FaRegCalendarCheck />
              View Attendance
            </Link>

          </div>

          {/* PROFILE */}
          <Link
            to="/student-profile"
            onClick={() => setMenuOpen(false)}
            className={`flex items-center gap-3 p-3  rounded-lg transition
            ${
              location.pathname === '/student-profile'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <img
              src={currentUser?.avatar}
              alt="profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold">
                {currentUser?.name || 'Student'}
              </p>
              <p className="text-xs text-gray-400">Student</p>
            </div>
          </Link>

        </div>
      </div>

      {/* 🔥 BACKDROP */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 backdrop-blur-md bg-black/50 z-[98] lg:hidden"
        />
      )}
    </>
  );
};