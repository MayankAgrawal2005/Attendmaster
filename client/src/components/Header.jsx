import React from 'react'
import { Link } from 'react-router-dom'
export const Header = () => {
  return (
    
    <div className='bg-slate-200 w-full shadow-md p-1 ' >
 <div className='flex justify-between flex-wrap h-[70px] items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
        <h1 className='font-bold  text-sm sm:text-xl flex flex-wrap'>
            <span className='text-[#64748B]'>Attend</span>
            <span className='text-[#334155]'>Master</span>
        </h1>
        </Link>

         <ul className='flex gap-4 '>
           
           

            <li className='hidden sm:inline text-slate-700 hover:underline'>
                   
                <a href='#features'>Features</a>
                    
                </li>


           <li className='hidden sm:inline text-slate-700 hover:underline'>
                   
            <a href='#contact'>Contact</a>
                       
             </li>


             <li className='hidden sm:inline text-slate-700 hover:underline'>
                   
            <a href='#about'>About</a>
                       
             </li>
                

             <Link to='/login'> 
            <li className=' text-slate-700 hover:underline'>
             Login
            </li>
            </Link> 
 
     {/* <Link to='/profile'>
           {currentUser ? ( 
                <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile'/>
           ):( 
           
            <li className='text-slate-700 hover:underline'>  Sign in</li>
            
           )
           }
           </Link>  */}

            
        </ul>
    </div>
    </div>

  )
}
