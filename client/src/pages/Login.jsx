import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login, sendingMailForResetPassword } from '../redux/Auth/authActions';
import { Link, useNavigate } from 'react-router-dom';
import { HiEyeOff, HiEye } from "react-icons/hi";
import loginBg from '../assets/signup_login_bg.png'
import { ImSpinner2 } from "react-icons/im";
import Logo from '../assets/Logo';
import { motion } from 'framer-motion'
import { Input } from "@material-tailwind/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Login() {
  const [userName, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showForgetPass, setShowForgetPass] = useState(false)
  const [email, setEmail] = useState('')

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(state => state.auth.loading);
  const msg = useSelector(state => state.auth.msg);
  const error = useSelector(state => state.auth.error);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const mailSent = useSelector(state => state.auth.mailSent);
  const mailSending = useSelector(state => state.auth.mailSending);

  const Login = () => {
    if (userName == '' || password == '') {
      toast.warn('Please fill both username and password')
    } else {
      dispatch(login(userName, password))
    }
  }

  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!mailSending && mailSent) {
      toast.success('Mail has been sent, Please check your email address')
      setEmail('')
    }
    if (!isLoading && isAuthenticated && token) {
      toast.success('Login successfull')
      setTimeout(() => {
        navigate('/')
      }, 2000);
    }
    if (error) {
      toast.error(error)
    }
  }, [mailSending, isLoading])

  const sendMail = () => {
    if (email == '') {
      toast.warn('Please fill your email address')
    } else {
      dispatch(sendingMailForResetPassword({ email }))
    }
  }

  return (
    <>
      <ToastContainer />
      <div className='lg:grid gap-8 grid-cols-2' >
        <div className='hidden lg:flex' >
          <img src={loginBg} alt="" className='w-full h-[99.9vh]' />
        </div>
        <div className='flex justify-center mt-[15%]' >
          <div className='lg:w-[60%] md:w-[60%] w-[85%]'   >
            <div className=' flex justify-center items-center flex-col mb-3' >
              <Logo />
              <h2 className='font-bold text-lg' >ShopeZ</h2>
              <p>One stop shopping destination.</p>
            </div>
            <div>
              <Input color='cyan' variant="standard" label="Username" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className='flex my-2 mt-5' >
              <Input type={showPassword ? 'text' : 'password'} color='cyan' variant="standard" label="Password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
              <button
                className='text-[#00AAC3] absolute lg:right-36 md:right-44 right-10 pt-5'
                onClick={() => setShowPassword(!showPassword)} >{showPassword ? <HiEyeOff /> : <HiEye />}</button>
            </div>
            <motion.button
              disabled={isLoading}
              whileTap={!isLoading ? { scale: 0.9 } : {}}
              className='bg-[#00AAC3] text-white w-full rounded-lg py-1 mt-6 flex justify-center items-center h-10'
              onClick={Login} >
              {isLoading ? <span className='animate-spin' ><ImSpinner2 /></span> : <span>Login</span>}
            </motion.button>
            <p className='mt-4' >Don't have an account? <Link to="/signup" className='text-[#00AAC3] font-semibold' >Sign up</Link></p>
            <p className='font-semibold text-[#00AAC3] mt-2 cursor-pointer' onClick={() => setShowForgetPass(!showForgetPass)} >Forget Password</p>
            {
              showForgetPass &&
              <motion.div
                animate={{ y: "20px" }}
                transition={{ duration: 0.3 }}
                className='flex gap-2'>
                <Input value={email} type="email" color='cyan' variant="standard" label="Email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                <button
                  className='text-white px-3 py-1 rounded bg-[#00AAC3] flex justify-center items-center h-10' onClick={sendMail} >
                  {mailSending ? <span className='animate-spin' ><ImSpinner2 /></span> : <span>Send</span>}
                </button>
              </motion.div>
            }
          </div>
        </div>
      </div>
    </>

  )
}
