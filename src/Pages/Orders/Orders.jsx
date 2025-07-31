import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FaShippingFast } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./../../Context/Auth.context";

export default function Orders() {
  const { userID } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  async function getOrders() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userID}`
      );
      const ordersInfo = data.map((order) => {
        return {
          TrackingNumber: order.id,
          shippingPrice: order.shippingPrice,
          taxPrice: order.taxPrice,
          totalOrderPrice: order.totalOrderPrice,
          createdAt: order.createdAt.split("T")[0],
          paymentMethod: order.paymentMethodType,
          isDelivered: order.isDelivered,
          isPaid: order.isPaid,
          products: order.cartItems.map((product) => {
            return {
              quantity: product.count,
              price: product.price,
              imageCover: product.product.imageCover,
              title: product.product.title,
              id: product.product._id,
            };
          }),
        };
      });

      setOrders(ordersInfo);
    } catch (error) {
      console.log(error?.response?.data?.message || error.message || error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getOrders();
  }, []);

  if (isLoading) {
    return (
      <section className="w-full pt-21 mb-12">
        <header className="flex items-center gap-2 text-main-color-hover">
          <h2 className="font-black text-xl">Track your orders</h2>
          <FaShippingFast className="text-2xl" />
        </header>

        <div className="mt-8 animate-pulse">
          <div className="p-5 border-2 border-gray-300 rounded-lg bg-gray-50">
            <header className="flex flex-col gap-4 mb-7">
              <div className="flex flex-col gap-2">
                <div className="h-6 w-23 bg-gray-300 rounded"></div>
                <div className="h-8 w-48 bg-gray-300 rounded"></div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="bg-gray-300 rounded w-25 h-3.5 mb-1"></div>
                  <div className="bg-gray-300 rounded w-12 h-3.5"></div>
                </div>
                <div>
                  <div className="bg-gray-300 rounded w-7 h-3.5 mb-1"></div>
                  <div className="bg-gray-300 rounded w-20 h-3.5"></div>
                </div>
                <div>
                  <div className="bg-gray-300 rounded w-26 h-3.5 mb-1"></div>
                  <div className="bg-gray-300 rounded w-8 h-3.5"></div>
                </div>
              </div>
            </header>

            <div className="grid grid-cols-12 gap-4 pb-2.5 mb-5 xl:gap-1">
              <div className="col-span-4 md:col-span-3 lg:col-span-2 rounded-lg w-30 h-41 bg-gray-300 lg:w-35 lg:h-47.5 xl:w-40 xl:h-54.5"></div>

              <div className="col-span-8 flex flex-col justify-center gap-5 w-full md:col-span-9 lg:col-span-10">
                <div className="bg-gray-300 rounded w-full h-6"></div>

                <div className="flex items-center gap-3 sm:gap-5">
                  <div className="flex gap-2">
                    <div className="bg-gray-300 rounded w-15 h-5"></div>
                    <div className="bg-gray-300 rounded w-4 h-5"></div>
                  </div>

                  <div className="bg-gray-300 h-5 w-0.5"></div>

                  <div className="flex gap-2">
                    <div className="bg-gray-300 rounded w-9 h-5"></div>
                    <div className="bg-gray-300 rounded w-18.5 h-5"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full bg-gray-300 h-[1px]"></div>

            <div className="mt-10 px-3 flex items-center justify-between">
              <div className="space-y-3">
                <div className="font-semibold flex items-center gap-4 text-sm">
                  <div className=" bg-gray-300 rounded w-35 h-5"></div>
                  <div className=" bg-gray-300 rounded w-4 h-5"></div>
                </div>
                <div className="font-semibold flex items-center gap-4 text-sm">
                  <div className=" bg-gray-300 rounded w-35 h-5"></div>
                  <div className=" bg-gray-300 rounded w-11 h-5"></div>
                </div>
                <div className="font-semibold flex items-center gap-4 text-sm">
                  <div className=" bg-gray-300 rounded w-35 h-5"></div>
                  <div className=" bg-gray-300 rounded w-11 h-5"></div>
                </div>
                <div className="font-semibold flex items-center gap-4 text-sm">
                  <div className=" bg-gray-300 rounded w-35 h-5"></div>
                  <div className=" bg-gray-300 rounded w-20 h-5"></div>
                </div>
              </div>

              <div className="bg-gray-300 rounded w-27 h-5"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }


  return (
    <section className="w-full pt-21 mb-12">
      <header className="flex items-center gap-2 text-main-color-hover">
        <h2 className="font-black text-xl">Track your orders</h2>
        <FaShippingFast className="text-2xl" />
      </header>
      {orders.length == 0 ? (
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
            Add your first order
          </button>
        </div>
      ) : (
        <div className="mt-8 space-y-8">
          {orders.map((order) => {
            return (
              <div
                key={order.TrackingNumber}
                className="p-5 border-2 border-gray-300 rounded-lg bg-gray-50"
              >
                <header className="flex flex-col gap-4 mb-7">
                  <div className="flex flex-col gap-1">
                    <span className="text-main-color-hover">Thank You!</span>
                    <span className="font-bold text-xl text-gray-900 lg:text-2xl">
                      It's on the way!
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-gray-900">
                        Tracking number
                      </span>
                      <h2 className="text-main-color-hover font-semibold text-sm">
                        {order.TrackingNumber}
                      </h2>
                    </div>

                    <div>
                      <span className="text-xs font-semibold text-gray-900">
                        Date
                      </span>
                      <p className="text-main-color-hover font-semibold text-sm">
                        {order.createdAt}
                      </p>
                    </div>

                    <div>
                      <span className="text-xs font-semibold text-gray-900">
                        Payment method
                      </span>
                      <p className="text-main-color-hover font-semibold text-sm">
                        {order.paymentMethod}
                      </p>
                    </div>
                  </div>
                </header>

                {order.products.map((product) => {
                  return (
                    <div
                      key={product.key}
                      className="grid grid-cols-12 gap-4 border-b border-b-gray-300 overflow-hidden pb-2.5 mb-5 xl:gap-2"
                    >
                      <div className="col-span-4 sm:col-span-3 lg:col-span-2 overflow-hidden rounded-lg">
                        <img
                          src={product.imageCover}
                          className="w-30 lg:w-35 xl:w-40"
                        />
                      </div>

                      <div className="col-span-8 sm:col-span-9 lg:col-span-10 flex flex-col justify-center gap-5">
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis max-w-full sm:text-base">
                            {product.title}
                          </h3>
                        </div>

                        <div className="flex items-center gap-5">
                          <div>
                            <span className="text-xs font-semibold text-gray-900 sm:text-sm">
                              Quantity
                              <span className="inline-block ps-2 text-gray-600">
                                {product.quantity}
                              </span>
                            </span>
                          </div>

                          <span className="text-gray-500">|</span>

                          <div>
                            <span className="text-xs font-semibold text-gray-900 sm:text-sm">
                              Price
                              <span className="inline-block ps-2 text-gray-600">
                                EGP {product.price}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="mt-10 px-3 grid grid-cols-3 gap-1">
                  <div className="space-y-3 col-span-2">
                    <div className="text-xs font-semibold flex items-center gap-4 sm:text-sm">
                      <span className="text-main-color w-31.5 sm:w-36">
                        Products Quantity :
                      </span>
                      <span className="text-gray-600">
                        {order.products.length}
                      </span>
                    </div>
                    <div className="text-xs font-semibold flex items-center gap-4 sm:text-sm">
                      <span className="text-main-color w-31.5 sm:w-36">
                        Shipping Price :
                      </span>
                      <span className="text-gray-600">
                        EGP {order.shippingPrice}
                      </span>
                    </div>
                    <div className="text-xs font-semibold flex items-center gap-4 sm:text-sm">
                      <span className="text-main-color w-31.5 sm:w-36">Taxes :</span>
                      <span className="text-gray-600">
                        EGP {order.taxPrice}
                      </span>
                    </div>

                    <div className="text-sm font-semibold flex items-center gap-4 sm:text-base">
                      <span className="text-main-color w-31.5 sm:w-36">
                        Total Order Price :
                      </span>
                      <span className="text-gray-600">
                        EGP {order.totalOrderPrice}
                      </span>
                    </div>
                  </div>

                  <div className="w-full flex items-center justify-end">
                    {order.isDelivered ? (
                      <span className="text-sm sm:text-base font-bold text-main-color">
                        Delivered
                      </span>
                    ) : (
                      <span className="text-sm sm:text-base font-bold text-red-700">
                        Not Delivered
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
