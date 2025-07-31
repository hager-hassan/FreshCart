import { useFormik } from "formik";
import { useContext, useState } from "react";
import { object, string, ref } from "yup";
import { AuthContext } from "../../Context/Auth.context";
import axios from "axios";
import toast from "react-hot-toast";
import { BiHide , BiShow } from "react-icons/bi";


export default function UpdatePassword({ setShowUpdatePass, logout }) {
  const { token } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = object({
    currentPassword: string().required("! This field required"),

    password: string()
      .required("! This field required")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "! Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),

    rePassword: string()
      .required("! This field required")
      .oneOf(
        [ref("password")],
        "! Password and confirm password must be the same"
      ),
  });

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    onSubmit: updatePassword,
    validationSchema,
  });

  async function updatePassword() {
    setIsLoading(true);
    try {
      await axios.put(
        "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
        {
          currentPassword: formik.values.currentPassword,
          password: formik.values.password,
          rePassword: formik.values.rePassword,
        },
        {
          headers: {
            token: token,
          },
        }
      );

      toast.success("Password updated successfully");
      setShowUpdatePass(false);
      setTimeout(() => {
        logout();
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.errors.msg);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="check-out w-full h-fit mx-6 max-w-3xl bg-white rounded shadow-xl p-5 relative">
      <header>
        <h2 className="text-main-color-hover font-bold text-xl text-center py-5">
          Update Password
        </h2>
      </header>

      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        <div className={isLoading ? "animate-pulse" : ""}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="currentPassword"
              id="floating_currentPass"
              className="block py-2.5 px-0 w-full text-sm text-gray-700 font-semibold bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-main-color-hover peer"
              placeholder=" "
              required
              value={formik.values.currentPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="floating_currentPass"
              className="peer-focus:font-semibold absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-color-hover peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Current Password
            </label>
            {formik.errors.currentPassword && (
              <p className="mt-2 text-red-700 text-xs font-semibold">
                {formik.errors.currentPassword}
              </p>
            )}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password"
              id="floating_newPass"
              className="block py-2.5 px-0 w-full text-sm text-gray-700 font-semibold bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-main-color-hover peer"
              placeholder=" "
              required
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="floating_newPass"
              className="peer-focus:font-semibold absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-color-hover peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              New Password
            </label>
            {formik.errors.password && (
              <p className="mt-2 text-red-700 text-xs font-semibold">
                {formik.errors.password}
              </p>
            )}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="rePassword"
              id="floating_confirmNewPass"
              className="block py-2.5 px-0 w-full text-sm text-gray-700 font-semibold bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-main-color-hover peer"
              placeholder=" "
              required
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="floating_confirmNewPass"
              className="peer-focus:font-semibold absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-color-hover peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Confirm New Password
            </label>
            {formik.errors.rePassword && (
              <p className="mt-1 text-red-700 text-xs font-semibold">
                {formik.errors.rePassword}
              </p>
            )}
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-7">
          <button
            name="cashOrder"
            type="submit"
            className="text-white text-sm font-bold cursor-pointer bg-main-color px-4 py-2 rounded 
                transition-all duration-500 md:text-base hover:bg-main-color-hover"
          >
            Update
          </button>

          <button
            type="button"
            className="font-bold text-sm cursor-pointer border-2 border-main-color text-main-color px-3.5 py-1.5 
                rounded transition-all duration-500 md:text-base hover:text-main-color-hover hover:border-main-color-hover"
            onClick={() => setShowUpdatePass(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
