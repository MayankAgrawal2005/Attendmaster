
import React from 'react';
import { useState,useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showError,showSuccess } from '../styles/toast';
import { AdminHeader } from '../components/AdminHeader';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { updateUserFailure,updateUserSuccess, updateUserStart,
    deleteUserFailure,deleteUserStart,deleteUserSuccess,
    signOutUserFailure ,signOutUserStart,signOutUserSuccess } from '../redux/user/userSlice';

export const Profile = () => {

    const {currentUser,loading,error}=useSelector((state)=>state.user);
    const [showPassword, setShowPassword] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileref = useRef(null);
    const [formData,setFormData] = useState({});
    const [avatarPreview, setAvatarPreview] = useState(currentUser?.avatar || "");
    const dispatch= useDispatch();

    const handleChange = (e)=>{
        setFormData({...formData,[e.target.id]:e.target.value});
    }

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
      
        if (file) {
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
              const imageUrl = data.secure_url;
      
              setFormData((prev) => ({
                ...prev,
                avatar: imageUrl,
              }));
      
              setAvatarPreview(imageUrl);
            }
          } catch (error) {
            showError("Failed to upload image");
            console.error(error);
          }
          finally {
            setUploading(false);
        }
        }
      };

    const handleSubmit = async(e) =>{
        e.preventDefault();

        try{
            dispatch(updateUserStart());
        
            const res = await fetch(`/api/auth/update-user/${currentUser._id}`,{
              method:'POST',
              headers:{ 'Content-Type':'application/json' },
              body:JSON.stringify(formData),
            });

            const data = await res.json();
            if(data.success===false){
              showError(data.message);
              dispatch(updateUserFailure(data.message));
              return;
            }
            showSuccess("Profile updated successfully");
             dispatch(updateUserSuccess(data));

          }catch(error){
              showError("Failed to update profile");
           dispatch(updateUserFailure(error.message));
          }
 }

 const handleDelete = async()=>{
    try{
     dispatch(deleteUserStart());
     const res =  await fetch(`/api/auth/delete/${currentUser._id}`,{
        method:'DELETE',
     });

     const data = await res.json();
     if(data.success===false){
      showError(data.message);
       dispatch(deleteUserFailure(data.message));
       return
     }
      showSuccess("Account deleted successfully");
     dispatch(deleteUserSuccess(data));

    }catch(error){
      showError("Failed to delete account");
     dispatch(deleteUserFailure(error.message));
    }
 }

  const  handleSignout = async() =>{
    try{
     dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if(data.success === false){
        showError(data.message);
       dispatch(signOutUserFailure(data.message));
       return;
      }
        showSuccess("Signed out successfully");
      dispatch(signOutUserSuccess(data));
    }catch(error){
      showError("Failed to sign out");
      dispatch(signOutUserFailure(error.message));
    }
  }

  // return (

  //   <div className='flex min-h-screen bg-[#070b14] text-white'>

  //     {/* SIDEBAR */}
  //     <div>
  //       <AdminHeader />
  //     </div>

  //     {/* MAIN */}
  //     <div className='flex-1 flex justify-center items-center p-6'>

  //       <div className='w-full max-w-lg p-8 rounded-3xl 
  //       bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl'>

  //         <h1 className='text-3xl font-bold text-center mb-6'>
  //           Profile Settings
  //         </h1>

  //         <form onSubmit={handleSubmit} className='flex flex-col gap-5'>

  //           {/* FILE INPUT */}
  //           <input 
  //             type='file' 
  //             ref={fileref} 
  //             onChange={handleImageChange} 
  //             hidden 
  //             accept='image/*'
  //           />

  //           {/* AVATAR */}
  //           <div className="relative w-28 h-28 mx-auto group">

  //             {uploading ? (
  //               <div className="absolute inset-0 flex items-center justify-center 
  //               bg-black/50 rounded-full text-sm z-10">
  //                 Uploading...
  //               </div>
  //             ) : (
  //               <img
  //                 onClick={() => fileref.current && fileref.current.click()}
  //                 src={avatarPreview}
  //                 alt="profile"
  //                 className="w-28 h-28 rounded-full object-cover cursor-pointer 
  //                 border border-white/20 transition duration-300 group-hover:scale-105 relative z-10"
  //               />
  //             )}

  //             {/* GLOW FIXED */}
  //             <div className="absolute inset-0 rounded-full 
  //             bg-violet-500/20 blur-xl opacity-0 group-hover:opacity-100 
  //             transition pointer-events-none"></div>

  //           </div>

  //           {/* INPUTS */}
  //           <input 
  //             type='text' 
  //             defaultValue={currentUser.username}
  //             onChange={handleChange} 
  //             id='username'
  //             className='p-3 rounded-xl bg-white/5 border border-white/10 
  //             outline-none focus:ring-2 focus:ring-violet-500'
  //           />

  //           <input 
  //             type='email' 
  //             defaultValue={currentUser.email}
  //             onChange={handleChange}
  //             id='email'
  //             className='p-3 rounded-xl bg-white/5 border border-white/10 
  //             outline-none focus:ring-2 focus:ring-violet-500'
  //           />

  //           <input 
  //             type='password' 
  //             placeholder='password'
  //             onChange={handleChange} 
  //             id='password'
  //             className='p-3 rounded-xl bg-white/5 border border-white/10 
  //             outline-none focus:ring-2 focus:ring-violet-500'
  //           />

  //           {/* BUTTON */}
  //           <button 
  //             disabled={loading}
  //             className='py-3 rounded-xl bg-gradient-to-r 
  //             from-violet-600 to-pink-500 hover:scale-105 transition font-semibold'>
  //             {loading ? 'Updating...' : 'Update'}
  //           </button>

  //         </form>

  //         {/* ACTIONS */}
  //         <div className='flex justify-between mt-6 text-sm'>

  //           <span 
  //             onClick={handleDelete} 
  //             className='text-red-400 cursor-pointer hover:underline'>
  //             Delete Account
  //           </span>

  //           <span 
  //             onClick={handleSignout} 
  //             className='text-red-400 cursor-pointer hover:underline'>
  //             Sign-out
  //           </span>

  //         </div>

  //       </div>

  //     </div>

  //   </div>
  // )

 return (
  <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#020617] text-white flex">

    {/* Sidebar */}
    <div >
      <AdminHeader />
    </div>

    {/* Main */}
    <div className="flex-1 flex items-center justify-center p-6">

      <div className="w-full max-w-xl bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 space-y-6">

        {/* TOP TAG */}
        <div className="flex justify-center">
          <span className="px-4 py-1 text-xs tracking-widest rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
            • ADMIN ACCOUNT
          </span>
        </div>

        {/* TITLE */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl shimmer-text hero-title sm:text-4xl profile-title">
            My Profile
          </h1>
          <p className="label-text">
            MANAGE SYSTEM ACCESS
          </p>
        </div>

        {/* AVATAR */}
        <div className="flex justify-center">
          <div className="relative w-28 h-28 group">

            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full text-xs z-10">
                Uploading...
              </div>
            )}

            <img
              onClick={() => fileref.current.click()}
              src={avatarPreview}
              alt="profile"
              className="w-28 h-28 rounded-full object-cover border-2 border-violet-400 cursor-pointer shadow-lg transition group-hover:scale-105"
            />

            {/* GLOW */}
            <div className="absolute inset-0 rounded-full bg-violet-500/20 blur-xl opacity-0 group-hover:opacity-100 transition"></div>

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
              defaultValue={currentUser.username}
              onChange={handleChange}
              className="w-full mt-1 p-4 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-violet-400"
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
              className="w-full mt-1 p-4 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-violet-400"
            />
          </div>

          {/* PASSWORD */}
          {/* <div>
            <label className="label-text">PASSWORD</label>
            <input
              type="password"
              id="password"
              onChange={handleChange}
              className="w-full mt-1 p-4 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-violet-400"
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
            className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 hover:opacity-90 transition font-medium tracking-widest"
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
}