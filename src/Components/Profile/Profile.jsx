import { useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { FaCartShopping } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import UpdatePassword from "../UpdatePassword/UpdatePassword";
import UpdateEmail from "../UpdateEmail/UpdateEmail";

export default function Profile({logout}) {
  const navigate = useNavigate();
  const [showUpdatePass, setShowUpdatePass] = useState(false);
  const [showUpdateEmail, setShowUpdateEmail] = useState(false);


  return (
    <>
      <div className="dropdown dropdown-start lg:dropdown-center">
        <div tabIndex={0} role="button mb-2 absolute">
          <RxAvatar className="text-slate-blue dark:text-white mb-1.5 text-3xl inline-block cursor-pointer font-extrabold 
          transition-all duration-500 hover:text-main-color lg:mb-0 lg:text-[25px]" />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content !fixed menu bg-white rounded !z-7777 w-55 shadow-sm p-0 md:w-60 
          lg:!absolute lg:w-65 lg:translate-y-[3%] lg:translate-x-1/2"
        >
          <li
            className="rounded-none lg:hidden"
            onClick={() => navigate("/cart")}
          >
            <span className="py-2.5 rounded-none text-slate-blue font-semibold hover:text-main-color">
              <FaCartShopping className="text-lg" />
              Cart
            </span>
          </li>
          <li className="rounded-none" onClick={() => navigate("/wishList")}>
            <span
              className="py-2.5 rounded-none text-slate-blue dark:text-white font-semibold hover:text-main-color
          lg:border-b-[1px] lg:border-b-gray-300 lg:py-3.5"
            >
              <FaHeart className="text-lg" />
              WishList
            </span>
          </li>
          <li 
          className="rounded-none"
          onClick={() => setShowUpdateEmail(true)}>
            <span
              className="py-2.5 rounded-none text-slate-blue dark:text-white font-semibold hover:text-main-color
              lg:border-b-[1px] lg:border-b-gray-300 lg:py-3.5"
            >
              <MdEmail className="text-lg" />
              Update email
            </span>
          </li>
          <li className="rounded-none"
          onClick={() => setShowUpdatePass(true)}
          >
            <span className="py-2.5 rounded-none text-slate-blue font-semibold hover:text-main-color lg:py-3.5">
              <RiLockPasswordFill className="text-lg" />
              Update password
            </span>
          </li>
          <li className="lg:hidden">
            <span className="h-[1px] my-2 bg-gray-300 rounded-none p-0"></span>
          </li>
          <li className="rounded-none lg:hidden" onClick={() => logout()}>
            <span className="py-2.5 mb-2 rounded-none text-slate-blue dark:text-white font-semibold hover:text-main-color">
              LogOut
            </span>
          </li>
        </ul>
      </div>

      {showUpdatePass &&
      <div
      className="fixed z-8888 top-0 bottom-0 left-0 right-0  bg-[#00000081]
          flex items-center justify-center"
      >
          <UpdatePassword setShowUpdatePass={setShowUpdatePass} logout={logout}/>
      </div>
      }

      {showUpdateEmail &&
      <div
      className="fixed z-8888 top-0 bottom-0 left-0 right-0  bg-[#00000081]
          flex items-center justify-center"
      >
          <UpdateEmail setShowUpdateEmail={setShowUpdateEmail} />
      </div>
      }
    </>
  );
}
