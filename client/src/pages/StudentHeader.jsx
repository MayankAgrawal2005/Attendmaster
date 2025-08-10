
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaCalendarDays, FaRegCalendarCheck, FaBars } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

export const StudentHeader = () => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      {/* Hamburger button - visible only on small screens */}
      <div className="lg:hidden fixed top-2 left-0 z-50">
        <button onClick={toggleMenu} className="text-xl bg-white p-2 rounded shadow-md">
          {menuOpen ? <IoClose /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white border border-gray-300 shadow-md z-40 transform transition-transform duration-300
        ${menuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static sm:block`}
      >
        <div className="flex flex-col justify-between items-center max-w-6xl mt-3 mx-auto p-3">
          <Link to="/student-dashboard">
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap gap-2">
              <div className="flex gap-2">
                <FaCalendarDays className="bg-white text-black mt-1 ml-12" />
                <span className="text-[#64748B]">AttendMaster</span>
              </div>
            </h1>
            <div className="bg-gray-400 mt-2 w-[250px] h-[1px]"></div>
          </Link>

          {/* Menu Items */}
          <ul className="flex flex-col space-y-8 mt-10 gap-4">
            <Link
              to="/student-attendance"
              className={`flex gap-2 ${
                location.pathname === '/student-attendance' ? 'text-blue-500' : 'text-gray-600'
              }`}
            >
              <FaRegCalendarCheck className="mt-1" />
              View Attendance
            </Link>

            <Link to="/student-profile">
              <div className="flex gap-4">
                {currentUser && (
                  <img
                    className="rounded-full h-7 w-7 object-cover"
                    src={currentUser.avatar}
                    alt="profile"
                  />
                )}
                <p
                  className={`${
                    location.pathname === '/student-profile' ? 'text-blue-500' : 'text-gray-600'
                  }`}
                >
                  Profile
                </p>
              </div>
            </Link>
          </ul>
        </div>
      </div>

      {/* Backdrop when menu is open on small screens */}
      {menuOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black opacity-40 z-30 sm:hidden"
        ></div>
      )}
    </>
  );
};
