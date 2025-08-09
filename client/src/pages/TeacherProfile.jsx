import React from 'react';
import { useState,useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TeacherHeader } from './TeacherHeader';
import { updateUserFailure,updateUserSuccess, updateUserStart,
  deleteUserFailure,deleteUserStart,deleteUserSuccess,
  signOutUserFailure ,signOutUserStart,signOutUserSuccess } from '../redux/user/userSlice';

export const TeacherProfile = () => {
 const [uploading, setUploading] = useState(false);
  const {currentUser,loading,error}=useSelector((state)=>state.user);
      const fileref = useRef(null);
      const [formData,setFormData] = useState({});
      const [avatarPreview, setAvatarPreview] = useState(currentUser?.avatar || "");
      const dispatch= useDispatch();
      console.log("currentUser is",currentUser);
  
      const handleChange = (e)=>{
      
          setFormData({...formData,[e.target.id]:e.target.value});
  
      }

      const handleImageChange = async (e) => {
        const file = e.target.files[0];
      
        if (file) {
          setUploading(true); 
          // Set up a FormData object to send to the Cloudinary API
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', 'mayank'); 
          formData.append("cloud_name", "diqum6tfd");
      
          try {
            // Upload the image to Cloudinary
            const res = await fetch("https://api.cloudinary.com/v1_1/diqum6tfd/image/upload", {
              method: 'POST',
              body: formData,
            });
      
            // Parse the JSON response
            const data = await res.json();
      
            // Check if the secure_url is available in the response
            if (data.secure_url) {
              const imageUrl = data.secure_url;  // The URL of the uploaded image
      
              // Update the formData with the image URL
              setFormData((prev) => ({
                ...prev,
                avatar: imageUrl,  // Save the Cloudinary URL
              }));
      
              // Update the preview with the Cloudinary URL
              setAvatarPreview(imageUrl);
            } else {
              console.error("Cloudinary upload failed, secure_url is missing in the response");
            }
          } catch (error) {
            console.error("Error uploading image to Cloudinary:", error);
          }
          finally {
            setUploading(false); // Stop uploading state after request
        }
        }
      };


 const handleSubmit = async(e) =>{
         e.preventDefault();
 
         try{
 
             dispatch(updateUserStart());
         
             
             const res = await fetch(`/api/auth/update-teacher/${currentUser._id}`,{
             method:'POST',
               headers:{
                 'Content-Type':'application/json',
               },
               body:JSON.stringify(formData),
         
             }) ;
         
             const data = await res.json();
             if(data.success===false){
               dispatch(updateUserFailure(data.message));
               return;
             }
         
              dispatch(updateUserSuccess(data));
              setUpdateSuccess(true);
         
           }catch(error){
            dispatch(updateUserFailure(error.message));
         
           }
  }


  const handleDelete = async()=>{
  
      try{
   
       dispatch(deleteUserStart());
       const res =  await fetch(`/api/auth/delete-teacher/${currentUser._id}`,{
   
          method:'DELETE',
    });
   
     const data = await res.json();
     if(data.success===false){
       dispatch(deleteUserFailure(data.message));
       return
     }
   
   
      dispatch(deleteUserSuccess(data));
   
   
   
      }catch(error){
       dispatch(deleteUserFailure(error.message));
      }
   
    }

    const  handleSignout = async() =>{
    
        try{
         dispatch(signOutUserStart());
          const res = await fetch('/api/auth/signout-teacher');
     
          const data = await res.json();
          if(data.success === false){
           dispatch(signOutUserFailure(data.message));
           return;
          }
     
          dispatch(signOutUserSuccess(data));
     
        }catch(error){
      dispatch(signOutUserFailure(data.message));
        }
        
      }

  return (
    <div className='flex h-screen space-x-8'>

    <div>
        <TeacherHeader className='w-64 bg-slate-200 shadow-xl'/>
        </div>


        <div className='flex-1 min-h-screen border border-gray-200 shadow-2xl  bg-white p-6 text-black'>

   
<div className='p-3 max-w-lg mx-auto  '>
 
  <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>

  <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
  <input type='file' ref={fileref} onChange={handleImageChange} hidden accept='image/*'/>


  <div className="relative w-24 h-24 mx-auto">
  {uploading ? (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-300 bg-opacity-50 rounded-full">
      <span className="text-sm text-gray-700">Uploading...</span>
    </div>
  ) : (
    <img
      onClick={() => fileref.current.click()}
      src={avatarPreview}
      alt="profile"
      className="rounded-full h-24 w-24 object-cover mt-2 self-center cursor-pointer"
    />
  )}
</div>
<input type='text' placeholder='username' defaultValue={currentUser.name}
onChange={handleChange} id='username' className=' border p-3 rounded-lg '/>


<input type='email' placeholder='email' id='email'  defaultValue={currentUser.email}
onChange={handleChange}className=' border p-3 rounded-lg '/>


<input type='password' placeholder='password' id='password'
 onChange={handleChange} className=' border p-3 rounded-lg '/>

<button disabled={loading} className='bg-slate-700 p-3 uppercase text-white hover:opacity-95 rounded-lg disabled:opacity-80'>{loading ? 'Updating...':'Update'}</button>

 

  </form>

  <div className='flex justify-between mt-5'>
    <span  onClick={handleDelete} className='text-red-700 cursor-pointer'>Delete Account</span>
    <span onClick={handleSignout} className='text-red-700 cursor-pointer'>Sign-out</span>

  </div>

</div>

</div>

    </div>
  )
}
