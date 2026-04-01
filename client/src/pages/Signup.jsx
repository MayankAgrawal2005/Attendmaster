
import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';

import { showError,showSuccess } from '../styles/toast';


export default function Signup() {

  const [formData, setformData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
     const [error,setError]= useState(null);
   const [loading,setloading]=useState(false);
   const navigate = useNavigate();
  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

    const handleSubmit = async (e)=>{
     e.preventDefault();

     try{
      setloading(true);
     const res = await fetch('/api/auth/signup',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
     });

      // loading
     const data = await res.json();
     if(data.success===false){
      setloading(false);
        showError(data.message);
      setError(data.message);
    
      return;
     }

// loading
      setloading(false);
      showSuccess("Account created successfully");
      setError(null);
     console.log(data);
     navigate('/sign-in');

     }
     catch(error){
      setloading(false);
      setError(error.message);
     }
     

  };
    
 return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

      <input
        type="text"
        placeholder="Username"
        id="username"
        onChange={handleChange}
        className="p-3 rounded-xl bg-white/5 border border-white/10 text-white"
      />

      <input
        type="email"
        placeholder="Email"
        id="email"
        onChange={handleChange}
        className="p-3 rounded-xl bg-white/5 border border-white/10 text-white"
      />

      {/* <input
        type="password"
        placeholder="Password"
        id="password"
        onChange={handleChange}
        className="p-3 rounded-xl bg-white/5 border border-white/10 text-white"
      /> */}
      <div className="relative w-full">
  <input
    type={showPassword ? "text" : "password"}   // 🔥 IMPORTANT FIX
    placeholder="Password"
    id="password"
    onChange={handleChange}
    className="w-full p-3 pr-12 rounded-xl bg-white/5 border border-white/10 text-white"
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
  >
    {showPassword ? <FaEye /> : <FaEyeSlash />}
  </button>
</div>

      <button className="py-3 rounded-xl bg-gradient-to-r from-violet-600 to-pink-500">
        Sign Up
      </button>

       <div className='flex gap-2 items-center mt-5'>   <p>Have an account?</p>
  <Link to='/sign-in'>    <span className='text-blue-700'>Sign in</span>  </Link> </div>
    </form>
  );

     
  };



 
