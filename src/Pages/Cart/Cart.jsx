import React, { useContext, useState } from "react";
import cartIcon from "../../assets/images/favicon.png";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/Cart.context";
import { TiDelete } from "react-icons/ti";
import CheckOut from "../../Components/CheckOut/CheckOut";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import toast from "react-hot-toast";


export default function Cart() {
  const {
    cart,
    removeProductFromCart,
    updateCount,
    isCartLoading,
    numOfCartItems,
    quantity,
    totalCartPrice,
    removeAllProducts
  } = useContext(CartContext);
  const [isIDUpdating, setIsIDUpdating] = useState(null);
  const [showCheckOut, setShowCheckOut] = useState(false);
  const [isClearingCart, setIsClearingCart] = useState(false);
  const navigate = useNavigate();

  async function changeCount(id, count) {
    setIsIDUpdating(id);
    await updateCount(id, count);
    setIsIDUpdating(null);
  }

  async function clearCart(){
    try {
      const result = await Swal.fire({
          icon: "question",
          title: "Clear Cart",
          confirmButtonText: "Yes",
          cancelButtonText: "No",
          showCancelButton: true,
          showCloseButton: true,
          confirmButtonColor: "rgb(135, 173, 189)",
        });
    
        if (result.isConfirmed) {
          setIsClearingCart(true);
          await removeAllProducts();
        }
    } catch (error) {
      console.log(error?.response?.data?.message || error.message || error);
    } finally{
      setIsClearingCart(false);
    }
  }

  async function handleRemoveFromCart(id) {
    try {
      await removeProductFromCart(id);
    } catch (error) {
      const message = error.response?.data?.message || "Please try again";
      toast.error(message);
    }
  }

  if (isCartLoading) {
    return (
      <section className="w-full pt-21 mb-12">
        <div className="bg-light-color p-5 rounded-lg">
          <header className="flex items-center gap-2">
            <h2 className="text-main-color-hover font-black text-xl">
              Shop Cart
            </h2>
            <img src={cartIcon} className="w-5.5" />
          </header>

          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                <div className="grid grid-cols-13 animate-pulse rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
                  <div className="col-span-12 space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                    <div className="bg-gray-300 rounded w-20 h-28 lg:h-35 lg:w-25 md:order-1"></div>

                    <div className="flex items-center justify-between md:order-3 md:justify-end gap-4">
                      <div className="flex items-center gap-3.5">
                        <div className="rounded-md w-5 h-5 bg-gray-300"></div>
                        <div className="bg-gray-300 w-3 h-2"></div>
                        <div className="rounded-md w-5 h-5 bg-gray-300"></div>
                      </div>
                      <div className="bg-gray-300 h-6 w-16 rounded md:order-4"></div>
                    </div>

                    <div className="bg-gray-300 h-5 w-3/4 rounded md:order-2 md:max-w-md"></div>
                  </div>

                  <div className="flex justify-end items-start">
                    <div className="w-5 h-5 rounded-full bg-gray-300"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full pt-21 mb-12">
      <div className="bg-light-color p-5 sm:rounded-lg">
        <div
          className={cart.length > 0 ? "flex items-center justify-between" : ""}
        >
          <header className="flex items-center gap-2">
            <h2 className="text-main-color-hover font-black text-xl">
              Shop Cart
            </h2>
            <img src={cartIcon} className="w-5.5" />
          </header>

          {cart.length > 0 && (
            <div>
              <button
                className="text-white font-semibold text-sm bg-red-700 rounded px-4 py-1.5 cursor-pointer
                flex items-center gap-1
                lg:text-base"
                disabled={isClearingCart}
                onClick={() => {
                  clearCart();
                }}
              >
                <MdDeleteForever className="text-lg" /> <span>Clear cart</span>
              </button>
            </div>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="flex items-center justify-center flex-col gap-2.5 m-8">
            <p className="text-center text-main-color-hover">
              There are no items yet.
            </p>
            <button
              className="capitalize py-2 px-6 text-white bg-main-color rounded font-semibold text-sm cursor-pointer
                transition-all duration-500 hover:bg-main-color-hover"
              onClick={() => {
                navigate("/products");
              }}
            >
              Add your first product to cart
            </button>
          </div>
        ) : (
          <>
            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
              <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                <div className="space-y-6">
                  {cart.map((product) => (
                    <div
                      key={product.id}
                      className="grid grid-cols-13 rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6"
                    >
                      <div className="col-span-12 space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <div 
                          onClick={() => {
                            navigate(`/product/${product.id}`);
                          }}
                          className="shrink-0 rounded overflow-hidden cursor-pointer md:order-1"
                        >
                          <img
                            className="w-20 lg:w-25"
                            src={product.imageCover}
                            alt={product.title}
                          />
                        </div>

                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                          <div className="flex items-center">
                            <button
                              type="button"
                              onClick={() => {
                                let newCount = product.count - 1;
                                changeCount(product.id, newCount);
                              }}
                              className="inline-flex h-5 w-5 cursor-pointer items-center justify-center rounded-md border 
                            border-gray-300 bg-gray-100 transition-all duration-500 hover:bg-gray-200"
                            >
                              <svg
                                className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 2"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M1 1h16"
                                />
                              </svg>
                            </button>

                            <input
                              type="text"
                              className={
                                isIDUpdating === product.id
                                  ? "w-10 border-0 bg-transparent text-center text-sm text-gray-700 font-semibold outline-0 animate-bounce"
                                  : "w-10 border-0 bg-transparent text-center text-sm text-gray-700 font-semibold outline-0"
                              }
                              value={product.count}
                              readOnly
                            />

                            <button
                              type="button"
                              onClick={() => {
                                let newCount = product.count + 1;
                                changeCount(product.id, newCount);
                              }}
                              className="inline-flex h-5 w-5 cursor-pointer items-center justify-center rounded-md border 
                            border-gray-300 bg-gray-100 transition-all duration-500 hover:bg-gray-200"
                            >
                              <svg
                                className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 18"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 1v16M1 9h16"
                                />
                              </svg>
                            </button>
                          </div>
                          <div className="text-end md:order-4 md:w-32">
                            <p className="text-gray-700 dark:text-white font-semibold">
                              EGP {product.price}
                            </p>
                          </div>
                        </div>

                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                          <p className="text-main-color-hover font-semibold whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                            {product.title}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-end items-start">
                        <button
                          type="button"
                          onClick={() => handleRemoveFromCart(product.id)}
                        >
                          <TiDelete className="text-2xl cursor-pointer text-red-700 lg:text-[28px]" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-15 mx-auto space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:max-w-2xl xl:max-w-4xl">
              <p className="text-xl font-semibold text-gray-800 dark:text-white">
                Order summary
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base text-gray-500 dark:text-white">Cart Items</dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      {numOfCartItems}
                    </dd>
                  </dl>
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base text-gray-500 dark:text-white">Total Quantity</dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      {quantity}
                    </dd>
                  </dl>
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base text-gray-500 dark:text-white">Total Price</dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      EGP {totalCartPrice}
                    </dd>
                  </dl>
                </div>
              </div>

              <button
                className="w-full cursor-pointer bg-main-color text-white py-2.5 px-4 rounded-lg font-semibold transition-all duration-500 hover:bg-main-color-hover"
                onClick={() => setShowCheckOut(true)}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
      {showCheckOut && (
        <div
          className="fixed z-99999 top-0 bottom-0 left-0 right-0  bg-[#00000081]
          flex items-center justify-center"
        >
          <CheckOut setShowCheckOut={setShowCheckOut} />
        </div>
      )}
    </section>
  );
}
