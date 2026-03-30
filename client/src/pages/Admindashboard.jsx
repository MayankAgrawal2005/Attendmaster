




import React from 'react';
import { useSelector } from 'react-redux';
import { AdminHeader } from '../components/AdminHeader';
import {
  FaBell,
  FaDownload,
  FaSearch,
  FaUserGraduate,
  FaChartLine,
  FaSchool,
} from 'react-icons/fa';

export const Admindashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  

  return (
    <div className="flex min-h-screen bg-[#070b14] text-white">

      {/* SIDEBAR */}
      <div >
        <AdminHeader />
      </div>

      {/* MAIN */}
      <div className="flex-1 mt-12 p-6 space-y-6">

        {/* 🔥 TOP BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">

          <div className="flex items-center gap-3 w-full md:w-[400px] bg-white/5 border border-white/10 rounded-xl px-4 py-2">
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search students, classes..."
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>

          <div className="flex items-center gap-4">
            <p className="text-gray-400 hidden sm:block">
              {new Date().toDateString()}
            </p>

            <FaBell className="cursor-pointer" />

            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-500">
              <FaDownload /> Export
            </button>
          </div>

        </div>

        {/* 🔥 WELCOME BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">

          <h1 className="text-xl sm:text-2xl font-semibold">
            Welcome back, <span className="text-violet-400">{currentUser?.username}</span>
          </h1>

          <div className="flex gap-3 flex-wrap">
            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
              ● System Online
            </span>
            <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">
              ● -- Classes
            </span>
            <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm">
              ● -- Alerts
            </span>
          </div>

        </div>

        {/* 🔥 STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {[
            { title: "Total Students", icon: FaUserGraduate, color: "text-violet-400" },
            { title: "Present Today", icon: FaUserGraduate, color: "text-green-400" },
            { title: "Avg Attendance", icon: FaChartLine, color: "text-yellow-400" },
            { title: "Classes Today", icon: FaSchool, color: "text-pink-400" },
          ].map((item, i) => {

            const Icon = item.icon;

            return (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-lg hover:scale-105 transition"
              >
                <Icon className={`text-2xl mb-3 ${item.color}`} />

                <h3 className="text-gray-400 text-sm">{item.title}</h3>

                {/* REAL DATA WILL COME */}
                <p className="text-3xl font-bold mt-2">--</p>

                <div className="mt-4 h-[40px] bg-white/5 rounded-lg"></div>
              </div>
            );
          })}

        </div>

        {/* 🔥 MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-white/5 border border-white/10">

            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-semibold">Today's Classes</h2>
              <span className="text-violet-400 cursor-pointer">View All →</span>
            </div>

            {/* EMPTY STATE */}
            <div className="text-gray-500 text-center py-10">
              No class data available
            </div>

          </div>

          {/* RIGHT */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">

            <h2 className="text-lg font-semibold mb-4">
              Overall Attendance
            </h2>

            <div className="flex flex-col items-center justify-center py-10">

              {/* CIRCLE PLACEHOLDER */}
              <div className="w-32 h-32 rounded-full border-4 border-violet-500 flex items-center justify-center">
                <span className="text-2xl font-bold">--%</span>
              </div>

              <div className="mt-6 space-y-2 text-sm text-gray-400">
                <p>Present: --</p>
                <p>Absent: --</p>
                <p>Late: --</p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};