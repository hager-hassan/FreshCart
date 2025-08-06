import { useContext , useState } from "react";
import { WishContext } from "../../Context/Wish.context";
import { IoHeartCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { CartContext } from "../../Context/Cart.context";
import Swal from "sweetalert2";

export default function WishList() {
  const { wishList, removeFromWishList, isWishListLoading } =
    useContext(WishContext);
  const { addProductToCart } = useContext(CartContext);
  const [isRemovingFromWishList, setIsRemovingFromWishList] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const navigate = useNavigate();

  async function addProduct(id) {
    await addProductToCart(id);

    const result = await Swal.fire({
      title: "Delete from wishlist ?",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonColor: "rgb(1, 133, 76)",
    });

    if (result.isConfirmed) {
      await removeFromWishList(id);
    }
  }

  async function handleRemoveFromWishList(id) {
    setIsRemovingFromWishList(true);
    try {
      await removeFromWishList(id);
    } catch (error) {
      console.log(error.response?.data?.message || "Please try again");
    } finally {
      setIsRemovingFromWishList(false);
    }
  }

  async function handleAddToCart(id) {
    setIsAddingToCart(true);
    try {
      await addProduct(id);
    } catch (error) {
      console.log(error.response?.data?.message || "Please try again");
    } finally {
      setIsAddingToCart(false);
    }
  }

  if (isWishListLoading) {
    return (
      <section className="w-full pt-21 mb-12">
        <div class="bg-light-color p-5 rounded-lg">
          <header className="flex items-center gap-2">
            <h2 className="text-main-color-hover font-black text-xl">
              Favorite Products
            </h2>

            <IoHeartCircleSharp className="text-main-color-hover text-[22px]" />
          </header>

          <div class="pb-8 pt-4 mx-3 grid grid-cols-13 gap-6 animate-pulse">
            <div class="col-span-4 rounded-lg h-50 bg-gray-300 md:h-60 lg:h-40 lg:col-span-2 xl:h-50"></div>
            <div class="col-span-8 flex items-center lg:col-span-10">
              <div class="w-full">
                <div class="space-y-1.5">
                  <div class="h-6 bg-gray-300 w-full lg:w-1/2 rounded"></div>
                  <div class="h-4 bg-gray-300 w-25 rounded"></div>
                  <div class="h-4 bg-gray-300 w-27 rounded"></div>
                  <div class="h-4 bg-gray-300 w-55 rounded"></div>
                </div>

                <div>
                  <div class="bg-gray-300 mt-4 rounded-lg h-6 w-30 lg:w-35 lg:h-8 "></div>
                </div>
              </div>
            </div>
            <div className="bg-gray-300 rounded-full w-5 h-5"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full pt-21 mb-12">
      <div className="bg-light-color p-5 rounded-lg">
        <header className="flex items-center gap-2">
          <h2 className="text-main-color-hover font-black text-xl">
            Favorite Products
          </h2>

          <IoHeartCircleSharp className="text-main-color-hover text-[22px]" />
        </header>

        {wishList.length === 0 ? (
          <div className="flex items-center justify-center flex-col gap-2.5 m-8">
            <p className="text-center text-main-color-hover">
              There are not products yet.
            </p>
            <button
              className="capitalize py-2 px-6 text-white bg-main-color rounded font-semibold text-sm cursor-pointer
          transition-all duration-500 hover:bg-main-color-hover"
              onClick={() => {
                navigate("/products");
              }}
            >
              add your first product to favorites
            </button>
          </div>
        ) : (
          <div>
            {wishList.map((product, index) => {
              return (
                <div
                  key={product.id}
                  className={
                    index === wishList.length - 1
                      ? "pb-8 pt-4 mx-3 grid grid-cols-13 gap-6"
                      : "pb-8 mt-4 mx-3 border-b-[1px] border-b-gray-300 grid grid-cols-13 gap-6"
                  }
                >
                  <div
                    className="col-span-4 overflow-hidden rounded-lg cursor-pointer lg:col-span-2"
                    onClick={() => {
                      navigate(`/product/${product.id}`);
                    }}
                  >
                    <img src={product.imageCover} className="w-full" />
                  </div>

                  <div className="col-span-8 flex items-center lg:col-span-10">
                    <div className="w-full">
                      <header className="space-y-1.5">
                        <h2 className="text-main-color-hover font-bold whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                          {product.title}
                        </h2>

                        <div className="font-semibold flex items-center gap-1.5">
                          <span className="text-[15px] text-main-color-hover">
                            Rate :
                          </span>
                          <span className="text-sm flex items-center gap-1">
                            <FaStar className="text-yellow-500" />
                            <span className="text-main-color">
                              {product.rating}
                            </span>
                          </span>
                        </div>

                        <div className="font-semibold flex items-center gap-1.5">
                          <span className="text-main-color-hover text-[15px]">
                            Price :
                          </span>
                          <span className="text-sm">
                            {product.priceAfterDiscount ? (
                              <span>
                                <span className="text-main-color">
                                  EGP {product.priceAfterDiscount}
                                  <span className="text-gray-400 font-normal line-through text-[13px] inline-block ps-1.5">
                                    {product.price}
                                  </span>
                                </span>
                              </span>
                            ) : (
                              <span className="text-main-color">
                                EGP {product.price}
                              </span>
                            )}
                          </span>
                        </div>

                        <div className="text-gray-500 text-[13px]">
                          <span>
                            {product.category} | {product.brand} |
                            <span className="text-main-color font-semibold inline-block ps-1">
                              {product.quantity > 0
                                ? "Available"
                                : "Out of stock"}
                            </span>
                          </span>
                        </div>
                      </header>

                      <div>
                        <button
                          className="bg-main-color mt-4 text-xs py-1 px-1.5 text-white uppercase rounded-lg flex items-center justify-center gap-2 lg:text-sm lg:px-2 lg:py-1.5
                          cursor-pointer transition-all duration-500 hover:bg-main-color-hover"
                          disabled={isAddingToCart}
                          onClick={() => handleAddToCart(product.id)}
                        >
                          <FaCartPlus className="text-sm lg:text-base" />
                          <span>add to cart</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <button
                    disabled={isRemovingFromWishList}
                    onClick={() => handleRemoveFromWishList(product.id)}
                    >
                      <TiDelete
                        className="text-2xl cursor-pointer text-red-700 lg:text-[28px]"/>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
