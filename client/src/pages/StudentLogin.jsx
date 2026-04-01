
import React from 'react';
import { Header } from '../components/Header';
import { useState,useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { showError,showSuccess } from '../styles/toast';
import {signInStart,signInFailure,signInSuccess} from '../redux/user/userSlice'
import { FaEye,FaEyeSlash } from "react-icons/fa";

export const StudentLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData,setformData] = useState({});
    const {loading,error}=useSelector((state)=>state.user);
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const handleChange=(e)=>{
  
      setformData(
       {
         ...formData ,
         [e.target.id]:e.target.value,
       }
      );
  
      
   };

   const handleSubmit = async (e)=>{
      e.preventDefault();
    
      if(!formData.code || !formData.password){
        dispatch(signInFailure("Please fill all the fields"));
        return;
      }
      try{
    
       // setloading(true); iski jagah redux use karenge
       dispatch(signInStart());
      const res = await fetch('/api/auth/student-sign-in',{
       method:'POST',
       headers:{
         'Content-Type':'application/json',
       },
       body:JSON.stringify(formData),
      });
    
       // loading
      const data = await res.json();
      console.log("data is ",data);
      if(data.success===false){
        showError(data.message);
       // setloading(false);
       // setError(data.message);
       // in this place redux is use
       dispatch(signInFailure(data.message));
       return;
      }
    
    // loading
       // setloading(false);
       // setError(null);
       // yha bhi redux is use
       showSuccess('Login successful');
       dispatch(signInSuccess(data));
      console.log(data);
      navigate('/student-dashboard');
    
      }
      catch(error){
        showError(error.message);
       // setloading(false);
       // setError(error.message);
       // yha bhi redux use
       dispatch(signInFailure(error.message));
      }
      
    
    };
    console.log('formData is',formData);


      useEffect(() => {
        dispatch(signInFailure(null));
      }, []);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

      <input
        type="text"
        placeholder="Student code"
        id='code'
        onChange={handleChange}
        className="p-3 rounded-xl bg-white/5 border border-white/10 text-white"
      />

      {/* <input
        type="password"
        placeholder="Password"
        id='password'
        onChange={handleChange}
        className="p-3 rounded-xl bg-white/5 border border-white/10 text-white"
      />
      <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
    >
      {showPassword ? <FaEye /> : <FaEyeSlash />}
    </button> */}

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
      <button className="py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500">
        Student Login
      </button>


 {/* {error && <p className='text-red-500 mt-5' >{error}</p>} */}
    </form>

    
  );
};