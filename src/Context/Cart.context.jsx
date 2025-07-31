import { createContext, useEffect, useContext, useState } from "react";
import { AuthContext } from "./Auth.context";
import axios from "axios";
import toast from "react-hot-toast";

export const CartContext = createContext(null);

export default function CartContextProvider({ children }) {
  const { token } = useContext(AuthContext);
  const [isCartLoading, setIsCartLoading] = useState(false);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [cartId, setCartId] = useState("");
  const [cart, setCart] = useState([]);
  const url = "https://ecommerce.routemisr.com/api/v1/cart";

  function setData(data){
    let totalCounts = 0; 
      setNumOfCartItems(data.numOfCartItems);
      setCartId(data.cartId);
      setTotalCartPrice(data.data.totalCartPrice);
      setCart(
        data.data.products.map((pro) => {
          totalCounts += pro.count;
          return {
            count: pro.count,
            price: pro.price,
            id: pro.product._id,
            title: pro.product.title,
            imageCover: pro.product.imageCover,
            category: pro.product.category.name,
            brand: pro.product.brand.name,
            quantity: pro.product.quantity,
          };
        })
      );
      setQuantity(totalCounts);
  }

  async function getCart() {
    setIsCartLoading(true);
    try {
      const { data } = await axios.get(url, {
        headers: {
          token: token,
        },
      });

      setData(data);
    } catch (error) {
      console.log(error.response?.data?.message);
    } finally{
      setIsCartLoading(false);
    }
  }

  async function addProductToCart(id) {
    const loadingToast = toast.loading("adding..");
    try {
        await axios.post(
        url,
        {
          productId: id,
        },
        {
          headers: {
            token: token,
          },
        }
      );

      await getCart();
      toast.success("Product added successfully");
    } catch (error) {
      const message = error.response?.data?.message;
        toast.error(message);
    } finally {
      toast.dismiss(loadingToast);
    }
  }

  async function removeProductFromCart(id) {
    const loadingToast = toast.loading("removing..");
    try {
      const urlForDeletion = `${url}/${id}`;
      const { data } = await axios.delete(urlForDeletion, {
        headers: {
          token: token,
        },
      });

      setData(data);
      toast.success("Product removed successfully");
    } catch (error) {
      const message = error.response?.data?.message;
        toast.error(message);
    } finally {
      toast.dismiss(loadingToast);
    }
  }

  async function updateCount(id , count) {
    try {
      const urlForUpdate = `${url}/${id}`;
      const { data } = await axios.put(urlForUpdate,{
        count:count
      }, {
        headers: {
          token: token,
        },
      });

      setData(data);
    } catch (error) {
      console.log(error.response?.data?.message)
    }
  }

  async function removeAllProducts() {
    const loadingToast = toast.loading("clearing..");
    try {
      await axios.delete(url,{
        headers:{
          token:token
        }
      });
      await getCart();

      toast.success('Cart cleared successfully');
    } catch (error) {
      console.log(error?.response?.data?.message || error.message || error);
      toast.error('Please try again');
    } finally {
      toast.dismiss(loadingToast);
    }
  }

  useEffect(() => {
    getCart();
  }, [token]);

  return (
    <CartContext.Provider
      value={{ cart, numOfCartItems, cartId, addProductToCart, isCartLoading, getCart,
      removeProductFromCart, updateCount, quantity, totalCartPrice, removeAllProducts}}
    >
      {children}
    </CartContext.Provider>
  );
}
