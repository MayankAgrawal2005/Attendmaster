


// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { FaCalendarDays, FaBars } from "react-icons/fa6";
// import { FaRegCalendarCheck } from "react-icons/fa";
// import { FaPen } from "react-icons/fa";
// import { IoClose } from "react-icons/io5";

// export const TeacherHeader = () => {
//   const { currentUser } = useSelector((state) => state.user);
//   const location = useLocation();
//   const [menuOpen, setMenuOpen] = useState(false);

//   const toggleMenu = () => setMenuOpen(!menuOpen);

//   return (
//     <>
//       {/* Hamburger - Only on small screens */}
//       <div className='lg:hidden fixed top-2 left-0 z-50'>
//         <button onClick={toggleMenu} className='text-xl bg-white p-2 rounded shadow-md'>
//           {menuOpen ? <IoClose /> : <FaBars />}
//         </button>
//       </div>

//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md z-40 transform transition-transform duration-300
//         ${menuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static sm:block`}
//       >
//         {/* Logo/Header */}
//         <div className='p-4'>
//           <Link to='/teacher-dashboard'>
//             <div className='flex mt-6 items-center gap-2'>
//               <FaCalendarDays className='text-black' />
//               <span className='text-[#64748B] font-bold text-lg'>AttendMaster</span>
//             </div>
//           </Link>
//           <div className='bg-gray-400 mt-2 h-[1px] w-full'></div>
//         </div>

//         {/* Menu Items */}
//         <ul className='flex flex-col gap-6 px-4 pt-6'>
//           <Link
//             to='/teacherattendance'
//             className={`flex items-center gap-2 ${
//               location.pathname === '/teacherattendance' ? 'text-blue-500' : 'text-gray-600'
//             }`}
//           >
//             <FaRegCalendarCheck className='mt-1' />
//             Mark Attendance
//           </Link>

//           <Link
//             to='/attendance-record'
//             className={`flex items-center gap-2 ${
//               location.pathname === '/attendance-record' ? 'text-blue-500' : 'text-gray-600'
//             }`}
//           >
//             <FaPen className='mt-1' />
//             Attendance Record
//           </Link>

//           <Link to='/teacherprofile'>
//             <div className='flex items-center gap-2'>
//               {currentUser && (
//                 <img
//                   className='rounded-full h-7 w-7 object-cover'
//                   src={currentUser.avatar}
//                   alt='profile'
//                 />
//               )}
//               <p
//                 className={`${
//                   location.pathname === '/teacherprofile' ? 'text-blue-500' : 'text-gray-600'
//                 }`}
//               >
//                 Profile
//               </p>
//             </div>
//           </Link>
//         </ul>
//       </div>

//       {/* Backdrop on small screens */}
//       {menuOpen && (
//         <div
//           onClick={toggleMenu}
//           className='fixed inset-0 bg-black opacity-40 z-30 sm:hidden'
//         ></div>
//       )}
//     </>
//   );
// };


// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { FaCalendarDays, FaBars } from "react-icons/fa6";
// import { FaRegCalendarCheck, FaPen } from "react-icons/fa";
// import { IoClose } from "react-icons/io5";

// export const TeacherHeader = () => {
//   const { currentUser } = useSelector((state) => state.user);
//   const location = useLocation();
//   const [menuOpen, setMenuOpen] = useState(false);

//   const toggleMenu = () => setMenuOpen(!menuOpen);

//   const navItem = (path, label, Icon) => {
//     const active = location.pathname === path;

//     return (
//       <Link
//         to={path}
//         onClick={() => setMenuOpen(false)}
//         className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
//         ${active
//             ? 'bg-gradient-to-r from-green-600/30 to-emerald-500/20 text-white'
//             : 'text-gray-400 hover:text-white hover:bg-white/5'
//           }`}
//       >
//         <Icon />
//         {label}
//       </Link>
//     );
//   };

//   return (
//     <>
//       {/* MOBILE BUTTON */}
//       <div className='lg:hidden fixed top-1 left-1 z-[99999]'>
//         <button
//           onClick={toggleMenu}
//           className='p-2 bg-white/10 backdrop-blur border border-white/10 rounded-lg text-white'
//         >
//           {menuOpen ? <IoClose /> : <FaBars />}
//         </button>
//       </div>

//       {/* SIDEBAR */}
//       <div
//         className={`fixed top-0 left-0 h-full w-64 z-[9999] transform transition-transform duration-300
//         bg-[#0b1120] border-r border-white/10
//         ${menuOpen ? 'translate-x-0' : '-translate-x-full'}
//         lg:translate-x-0`}
//       >

//         {/* LOGO */}
//         <div className='p-6'>
//           <Link to='/teacher-dashboard' className="flex items-center gap-3">
//             <div className="p-2 bg-green-500 rounded-lg text-white">
//               <FaCalendarDays />
//             </div>
//             <span className="text-white font-bold text-lg">
//               Attend<span className="text-green-400">Master</span>
//             </span>
//           </Link>
//         </div>

//         {/* MENU */}
//         <div className='px-4 space-y-8 mt-14'>
//           {navItem('/teacherattendance', 'Mark Attendance', FaRegCalendarCheck)}
//           {navItem('/attendance-record', 'Attendance Record', FaPen)}
//         </div>

//         {/* PROFILE */}
//         <div className="absolute bottom-0 w-full p-4 border-t border-white/10">
//           <Link to="/teacherprofile" className="flex items-center gap-3">
//             <img
//               src={currentUser?.avatar}
//               className="h-10 w-10 rounded-full"
//               alt=""
//             />
//             <div>
//               <p className="text-white text-sm">{currentUser?.name}</p>
//               <p className="text-gray-400 text-xs">Teacher</p>
//             </div>
//           </Link>
//         </div>
//       </div>

//       {/* BACKDROP */}
//       {menuOpen && (
//         <div
//           onClick={toggleMenu}
//           className='fixed inset-0 bg-black/50 z-[9998] lg:hidden'
//         />
//       )}
//     </>
//   );
// };


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
            <div className="p-2 bg-green-500 rounded-lg text-white">
              <FaCalendarDays />
            </div>
            <span className="text-white font-bold text-lg">
              Attend<span className="text-green-400">Master</span>
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