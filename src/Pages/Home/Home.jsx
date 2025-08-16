import React, { useEffect, useState } from "react";
import HeroSection from "../../Components/HeroSection/HeroSection";
import AllCategories from "../../Components/AllCategories/AllCategories";
import Card from "./../../Components/Card/Card";
import fetchProducts from "../../Utils/productsUtils";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getAllProducts(params) {
    setIsLoading(true);
    try {
      const response = await fetchProducts(params);
      setProducts(response.products);
    } catch (error) {
      console.log(error?.response?.data?.message || error.message || error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllProducts({
      limit: 15,
      page: 1,
      brand: [],
      category: [],
      sort: "+price",
      maxPrice: "",
      minPrice: "",
    });
  }, []);

  if (isLoading) {
    return (
      <>
        <HeroSection />
        <AllCategories />
        <div className="w-full pb-12">
          <header className="flex items-center justify-center">
            <h2
              className="relative text-center text-gray-300 font-black text-xl my-12 p-2 animate-pulse
          after:absolute after:bg-gray-300 after:h-[3px] after:w-1/2 after:bottom-0 after:left-1/2 after:-translate-x-1/2
          sm:text-2xl lg:text-[26px]
          "
            >
              Shope now by popular products
            </h2>
          </header>

          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 15 }).map((_, index) => (
              <div className="h-ful" key={index}>
                <div className="max-w-[290px] sm:max-w-sm mx-auto bg-white border border-gray-200 rounded-lg relative">
                  <div className="animate-pulse">
                    <div className="rounded-t-lg bg-gray-300 h-75"></div>
                  </div>

                  <div className="p-5 animate-pulse">
                    <header>
                      <div className="bg-gray-300 h-4 rounded mb-2"></div>
                      <div className="bg-gray-300 h-4 rounded mb-2"></div>
                      <div className="bg-gray-300 h-4 rounded mb-2"></div>
                    </header>

                    <div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="bg-gray-300 h-4 rounded w-1/2"></div>
                        <div className="bg-gray-300 h-4 rounded w-1/4"></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 lg:hidden">
                      <div className="rounded bg-gray-300 h-6 w-25"></div>
                      <div className="rounded bg-gray-300 h-4.5 w-5"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <HeroSection />
      <AllCategories />

      <div className="w-full pb-12">
        <header className="flex items-center justify-center">
          <h2
            className="relative text-center text-slate-blue dark:text-white font-black text-xl my-12 p-2 
          after:absolute after:bg-main-color after:h-[3px] after:w-1/2 after:bottom-0 after:left-1/2 after:-translate-x-1/2
          sm:text-2xl lg:text-[26px]"
          >
            Shope now by popular products
          </h2>
        </header>

        {Array.isArray(products) && products.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((product) => {
              return (
                <div key={product.id} className="h-full">
                  <Card {...product} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}