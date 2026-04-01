
import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StudentHeader } from './StudentHeader';
import {
  updateUserFailure, updateUserSuccess, updateUserStart,
  deleteUserFailure, deleteUserStart, deleteUserSuccess,
  signOutUserFailure, signOutUserStart, signOutUserSuccess
} from '../redux/user/userSlice';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { showError, showSuccess } from '../styles/toast';
export const StudentProfile = () => {
  const [uploading, setUploading] = useState(false);
  const { currentUser, loading } = useSelector((state) => state.user);
  const fileref = useRef(null);
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  
  const [avatarPreview, setAvatarPreview] = useState(currentUser?.avatar || "");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      const dataForm = new FormData();
      dataForm.append('file', file);
      dataForm.append('upload_preset', 'mayank');
      dataForm.append('cloud_name', 'diqum6tfd');

      try {
        const res = await fetch("https://api.cloudinary.com/v1_1/diqum6tfd/image/upload", {
          method: 'POST',
          body: dataForm,
        });
        const data = await res.json();
        if (data.secure_url) {
          setFormData((prev) => ({ ...prev, avatar: data.secure_url }));
          setAvatarPreview(data.secure_url);
        } else {
          console.error("Cloudinary upload failed");
        }
      } catch (error) {
        showError("Error uploading image");
        console.error("Error uploading image:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/auth/update-student/${currentUser._id}`, {
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
      showError("Profile updated successfully");
      dispatch(updateUserSuccess(data));
    } catch (error) {
      showError("Failed to update profile");
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/auth/delete-student/${currentUser._id}`, {
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
      const res = await fetch('/api/auth/signout-student');
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
  <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#020617] text-white flex flex-col lg:flex-row">

    {/* Sidebar */}
    <div className="w-full lg:w-64 lg:min-h-screen">
      <StudentHeader />
    </div>

    {/* Main */}
    <div className="flex-1 flex items-center justify-center p-4 sm:p-6">

      <div className="w-full max-w-xl bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-5 sm:p-8 space-y-5 sm:space-y-6">

        {/* TOP TAG */}
        <div className="flex justify-center">
          <span className="px-3 sm:px-4 py-1 text-[10px] sm:text-xs tracking-widest rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
            • STUDENT ACCOUNT
          </span>
        </div>

        {/* TITLE */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl shimmer-text hero-title md:text-4xl profile-text font-light tracking-wide">
            My Profile
          </h1>
          <p className="text-[10px] sm:text-xs tracking-[0.3em] text-gray-400">
            MANAGE YOUR IDENTITY
          </p>
        </div>

        {/* AVATAR */}
        <div className="flex justify-center">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28">

            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full text-[10px] sm:text-xs">
                Uploading...
              </div>
            )}

            <img
              onClick={() => fileref.current.click()}
              src={avatarPreview}
              alt="profile"
              className="w-full h-full rounded-full object-cover border-2 border-purple-400 cursor-pointer shadow-lg"
            />
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">

          <input type="file" ref={fileref} onChange={handleImageChange} hidden accept="image/*" />

          {/* USERNAME */}
          <div>
            <label className="text-[10px] sm:text-xs text-gray-400 tracking-widest">
              USERNAME
            </label>
            <input
              type="text"
              defaultValue={currentUser.name}
              id="username"
              onChange={handleChange}
              className="w-full mt-1 p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-purple-400"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-[10px] sm:text-xs text-gray-400 tracking-widest">
              EMAIL
            </label>
            <input
              type="email"
              defaultValue={currentUser.email}
              id="email"
              onChange={handleChange}
              className="w-full mt-1 p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-purple-400"
            />
          </div>

          {/* PASSWORD */}
          {/* <div>
            <label className="text-[10px] sm:text-xs text-gray-400 tracking-widest">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              onChange={handleChange}
              className="w-full mt-1 p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-purple-400"
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
            className="w-full py-3 sm:py-4 text-sm sm:text-base rounded-xl bg-gradient-to-r from-purple-600 to-indigo-500 hover:opacity-90 transition font-medium tracking-widest"
          >
            {loading ? "UPDATING..." : "SAVE CHANGES"}
          </button>

        </form>

        {/* FOOTER */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 text-xs sm:text-sm pt-4 border-t border-white/10">

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









































// return (
  //   <div className="flex flex-col lg:flex-row min-h-screen overflow-hidden lg:space-x-8">
  //     {/* Sidebar */}
  //     <div className="lg:w-64 bg-slate-200 shadow-xl flex-shrink-0">
  //       <StudentHeader />
  //     </div>

  //     {/* Main Content */}
  //     <div className="flex-1 min-h-screen border border-gray-200 shadow-2xl bg-white p-4 sm:p-6 text-black overflow-y-auto">
  //       <div className="p-3 max-w-lg mx-auto w-full">
  //         <h1 className="text-2xl sm:text-3xl font-semibold text-center my-7">Profile</h1>

  //         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
  //           <input type="file" ref={fileref} onChange={handleImageChange} hidden accept="image/*" />

  //           <div className="relative w-24 h-24 mx-auto">
  //             {uploading ? (
  //               <div className="absolute inset-0 flex items-center justify-center bg-gray-300 bg-opacity-50 rounded-full">
  //                 <span className="text-sm text-gray-700">Uploading...</span>
  //               </div>
  //             ) : (
  //               <img
  //                 onClick={() => fileref.current.click()}
  //                 src={avatarPreview}
  //                 alt="profile"
  //                 className="rounded-full h-24 w-24 object-cover mt-2 self-center cursor-pointer"
  //               />
  //             )}
  //           </div>

  //           <input
  //             type="text"
  //             placeholder="username"
  //             defaultValue={currentUser.name}
  //             onChange={handleChange}
  //             id="username"
  //             className="border p-3 rounded-lg w-full"
  //           />

  //           <input
  //             type="email"
  //             placeholder="email"
  //             id="email"
  //             defaultValue={currentUser.email}
  //             onChange={handleChange}
  //             className="border p-3 rounded-lg w-full"
  //           />

  //           <input
  //             type="password"
  //             placeholder="password"
  //             id="password"
  //             onChange={handleChange}
  //             className="border p-3 rounded-lg w-full"
  //           />

  //           <button
  //             disabled={loading}
  //             className="bg-slate-700 p-3 uppercase text-white hover:opacity-95 rounded-lg disabled:opacity-80"
  //           >
  //             {loading ? 'Updating...' : 'Update'}
  //           </button>
  //         </form>

  //         <div className="flex justify-between mt-5 text-sm sm:text-base">
  //           <span onClick={handleDelete} className="text-red-700 cursor-pointer">Delete Account</span>
  //           <span onClick={handleSignout} className="text-red-700 cursor-pointer">Sign-out</span>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );




