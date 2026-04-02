

import React from 'react';
import { useState,useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import {signInStart,signInFailure,signInSuccess} from '../redux/user/userSlice'
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { showError,showSuccess } from '../styles/toast';
export const TeacherLogin = () => {
  const [formData,setformData] = useState({});
  const {loading,error}=useSelector((state)=>state.user);
  const [showPassword, setShowPassword] = useState(false);
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
   const res = await fetch('/api/auth/teacher-sign-in',{
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
    // setloading(false);
    // setError(data.message);
    // in this place redux is use
     showError(data.message);
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
   navigate('/teacher-dashboard');
 
   }
   catch(error){
    // setloading(false);
    // setError(error.message);
    // yha bhi redux use
      showError(error.message);
    dispatch(signInFailure(error.message));
   }
   
 
 };

  useEffect(() => {
         dispatch(signInFailure(null));
       }, []);

 console.log('formData is',formData);

  return (
    <form onSubmit={handleSubmit}  className="flex flex-col gap-4">

      <input
        type="text"
        placeholder="Teacher Code"
        onChange={handleChange}
        id="code"
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

      <button className="py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500">
        Teacher Login
      </button>

    </form>
  );
};