import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";
import { useState, useContext } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { AuthContext } from "./../../Context/Auth.context";
import { CartContext } from "./../../Context/Cart.context";
import Profile from "../Profile/Profile";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { token, setToken, setLoading } = useContext(AuthContext);
  const { numOfCartItems, isCartLoading } = useContext(CartContext);
  const navigate = useNavigate();

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function logout() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      localStorage.removeItem('token');
      setToken(null);
      navigate('/login');
    }, 1500);
  };

  return (
    <nav className="bg-light-color navbar py-0 fixed z-9999">
      <div className="container py-4 lg:flex justify-between">
        <div className="flex justify-between w-full lg:w-fit">
          <div>
            <h1 className="sr-only">FreshCart</h1>
            <Link to="/">
              <img src={logo} alt="fresh cart logo" />
            </Link>
          </div>

          <div className="lg:hidden">
            <div>
              <button aria-label='close and open navbar'>
                <label htmlFor="close-open-nav" className="swap swap-rotate">
                  <input id="close-open-nav" type="checkbox" />

                  <svg
                    onClick={toggleMenu}
                    className="swap-off fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 512 512"
                    color="#253037"
                  >
                    <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                  </svg>

                  <svg
                    onClick={toggleMenu}
                    className="swap-on fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 512 512"
                    color="#253037"
                  >
                    <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                  </svg>
                </label>
              </button>
            </div>
          </div>
        </div>

        {token && (
          <div
            className={`overflow-hidden transition-all duration-700 ease-in-out
                    ${
                      isMenuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    } lg:overflow-visible
                    lg:max-h-none lg:opacity-100 lg:flex`}
          >
            <ul className="py-3 lg:flex justify-center space-x-4 lg:py-0">
              <li className="lg:flex items-center justify-center">
                <NavLink
                  className="nav-link text-slate-blue dark:text-white mb-1.5 inline-block font-medium lg:mb-0 transition-all duration-500 hover:font-extrabold"
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="lg:flex items-center justify-center">
                <NavLink
                  className="nav-link text-slate-blue dark:text-white mb-1.5 inline-block font-medium lg:mb-0 transition-all duration-500 hover:font-extrabold"
                  to="/products"
                >
                  Products
                </NavLink>{" "}
              </li>
              <li className="lg:flex items-center justify-center">
                <NavLink
                  className="nav-link text-slate-blue dark:text-white mb-1.5 inline-block font-medium lg:mb-0 transition-all duration-500 hover:font-extrabold"
                  to="/categories"
                >
                  Categories
                </NavLink>{" "}
              </li>
              <li className="lg:flex items-center justify-center">
                <NavLink
                  className="nav-link text-slate-blue dark:text-white mb-1.5 inline-block font-medium lg:mb-0 transition-all duration-500 hover:font-extrabold"
                  to="/brands"
                >
                  Brands
                </NavLink>{" "}
              </li>
              <li className="lg:flex items-center justify-center">
                <NavLink
                  className="nav-link text-slate-blue dark:text-white mb-1.5 inline-block font-medium lg:mb-0 transition-all duration-500 hover:font-extrabold"
                  to="/allorders"
                >
                  Orders
                </NavLink>{" "}
              </li>
            </ul>
          </div>
        )}

        <div
          className={`overflow-hidden transition-all duration-700 ease-in-out
                    ${
                      isMenuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    } lg:overflow-visible
                    lg:max-h-none lg:opacity-100 lg:flex`}
        >
          <ul className="py-3 lg:flex lg:justify-center lg:items-center lg:space-x-5 lg:py-0">
            {!token && (
              <>
                <li className="lg:flex items-center justify-center">
                  <NavLink
                    className="nav-link login text-slate-blue dark:text-white mb-1.5 inline-block font-medium lg:mb-0 transition-all duration-500 hover:font-extrabold"
                    to="/login"
                  >
                    Login
                  </NavLink>{" "}
                </li>
                <li className="lg:flex items-center justify-center">
                  <NavLink
                    className="nav-link signup text-slate-blue dark:text-white mb-1.5 inline-block font-medium lg:mb-0 transition-all duration-500 hover:font-extrabold"
                    to="/signup"
                  >
                    Signup
                  </NavLink>{" "}
                </li>
              </>
            )}

            {token && (
              <>
                <li
                  className={
                    isCartLoading
                      ? "relative cursor-pointer hidden lg:flex lg:items-center lg:justify-center animate-bounce"
                      : "relative cursor-pointer hidden lg:flex lg:items-center lg:justify-center"
                  }
                >
                  <Link to="/cart">
                    <span className="bg-main-color text-white absolute rounded-full w-4.5 h-4.5 text-[10px] font-semibold flex items-center justify-center -top-2 -left-2.5">
                      {numOfCartItems}
                    </span>
                    <FaCartShopping className="text-main-color-hover text-[25px] font-extrabold" />
                  </Link>
                </li>

                <li className="border-t-2 border-t-gray-300 pt-4 lg:flex lg:items-center lg:justify-center lg:pt-0 lg:border-0">
                  <Profile logout={logout}/>
                </li>

                <li
                    className="hidden text-slate-blue dark:text-white mb-1.5 cursor-pointer font-extrabold 
                    transition-all duration-500 hover:text-main-color lg:mb-0 lg:inline-block"
                    onClick={() => logout()}
                  >
                    LogOut
                  </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
