import React from 'react'
import { Link } from 'react-router-dom'
import Lottie from 'lottie-react';
import { Header } from '../components/Header';
import { MdTableView } from "react-icons/md";

export const Home = () => {
  return (
    <div className='overflow-x-hidden w-full'>
      <Header className='' />

      {/* Hero Section */}
      <div className='w-full min-h-screen flex items-center justify-center px-4 mt-4'>
        <div className='max-w-4xl text-center space-y-4'>
          <h1 className='text-2xl sm:text-5xl text-white gradient-text mb-4'>
            Revolutionize Attendance Tracking
          </h1>
          <p className='text-md sm:text-xl'>"Effortless Attendance Tracking"</p>
          <div className='flex justify-center'>
            <Link to="/login">
              <button className='bg-yellow-400 px-6 py-3 text-black rounded-md'>
                Get started
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id='features' className="px-4 py-10 border border-gray-300 shadow bg-white">
        <h1 className='text-center text-4xl font-mullish'>Key Features</h1>
        <div className='flex flex-col sm:flex-row flex-wrap justify-center items-center gap-10 mt-10'>

          {/* Card Template */}
          {["Excel Integration", "TimeTable Management", "Interactive Attendance"].map((title, i) => (
            <div key={i} className="relative w-full sm:w-[365px] h-[300px] bg-yellow-400 flex items-center justify-center">
              <div className="relative w-[90%] sm:w-[350px] h-[280px] bg-white border border-gray-300 hover:rotate-6 hover:scale-105 transition-all duration-300 shadow-lg p-4">
                <div className="flex space-x-5 items-center">
                  {i === 1 && <MdTableView className='w-[60px] h-[80px] text-blue-500' />}
                  <Lottie style={{ width: "80px", height: "100px" }} />
                  <p className="text-2xl font-mullish text-black">{title}</p>
                </div>
                <p className="mt-4 text-[#6E727F] font-mullish text-sm">
                  {i === 0 && "Automatically update and access a single, comprehensive Excel sheet."}
                  {i === 1 && "Seamlessly integrate with existing timetables or create new ones. Effortlessly manage schedules."}
                  {i === 2 && "Mark attendance with just a click, using our intuitive interface."}
                </p>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* About Section */}
      <section id='about' className='w-full px-4 py-10'>
        <div className='flex flex-col lg:flex-row gap-6 items-center'>
          <div className='w-full lg:w-1/2 h-[300px] border shadow-2xl border-gray-300 flex items-center justify-center'>
            <p className='hidden sm:inline'>3D Model placeholder</p>
          </div>
          <div className='w-full lg:w-1/2 h-auto border shadow-2xl border-gray-300 p-6'>
            <h2 className='text-xl sm:text-3xl font-mullish'>About AttendMaster</h2>
            <p className='text-[#6E727F] mt-4 font-mullish'>
              AttendMaster is designed to revolutionize attendance management in educational institutions. Our digital solution replaces traditional paper-based methods, offering a seamless, efficient and accurate way to track student attendance.
            </p>
            <p className='text-[#6E727F] mt-4 font-mullish'>
              With features like interactive marking, automated Excel updates, and timetable integration, AttendMaster simplifies the entire attendance process for teachers and administrators alike.
            </p>
          </div>
        </div>
      </section> 
      
            

      {/* Contact Section */}
      <section id='contact' className='w-full px-4 py-10 border border-gray-300 flex flex-col items-center'>
        <h1 className='text-center text-4xl font-bold font-mullish'>Get in Touch</h1>
        <p className='mt-4 text-center'>Ready to transform your attendance management? Contact us today!</p>
        <div className='mt-6'>
          <button className='bg-yellow-400 px-6 py-3 text-black rounded-md'>
            Contact us
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className='w-full h-[50px] border border-gray-300 flex items-center justify-center'>
        <p className='font-mullish text-center'>&copy; 2025 AttendMaster</p>
      </footer>
    </div>
  )
} 
