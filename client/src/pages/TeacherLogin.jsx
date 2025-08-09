import React from 'react'
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import {signInStart,signInFailure,signInSuccess} from '../redux/user/userSlice'
import { Header } from '../components/Header'

export const TeacherLogin = () => {

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
    dispatch(signInFailure(data.message));
    return;
   }
 
 // loading
    // setloading(false);
    // setError(null);
    // yha bhi redux is use
    dispatch(signInSuccess(data));
   console.log(data);
   navigate('/teacher-dashboard');
 
   }
   catch(error){
    // setloading(false);
    // setError(error.message);
    // yha bhi redux use
    dispatch(signInFailure(error.message));
   }
   
 
 };

 console.log('formData is',formData);

  return (
    
    <div>
            
    
            <div className='p-3 max-w-lg mx-auto'>
    
    <h1 className='text-3xl text-center font-semibold my-7'>Teacher Credentials</h1>
    
      <form onSubmit={handleSubmit}  className='flex flex-col gap-4 '>
         <input type='text' placeholder='Enter your code '  onChange={handleChange}
         className='border p-3 rounded-lg' id='code' />
       
         <input type='password' placeholder='password ' onChange={handleChange} 
         className='border p-3 rounded-lg' id='password' />
    
         <button  className='bg-slate-700 text-white p-3 rounded-lg 
          uppercase hover:opacity-95 disabled:opacity-80'>
           Submit
          </button>
          {/* <OAuth/> */}
    
    </form>
    <div className='flex gap-2 mt-5'>
    
    </div>
    
    
    {error && <p className='text-red-500 mt-5' >{error}</p>}
       </div>
    
    </div>
    
  )
}
