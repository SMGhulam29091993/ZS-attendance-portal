import React, { useEffect, useRef, useState } from 'react';
import { FaPen } from "react-icons/fa";
import { userSelector } from '../redux/user/userSlice';
import {useSelector} from "react-redux";
import { Link, useParams } from 'react-router-dom';
import axios from "axios";

const Profile = () => {
  const {currentUser, token} = useSelector(userSelector);
  const fileRef = useRef(null);
  const [file,setFile] = useState(null);
  const [image,setImage] = useState("")
  const params = useParams();
  const userID = params.userID
  console.log(userID);


  const fetchImage = async ()=>{
    try {
      const resImage = await axios.get(`http://localhost:8000/api/v1/user/get-image/${userID}`);
      const responseData = resImage.data;
      console.log(responseData.image);
      if (responseData.success) {
        setImage(responseData.image);
        setFile(null)
      }
    } catch (error) {
      console.log(`Error in getting Image from frontend side ${error}`);
    }
  }
  
  useEffect(() => {
    fetchImage();
  }, []); // Run once on component mount

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post(`http://localhost:8000/api/v1/user/uploadImage/${userID}`,formData);
      const responseData = res.data;
      console.log(responseData.message);
      if (responseData.success) {
        fetchImage(); // Update image after successful upload
      }

    } catch (error) {
      console.error('Error uploading image: ', error);
    }
  }


  return (
    <>
      <div className='max-w-6xl my-5 border border-black mx-auto'>
        <div className='max-w-xs sm:max-w-lg border border-red-600 p-2 flex flex-col'>
          <div className='image-name-container p-2 flex gap-4 items-center'>
            <form encType='multipart/form-data' className='flex flex-col gap-2' onSubmit={handleSubmit}>
              <input type="file" accept='image/.*' id="image" ref={fileRef} hidden onClick={(e)=>e.stopPropagation()} onChange={(e)=>setFile(e.target.files[0])}/>
              <img src={`http://localhost:8000/${image}`} alt="profileImage" className='h-16 w-16 sm:h-36 sm:w-36 rounded-full border border-black cursor-pointer self-center'
               onClick={()=>fileRef.current.click()}/>
              {file && <button className='bg-blue-600 p-1 rounded text-white uppercase'>Upload Image</button>}
            </form>
            
            <div className='flex flex-col'>
              <p className='text-sm sm:text-lg'>{currentUser?currentUser.name : "NAME"}</p>
              <p className='text-sm sm:text-lg'>{currentUser?currentUser.email :"EMAIL"}</p>
              <p className='text-sm sm:text-lg'>{currentUser?currentUser.designation: "DESIGNATION"}</p>
              <p className='text-sm sm:text-lg'>{currentUser?currentUser.organization : "ORGANIZATION"}</p>
            </div>
          </div> 
          <Link to={`/update-profile/${currentUser._id}`}>
            <p className='flex gap-2 items-center mx-5 bg-orange-400 p-2 rounded-lg justify-center font-semibold text-white'>Update Profile <FaPen/></p>
          </Link>
                  
        </div>        
      </div>
    </>
  )
}

export default Profile