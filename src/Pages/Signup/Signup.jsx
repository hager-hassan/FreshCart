import React, { useState } from "react";
import { useFormik } from "formik";
import { FaRegUserCircle } from "react-icons/fa";
import axios from "axios";
import { object, ref, string } from "yup";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { BiHide , BiShow } from "react-icons/bi";

export default function Signup() {
  const [isPassHidden, setIsPassHidden] = useState(true);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isRePassHidden, setIsRePassHidden] = useState(true);

  function handlePass() {
    setIsPassHidden(!isPassHidden);
  }

  function handleRePass() {
    setIsRePassHidden(!isRePassHidden);
  }

  const errorMes = {
    name: "! The name must be between 3 and 15 characters long and can contain up to 5 names",
    email: "! The email must be valid",
    phone: "! The number must be a valid egyptian number",
    password:
      "! Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    rePassword: "! Password and confirm password must be the same",
    required: "! All fields required",
  };

  const regex = {
    name: /^[a-zA-Z]{3,15}(?: [a-zA-Z]{3,15}){0,4}$/,
    email:
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i,
    phone: /^01[0125][0-9]{8}$/,
    password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  };

  const validationSchema = object({
    name: string()
      .required(errorMes.required)
      .min(3, errorMes.name)
      .matches(regex.name, errorMes.name),
    email: string()
      .required(errorMes.required)
      .matches(regex.email, errorMes.email),
    phone: string()
      .required(errorMes.required)
      .matches(regex.phone, errorMes.phone),
    password: string()
      .required(errorMes.required)
      .min(8, errorMes.password)
      .matches(regex.password, errorMes.password),
    rePassword: string()
      .required(errorMes.required)
      .oneOf([ref("password")], errorMes.rePassword),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: signup,
    validationSchema,
  });

  const navigate = useNavigate();

  async function signup(values) {
    let loadingToast = toast.loading("Wait..");
    setIsSigningUp(true);
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      console.log(response);
      toast.success("Account created");

      formik.resetForm();
      setIsPassHidden(true);
      setIsRePassHidden(true);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } 
    catch (error) {
      const message =
      error.response?.data?.message || "Signup failed. Please try again.";
      toast.error(message);
    } 
    finally {
      toast.dismiss(loadingToast);
      setIsSigningUp(false);
    }
  }

  return (
    <div className="w-full pb-10 pt-26">
      <header className="flex items-center gap-2 text-main-color">
        <FaRegUserCircle className="text-2xl" />
        <h2 className="font-bold text-xl lg:text-2xl">Register Now</h2>
      </header>

      {Object.values(formik.errors).includes("! All fields required") && (
        <p className="font-bold text-sm text-red-800 my-4">
          ! All fields required
        </p>
      )}

      <div className="my-3">
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="username"
              className="block w-full rounded-sm border-2 border-gray-300 px-2.5 py-1 text-gray-600 outline-0"
              name="name"
              value={formik.values.name}
              onBlur={formik.onBlur}
              onChange={formik.handleChange}
            />
          </div>
          {formik.touched.name &&
            formik.errors.name !== "! All fields required" &&
            formik.errors.name && (
              <p className="font-bold text-sm text-red-800">
                {formik.errors.name}
              </p>
            )}

          <div>
            <input
              type="email"
              placeholder="email"
              className="block w-full rounded-sm border-2 border-gray-300 px-2.5 py-1 text-gray-600 outline-0"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </div>
          {formik.touched.email &&
            formik.errors.email !== "! All fields required" &&
            formik.errors.email && (
              <p className="font-bold text-sm text-red-800">
                {formik.errors.email}
              </p>
            )}

          <div>
            <input
              type="tel"
              placeholder="phone"
              className="block w-full rounded-sm border-2 border-gray-300 px-2.5 py-1 text-gray-600 outline-0"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
          </div>
          {formik.touched.phone &&
            formik.errors.phone !== "! All fields required" &&
            formik.errors.phone && (
              <p className="font-bold text-sm text-red-800">
                {formik.errors.phone}
              </p>
            )}

          <div className='relative'>
            <input
              type={isPassHidden ? 'password' : 'text'}
              placeholder="password"
              className="block w-full rounded-sm border-2 border-gray-300 px-2.5 py-1 text-gray-600 outline-0"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {isPassHidden ? (
              <BiHide
                className="text-main-color absolute text-[18px] right-3 top-[50%] translate-y-[-50%]"
                onClick={() => {
                  handlePass();
                }}
              />
            ) : (
              <BiShow
                className="text-main-color absolute text-[18px] right-3 top-[50%] translate-y-[-50%]"
                onClick={() => {
                  handlePass();
                }}
              />
            )}
          </div>
          {formik.touched.password &&
            formik.errors.password !== "! All fields required" &&
            formik.errors.password && (
              <p className="font-bold text-sm text-red-800">
                {formik.errors.password}
              </p>
            )}

          <div className='relative'>
            <input
              type={isRePassHidden ? 'password' : 'text'}
              placeholder="confirm password"
              className="block w-full rounded-sm border-2 border-gray-300 px-2.5 py-1 text-gray-600 outline-0"
              name="rePassword"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
            />
            {isRePassHidden ? (
              <BiHide
                className="text-main-color absolute text-[18px] right-3 top-[50%] translate-y-[-50%]"
                onClick={() => {
                  handleRePass();
                }}
              />
            ) : (
              <BiShow
                className="text-main-color absolute text-[18px] right-3 top-[50%] translate-y-[-50%]"
                onClick={() => {
                  handleRePass();
                }}
              />
            )}
          </div>
          {formik.touched.rePassword &&
            formik.errors.rePassword !== "! All fields required" &&
            formik.errors.rePassword && (
              <p className="font-bold text-sm text-red-800">
                {formik.errors.rePassword}
              </p>
            )}

          <div className="md:flex justify-between items-center">
            <button
              className="btn-primary uppercase text-[13px] lg:text-[15px]"
              type="submit"
              disabled={isSigningUp}
            >
              signup
            </button>
            <div>
              <span className="text-sm text-gray-600 inline-block font-bold pt-3 md:pt-0">Already have an account? <Link to='/login' className="text-main-color hover:text-main-color-hover transition-all duration-500">login</Link> </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
