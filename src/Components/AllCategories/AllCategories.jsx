import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import "../AllCategories/AllCategories.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import fetchAllCategoriesWithAvailability from "../../Utils/categoriesUtils";

import { Pagination, Navigation } from "swiper/modules";

export default function AllCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleClick(id) {
    navigate(`/category/${id}`);
  }

  async function getAllCategories() {
    setIsLoading(true);
    try {
      const response = await fetchAllCategoriesWithAvailability();
      setCategories(response);
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  if (isLoading) {
    return (
      <>
        <div className="bg-white w-full !h-72 pt-3 all-categories">
          <div className="bg-gray-300 animate-pulse h-72 w-full rounded mb-2"></div>
        </div>
      </>
    );
  }

  return (
    <div className="w-full pt-3 all-categories">
      <header>
        <h2 className="text-main-color-hover font-semibold mb-2 md:text-lg">
          Shope now by popular categories
        </h2>
      </header>
      {categories && (
        <div>
          <Swiper
            slidesPerView={6}
            spaceBetween={0}
            loop={true}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper w-full  h-82"
            breakpoints={{
              0: {
                slidesPerView: 2,
              },
              640: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 5,
              },
              1200: {
                slidesPerView: 6,
              },
            }}
          >
            {categories.map((cate) => {
              return (
                <SwiperSlide
                  key={cate.id}
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => {
                    handleClick(cate.id);
                  }}
                >
                  <div
                    className="w-full h-72 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${cate.image})` }}
                  ></div>
                  <h3 className="w-full text-center text-main-color-hover font-bold bg-gray-200 py-2">
                    {cate.name}
                  </h3>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      )}
    </div>
  );
}
