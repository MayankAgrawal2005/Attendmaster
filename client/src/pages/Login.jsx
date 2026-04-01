

import React, { useState } from 'react';
import { ParticleCanvas } from '../components/ParticleCanvas';
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
    <div className="min-h-screen bg-[#070b14] text-white relative overflow-hidden">
      <ParticleCanvas /> 
      <Header />

      {/* background glow */}
      <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-violet-600/20 blur-[120px]"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-pink-600/20 blur-[120px]"></div>

      <div className="flex justify-center items-center min-h-screen px-4 pt-28">

        <div className="w-full max-w-md">

          <div className="p-6 sm:p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">

            <h1 className="text-2xl font-bold text-center mb-6">
              Login Portal
            </h1>

            {/* role switch */}
            <div className="flex justify-center mb-6">
              <div className="flex bg-white/10 p-1 rounded-full">
                {['Student', 'Teacher', 'Admin'].map(role => (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`px-4 py-2 text-sm rounded-full transition ${
                      selectedRole === role
                        ? 'bg-gradient-to-r from-violet-600 to-pink-500 text-white'
                        : 'text-gray-400'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* form */}
            {renderForm()}

          </div>
        </div>
      </div>
    </div>
  );
};

