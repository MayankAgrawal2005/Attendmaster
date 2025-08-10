

import React from 'react';
import { TeacherHeader } from './TeacherHeader';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Teacherdashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  function getGreeting() {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return 'Good Morning';
    } else if (currentHour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  }

  return (
    <div className="flex flex-col md:flex-row h-screen md:space-x-8">
      {/* left side */}
      <div className="w-full md:w-64 bg-slate-200 shadow-xl">
        <TeacherHeader />
      </div>

      {/* right side */}
      <div className="flex-1 min-h-screen border border-gray-200 shadow-2xl bg-white p-6 text-black">
        <div className="flex flex-col justify-center items-center min-h-screen space-y-6">
          <h1 className="text-3xl md:text-5xl text-center md:text-left">
            Welcome To AttendMaster
          </h1>
          <p className="text-xl md:text-2xl font-bold">
            {getGreeting()} {currentUser?.name}
          </p>
          <p className="mt-2 mb-10 text-lg md:text-xl font-mullish text-center md:text-left">
            Select an option from the sidebar to get started.
          </p>
        </div>
      </div>
    </div>
  );
};

