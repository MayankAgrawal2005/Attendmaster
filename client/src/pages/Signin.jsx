// import React, { useState ,useEffect} from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { signInStart, signInFailure, signInSuccess } from '../redux/user/userSlice';
// import { Header } from '../components/Header';

// export const Signin = () => {
//   const [formData, setFormData] = useState({});
//   const { loading, error } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch(signInStart());
//       const res = await fetch('/api/auth/signin', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!res.ok) {
//   throw new Error("Something went wrong");
// }

//       const data = await res.json();
//       if (data.success === false) {
//         dispatch(signInFailure(data.message));
//         return;
//       }

//       dispatch(signInSuccess(data));
//       navigate('/admin-dashboard');
//     } catch (error) {
//       dispatch(signInFailure(error.message));
//     }
//   };

//    useEffect(() => {
//     dispatch(signInFailure(null)); // clear error on load
//   }, []);

//   return (
//     <div className='min-h-screen w-full px-4 bg-slate-100 '>
//       <Header />

//       <div className="flex justify-center items-center pt-20 pb-10">
//         <div className="w-full max-w-md border border-gray-400 bg-white p-6 sm:p-8 rounded-xl shadow-xl">
//           <h1 className='text-2xl sm:text-3xl text-center font-semibold mb-6'>Sign In</h1>

//           <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
//             <input
//               type='email'
//               placeholder='Email'
//               className='border p-3 rounded-md text-sm'
//               id='email'
//               onChange={handleChange}
//               required
//             />
//             <input
//               type='password'
//               placeholder='Password'
//               className='border p-3 rounded-md text-sm'
//               id='password'
//               onChange={handleChange}
//               required
//             />

//             <button
//               disabled={loading}
//               className='bg-slate-700 text-white p-3 rounded-md uppercase hover:opacity-95 disabled:opacity-70 transition-all duration-200'
//             >
//               {loading ? 'Loading...' : 'Sign In'}
//             </button>
//           </form>

//           <div className='flex gap-1 mt-5 text-sm'>
//             <p>Don’t have an account?</p>
//             <Link to='/login'>
//               <span className='text-blue-700 font-medium hover:underline'>Sign Up</span>
//             </Link>
//           </div>

//           {error && <p className='text-red-500 mt-5 text-sm'>{error}</p>}
//         </div>
//       </div>
//     </div>
//   );
// };


import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInFailure, signInSuccess } from '../redux/user/userSlice';
import { Header } from '../components/Header';

export const Signin = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Something went wrong");

      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      navigate('/admin-dashboard');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  useEffect(() => {
    dispatch(signInFailure(null));
  }, []);

  return (
    <div className="min-h-screen bg-[#070b14] text-white relative overflow-hidden">

      <Header />

      {/* BACKGROUND GLOW */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-violet-600/20 blur-[120px]"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-fuchsia-600/20 blur-[120px]"></div>

      {/* CONTENT */}
      <div className="flex justify-center items-center min-h-screen px-4 pt-24">

        <div className="w-full max-w-md">

          {/* GLASS CARD */}
          <div className="relative p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">

            {/* glow border */}
            <div className="absolute -inset-[1px] rounded-3xl opacity-0 hover:opacity-100 transition duration-500 bg-gradient-to-r from-violet-500 to-pink-500 blur"></div>

            <div className="relative z-10">

              <h1 className="text-3xl font-bold text-center mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-400 text-center mb-6 text-sm">
                Sign in to continue to AttendMaster
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                {/* EMAIL */}
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  onChange={handleChange}
                  required
                  className="p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
                />

                {/* PASSWORD */}
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  onChange={handleChange}
                  required
                  className="p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
                />

                {/* BUTTON */}
                <button
                  disabled={loading}
                  className="mt-2 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 font-semibold hover:scale-105 transition shadow-lg disabled:opacity-60"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>

              </form>

              {/* SIGNUP */}
              <div className="flex justify-center gap-1 mt-6 text-sm text-gray-400">
                <p>Don’t have an account?</p>
                <Link to="/login">
                  <span className="text-violet-400 hover:underline">
                    Sign Up
                  </span>
                </Link>
              </div>

              {/* ERROR */}
              {error && (
                <p className="text-red-400 mt-4 text-sm text-center">
                  {error}
                </p>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};