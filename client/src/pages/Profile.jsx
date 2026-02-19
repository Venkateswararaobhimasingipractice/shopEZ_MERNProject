import React, { useState, useRef } from 'react';
import { ImSpinner2 } from "react-icons/im";
import TermsAndCondition from '../components/TermsAndCondition';
import { HiEyeOff, HiEye } from "react-icons/hi";
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input } from "@material-tailwind/react";
import profileBg from "../assets/profile_bg.png"

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false)
  const [fullNameModal, setFullNameModal] = useState(false)
  const [passwordModal, setPasswordModal] = useState(false)
  const [fullName, setFullname] = useState(user.fullName)
  const [password, setPassword] = useState(user.password)
  const [updateLoader, setUpdateLoader] = useState(false)
  const [showTandC, setShowTandC] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const baseUrl = process.env.REACT_APP_BASE_URL;


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    uploadPhoto(file);
  };

  const uploadPhoto = async (file) => {
    if (!file) {
      toast.warn('Please select a photo.');
      return;
    }

    setLoading(true)
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'manyavar');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/drijzhqfp/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await response.json();
      let avatar = data.url;
      await fetch(`${baseUrl}/users/edit/${user._id}`, {
        method: "PATCH",
        body: JSON.stringify({ "avatar": avatar }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }).then(res => res.json())
        .then(res => {
          setUser(res.data)
          localStorage.setItem('user', JSON.stringify(res.data))
        })
        .catch(err => console.log(err))

      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error('Something went wrong');
      console.error('Error uploading image:', error);
    }
  };


  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const updateUserData = async () => {
    setUpdateLoader(true)

    let payload = {
      fullName,
      password
    }

    await fetch(`${baseUrl}/users/edit/${user._id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    }).then(res => res.json())
      .then(res => {
        if (res.success) {
          setUser(res.data)
          localStorage.setItem('user', JSON.stringify(res.data))
          toast.success('User data has been updated')
        }

        setFullNameModal(false)
        setPasswordModal(false)
        setUpdateLoader(false)

      })
      .catch(err => {
        toast.error('Something went wrong')
        console.log(err)
        setFullNameModal(false)
        setPasswordModal(false)
        setUpdateLoader(false)
      })
  }

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <div className='border h-[250px] bg-no-repeat bg-cover' style={{backgroundImage: `url(${profileBg})`}}>
      </div>
      <div className='absolute w-full top-20 flex justify-center items-center flex-col'>
        <div className='' >
          <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
          <img src={user?.avatar} alt=""
            className={`border-2 w-28 rounded-full  relative top-16 ${loading ? 'bg-black opacity-10' : ''}`}
            onClick={handleImageClick} style={{ cursor: 'pointer' }} />
          <button className=' w-28 flex justify-center relative bottom-20 text-[30px] text-[#00AAC3]' >{loading && <span className='animate-spin' ><ImSpinner2 /></span>}</button>
        </div>
        <div className='shadow-lg border rounded-xl p-20 bg-white' >
          <div>
            <p>{user?.userName}</p>
            <p>{user?.email}</p>
            <p>Full Name: {user?.fullName}</p>
            <button
              onClick={() => {
                setFullNameModal(true)
                setPasswordModal(false)
              }}
              className='bg-[#00AAC3] text-white px-2 py-0.5 mt-2'
            >Update Profile</button>
          </div>
          <div className='flex gap-10 mt-10' >
            <button
              onClick={() => {
                setShowTandC(true)
                localStorage.removeItem('hasAcceptedTerms')
              }}
              className='bg-[#00AAC3] text-white px-2 py-0.5 mt-2'
            >See T & C</button>
            <button
              onClick={() => {
                setFullNameModal(false)
                setPasswordModal(true)
              }}
              className='bg-[#00AAC3] text-white px-2 py-0.5 mt-2'
            >Change Password</button>
          </div>
        </div>
      </div>

      {
        showTandC && <TermsAndCondition />
      }


      {
        fullNameModal || passwordModal ?

          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <motion.div
              whileInView={{ scale: 1.2 }}
              className="bg-white p-8 ">
              {fullNameModal && (
                <div className='mb-4' >
                  <h2 className='mb-3' >Update Full Name</h2>
                  <Input defaultValue={user.fullName} color='cyan' variant="standard" label="Full Name" placeholder="Enter new full name" onChange={(e) => setFullname(e.target.value)} />
                </div>
              )}
              {passwordModal && (
                <div>
                  <p>Update password</p>
                  <div className='flex my-2 mt-6 ' >
                    <Input type={showPassword ? 'text' : 'password'} color='cyan' variant="standard" label="New Passsword" placeholder="Enter new password" onChange={(e) => setPassword(e.target.value)} />
                    <button
                      className='text-[#00AAC3] absolute right-10 pt-5'
                      onClick={() => setShowPassword(!showPassword)} >{showPassword ? <HiEyeOff /> : <HiEye />}</button>
                  </div>
                </div>
              )}
              <div className="flex justify-center">
                <button
                  className="mr-2 px-4 py-0.5 text-white bg-[#00AAC3] rounded "
                  onClick={() => {
                    setFullNameModal(false);
                    setPasswordModal(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-0.5 text-white bg-[#00AAC3] rounded flex justify-center items-center h-10 "
                  onClick={updateUserData}
                >
                  {updateLoader ? <span className='animate-spin' ><ImSpinner2 /></span> : <span>Update</span>}

                </button>
              </div>
            </motion.div>
          </div> : ''
      }


    </div>
  );
};

export default Profile;

