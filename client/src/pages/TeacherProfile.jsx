// import React from 'react';
// import { useState,useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { TeacherHeader } from './TeacherHeader';
// import { updateUserFailure,updateUserSuccess, updateUserStart,
//   deleteUserFailure,deleteUserStart,deleteUserSuccess,
//   signOutUserFailure ,signOutUserStart,signOutUserSuccess } from '../redux/user/userSlice';

// export const TeacherProfile = () => {
//  const [uploading, setUploading] = useState(false);
//   const {currentUser,loading,error}=useSelector((state)=>state.user);
//       const fileref = useRef(null);
//       const [formData,setFormData] = useState({});
//       const [avatarPreview, setAvatarPreview] = useState(currentUser?.avatar || "");
//       const dispatch= useDispatch();
//       console.log("currentUser is",currentUser);
  
//       const handleChange = (e)=>{
      
//           setFormData({...formData,[e.target.id]:e.target.value});
  
//       }

//       const handleImageChange = async (e) => {
//         const file = e.target.files[0];
      
//         if (file) {
//           setUploading(true); 
//           // Set up a FormData object to send to the Cloudinary API
//           const formData = new FormData();
//           formData.append('file', file);
//           formData.append('upload_preset', 'mayank'); 
//           formData.append("cloud_name", "diqum6tfd");
      
//           try {
//             // Upload the image to Cloudinary
//             const res = await fetch("https://api.cloudinary.com/v1_1/diqum6tfd/image/upload", {
//               method: 'POST',
//               body: formData,
//             });
      
//             // Parse the JSON response
//             const data = await res.json();
      
//             // Check if the secure_url is available in the response
//             if (data.secure_url) {
//               const imageUrl = data.secure_url;  // The URL of the uploaded image
      
//               // Update the formData with the image URL
//               setFormData((prev) => ({
//                 ...prev,
//                 avatar: imageUrl,  // Save the Cloudinary URL
//               }));
      
//               // Update the preview with the Cloudinary URL
//               setAvatarPreview(imageUrl);
//             } else {
//               console.error("Cloudinary upload failed, secure_url is missing in the response");
//             }
//           } catch (error) {
//             console.error("Error uploading image to Cloudinary:", error);
//           }
//           finally {
//             setUploading(false); // Stop uploading state after request
//         }
//         }
//       };


//  const handleSubmit = async(e) =>{
//          e.preventDefault();
 
//          try{
 
//              dispatch(updateUserStart());
         
             
//              const res = await fetch(`/api/auth/update-teacher/${currentUser._id}`,{
//              method:'POST',
//                headers:{
//                  'Content-Type':'application/json',
//                },
//                body:JSON.stringify(formData),
         
//              }) ;
         
//              const data = await res.json();
//              if(data.success===false){
//                dispatch(updateUserFailure(data.message));
//                return;
//              }
         
//               dispatch(updateUserSuccess(data));
//               setUpdateSuccess(true);
         
//            }catch(error){
//             dispatch(updateUserFailure(error.message));
         
//            }
//   }


//   const handleDelete = async()=>{
  
//       try{
   
//        dispatch(deleteUserStart());
//        const res =  await fetch(`/api/auth/delete-teacher/${currentUser._id}`,{
   
//           method:'DELETE',
//     });
   
//      const data = await res.json();
//      if(data.success===false){
//        dispatch(deleteUserFailure(data.message));
//        return
//      }
   
   
//       dispatch(deleteUserSuccess(data));
   
   
   
//       }catch(error){
//        dispatch(deleteUserFailure(error.message));
//       }
   
//     }

//     const  handleSignout = async() =>{
    
//         try{
//          dispatch(signOutUserStart());
//           const res = await fetch('/api/auth/signout-teacher');
     
//           const data = await res.json();
//           if(data.success === false){
//            dispatch(signOutUserFailure(data.message));
//            return;
//           }
     
//           dispatch(signOutUserSuccess(data));
     
//         }catch(error){
//       dispatch(signOutUserFailure(data.message));
//         }
        
//       }

//   return (
//     <div className='flex h-screen space-x-8'>

//     <div>
//         <TeacherHeader className='w-64 bg-slate-200 shadow-xl'/>
//         </div>


//         <div className='flex-1 min-h-screen border border-gray-200 shadow-2xl  bg-white p-6 text-black'>

   
// <div className='p-3 max-w-lg mx-auto  '>
 
//   <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>

//   <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
//   <input type='file' ref={fileref} onChange={handleImageChange} hidden accept='image/*'/>


