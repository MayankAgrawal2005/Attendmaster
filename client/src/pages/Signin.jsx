


import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInFailure, signInSuccess } from '../redux/user/userSlice';
import { Header } from '../components/Header';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import { showError,showSuccess } from '../styles/toast';
export const Signin = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
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
      showSuccess("Signed in successfully");
      navigate('/admin-dashboard');
    } catch (error) {
      dispatch(signInFailure(error.message));
      showError("Failed to sign in");
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
                {/* <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  onChange={handleChange}
                  required
                  className="p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
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
              {/* {error && (
                <p className="text-red-400 mt-4 text-sm text-center">
                  {error}
                </p>
              )} */}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};