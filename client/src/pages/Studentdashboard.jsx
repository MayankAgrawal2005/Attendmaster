
import React from 'react';
import { StudentHeader } from './StudentHeader';
import { useSelector } from 'react-redux';

export const Studentdashboard = () => {
  const { currentUser } = useSelector((state) => state.user);

  function getGreeting() {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Good Morning";
    } else if (currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden lg:space-x-8">
      {/* Sidebar */}
      <div className="lg:w-64 bg-slate-200 shadow-xl flex-shrink-0">
        <StudentHeader />
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-screen border border-gray-200 shadow-2xl bg-white p-4 sm:p-6 text-black overflow-y-auto">
        <div className="flex flex-col justify-center items-center min-h-[80vh] space-y-4 sm:space-y-6 text-center px-4">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold">
            Welcome To AttendMaster
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-bold">
            {getGreeting()} {currentUser?.name}
          </p>
          <p className="mt-2 mb-10 text-base sm:text-lg md:text-xl font-mullish max-w-prose">
            Select an option to get started.
          </p>
        </div>
      </div>
    </div>
  );
};