//   <div className="relative w-24 h-24 mx-auto">
//   {uploading ? (
//     <div className="absolute inset-0 flex items-center justify-center bg-gray-300 bg-opacity-50 rounded-full">
//       <span className="text-sm text-gray-700">Uploading...</span>
//     </div>
//   ) : (
//     <img
//       onClick={() => fileref.current.click()}
//       src={avatarPreview}
//       alt="profile"
//       className="rounded-full h-24 w-24 object-cover mt-2 self-center cursor-pointer"
//     />
//   )}
// </div>
// <input type='text' placeholder='username' defaultValue={currentUser.name}
// onChange={handleChange} id='username' className=' border p-3 rounded-lg '/>


// <input type='email' placeholder='email' id='email'  defaultValue={currentUser.email}
// onChange={handleChange}className=' border p-3 rounded-lg '/>


// <input type='password' placeholder='password' id='password'
//  onChange={handleChange} className=' border p-3 rounded-lg '/>

// <button disabled={loading} className='bg-slate-700 p-3 uppercase text-white hover:opacity-95 rounded-lg disabled:opacity-80'>{loading ? 'Updating...':'Update'}</button>

 

//   </form>

//   <div className='flex justify-between mt-5'>
//     <span  onClick={handleDelete} className='text-red-700 cursor-pointer'>Delete Account</span>
//     <span onClick={handleSignout} className='text-red-700 cursor-pointer'>Sign-out</span>

//   </div>

// </div>

// </div>

//     </div>
//   )
// }


import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
    } catch (error) {
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
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignout = async () => {
    try {
      dispatch(signOutUserStart());

      const res = await fetch('/api/auth/signout-teacher');
      const data = await res.json();

      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }

      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  // return (
  //   <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#020617] text-white">

  //     {/* SIDEBAR */}
  //     <TeacherHeader />

  //     {/* MAIN CONTENT */}
  //     <div className="md:ml-64 flex justify-center items-center min-h-screen px-4">

  //       <div className="w-full max-w-md">

  //         {/* CARD */}
  //         <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">

  //           <h1 className="text-2xl font-bold text-center mb-6">
  //             Teacher Profile
  //           </h1>

  //           <form onSubmit={handleSubmit} className="flex flex-col gap-4">

  //             {/* IMAGE */}
  //             <input
  //               type="file"
  //               ref={fileref}
  //               onChange={handleImageChange}
  //               hidden
  //             />

  //             <div className="flex justify-center">
  //               <div className="relative">

  //                 {uploading && (
  //                   <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full text-xs">
  //                     Uploading...
  //                   </div>
  //                 )}

  //                 <img
  //                   onClick={() => fileref.current.click()}
  //                   src={avatarPreview}
  //                   alt="profile"
  //                   className="w-24 h-24 rounded-full object-cover border border-white/20 cursor-pointer hover:scale-105 transition"
  //                 />
  //               </div>
  //             </div>

  //             {/* INPUTS */}
  //             <input
  //               type="text"
  //               id="username"
  //               defaultValue={currentUser.name}
  //               onChange={handleChange}
  //               placeholder="Username"
  //               className="p-3 rounded-xl bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-green-500"
  //             />

  //             <input
  //               type="email"
  //               id="email"
  //               defaultValue={currentUser.email}
  //               onChange={handleChange}
  //               placeholder="Email"
  //               className="p-3 rounded-xl bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-green-500"
  //             />

  //             <input
  //               type="password"
  //               id="password"
  //               onChange={handleChange}
  //               placeholder="Password"
  //               className="p-3 rounded-xl bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-green-500"
  //             />

  //             {/* BUTTON */}
  //             <button
  //               disabled={loading}
  //               className="bg-gradient-to-r from-green-500 to-emerald-500 py-3 rounded-xl font-semibold hover:opacity-90"
  //             >
  //               {loading ? 'Updating...' : 'Update Profile'}
  //             </button>
  //           </form>

  //           {/* ACTIONS */}
  //           <div className="flex justify-between mt-6 text-sm">
  //             <span
  //               onClick={handleDelete}
  //               className="text-red-400 cursor-pointer hover:underline"
  //             >
  //               Delete Account
  //             </span>

  //             <span
  //               onClick={handleSignout}
  //               className="text-red-400 cursor-pointer hover:underline"
  //             >
  //               Sign Out
  //             </span>
  //           </div>

  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

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
          <h1 className="text-3xl sm:text-4xl profile-title">
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
          <div>
            <label className="label-text">PASSWORD</label>
            <input
              type="password"
              id="password"
              onChange={handleChange}
              className="w-full mt-1 p-4 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-green-400"
            />
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