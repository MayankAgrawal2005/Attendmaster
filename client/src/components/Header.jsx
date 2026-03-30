// import React from 'react'
// import { Link } from 'react-router-dom'
// export const Header = () => {
//   return (
    
//     <div className='bg-slate-200 w-full shadow-md p-1 ' >
//  <div className='flex justify-between flex-wrap h-[70px] items-center max-w-6xl mx-auto p-3'>
//         <Link to='/'>
//         <h1 className='font-bold  text-sm sm:text-xl flex flex-wrap'>
//             <span className='text-[#64748B]'>Attend</span>
//             <span className='text-[#334155]'>Master</span>
//         </h1>
//         </Link>

//          <ul className='flex gap-4 '>
           
           

//             <li className='hidden sm:inline text-slate-700 hover:underline'>
                   
//                 <a href='#features'>Features</a>
                    
//                 </li>


//            <li className='hidden sm:inline text-slate-700 hover:underline'>
                   
//             <a href='#contact'>Contact</a>
                       
//              </li>


//              <li className='hidden sm:inline text-slate-700 hover:underline'>
                   
//             <a href='#about'>About</a>
                       
//              </li>
                

//              <Link to='/login'> 
//             <li className=' text-slate-700 hover:underline'>
//              Login
//             </li>
//             </Link> 
 
//      {/* <Link to='/profile'>
//            {currentUser ? ( 
//                 <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile'/>
//            ):( 
           
//             <li className='text-slate-700 hover:underline'>  Sign in</li>
            
//            )
//            }
//            </Link>  */}

            
//         </ul>
//     </div>
//     </div>

//   )
// }


// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'

// export const Header = () => {
//   const [scrolled, setScrolled] = useState(false)

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 30)
//     }
//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   return (
//     <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
//       scrolled 
//         ? 'bg-[#070b14]/80 backdrop-blur-xl border-b border-white/10 py-3' 
//         : 'py-5'
//     }`}>

//       <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

//         {/* LOGO */}
//         <Link to="/">
//           <div className="flex items-center gap-2.5">
//             <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-sm font-black">
//               A
//             </div>
//             <span className="font-bold text-lg tracking-tight">
//               Attend<span className="text-violet-400">Master</span>
//             </span>
//           </div>
//         </Link>

//         {/* NAV */}
//         <nav className="hidden md:flex gap-8 text-sm text-gray-400">
//           {['Features', 'Why Us', 'Stats', 'Testimonials'].map(n => (
//             <a
//               key={n}
//               href={`#${n.toLowerCase().replace(' ', '-')}`}
//               className="hover:text-white transition hover:underline underline-offset-4 decoration-violet-500"
//             >
//               {n}
//             </a>
//           ))}
//         </nav>

//         {/* BUTTON */}
//         <Link to="/login">
//           <button className="px-6 py-3 bg-violet-600 rounded-xl text-white hover:scale-105 transition shadow-lg">
//             Get Started →
//           </button>
//         </Link>

//       </div>
//     </header>
//   )
// }



import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b border-white/10 ${
      scrolled ? 'bg-[#070b14]/80 backdrop-blur-xl border-b border-white/10' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-[70px] flex justify-between items-center">

        <Link to="/">
          <h1 className="font-bold text-white text-lg">
            Attend<span className="text-violet-400">Master</span>
          </h1>
        </Link>

        <Link to="/login">
          <button className="px-5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 text-white">
            Get Started →
          </button>
        </Link>

      </div>
    </header>
  );
};