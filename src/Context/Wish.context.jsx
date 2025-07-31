import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./Auth.context";
import toast from 'react-hot-toast';
import axios from "axios";
import fetchProduct from '../Utils/productUtils'

export const WishContext = createContext(null);

export default function WishContextProvider({ children }) {
  const { token } = useContext(AuthContext);
  const [productsIDs, setProductsIDs] = useState([]);
  const [isWishListLoading, setIsWishListLoading] = useState(false);
  const url = "https://ecommerce.routemisr.com/api/v1/wishlist";
  const [wishList, setWishList] = useState([]);


  async function addToWishList(productID) {
    let loadingToast = toast.loading("adding..");
    try {
      const {data} = await axios.post(
        url,
        {
          productId: productID,
        },
        {
          headers: {
            token,
          },
        }
      );

      setProductsIDs(data.data);

      const product = await fetchProduct(productID);

      setWishList((prev) => [...prev ,product])
      toast.success('Product added successfully');
    } catch (error) {
      const message =
      error.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
    } finally{
      toast.dismiss(loadingToast);
    }
  }

  async function removeFromWishList(productID) {
    let loadingToast = toast.loading("removing..");
    try {
      let urlWithId = url+`/${productID}`;

      const {data} = await axios.delete(
        urlWithId,
        {
          headers: {
            token,
          },
        }
      );

      setProductsIDs(data.data);

      setWishList(wishList.filter((product) =>{
        return product.id !== productID;
      }));

      toast.success('Product removed successfully')
    } catch (error) {
      const message =
      error.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
    } finally{
      toast.dismiss(loadingToast);
    }
  }

  async function getWishList() {
    setIsWishListLoading(true);
    try {
      const response = await axios.get(url, {
        headers: {
          token: token,
        },
      });

      const products = response.data.data.map((product) => {
        return {
          id: product.id,
          brand: product.brand?.name || "No Brand",
          title: product.title,
          category: product.category?.name || "No Category",
          imageCover: product.imageCover,
          rating: product.ratingsAverage,
          price: product.price,
          priceAfterDiscount: product.priceAfterDiscount ?? null,
          quantity: product.quantity,
        };
      });

      setWishList(products);
      setProductsIDs(products.map((product) =>{
        return product.id;
      }))
    } catch (error) {
      console.log(error.response?.data?.message || error.message || error);
    } finally{
      setIsWishListLoading(false);
    }
  }

  useEffect(() => {
    getWishList();
  }, [token]);

  return (
    <WishContext.Provider 
    value={{ wishList, getWishList, addToWishList, productsIDs, removeFromWishList, isWishListLoading}}>
      {children}
    </WishContext.Provider>
  );
}
