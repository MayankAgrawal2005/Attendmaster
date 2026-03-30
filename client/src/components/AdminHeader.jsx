
// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { FaCalendarDays, FaBars } from "react-icons/fa6";
// import { IoSchoolSharp } from "react-icons/io5";
// import { MdPeopleAlt } from "react-icons/md";
// import { IoClose } from "react-icons/io5";

// export const AdminHeader = () => {
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
//         <div className='p-4 '>
//           <Link to='/admin-dashboard'>
//             <div className='flex mt-6 items-center gap-2'>
//               <FaCalendarDays className='text-black' />
//               <span className='text-[#64748B] font-bold  text-lg'>AttendMaster</span>
//             </div>
//           </Link>
//           <div className='bg-gray-400 mt-2 h-[1px] w-full'></div>
//         </div>

//         {/* Menu Items */}
//         <ul className='flex flex-col gap-6 px-4 pt-6'>
//           <Link
//             to='/add-teacher'
//             className={`flex items-center gap-2 ${
//               location.pathname === '/add-teacher' ? 'text-blue-500' : 'text-gray-600'
//             }`}
//           >
//             <MdPeopleAlt className='mt-1' />
//             Manage Teacher
//           </Link>

//           <Link
//             to='/add-class'
//             className={`flex items-center gap-2 ${
//               location.pathname === '/add-class' ? 'text-blue-500' : 'text-gray-600'
//             }`}
//           >
//             <IoSchoolSharp className='mt-1' />
//             Manage Class
//           </Link>

//           <Link to='/profile'>
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
//                   location.pathname === '/profile' ? 'text-blue-500' : 'text-gray-600'
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
// import { FaBars } from "react-icons/fa6";
// import { IoSchoolSharp } from "react-icons/io5";
// import { MdPeopleAlt } from "react-icons/md";
// import { IoClose } from "react-icons/io5";
// import { FaCalendarDays } from "react-icons/fa6";

// export const AdminHeader = () => {
//   const { currentUser } = useSelector((state) => state.user);
//   const location = useLocation();
//   const [menuOpen, setMenuOpen] = useState(false);

//   const toggleMenu = () => setMenuOpen(!menuOpen);

//   const navItem = (path, label, Icon) => {
//     const active = location.pathname === path;

//     return (
//       <Link
//         to={path}
//         className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative group
//         ${active
//             ? 'bg-gradient-to-r from-violet-600/30 to-purple-500/20 text-white shadow-lg'
//             : 'text-gray-400 hover:text-white hover:bg-white/5'
//           }`}
//       >
//         {/* Glow effect */}
//         {active && (
//           <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-purple-500/20 blur-xl rounded-xl"></div>
//         )}

//         <Icon className="text-lg z-10" />
//         <span className="z-10">{label}</span>
//       </Link>
//     );
//   };

//   return (
//     <>
//       {/* 🔥 MOBILE TOGGLE */}
//       <div className='lg:hidden fixed top-3 left-3 z-50'>
//         <button
//           onClick={toggleMenu}
//           className='p-2 rounded-lg bg-white/10 backdrop-blur-xl border border-white/10 text-white'
//         >
//           {menuOpen ? <IoClose /> : <FaBars />}
//         </button>
//       </div>




//       {/* 🔥 SIDEBAR */}
//       <div
//         className={`fixed top-0 left-0 h-full w-64 z-40 transform transition-transform duration-300
//         bg-[#0b1120]/80 backdrop-blur-xl border-r border-white/10
//         ${menuOpen ? 'translate-x-0' : '-translate-x-full'}
//         lg:translate-x-0 lg:static`}
//       >

//         {/* LOGO */}
//         <div className='p-6'>
//           <Link to='/admin-dashboard'>
//             <div className='flex items-center gap-3'>
//               <div className="p-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-500">
//                 <FaCalendarDays />
//               </div>
//               <span className='font-bold text-lg tracking-wide'>
//                 Attend<span className="text-violet-400">Master</span>
//               </span>
//             </div>
//           </Link>
//         </div>

