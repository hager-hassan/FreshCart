import { useParams } from "react-router-dom";
import NoProductFound from "../NoProductFound/NoProductFound";
import { useEffect, useState } from "react";
import Card from "./../../Components/Card/Card";
import fetchProducts from "../../Utils/productsUtils";

export default function Category() {
  const { categoryId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isCategoryAvailable, setIsCategoryAvailable] = useState(false);
  const [products, setProducts] = useState([]);

  async function getProducts(params) {
    setIsLoading(true);
    try {
      const response = await fetchProducts(params);
      if (response.numberOfPages !== 0) {
        setIsCategoryAvailable(true);
      }
      setProducts(response.products);
    } catch (error) {
      console.log(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProducts({
      limit: "",
      page: "",
      brand: [],
      category: [categoryId],
      sort: "+price",
      maxPrice: "",
      minPrice: "",
    });
  }, []);

  if (isLoading) {
    return (
      <section className="w-full pb-12 pt-21">
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, index) => (
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

                  <div className="lg:hidden">
                    <div className="flex items-center justify-between mt-4">
                      <div className="rounded bg-gray-300 h-6 w-25"></div>
                      <div className="rounded bg-gray-300 h-4.5 w-5"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <>
      {!isCategoryAvailable ? (
        <NoProductFound />
      ) : (
        <section className="w-full pb-12 pt-21">
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((product) => {
              return (
                <div key={product.id} className="h-full">
                  <Card {...product} />
                </div>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
}
