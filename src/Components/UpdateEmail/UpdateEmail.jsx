import { useFormik } from "formik";
import { useContext, useState } from "react";
import { object, string } from "yup";
import { AuthContext } from "../../Context/Auth.context";
import axios from "axios";
import toast from "react-hot-toast";

export default function UpdateEmail({ setShowUpdateEmail }) {
  const { token } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataSending, setIsDataSending] = useState(false);

  const validationSchema = object({
    name: string()
      .required("! This field required")
      .matches(
        /^[a-zA-Z]{3,15}(?: [a-zA-Z]{3,15}){0,4}$/,
        "! The name must be between 3 and 15 characters long and can contain up to 5 names"
      ),

    email: string()
      .required("! This field required")
      .matches(
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i,
        "! The email must be valid"
      ),

    phone: string()
      .required("! This field required")
      .matches(/^01[0125][0-9]{8}$/, "! The email must be valid"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    onSubmit: updateUserData,
    validationSchema,
  });

  async function updateUserData() {
    setIsLoading(true);
    setIsDataSending(true);
    try {
      await axios.put(
        "https://ecommerce.routemisr.com/api/v1/users/updateMe/",
        {
          name: formik.values.name,
          email: formik.values.email,
          phone: formik.values.phone,
        },
        {
          headers: {
            token: token,
          },
        }
      );

      toast.success("Information updated successfully");
      setTimeout(() => {
        setShowUpdateEmail(false);
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.errors.msg);
    } finally {
      setIsLoading(false);
      setIsDataSending(false);
    }
  }

  return (
    <div className="check-out w-full h-fit mx-6 max-w-3xl bg-white rounded shadow-xl p-5 relative">
      <header>
        <h2 className="text-main-color-hover font-bold text-xl text-center py-5">
          Update Email
        </h2>
      </header>

      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        <div className={isLoading ? "animate-pulse" : ""}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="name"
              id="floating_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-700 font-semibold bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-main-color-hover peer"
              placeholder=" "
              required
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="floating_name"
              className="peer-focus:font-semibold absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-color-hover peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Name
            </label>
            {formik.errors.name && (
              <p className="mt-2 text-red-700 text-xs font-semibold">
                {formik.errors.name}
              </p>
            )}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-700 font-semibold bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-main-color-hover peer"
              placeholder=" "
              required
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-semibold absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-color-hover peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
            </label>
            {formik.errors.email && (
              <p className="mt-2 text-red-700 text-xs font-semibold">
                {formik.errors.email}
              </p>
            )}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              name="phone"
              id="floating_phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-700 font-semibold bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-main-color-hover peer"
              placeholder=" "
              required
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="floating_phone"
              className="peer-focus:font-semibold absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-color-hover peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone
            </label>
            {formik.errors.phone && (
              <p className="mt-1 text-red-700 text-xs font-semibold">
                {formik.errors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-7">
          <button
            name="cashOrder"
            type="submit"
            disabled={isDataSending}
            className="text-white text-sm font-bold cursor-pointer bg-main-color px-4 py-2 rounded 
                transition-all duration-500 md:text-base hover:bg-main-color-hover"
          >
            Update
          </button>

          <button
            type="button"
            className="font-bold text-sm cursor-pointer border-2 border-main-color text-main-color px-3.5 py-1.5 
                rounded transition-all duration-500 md:text-base hover:text-main-color-hover hover:border-main-color-hover"
            onClick={() => setShowUpdateEmail(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
