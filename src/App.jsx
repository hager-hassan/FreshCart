import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Notfound from "./Pages/Notfound/Notfound";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import Home from "./Pages/Home/Home";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";
import Layout from "./Components/Layout/Layout";
import UnAuthRoutes from "./Components/UnAuthRoutes/UnAuthRoutes";
import AuthContextProvider from "./Context/Auth.context";
import Category from "./Pages/Category/Category";
import Categories from "./Pages/Categories/Categories";
import Product from "./Pages/Product/Product";
import Products from "./Pages/Products/Products";
import Brands from "./Pages/Brands/Brands";
import Brand from "./Pages/Brand/Brand";
import WishContextProvider from "./Context/Wish.context";
import WishList from "./Pages/WishList/WishList";
import CartContextProvider from "./Context/Cart.context";
import Cart from "./Pages/Cart/Cart";
import Orders from "./Pages/Orders/Orders";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        {" "}
        <Layout />{" "}
      </ProtectedRoutes>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "categories", element: <Categories /> },
      { path: "products", element: <Products /> },
      { path: "brands", element: <Brands /> },
      { path: "allorders", element: <Orders /> },
      { path: "wishList", element: <WishList /> },
      { path: "cart", element: <Cart /> },
      { path: "category/:categoryId", element: <Category /> },
      { path: "product/:productId", element: <Product /> },
      { path: "brand/:brandId", element: <Brand /> },
      { path: "*", element: <Notfound /> },
    ],
  },

  {
    path: "",
    element: (
      <UnAuthRoutes>
        <Layout />
      </UnAuthRoutes>
    ),
    children: [
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "forgetPassword", element: <ForgetPassword /> },
      { path: "resetPassword", element: <ResetPassword /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

function App() {
  return (
    <>
      <AuthContextProvider>
          <WishContextProvider>
            <CartContextProvider>
              <RouterProvider router={routes} />
              <Toaster />
            </CartContextProvider>
          </WishContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
