import React from 'react'
import amazon from '../../assets/images/amazon-pay.png'
import americanExpress from '../../assets/images/American-Express-Color.png'
import mastercard from '../../assets/images/mastercard.webp'
import paypal from '../../assets/images/paypal.png'
import googlePlay from '../../assets/images/get-google-play.png'
import appleStore from '../../assets/images/get-apple-store.png'

export default function Footer() {
  return (
    <footer className='bg-light-color py-7 w-full'>
      <div className='container pb-7.5'>
        <div>
          <h3 className='text-slate-blue dark:text-white text-lg font-bold'>Get the FreshCart app</h3>
          <p className='text-sm my-2 text-gray-500 dark:text-gray-300 leading-5.5'>We will send you a link, open it in your phone to download the app.</p>
        </div>

        <div className='w-full flex items-center justify-between flex-wrap gap-5 my-4.5'>
          <input type='email' placeholder='Email...'
            className='bg-white px-3 py-1.5 border border-gray-300 rounded-sm inline-block flex-1 text-gray-600 focus:border-gray-300 outline-0 text-[13px] lg:text-[15px]'
          />
          <button className='btn-primary !px-6 !py-1.5 uppercase text-[13px] lg:text-[15px]' type='submit'>Share App Link</button>
        </div>

        <div className='flex items-center justify-between flex-wrap gap-3 border border-t-gray-300 border-b-gray-300 border-s-0 border-e-0 py-5.5 mt-3'>
          <div className='flex items-center justify-start gap-2 flex-wrap'>
            <span className='text-slate-blue dark:text-white'>Payment Partners</span>
            <div className='flex items-center gap-2'>
              <img src={amazon} alt='amazon' className='w-9'/>
              <img src={americanExpress} alt='americanExpress' className='w-9'/>
              <img src={mastercard} alt='mastercard' className='w-9'/>
              <img src={paypal} alt='paypal' className='w-9'/>
            </div>
          </div>

          <div className='flex items-center justify-start gap-2 flex-wrap'>
            <span className='text-slate-blue dark:text-white'>Get deliveries with FreshCart</span>
            <div className='flex items-center gap-1.5'>
              <img src={googlePlay} alt='googlePlay' className='w-20'/>
              <img src={appleStore} alt='appleStore' className='w-20'/>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}