

import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { showError, showSuccess } from '../styles/toast';
import { TeacherHeader } from './TeacherHeader';
import {
  updateUserFailure,
  updateUserSuccess,
  updateUserStart,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from '../redux/user/userSlice';

export const TeacherProfile = () => {
  const [uploading, setUploading] = useState(false);
  const { currentUser, loading } = useSelector((state) => state.user);
   const [showPassword, setShowPassword] = useState(false);
  const fileref = useRef(null);
  const [formData, setFormData] = useState({});
  const [avatarPreview, setAvatarPreview] = useState(currentUser?.avatar || "");

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // 🔥 SAME CLOUDINARY (NO CHANGE)
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'mayank');
    formData.append("cloud_name", "diqum6tfd");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/diqum6tfd/image/upload", {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.secure_url) {
        setFormData((prev) => ({
          ...prev,
          avatar: data.secure_url,
        }));
        setAvatarPreview(data.secure_url);
      }
    } catch (error) {
      showError("Failed to upload image");
      console.log(error);
    } finally {

      setUploading(false);
    }
  };

  // 🔥 SAME LOGIC
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());

      const res = await fetch(`/api/auth/update-teacher/${currentUser._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        showError(data.message);
        dispatch(updateUserFailure(data.message));
        return;
      }
      showSuccess("Profile updated successfully");
      dispatch(updateUserSuccess(data));
    } catch (error) {
      showError("Failed to update profile");
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());

      const res = await fetch(`/api/auth/delete-teacher/${currentUser._id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (data.success === false) {
        showError(data.message);
        dispatch(deleteUserFailure(data.message));
        return;
      }

      showSuccess("Account deleted successfully");
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      showError("Failed to delete account");
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignout = async () => {
    try {
      dispatch(signOutUserStart());

      const res = await fetch('/api/auth/signout-teacher');
      const data = await res.json();

      if (data.success === false) {
        showError(data.message);
        dispatch(signOutUserFailure(data.message));
        return;
      }
        showSuccess("Signed out successfully");
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      showError("Failed to sign out");
      dispatch(signOutUserFailure(error.message));
    }
  };


return (
  <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#020617] text-white flex">

    {/* Sidebar */}
    <div className="">
      <TeacherHeader />
    </div>

   

    {/* Main */}
    <div className="flex-1 flex mx-auto lg:ml-64 items-center justify-center p-6">

      <div className="w-full mt-10 md:mt-0 max-w-xl bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 space-y-6">

        {/* TOP TAG */}
        <div className="flex justify-center">
          <span className="px-4 py-1 text-xs tracking-widest rounded-full bg-green-500/20 text-green-300 border border-green-500/30">
            • TEACHER ACCOUNT
          </span>
        </div>

        {/* TITLE */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl shimmer-text hero-title sm:text-4xl profile-title">
            My Profile
          </h1>
          <p className="label-text">
            MANAGE YOUR IDENTITY
          </p>
        </div>

        {/* AVATAR */}
        <div className="flex justify-center">
          <div className="relative w-28 h-28">

            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full text-xs">
                Uploading...
              </div>
            )}

            <img
              onClick={() => fileref.current.click()}
              src={avatarPreview}
              alt="profile"
              className="w-28 h-28 rounded-full object-cover border-2 border-green-400 cursor-pointer shadow-lg"
            />
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <input type="file" ref={fileref} onChange={handleImageChange} hidden />

          {/* USERNAME */}
          <div>
            <label className="label-text">USERNAME</label>
            <input
              type="text"
              id="username"
              defaultValue={currentUser.name}
              onChange={handleChange}
              className="w-full mt-1 p-4 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-green-400"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="label-text">EMAIL</label>
            <input
              type="email"
              id="email"
              defaultValue={currentUser.email}
              onChange={handleChange}
              className="w-full mt-1 p-4 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-green-400"
            />
          </div>

          {/* PASSWORD */}
          {/* <div>
            <label className="label-text">PASSWORD</label>
            <input
              type="password"
              id="password"
              onChange={handleChange}
              className="w-full mt-1 p-4 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-green-400"
            />
          </div> */}
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
            className="w-full py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90 transition font-medium tracking-widest"
          >
            {loading ? "UPDATING..." : "SAVE CHANGES"}
          </button>

        </form>

        {/* FOOTER */}
        <div className="flex justify-between text-sm pt-4 border-t border-white/10">

          <span
            onClick={handleDelete}
            className="text-red-400 cursor-pointer hover:underline"
          >
            🗑 DELETE ACCOUNT
          </span>

          <span
            onClick={handleSignout}
            className="text-gray-400 cursor-pointer hover:underline"
          >
            ⎋ SIGN OUT
          </span>

        </div>

      </div>

    </div>
  </div>
);

};