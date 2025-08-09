// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { FaCalendarDays } from "react-icons/fa6";
// import { IoSchoolSharp } from "react-icons/io5";
// import { MdPeopleAlt } from "react-icons/md";
// export const AdminHeader = () => {
//   const { currentUser } = useSelector((state) => state.user);
//   const location = useLocation();

//   return (

//     <div className='bg-white  border border-gray-300 shadow-md h-full'>
//       <div className='flex flex-col justify-between items-center p-3 mt-3'>
//         <Link to='/admin-dashboard'>
//           <h1 className='font-bold text-sm sm:text-xl flex flex-wrap gap-2'>
//           <div className='flex gap-2 '>
//           <FaCalendarDays className='bg-white text-black mt-1 ml-12' />
//           <span className='text-[#64748B] '>AttendMaster</span>
//           </div>
           
//           </h1>
          
//           <div className='bg-gray-400 mt-2 w-[250px]  h-[1px]'></div>
//         </Link>

//         <ul className='flex mt-10 flex-col gap-4 space-y-8  '>
//           <Link
//             to='/add-teacher'
//             className={`${
//               location.pathname === '/add-teacher' ? 'text-blue-500' : 'text-gray-600'
//             }`} 
//           >
//             <div className='flex flex-wrap gap-2'>
//             <MdPeopleAlt className='mt-1' />
//             Manage Teacher
//             </div>
           
//           </Link>

//           <Link
//             to='/add-class'
//             className={`${
//               location.pathname === '/add-class' ? 'text-blue-500' : 'text-gray-600'
//             }`}
//           >
//           <div className='flex flex-wrap gap-2'>
//           <IoSchoolSharp className='mt-1' />

//              Manage Class
//           </div>
          
//           </Link>

//           <Link to='/profile'
//           >
          
//           <div className='flex gap-4'>
         

//           {currentUser && (
//               <img
//                 className='rounded-full h-7 w-7 object-cover'
//                 src={currentUser.avatar}
//                 alt='profile'
//               /> 

//             ) }

//             <p  className={`${
//               location.pathname === '/profile' ? 'text-blue-500' : 'text-gray-600'
//             }`}> Profile </p>
//           </div>
           
           
//           </Link>
//         </ul>
//       </div>
//     </div>
//   );
// };


import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaCalendarDays, FaBars } from "react-icons/fa6";
import { IoSchoolSharp } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import { IoClose } from "react-icons/io5";

export const AdminHeader = () => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      {/* Hamburger - Only on small screens */}
      <div className='lg:hidden fixed top-2 left-0 z-50'>
        <button onClick={toggleMenu} className='text-xl bg-white p-2 rounded shadow-md'>
          {menuOpen ? <IoClose /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md z-40 transform transition-transform duration-300
        ${menuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static sm:block`}
      >
        {/* Logo/Header */}
        <div className='p-4 '>
          <Link to='/admin-dashboard'>
            <div className='flex mt-6 items-center gap-2'>
              <FaCalendarDays className='text-black' />
              <span className='text-[#64748B] font-bold  text-lg'>AttendMaster</span>
            </div>
          </Link>
          <div className='bg-gray-400 mt-2 h-[1px] w-full'></div>
        </div>

        {/* Menu Items */}
        <ul className='flex flex-col gap-6 px-4 pt-6'>
          <Link
            to='/add-teacher'
            className={`flex items-center gap-2 ${
              location.pathname === '/add-teacher' ? 'text-blue-500' : 'text-gray-600'
            }`}
          >
            <MdPeopleAlt className='mt-1' />
            Manage Teacher
          </Link>

          <Link
            to='/add-class'
            className={`flex items-center gap-2 ${
              location.pathname === '/add-class' ? 'text-blue-500' : 'text-gray-600'
            }`}
          >
            <IoSchoolSharp className='mt-1' />
            Manage Class
          </Link>

          <Link to='/profile'>
            <div className='flex items-center gap-2'>
              {currentUser && (
                <img
                  className='rounded-full h-7 w-7 object-cover'
                  src={currentUser.avatar}
                  alt='profile'
                />
              )}
              <p
                className={`${
                  location.pathname === '/profile' ? 'text-blue-500' : 'text-gray-600'
                }`}
              >
                Profile
              </p>
            </div>
          </Link>
        </ul>
      </div>

      {/* Backdrop on small screens */}
      {menuOpen && (
        <div
          onClick={toggleMenu}
          className='fixed inset-0 bg-black opacity-40 z-30 sm:hidden'
        ></div>
      )}
    </>
  );
};