//         {/* MENU */}
//         <div className='px-4 space-y-2'>

//           {navItem('/add-teacher', 'Manage Teacher', MdPeopleAlt)}
//           {navItem('/add-class', 'Manage Class', IoSchoolSharp)}

//         </div>

//         {/* 🔥 PROFILE */}
//         <div className="absolute bottom-0 w-full p-4 border-t border-white/10">

//           <Link to="/profile" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition">

//             <img
//               className='h-10 w-10 rounded-full object-cover border border-white/20'
//               src={currentUser?.avatar}
//               alt='profile'
//             />

//             <div>
//               <p className="text-sm font-semibold">
//                 {currentUser?.username}
//               </p>
//               <p className="text-xs text-gray-400">
//                 Admin
//               </p>
//             </div>

//           </Link>

//         </div>

//       </div>

//       {/* 🔥 BACKDROP */}
//       {menuOpen && (
//         <div
//           onClick={toggleMenu}
//           className='fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden'
//         ></div>
//       )}
//     </>
//   );
// };



import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaBars } from "react-icons/fa6";
import { IoSchoolSharp } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { FaCalendarDays } from "react-icons/fa6";

export const AdminHeader = () => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navItem = (path, label, Icon) => {
    const active = location.pathname === path;

    return (
      <Link
        to={path}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative group
        ${active
            ? 'bg-gradient-to-r from-violet-600/30 to-purple-500/20 text-white shadow-lg'
            : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
      >
        {/* Glow effect */}
        {active && (
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-purple-500/20 blur-xl rounded-xl"></div>
        )}

        <Icon className="text-lg z-10" />
        <span className="z-10">{label}</span>
      </Link>
    );
  };

  return (
    <>
      {/* 🔥 MOBILE TOGGLE
      <div className='lg:hidden fixed top-2 left-2 z-50'>
        <button
          onClick={toggleMenu}
          className='p-2 rounded-lg bg-white/10 backdrop-blur-xl border border-white/10 text-white'
        >
          {menuOpen ? <IoClose /> : <FaBars />}
        </button>
      </div> */}
<div className='lg:hidden fixed top-4 left-4 z-50'>
  <button
    onClick={toggleMenu}
    className='flex items-center justify-center w-11 h-11 rounded-xl 
    bg-white/10 backdrop-blur-xl border border-white/10 
    text-white shadow-lg hover:bg-white/20 transition-all duration-300'
  >
    {menuOpen ? <IoClose size={20} /> : <FaBars size={18} />}
  </button>
</div>

      

      {/* 🔥 SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-64 z-40 transform transition-transform duration-300
        bg-[#0b1120]/80 backdrop-blur-xl border-r border-white/10
        ${menuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static`}
      >

        {/* LOGO */}
        <div className='p-6 '>
          <Link to='/admin-dashboard'>
            <div className='flex items-center gap-3'>
              <div className="p-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-500">
                <FaCalendarDays />
              </div>
              <span className='font-bold text-lg tracking-wide'>
                Attend<span className="text-violet-400">Master</span>
              </span>
            </div>
          </Link>
        </div>

        {/* MENU */}
        <div className='px-4 mt-24 space-y-10'>

          {navItem('/add-teacher', 'Manage Teacher', MdPeopleAlt)}
          {navItem('/add-class', 'Manage Class', IoSchoolSharp)}

        </div>

        {/* 🔥 PROFILE */}
        <div className="absolute bottom-0 w-full p-4 border-t border-white/10">

          <Link to="/profile" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition">

            <img
              className='h-10 w-10 rounded-full object-cover border border-white/20'
              src={currentUser?.avatar}
              alt='profile'
            />

            <div>
              <p className="text-sm font-semibold">
                {currentUser?.username}
              </p>
              <p className="text-xs text-gray-400">
                Admin
              </p>
            </div>

          </Link>

        </div>

      </div>

      {/* 🔥 BACKDROP */}
      {menuOpen && (
        <div
          onClick={toggleMenu}
          className='fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden'
        ></div>
      )}
    </>
  );
};