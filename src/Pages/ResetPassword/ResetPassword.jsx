import React, { useState } from "react";
import { useFormik } from "formik";
import { BiHide, BiShow } from "react-icons/bi";
import axios from "axios";
import { object, string } from "yup";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const [isPassHidden, setIsPassHidden] = useState(true);
  const navigate = useNavigate();
  const errorMes = {
    email: "! The email must be valid",
    newPassword: "! Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    required: "! All fields required",
  };
  const regex = {
    email:
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i,
    newPassword: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  };

  function handlePass() {
    setIsPassHidden(!isPassHidden);
  }

  const validationSchema = object({
    email: string()
          .required(errorMes.required)
          .matches(regex.email, errorMes.email),
    newPassword: string()
          .required(errorMes.required)
          .min(8, errorMes.newPassword)
          .matches(regex.newPassword, errorMes.newPassword),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: resetPass,
    validationSchema,
  });

  async function resetPass(values) {
    let loadingToast = toast.loading("Wait..");

    try {
      await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        values
      );
      toast.success("Password reset successfully");
      formik.resetForm();
      setIsPassHidden(true);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(loadingToast);
    }
  }

  return (
    <div className="w-full pb-10 pt-26">
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
        {Object.values(formik.errors).includes("! All fields required") && (
        <p className="font-bold text-sm text-red-800 my-4">
          ! All fields required
        </p>
      )}
          <input
            type="email"
            placeholder="email"
            className="block w-full rounded-sm border-2 border-gray-300 px-2.5 py-1 text-gray-600 outline-0"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
       {formik.touched.email &&
            formik.errors.email !== "! All fields required" &&
            formik.errors.email && (
              <p className="font-bold text-sm text-red-800">
                {formik.errors.email}
              </p>
            )}

        <div className="relative">
          <input
            type={isPassHidden ? "password" : "text"}
            placeholder="New password"
            className="block w-full rounded-sm border-2 border-gray-300 px-2.5 py-1 text-gray-600 outline-0"
            name="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
        {formik.touched.newPassword &&
            formik.errors.newPassword !== "! All fields required" &&
            formik.errors.newPassword && (
              <p className="font-bold text-sm text-red-800">
                {formik.errors.newPassword}
              </p>
            )}

        <div className="mb-0 md:flex justify-between items-center">
          <button
            className="btn-primary uppercase text-[13px] lg:text-[15px]"
            type="submit"
            disabled={formik.isSubmitting}
          >
            reset
          </button>
          <div>
            <Link
              to="/login"
              className="text-sm text-main-color hover:text-main-color-hover transition-all duration-500 inline-block font-bold pt-3 md:pt-0"
            >
              back to login?
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
