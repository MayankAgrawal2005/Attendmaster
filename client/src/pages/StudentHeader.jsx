import React from 'react';
import { Link,useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaCalendarDays } from "react-icons/fa6";
import { FaRegCalendarCheck } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { FaPen } from "react-icons/fa";

export const StudentHeader = () => {
     const {currentUser} = useSelector(state=>state.user);
  return (
    <div className='bg-white  border border-gray-300 shadow-md h-full ' >
                <div className='flex flex-col justify-between items-center   max-w-6xl mt-3  mx-auto p-3'>
                       <Link to='/student-dashboard' >
                       <h1 className='font-bold  text-sm sm:text-xl flex flex-wrap gap-2'>
    
                          <div className='flex gap-2 '>
                                    <FaCalendarDays className='bg-white text-black mt-1 ml-12' />
                                    <span className='text-[#64748B] '>AttendMaster</span>
                                    </div>
                       </h1>
                       <div className='bg-gray-400 mt-2 w-[250px]  h-[1px]'></div>
                       </Link>
               
                        <ul className='flex flex-col space-y-8 mt-10 gap-4 '>
            
             
                         <Link to='/student-attendance' 
                         className={` ${location.pathname === '/student-attendance' ? "text-blue-500" : "text-gray-600" }`}>
                           <div className='flex gap-2'>
                           <FaRegCalendarCheck className='mt-1' />
    
                         View  Attendance
                           </div>
                           
                         </Link>
    
                        
            
                         <Link to='/student-profile'>
                         <div className='flex gap-4'>
    
                         
                          {currentUser && (
                            <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile'/>
                          )}
                          <p  className={`${
                  location.pathname === '/student-profile' ? 'text-blue-500' : 'text-gray-600'
                }`}> Profile </p>
                          </div>
    
                         
                        </Link>
                          
            
            
                      </ul>
                   </div>
                   </div>
  )
}
