// import React from 'react';
// import { useSelector } from 'react-redux';
// import { AdminHeader } from '../components/AdminHeader';
// import { FaCalendarDays } from "react-icons/fa6";
// export const Admindashboard = () => {
//   const { currentUser } = useSelector((state) => state.user);

//   function getGreeting() {
//     const currentHour = new Date().getHours();
//     if (currentHour < 12) return 'Good Morning';
//     if (currentHour < 18) return 'Good Afternoon';
//     return 'Good Evening';
//   }

//   return (
//     <div className='flex h-screen space-x-8'>
//       {/* Left side: AdminHeader */}
//       <div className='lg:w-[30%] w-full bg-slate-200 shadow-xl'>
//         <AdminHeader />
//       </div>

//       {/* Right side: Main Content */}
//       <div className=' lg:w-[70%] w-full flex-1 min-h-screen border border-gray-200 shadow-2xl  bg-white p-6 text-black'>
//         <div className=' flex flex-col justify-center items-center min-h-screen  space-y-6'>
//           <h1 className='text-3xl sm:text-5xl text-center flex-wrap'>Welcome To AttendMaster</h1>
//           <p className='text-xl sm:text-2xl text-center font-bold'>
//             {getGreeting()} {currentUser?.username}
//           </p>
//           <p className='mt-2 mb-10 text-xl hidden sm:inline font-mullish'>
//             Select an option from the sidebar to get started.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };



import React from 'react';
import { useSelector } from 'react-redux';
import { AdminHeader } from '../components/AdminHeader';

export const Admindashboard = () => {
  const { currentUser } = useSelector((state) => state.user);

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return 'Good Morning';
    if (currentHour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="flex flex-col md:flex-row h-screen md:space-x-8">
      {/* left side */}
      <div className="w-full md:w-64 bg-slate-200 shadow-xl">
        <AdminHeader />
      </div>

      {/* right side */}
      <div className="flex-1 min-h-screen border border-gray-200 shadow-2xl bg-white p-6 text-black">
        <div className="flex flex-col justify-center items-center min-h-screen space-y-6">
          <h1 className="text-3xl md:text-5xl text-center md:text-left">
            Welcome To AttendMaster
          </h1>
          <p className="text-xl md:text-2xl font-bold">
            {getGreeting()} {currentUser?.username}
          </p>
          <p className="mt-2 mb-10 text-lg md:text-xl font-mullish text-center md:text-left">
            Select an option from the sidebar to get started.
          </p>
        </div>
      </div>
    </div>
  );
};
