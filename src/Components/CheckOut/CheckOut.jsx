import { useContext, useEffect, useRef, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { AuthContext } from "../../Context/Auth.context";
import axios from "axios";
import { useFormik } from "formik";
import { object, string } from "yup";
import { CartContext } from "../../Context/Cart.context";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CheckOut({ setShowCheckOut }) {
  const { token, userName } = useContext(AuthContext);
  const { cartId, getCart } = useContext(CartContext);
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [allAddresses, setAllAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [creatingAddress, setCreatingAddress] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const clickedButton = useRef("");
  const navigate = useNavigate();

  const validationSchema = object({
    phone: string()
      .required("! This field required")
      .matches(
        /^01[0125][0-9]{8}$/,
        "! The number must be a valid egyptian number"
      ),

    city: string()
      .required("! This field required")
      .matches(
        /^[A-Za-z]{3,20}$/,
        "! The city name must be from 3 to 20 letters"
      ),

    address: string()
      .required("! This field required")
      .matches(
        /^[0-9]{1,5} [a-zA-Z\s]{1,40},? [a-zA-Z\s]{1,40},? [a-zA-Z\s]{2,40}$/,
        "! Please enter a valid address. Example: 123 Main St, City, Country"
      ),
  });

  const formik = useFormik({
    initialValues: {
      phone: phone,
      city: city,
      address: address,
    },
    enableReinitialize: true,
    onSubmit: handelOrder,
    validationSchema,
  });

  async function getUserAddress() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/addresses`,
        {
          headers: {
            token: token,
          },
        }
      );

      if (data.data.length === 0) {
        setPhone("");
        setCity("");
        setAddress("");
        setCreatingAddress(true);
        return;
      }

      setAllAddresses(
        data.data.map((addr) => {
          return {
            id: addr._id,
            name: addr.name,
            address: addr.details,
            phone: addr.phone,
            city: addr.city,
          };
        })
      );

      setPhone(data.data[0].phone);
      setCity(data.data[0].city);
      setAddress(data.data[0].details);
    } catch (error) {
      console.log(error?.response?.data?.message || error.message || error);
    } finally {
      setIsLoading(false);
    }
  }

  async function createAddress() {
    setIsLoading(true);
    try {
      await axios.post(
        "https://ecommerce.routemisr.com/api/v1/addresses",
        {
          name: userName,
          details: formik.values.address,
          phone: formik.values.phone,
          city: formik.values.city,
        },
        {
          headers: {
            token: token,
          },
        }
      );
    } catch (error) {
      console.log(error?.response?.data?.message || error.message || error);
    } finally {
      // setIsLoading(false);
    }
  }

  async function deleteAddress(id) {
    setIsLoading(true);
    try {
      axios.delete(`https://ecommerce.routemisr.com/api/v1/addresses/${id}`, {
        headers: {
          token: token,
        },
      });
    } catch (error) {
      console.log(error?.response?.data?.message || error.message || error);
    } finally {
      setIsLoading(false);
    }
  }

  async function cashOrder() {
    const loadingToast = toast.loading("wait..");
    setIsCheckingOut(true);
    try {
      await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        {
          shippingAddress: {
            details: formik.values.address,
            phone: formik.values.phone,
            city: formik.values.city,
          },
        },
        {
          headers: {
            token: token,
          },
        }
      );

      toast.success("Order created successfully");
      navigate("/allorders");
    } catch (error) {
      console.log(error?.response?.data?.message || error.message || error);
      toast.error("Please try again");
    } finally {
      toast.dismiss(loadingToast);
      setIsCheckingOut(false);
    }
  }

  async function onlineOrder() {
    const loadingToast = toast.loading("wait..");
    setIsCheckingOut(true);
    try {
      const url = window.location.origin;
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        {
          shippingAddress: {
            details: formik.values.address,
            phone: formik.values.phone,
            city: formik.values.city,
          },
        },
        {
          headers: {
            token: token,
          },
        }
      );

      window.location = data.session.url;
    } catch (error) {
      console.log(error?.response?.data?.message || error.message || error);
      toast.error("Please try again");
    } finally {
      toast.dismiss(loadingToast);
      setIsCheckingOut(false);
    }
  }

  async function handelOrder() {
    if (
      allAddresses.length >= 1 &&
      (formik.values.phone !== phone ||
        formik.values.city !== city ||
        formik.values.address !== address)
    ) {
      await deleteAddress(allAddresses[0].id);
      await createAddress();
    }

    if (creatingAddress) {
      await createAddress();
    }

    if (clickedButton.current === "cash") {
      await cashOrder();
      getCart();
    } else if (clickedButton.current === "online") {
      await onlineOrder();
      getCart();
    }
  }

  useEffect(() => {
    getUserAddress();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-fit mx-6 max-w-3xl bg-white rounded shadow-xl p-5 relative">
          <header>
            <h2 className="text-main-color-hover font-bold text-xl text-center py-5">
              Check Out
            </h2>
          </header>

          <form className="max-w-md mx-auto">
            <div className="animate-pulse">
              <div className="w-full mb-5">
                <span 
                className="text-sm text-gray-500">
                  Phone
                </span>
                <div className="w-full h-0.5 bg-gray-300 mt-1.5"></div>
              </div>

              <div className="w-full mb-5">
                <span 
                className="text-sm text-gray-500">
                  City
                </span>
                <div className="w-full h-0.5 bg-gray-300 mt-1.5"></div>
              </div>

              <div className="w-full mb-5">
                <span 
                className="text-sm text-gray-500">
                  Address
                </span>
                <div className="w-full h-0.5 bg-gray-300 mt-1.5"></div>
              </div>
            </div>

            <div className="mt-10 flex items-center justify-center gap-7">
              <button
                disabled
                className="text-white text-sm font-bold cursor-pointer bg-main-color px-4 py-2 rounded transition-all duration-500 md:text-base hover:bg-main-color-hover"
              >
                Cash Order
              </button>

              <button
                disabled
                className="font-bold text-sm cursor-pointer border-2 border-main-color text-main-color px-3.5 py-1.5 rounded transition-all duration-500 md:text-base hover:text-main-color-hover hover:border-main-color-hover"
              >
                Online Order
              </button>
            </div>
          </form>

          <div className="absolute top-5 right-5 cursor-pointer">
            <IoCloseCircle className="text-3xl text-red-700" />
          </div>
      </div>
    );
  }

  return (
    <div className="check-out w-full h-fit mx-6 max-w-3xl bg-white rounded shadow-xl p-5 relative">
      <header>
        <h2 className="text-main-color-hover font-bold text-xl text-center py-5">
          Check Out
        </h2>
      </header>

      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        <div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              name="phone"
              id="floating_tel"
              className="block py-2.5 px-0 w-full text-sm text-gray-700 font-semibold bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-main-color-hover peer"
              placeholder=" "
              required
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="floating_tel"
              className="peer-focus:font-semibold absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-color-hover peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone
            </label>
            {formik.errors.phone && (
              <p className="mt-2 text-red-700 text-xs font-semibold">
                {formik.errors.phone}
              </p>
            )}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="city"
              id="floating_city"
              className="block py-2.5 px-0 w-full text-sm text-gray-700 font-semibold bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-main-color-hover peer"
              placeholder=" "
              required
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="floating_city"
              className="peer-focus:font-semibold absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-color-hover peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              City
            </label>
            {formik.errors.city && (
              <p className="mt-2 text-red-700 text-xs font-semibold">
                {formik.errors.city}
              </p>
            )}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="address"
              id="floating_address"
              className="block py-2.5 px-0 w-full text-sm text-gray-700 font-semibold bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-main-color-hover peer"
              placeholder=" "
              required
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="floating_address"
              className="peer-focus:font-semibold absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-color-hover peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Address
            </label>
            {formik.errors.address && (
              <p className="mt-2 text-red-700 text-xs font-semibold">
                {formik.errors.address}
              </p>
            )}
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-7">
          <button
            name="cashOrder"
            type="submit"
            disabled={isCheckingOut}
            className="text-white text-sm font-bold cursor-pointer bg-main-color px-4 py-2 rounded transition-all duration-500 md:text-base hover:bg-main-color-hover"
            onClick={() => {
              clickedButton.current = "cash";
            }}
          >
            Cash Order
          </button>

          <button
            type="submit"
            name="onlineOrder"
            disabled={isCheckingOut}
            className="font-bold text-sm cursor-pointer border-2 border-main-color text-main-color px-3.5 py-1.5 rounded transition-all duration-500 md:text-base hover:text-main-color-hover hover:border-main-color-hover"
            onClick={() => {
              clickedButton.current = "online";
            }}
          >
            Online Order
          </button>
        </div>
      </form>

      <div
        className="absolute top-5 right-5 cursor-pointer"
        onClick={() => setShowCheckOut(false)}
      >
        <IoCloseCircle className="text-3xl text-red-700" />
      </div>
    </div>
  );
}
