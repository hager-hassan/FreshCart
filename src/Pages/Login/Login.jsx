import React, { useContext, useState } from 'react'
import { useFormik } from 'formik';
import { FaRegUserCircle } from "react-icons/fa";
import { BiHide , BiShow } from "react-icons/bi";
import axios from 'axios';
import { object, string } from 'yup';
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';
import { AuthContext } from '../../Context/Auth.context';

export default function Login() {
  const [isPassHidden , setIsPassHidden] = useState(true);
  const [isLoggingIn , setIsLoggingIn] = useState(false);
  const {setToken , setUserEmail } = useContext(AuthContext);

  function handlePass(){
    setIsPassHidden(!isPassHidden);
  }

    const validationSchema = object({
    email:string().required().email('! Enter valid email'),
    password:string().required(),
  })

  const formik = useFormik({
    initialValues:{
      email:"",
      password:""
    },
    onSubmit: login,
    validationSchema,
  })

  async function login(values) {
    let loadingToast = toast.loading("logging in..");
    setIsLoggingIn(true);
    try {
    const {data} = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/signin",
      values
    );
      formik.resetForm();
      setIsPassHidden(true);
      localStorage.setItem('token' , data.token);
      setToken(data.token);
      setUserEmail(data.user.email);
    } 
    catch (error) {
      console.log(error)
      const message =
      error.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
    } 
    finally{
      toast.dismiss(loadingToast);
      setIsLoggingIn(false);
    }
  }

  return (
    <div className='w-full pb-10 pt-26'> 
      <header className='flex items-center gap-2 text-main-color'>
        <FaRegUserCircle className='text-2xl'/> 
        <h2 className='font-bold text-xl lg:text-2xl'>Login Now</h2>
      </header>

      <div className='my-3'>
        <form onSubmit={formik.handleSubmit} className='space-y-4'>
          <div>
            <input type='email' placeholder='email'
              className='block w-full rounded-sm border-2 border-gray-300 px-2.5 py-1 text-gray-600 outline-0'
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className='relative'>
            <input type={isPassHidden ? 'password' : 'text'} placeholder='password'
              className='block w-full rounded-sm border-2 border-gray-300 px-2.5 py-1 text-gray-600 outline-0'
              name='password'
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {isPassHidden ? 
            <BiHide className='text-main-color absolute text-[18px] right-3 top-[50%] translate-y-[-50%]'
              onClick={() => {
                handlePass();
              }}
            /> :
              <BiShow className='text-main-color absolute text-[18px] right-3 top-[50%] translate-y-[-50%]'
              onClick={() => {
                handlePass();
              }}
              />
            }
          </div>
          
          {((formik.errors.email || formik.errors.password) && (formik.errors.email !== '! Enter valid email'))?
            <p className='font-bold text-sm text-red-800'>! All fields required</p>
            : formik.errors.email === '! Enter valid email' && <p className='font-bold text-sm text-red-800'>! Enter valid email</p>
          }
          

          <div className="mb-0 md:flex justify-between items-center">
            <button 
            className='btn-primary uppercase text-[13px] lg:text-[15px]' 
            type='submit'
            disabled={isLoggingIn}
            >
                login
            </button>
            <div>
              <span className="text-sm text-gray-600 inline-block font-bold pt-3 md:pt-0">You don't have an account? <Link to='/signup' className="text-main-color hover:text-main-color-hover transition-all duration-500">signup</Link> </span>
            </div>
          </div>

          <div>
            <Link to='/forgetPassword' className="mt-2.5 inline-block text-main-color text-[13px] hover:text-main-color-hover transition-all duration-500">Forget password?</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
