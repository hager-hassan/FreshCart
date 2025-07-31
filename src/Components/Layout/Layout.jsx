import React, { useContext } from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Loader from '../Loader/Loader';
import { AuthContext } from './../../Context/Auth.context';
import { useLocation } from 'react-router-dom';
import ScrollToTop from '../ScrollToTop/ScrollToTop';

export default function Layout() {
  const {loading} = useContext(AuthContext);
  const location = useLocation();

  const isProductPage = location.pathname === '/products';

  return (
    <>
      <Navbar/>  
      <main className={`flex-1 flex flex-col items-center justify-center ${!isProductPage ? 'container' : ''}`}>
        {loading ? <Loader/> 
        :
        <Outlet/>}
      </main>
      <Footer/>
      <ScrollToTop/>
    </>
  )
}
