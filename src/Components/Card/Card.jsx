import { Link, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useEffect, useState, useContext } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { WishContext } from "../../Context/Wish.context";
import { CartContext } from "../../Context/Cart.context";
import { FaRegEye } from "react-icons/fa";

export default function Card({
  id,
  brand,
  title,
  category,
  imageCover,
  rating,
  price,
  priceAfterDiscount,
  quantity,
}) {
  const { addToWishList, removeFromWishList, productsIDs } = useContext(WishContext);
  const [isProductInFavorites, setIsProductInFavorites] = useState(false);  
  const {addProductToCart} = useContext(CartContext);
  const navigate = useNavigate();

  function goTOProduct(id) {
    navigate(`/product/${id}`);
  }

  function checkIfFavorite(){
    setIsProductInFavorites(productsIDs.includes(id));
  }

  useEffect(() => {
    checkIfFavorite();
  }, [productsIDs]);

  return (
    <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-sm relative">
      <div>
        <img className="rounded-t-lg" src={imageCover} alt={title} />
      </div>

      <div className="p-5">
        <header>
          <p className="block text-[15px] text-main-color whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
            {title}
          </p>

          <p className="text-[15px] text-main-color-hover font-black my-1.5">
            {category}
          </p>

          <span className="text-[13px] text-gray-500 font-semibold">
            {brand} |
            <span className="text-main-color">
              {quantity ? " Available" : " Out of stock"}
            </span>
          </span>
        </header>

        <div className="mt-2 flex items-center justify-between">
          <div>
            {priceAfterDiscount ? (
              <p className="text-main-color text-[13px] font-semibold">
                EGP {priceAfterDiscount}
                <span className="text-xs font-normal text-gray-500 line-through inline-block px-1.5">
                  {price}
                </span>
                <span className="text-xs text-main-color-hover">
                  {Math.round(((price - priceAfterDiscount) / price) * 100)}%
                </span>
              </p>
            ) : (
              <p className="text-main-color text-[13px] font-semibold">
                EGP {price}
              </p>
            )}
          </div>
          <div>
            <span className="flex items-center justify-baseline gap-1 text-main-color-hover text-[15px]">
              <FaStar className="text-yellow-400" />
              <span>{rating}</span>
            </span>
          </div>
        </div>
      </div>

      <div
        className="group layer cursor-pointer absolute top-0 bottom-0 left-0 right-0 flex flex-row items-center justify-center gap-2.5 text-white opacity-0 transition-all duration-900 hover:opacity-100"
        onClick={() => goTOProduct(id)} 
      >
        <div
          className="transition-all duration-600 group-hover:-translate-y-[100px]"
          onClick={(e) => e.stopPropagation()} 
        >
          <div
            className="flex items-center justify-center rounded-full bg-main-color opacity-80 w-[48px] h-[48px] transition-all duration-500 hover:opacity-100 hover:bg-main-color-hover"
            onClick={(e) =>{
              e.stopPropagation(); 
              if(isProductInFavorites){
                removeFromWishList(id);
              } else{
                addToWishList(id);
              }
            }}
          >
            {isProductInFavorites ? (
              <FaHeart className="text-red-600 text-lg" />
            ) : (
              <FaRegHeart className="text-white text-lg" />
            )}
          </div>
        </div>
        
        <div
          className="transition-all duration-1000 group-hover:-translate-y-[100px]"
          onClick={(e) => {
            e.stopPropagation();
            addProductToCart(id);
          }}
        >
          <div className="flex items-center justify-center rounded-full bg-main-color opacity-80 w-[48px] h-[48px] transition-all duration-500 hover:opacity-100 hover:bg-main-color-hover">
            <MdAddShoppingCart className="text-lg" />
          </div>
        </div>
        
        <div
          className="transition-all duration-1400 group-hover:-translate-y-[100px]"
          onClick={(e) => {
            e.stopPropagation();
            goTOProduct(id);
          }}
        >
          <div className="flex items-center justify-center rounded-full bg-main-color opacity-80 w-[48px] h-[48px] transition-all duration-500 hover:opacity-100 hover:bg-main-color-hover">
            <FaRegEye className="text-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
