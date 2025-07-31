import React from 'react'
import '../HeroSection/HeroSection.css'
import sliderImg1 from '../../assets/images/slider-image-1.jpeg'
import sliderImg2 from '../../assets/images/slider-image-2.jpeg'
import sliderImg3 from '../../assets/images/slider-image-3.jpeg'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation } from 'swiper/modules';


export default function HeroSection() {
  return (
    <section className='pt-21 grid grid-cols-1 grid-rows-3 md:grid-cols-3 md:grid-rows-1'>
        <div className='hero h-full row-span-2 md:col-span-2 md:row-span-1'>
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          loop={true}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper !w-full !h-full"
        >
          <SwiperSlide className='bg-cover bg-center bg-no-repeat cursor-pointer transition-all duration-500'
          style={{ backgroundImage: `url(${sliderImg3})` }}>
          </SwiperSlide>
          <SwiperSlide className='bg-cover bg-center bg-no-repeat cursor-pointer transition-all duration-500'
          style={{ backgroundImage: `url(${sliderImg1})` }}>
          </SwiperSlide>
          <SwiperSlide className='bg-cover bg-center bg-no-repeat cursor-pointer transition-all duration-500'
          style={{ backgroundImage: `url(${sliderImg2})` }}>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-1 md:grid-rows-2'>
        <div>
          <img src={sliderImg1} alt='bag of vegetables' className='w-full h-full md:w-auto'/>
        </div>
        <div>
          <img src={sliderImg2} alt='wafer rolls' className='w-full h-full md:w-auto'/>
        </div>
      </div>
    </section>
  )
}
