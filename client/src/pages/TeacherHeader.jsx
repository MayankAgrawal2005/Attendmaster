
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaCalendarDays, FaBars } from "react-icons/fa6";
import { FaRegCalendarCheck, FaPen } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export const TeacherHeader = () => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navItem = (path, label, Icon) => {
    const active = location.pathname === path;

    return (
      <Link
        to={path}
        onClick={() => setMenuOpen(false)}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
        ${active
            ? 'bg-gradient-to-r from-green-600/30 to-emerald-500/20 text-white'
            : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
      >
        <Icon />
        {label}
      </Link>
    );
  };

  return (
    <>
      {/* MOBILE BUTTON */}
      <div className='lg:hidden fixed top-3 left-3 z-[100000]'>
        <button
          onClick={toggleMenu}
          className='p-2 bg-white/10 backdrop-blur border border-white/10 rounded-lg text-white'
        >
          {menuOpen ? <IoClose /> : <FaBars />}
        </button>
      </div>

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-64 z-[9999] transform transition-transform duration-300
        bg-[#0b1120] border-r border-white/10
        ${menuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0`}
      >

        {/* LOGO */}
        <div className='p-6'>
          <Link to='/teacher-dashboard' className="flex items-center gap-3">
            <div className="p-2 bg-violet-500 rounded-lg text-white">
              <FaCalendarDays />
            </div>
            <span className="text-white font-bold text-lg">
              Attend<span className="text-violet-400">Master</span>
            </span>
          </Link>
        </div>

        {/* MENU */}
        <div className='px-4 space-y-4 mt-6'>
          {navItem('/teacherattendance', 'Mark Attendance', FaRegCalendarCheck)}
          {navItem('/attendance-record', 'Attendance Record', FaPen)}
        </div>

        {/* PROFILE */}
        <div className="absolute bottom-0 w-full p-4 border-t border-white/10">
          <Link 
            to="/teacherprofile" 
            onClick={() => setMenuOpen(false)}   // 🔥 important fix
            className="flex items-center gap-3"
          >
            <img
              src={currentUser?.avatar}
              className="h-10 w-10 rounded-full object-cover"
              alt=""
            />
            <div>
              <p className="text-white text-sm">{currentUser?.name}</p>
              <p className="text-gray-400 text-xs">Teacher</p>
            </div>
          </Link>
        </div>
      </div>

      {/* BACKDROP */}
      {menuOpen && (
        <div
          onClick={toggleMenu}
          className='fixed inset-0 bg-black/50 z-[9998] lg:hidden'
        />
      )}
    </>
  );
};