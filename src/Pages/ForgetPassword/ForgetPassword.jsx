import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";

export default function ForgetPassword() {
  const [isCodeSent, SetIsCodeSent] = useState(false);
  const navigate = useNavigate();

  const validationSchema = object(
    isCodeSent
      ? {
          resetCode: string().required("Please enter the reset code"),
        }
      : {
          email: string()
            .required("! Please enter your email")
            .email("! Enter valid email"),
        }
  );

  const formik = useFormik({
    initialValues: {
      email: "",
      resetCode: "",
    },
    onSubmit: forgetPass,
    validationSchema,
  });

  async function forgetPass(values) {
    let loadingToast = toast.loading("Wait..");

    try {
      if (!isCodeSent) {
        const email = values.email.trim();

        const response = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
          { email }
        );

        toast.success(response.data.message);
        formik.resetForm();
        SetIsCodeSent(true);
      } else {
        const resetCode = values.resetCode.trim();

        const response = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
          { resetCode }
        );

        toast.success(response.data.message);
        formik.resetForm();
        navigate("/resetPassword");
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(message);
    } finally {
      toast.dismiss(loadingToast);
    }
  }

  return (
    <div className="pb-10 pt-26 w-full">
      <form onSubmit={formik.handleSubmit}>
        {!isCodeSent ? (
          <>
            <div className="text-main-color font-bold flex items-center gap-1 mb-2">
              <MdOutlineEmail className="text-xl" />
              <label
                htmlFor="email"
                className="inline-block text-sm sm:text-[15px] lg:text-base"
              >
                Enter your email
              </label>
            </div>

            <input
              type="email"
              placeholder="email"
              id="email"
              name="email"
              className="block w-full rounded-sm border-2 border-gray-300 px-2.5 py-1 text-gray-600 outline-0"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.errors.email && (
              <p className="font-bold text-sm text-red-800 pt-3">
                {formik.errors.email}
              </p>
            )}
          </>
        ) : (
          <>
            <div className="text-main-color font-bold flex items-center gap-1 mb-2">
              <MdOutlineEmail className="text-xl" />
              <label
                htmlFor="resetCode"
                className="inline-block text-sm sm:text-[15px] lg:text-base"
              >
                Enter the reset code
              </label>
            </div>

            <input
              type="text"
              placeholder="Reset Code"
              id="resetCode"
              name="resetCode"
              className="block w-full rounded-sm border-2 border-gray-300 px-2.5 py-1 text-gray-600 outline-0"
              value={formik.values.resetCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.errors.resetCode && (
              <p className="font-bold text-sm text-red-800 pt-3">
                {formik.errors.resetCode}
              </p>
            )}
          </>
        )}

        <div className="mt-4 md:flex justify-between items-center">
          <button
            className="btn-primary uppercase text-[13px] lg:text-[15px]"
            type="submit"
            disabled={formik.isSubmitting}
          >
            {isCodeSent ? "Verify Code" : "Send"}
          </button>

          <Link
            to="/login"
            className="text-sm text-main-color hover:text-main-color-hover transition-all duration-500 inline-block font-bold pt-3 md:pt-0"
          >
            back to login?
          </Link>
        </div>
      </form>
    </div>
  );
}
