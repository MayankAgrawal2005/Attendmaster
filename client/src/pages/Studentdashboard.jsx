import React from 'react';
import { useState,useEffect } from 'react';
import { StudentHeader } from './StudentHeader';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';


export const Studentdashboard = () => {

     const navigate = useNavigate();
    
    
    const {currentUser} = useSelector(state=>state.user);
    console.log('currentUser is',currentUser);

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
    <div className='flex h-screen space-x-8'>
        {/* left side */}
        <div className='w-64  bg-slate-200 shadow-xl'>
    
        <StudentHeader/>
        </div>
    
    {/* right side */}
        <div  className='flex-1 min-h-screen border border-gray-200 shadow-2xl  bg-white p-6 text-black'>
    
        <div className=' flex flex-col justify-center items-center min-h-screen  space-y-6'>
              <h1 className='text-5xl'>Welcome To AttendMaster</h1>
              <p className='text-2xl font-bold'>
                {getGreeting()} {currentUser?.name}
              </p>
              <p className='mt-2 mb-10 text-xl font-mullish'>
                Select an option to get started.
              </p>
            </div>
    
        </div>
       
        </div>
  )
}
