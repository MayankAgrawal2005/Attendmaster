import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet,Navigate } from 'react-router-dom';


export const PrivateRoute = () => {
    const {currentUser} = useSelector((state)=>state.user);

//      console.log("current User is",currentUser);

  return currentUser ? <Outlet/> : <Navigate to='/login'/>;

    
  
}