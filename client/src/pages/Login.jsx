import React, { useState } from 'react';
import { Header } from '../components/Header';
import Signup from './Signup';
import { StudentLogin } from './StudentLogin';
import { TeacherLogin } from './TeacherLogin';

export const Login = () => {
  const [selectedRole, setSelectedRole] = useState('Admin');

  const renderForm = () => {
    switch (selectedRole) {
      case 'Student':
        return <StudentLogin />;
      case 'Teacher':
        return <TeacherLogin />;
      case 'Admin':
        return <Signup />;
      default:
        return <Signup />;
    }
  };

  return (
    <div className="min-h-screen w-full px-4 bg-slate-100">
      <Header />

      <div className="mx-auto max-w-md  w-full border border-gray-400 rounded-2xl shadow-xl mt-10 p-8 sm:p-8 bg-white">
        
        {/* Role Selection Buttons */}
        <div className="flex justify-center  ">
          <div className="flex flex-wrap justify-center gap-4 border border-gray-400 p-2 rounded-full bg-gray-200">
            {['Student', 'Teacher', 'Admin'].map(role => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-6 py-2 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 
                  ${selectedRole === role ? 'bg-[#000814] text-white' : 'bg-gray-700 text-gray-300'} 
                  hover:bg-[#000814] hover:text-white`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Login Form */}
        <div className="flex justify-center">
          <div className="w-full">
            {renderForm()}
          </div>
        </div>
      </div>
    </div>
  );
};
