import { Swiper, SwiperSlide } from "swiper/react";
import "../Product/Product.css";
import { useEffect, useState, useRef, useContext } from "react";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { Autoplay } from "swiper/modules";
import { WishContext } from "../../Context/Wish.context";
import fetchProduct from '../../Utils/productUtils'
import { CartContext } from "../../Context/Cart.context";

export default function Product() {
  const {addToWishList, removeFromWishList, productsIDs} = useContext(WishContext);
  const {addProductToCart} = useContext(CartContext);
  const [isProductInFavorites, setIsProductInFavorites] = useState(false);
  const { productId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [productDetails, setProductDetails] = useState({});
  const swiperRef = useRef(null);
  const secondSwiperRef = useRef(null);

  async function getProduct(id) {
    setIsLoading(true);
    try {
      const product = await fetchProduct(id);

      setProductDetails(product);
      
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function goToSlide(slide) {
    if (
      swiperRef.current &&
      swiperRef.current.swiper &&
      secondSwiperRef.current &&
      secondSwiperRef.current.swiper
    ) {
      swiperRef.current.swiper.slideToLoop(slide);
      secondSwiperRef.current.swiper.slideToLoop(slide);
    }
  }

  function checkIfFavorite(){
    setIsProductInFavorites(productsIDs.includes(productId));
  }

  useEffect(() => {
    getProduct(productId);
  }, []);

  useEffect(() => {
  checkIfFavorite();
}, [productsIDs]);
  

  if (isLoading) {
    return (
      <>
        <section
          className="product w-full pt-21 mb-12 bg-white md:grid md:grid-cols-3 md:gap-6"
          ariaBusy="true"
          ariaLive="polite"
        >
          <div className="flex flex-col">
            <div className="mb-4.5 animate-pulse">
              <div className="mx-auto w-3/5 p-2.5 pt-0 bg-gray-300 h-110 rounded md:w-4/5 md:h-60 lg:h-80 xl:h-110"></div>
            </div>
            <div className="second-swiper">
              <div className="flex space-x-2">
                <div className="animate-pulse bg-gray-300 h-35 w-1/3 rounded md:h-20 lg:h-27 xl:h-35"></div>
                <div className="animate-pulse bg-gray-300 h-35 w-1/3 rounded md:h-20 lg:h-27 xl:h-35"></div>
                <div className="animate-pulse bg-gray-300 h-35 w-1/3 rounded md:h-20 lg:h-27 xl:h-35"></div>
              </div>
            </div>
          </div>

          <div className="p-8 md:col-span-2 md:py-4">
            <header>
              <div className="animate-pulse bg-gray-300 h-6 w-3/4 rounded mb-4"></div>
              <div className="animate-pulse bg-gray-300 h-4 w-[150px] rounded mb-2"></div>
              <div className="animate-pulse bg-gray-300 h-4 w-[150px] rounded mb-2"></div>
              <div className="animate-pulse bg-gray-300 h-4 w-[70px] rounded mb-2"></div>
            </header>

            <div className="animate-pulse bg-gray-300 h-5 w-full rounded my-6"></div>

            <div className="flex items-center justify-between animate-pulse">
              <div className="animate-pulse bg-gray-300 h-6 w-1/3 rounded"></div>
              <div className="animate-pulse bg-gray-300 h-6 w-1/4 rounded"></div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-4 mx-1">
              <div>
                <button className="bg-gray-300 h-10 w-24 rounded-lg animate-pulse"></button>
              </div>
              <div className="w-full">
                <button className="bg-gray-300 h-10 w-full rounded-lg animate-pulse"></button>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <section className="product w-full pt-21 md:grid md:grid-cols-3 md:gap-6">
      <div className="flex flex-col">
        <div className="mb-2">
          <Swiper
            ref={swiperRef}
            slidesPerView={1}
            spaceBetween={0}
            loop={true}
            allowTouchMove={false}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            speed={1000}
            modules={[Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img
                src={productDetails.imageCover}
                className="mx-auto w-9/10 p-2.5 pt-0"
                alt={productDetails.description}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={productDetails.imageOne ? productDetails.imageOne : productDetails.imageCover}
                className="mx-auto w-9/10 p-2.5 pt-0"
                alt={productDetails.description}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={productDetails.imageTwo ? productDetails.imageTwo : productDetails.imageCover}
                className="mx-auto w-9/10 p-2.5 pt-0"
                alt={productDetails.description}
              />
            </SwiperSlide>
            {productDetails.imageThree &&
            <SwiperSlide>
              <img
                src={productDetails.imageThree ? productDetails.imageThree : productDetails.imageCover}
                className="mx-auto w-9/10 p-2.5 pt-0"
                alt={productDetails.description}
              />
            </SwiperSlide>
            }
          </Swiper>
        </div>

        <div className="second-swiper">
          <Swiper
            ref={secondSwiperRef}
            slidesPerView={3}
            spaceBetween={10}
            loop={true}
            allowTouchMove={false}
            modules={[Autoplay]}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            speed={1000}
            className="mySwiper w-full"
          >
            <SwiperSlide onClick={() => goToSlide(1)}>
              <img
                src={productDetails.imageCover}
                alt={productDetails.description}
              />
            </SwiperSlide>
            <SwiperSlide onClick={() => goToSlide(1)}>
              <img
                src={productDetails.imageOne ? productDetails.imageOne : productDetails.imageCover}
                alt={productDetails.description}
              />
            </SwiperSlide>
            <SwiperSlide onClick={() => goToSlide(2)}>
              <img
                src={productDetails.imageTwo ? productDetails.imageTwo : productDetails.imageCover}
                alt={productDetails.description}
              />
            </SwiperSlide>
            <SwiperSlide onClick={() => goToSlide(3)}>
              <img
                src={productDetails.imageThree ? productDetails.imageThree : productDetails.imageCover}
                alt={productDetails.description}
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <div className="p-8 md:col-span-2 md:py-4">
        <header>
          <h2 className="text-main-color-hover font-black text-xl leading-9 mb-2 ms-1 sm:text-2xl">
            {productDetails.title}
          </h2>
          <h3 className="text-main-color text-sm font-bold mb-1 ms-1">
            {productDetails.category}
          </h3>
          <div>
            <p className="text-gray-500 font-semibold text-[13px] ms-1 mb-1">
              {productDetails.brand} |
              <span className="text-main-color">
                {productDetails.quantity ? " Available" : " Out of stock"}
              </span>
            </p>
          </div>
          <div>
            <p className="flex items-center gap-1">
              <FaStar className="text-yellow-400" />
              <span className="text-main-color-hover font-semibold text-sm">
                {productDetails.rating}
              </span>
            </p>
          </div>
        </header>
        <h4 className="my-4 ms-1 text-gray-600 text-[15px]">
          {productDetails.description}
        </h4>

        {productDetails.priceAfterDiscount ? (
          <div className="flex items-center justify-between">
            <p className="text-main-color font-black ms-1">
              EGP {productDetails.priceAfterDiscount}
              <span className="text-sm font-normal text-gray-500 line-through inline-block px-1.5">
                {productDetails.price}
              </span>
            </p>

            <span className="bg-main-color rounded-lg font-semibold px-1.5 py-1 text-sm text-white inline me-1">
              Save{" "}
              {Math.round(
                ((productDetails.price - productDetails.priceAfterDiscount) /
                  productDetails.price) *
                  100
              )}
              %
            </span>
          </div>
        ) : (
          <p className="text-main-color font-black ms-1">
            EGP {productDetails.price}
          </p>
        )}

        <div className="flex items-center justify-center gap-4 mt-4 mx-1">
          <div>
            <button className="bg-main-color px-6 py-3 rounded-lg cursor-pointer transition-all duration-500 hover:bg-main-color-hover"
            onClick={() =>{
              if(isProductInFavorites){
                removeFromWishList(productId);
              } else{
                addToWishList(productId);
              }
            }}
            >
              {isProductInFavorites ?
              <FaHeart className="text-red-600"/>
              :
              <FaRegHeart className="text-white"/>
              }
            </button>
          </div>

          <div className="w-full">
            <button
              className="bg-main-color py-2 text-white uppercase rounded-lg w-full flex items-center justify-center gap-2  
            cursor-pointer transition-all duration-500 hover:bg-main-color-hover"
            onClick={() => addProductToCart(productId)}
            >
              <FaCartPlus className="text-lg" /> <span>add to cart</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
