import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/Auth/authActions';
import { Link, useNavigate } from 'react-router-dom';
import { HiEyeOff, HiEye } from "react-icons/hi";
import loginBg from '../assets/signup_login_bg.png'
import { ImSpinner2 } from "react-icons/im";
import Logo from '../assets/Logo';
import { Input } from "@material-tailwind/react";
import { motion } from 'framer-motion'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
  const [userName, setUsername] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [showConfPassword, setShowConfPassword] = useState(false)

  const isLoading = useSelector(state => state.auth.loading);
  const msg = useSelector(state => state.auth.msg);
  const error = useSelector(state => state.auth.error);
  const isRegister = useSelector(state => state.auth.isRegister);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signUp = () => {
    if (userName == '' || fullName == '' || email == '' || password == '' || confPassword == '') {
      toast.warn('Please fill all the fields')
    } else if (password !== confPassword) {
      toast.warn('Password and confirm password should be same')
    } else {
      let avatar = "https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png";
      dispatch(register(userName, fullName, email, password, avatar))
    }
  }

  useEffect(() => {
    if (isRegister && !isLoading) {
      toast.success('Register successfully')
      setTimeout(() => {
        navigate('/login')
      }, 2000);
    }
    else if (error?.msg == 'Already have an account please login') {
      toast.info('Already have an account')
      setTimeout(() => {
        navigate('/login')
      }, 2000);
    }
    else if (!isRegister && error) {
      toast.error("Something went wrong")
    }

  }, [isLoading, isRegister])

  return (
    <>
      <ToastContainer />
      <div className='lg:grid gap-8 grid-cols-2' >
        <div className='hidden lg:flex' >
          <img src={loginBg} alt="" className='w-full h-[99.9vh]' />
        </div>
        <div className='flex justify-center mt-[15%]' >
          <div className='lg:w-[60%] md:w-[60%] w-[85%]' >
            <div className=' flex justify-center items-center flex-col mb-4' >
              <Logo />
              <h2 className='font-bold text-lg' >ShopeZ</h2>
              <p>One stop shopping destination.</p>
            </div>
            <div className='mb-3' >
              <Input color='cyan' variant="standard" label="Username" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className='mb-3' >
              <Input color='cyan' variant="standard" label="Full Name" placeholder="Enter Full Name" onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div className='mb-3' >
              <Input type="email" color='cyan' variant="standard" label="Email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='flex my-2' >
              <Input type={showPassword ? 'text' : 'password'} color='cyan' variant="standard" label="Password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
              <button
                className='text-[#00AAC3] absolute lg:right-36 md:right-44 right-10 pt-5'
                onClick={() => setShowPassword(!showPassword)} >{showPassword ? <HiEyeOff /> : <HiEye />}</button>
            </div>

            <div className='flex my-2 ' >
              <Input type={showConfPassword ? 'text' : 'password'} color='cyan' variant="standard" label="Password" placeholder='Confirm password' onChange={(e) => setConfPassword(e.target.value)} />
              <button
                className='text-[#00AAC3] absolute lg:right-36 md:right-44 right-10 pt-5'
                onClick={() => setShowConfPassword(!showConfPassword)} >{showConfPassword ? <HiEyeOff /> : <HiEye />}</button>
            </div>

            <motion.button
              disabled={isLoading}
              whileTap={!isLoading ? { scale: 0.9 } : {}}
              className='bg-[#00AAC3] text-white w-full rounded-lg py-1 mt-6 flex justify-center items-center h-10'
              onClick={signUp} >
              {isLoading ? <span className='animate-spin' ><ImSpinner2 /></span> : <span>Register</span>}
            </motion.button>
            <p className='mt-3' >Already have an account ? <Link to="/login" className='text-[#00AAC3]' >Login</Link></p>
          </div>
        </div>

      </div>
    </>
  )
}
