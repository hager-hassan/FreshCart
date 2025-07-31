import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { MdDoubleArrow } from "react-icons/md";
import fetchAllBrandsWithAvailability from "../../Utils/brandsUtils";
import fetchAllCategoriesWithAvailability from "../../Utils/categoriesUtils";
import fetchProducts from "../../Utils/productsUtils";
import ProductList from "../../Components/ProductList/ProductList";
import RangePriceSlider from "../../Components/RangePriceSlider/RangePriceSlider";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);
  const [isProductsLoading, setIsProductsLoading] = useState(false);
  const [hasFetchedOnce, setHasFetchedOnce] = useState(false);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [staticMinPrice , setStaticMinPrice] = useState(0);
  const [staticMaxPrice , setStaticMaxPrice] = useState(0);
  const [page, setPage] = useState(1);
  const [checkedBrands, setCheckedBrands] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [sort, setSort] = useState("+price");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [params, setParams] = useState({
    limit: '8',
    page: page,
    brand: checkedBrands,
    category: checkedCategories,
    sort: sort,
    maxPrice: maxPrice,
    minPrice: minPrice,
  });

  function handleSortChange(event) {
    setSort(event.target.value);
  }

  function handelCategoryChange(event) {
    const value = event.target.value;

    if (event.target.checked) {
      const updatedCategories = [...checkedCategories, value];
      setCheckedCategories(updatedCategories);
      setPage(1);
      setParams((prev) => ({
        ...prev,
        page: 1,
        category: updatedCategories,
      }));
    } else {
      const updatedCategories = checkedCategories.filter(
        (category) => category !== value
      );
      setCheckedCategories(updatedCategories);
      setPage(1);
      setParams((prev) => ({
        ...prev,
        page: 1,
        category: updatedCategories,
      }));
    }
  }

  function handelBrandChange(event) {
    const value = event.target.value;

    if (event.target.checked) {
      const updatedBrands = [...checkedBrands, value];
      setCheckedBrands(updatedBrands);
      setPage(1);
      setParams((prev) => ({
        ...prev,
        page: 1,
        brand: updatedBrands,
      }));
    } else {
      const updatedBrands = checkedBrands.filter((brand) => brand !== value);
      setCheckedBrands(updatedBrands);
      setPage(1);
      setParams((prev) => ({
        ...prev,
        page: 1,
        brand: updatedBrands,
      }));
    }
  }

  function handlePriceChange(event) {
    const value = Number(event.target.value);
    if(event.target.id === 'minRange'){
      setMinPrice(value);
      setPage(1);
      setParams((prev) => ({
        ...prev,
        page:1,
        minPrice:value,
      }));
    } else if(event.target.id === 'maxRange'){
      setMaxPrice(value);
      setPage(1);
      setParams((prev) => ({
        ...prev,
        page:1,
        maxPrice:value,
      }));
    }
  }

  async function getAvailableBrands() {
    try {
      const response = await fetchAllBrandsWithAvailability();
      setBrands(
        response.filter((brand) => {
          return brand.available;
        })
      );
    } catch (error) {
      console.log(error?.response?.data?.message || error.message || error);
    }
  }

  async function getAvailableCategories() {
    try {
      const response = await fetchAllCategoriesWithAvailability();
      setCategories(
        response.filter((category) => {
          return category.available;
        })
      );
    } catch (error) {
      console.log(error?.response?.data?.message || error.message || error);
    }
  }

  async function getAllProducts() {
    if (setHasFetchedOnce) {
      setIsProductsLoading(true);
    }
    try {
      const response = await fetchProducts(params);
      setProducts(response.products);
      setNumberOfPages(response.numberOfPages);
    } catch (error) {
      console.log(error?.response?.data?.message || error.message || error);
    } finally {
      setIsProductsLoading(false);
    }
  }

  async function getAllProductsWithNoLimit(parameters) {
    if (setHasFetchedOnce) {
      setIsProductsLoading(true);
    }
    try {
      const {products} = await fetchProducts(parameters);

      const priceArr = products.map((product) =>{
        return product.price;
      });

      priceArr.sort((a, b) => a - b);
      setStaticMinPrice(priceArr[0]);
      setMinPrice(priceArr[0]);
      setStaticMaxPrice(priceArr[priceArr.length - 1]);
      setMaxPrice(priceArr[priceArr.length - 1]);
    } catch (error) {
      console.log(error?.response?.data?.message || error.message || error);
    } finally {
      setIsProductsLoading(false);
    }
  }

  async function fetchAll() {
    setIsLoading(true);
    try {
      await Promise.all([
        getAvailableBrands(),
        getAvailableCategories(),
        getAllProducts(),
        getAllProductsWithNoLimit(),
      ]);
      setHasFetchedOnce(true);
    } catch (error) {
      console.log(error?.response?.data?.message || error.message || error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAll();
  }, []);

  useEffect(() => {
    if (hasFetchedOnce) {
      getAllProducts();
    }
  }, [params]);


  if (isLoading) {
    return (
      <section className="w-full pt-21">
        <div className="mx-auto sm:max-w-[620px] md:max-w-[720px] lg:max-w-full lg:grid lg:grid-cols-4 lg:gap-5 xl:gap-7">
          <div className="h-full w-full bg-gray-300 animate-pulse rounded-se"></div>

          <div className="lg:col-span-3 lg:pe-15">
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div className="h-full" key={index}>
                  <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg relative">
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
                    </div>

                    <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-row items-center justify-center gap-2.5 opacity-0">
                      <div className="animate-pulse">
                        <div className="flex items-center justify-center rounded-full bg-gray-300 opacity-80 w-12 h-12"></div>
                      </div>
                      <div className="animate-pulse">
                        <div className="flex items-center justify-center rounded-full bg-gray-300 opacity-80 w-12 h-12"></div>
                      </div>
                      <div className="animate-pulse">
                        <div className="flex items-center justify-center rounded-full bg-gray-300 opacity-80 w-12 h-12"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full mt-8 mb-12">
              <ul className="flex items-center justify-center gap-2">
                {Array.from({ length: 7 }, (_, index) => index).map((num) => (
                  <li
                    key={num}
                    className="bg-gray-300 animate-pulse rounded w-7.5 h-8"
                  ></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full relative pt-21 mb-12 lg:static">
      <div className="mx-auto sm:max-w-[620px] md:max-w-[720px] lg:max-w-full lg:grid lg:grid-cols-4 lg:gap-5 xl:gap-7">
        <div
          className={`
        absolute z-6666 -bottom-12 top-21 transition-all duration-1000
        ${isSidebarOpened ? "left-0" : "left-[-280px]"} 
        lg:static lg:-mb-12.5`}
        >
          <aside className="min-h-[800px] h-full relative bg-light-color p-7 lg:rounded-se">
            <form className="space-y-5">
              <div>
                <header className="mb-3">
                  <span className="uppercase text-main-color-hover font-bold tracking-[1px] text-[17px] inline-block pb-0.5 px-0.5 border-b-1 border-b-main-color-hover">
                    sort
                  </span>
                </header>

                <h2 className="text-main-color-hover font-semibold text-[15px] mb-1.5">
                  Price :
                </h2>

                <label className="flex items-center gap-2 cursor-pointer mb-0.5">
                  <input
                    type="radio"
                    name="price"
                    value="+price"
                    defaultChecked
                    className="peer hidden"
                    onChange={(event) => {
                      setParams((prev) => ({
                        ...prev,
                        sort: event.target.value,
                      }));
                      handleSortChange(event);
                    }}
                  />
                  <span className="w-2.5 h-2.5 rounded-full outline-2 outline-main-color border-2 border-white peer-checked:bg-main-color transition"></span>
                  <span className="text-sm font-semibold text-main-color-hover">
                    Small to Big
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="price"
                    value="-price"
                    className="peer hidden"
                    onChange={(event) => {
                      setParams((prev) => ({
                        ...prev,
                        sort: event.target.value,
                      }));
                      handleSortChange(event);
                    }}
                  />
                  <span className="w-2.5 h-2.5 rounded-full outline-2 outline-main-color border-2 border-white peer-checked:bg-main-color transition"></span>
                  <span className="text-sm font-semibold text-main-color-hover">
                    Big to Small
                  </span>
                </label>
              </div>

              <div>
                <header className="mb-3">
                  <span className="uppercase text-main-color-hover font-bold tracking-[1px] text-[17px] inline-block pb-0.5 px-0.5 border-b-1 border-b-main-color-hover">
                    filter
                  </span>
                </header>

                <div className="mb-4">
                  <h2 className="text-main-color-hover font-semibold text-[15px] mb-1.5">
                    Price Range :
                  </h2>

                  <RangePriceSlider 
                  staticMinPrice={staticMinPrice} staticMaxPrice={staticMaxPrice}
                  minPrice={minPrice} maxPrice={maxPrice}  handlePriceChange={handlePriceChange}
                  />
                </div>

                <div className="mb-4">
                  <h2 className="text-main-color-hover font-semibold text-[15px] mb-1.5">
                    Categories :
                  </h2>

                  {categories.map((category) => {
                    return (
                      <div
                        key={category.id}
                        className="flex items-center gap-2 mb-1"
                      >
                        <input
                          type="checkbox"
                          id={category.name}
                          value={category.id}
                          name={category.name}
                          className="checkbox w-4 h-4 rounded p-0.5 before:bg-main-color border-2 border-main-color"
                          onChange={(event) => {
                            handelCategoryChange(event);
                          }}
                        />

                        <label
                          htmlFor={category.name}
                          className="text-sm font-semibold text-main-color-hover cursor-pointer"
                        >
                          {category.name}
                        </label>
                      </div>
                    );
                  })}
                </div>

                <div className="mb-4">
                  <h2 className="text-main-color-hover font-semibold text-[15px] mb-1.5">
                    Brands :
                  </h2>

                  {brands.map((brand) => {
                    return (
                      <div
                        key={brand.id}
                        className="flex items-center gap-2 mb-1"
                      >
                        <input
                          type="checkbox"
                          id={brand.name}
                          value={brand.id}
                          name={brand.name}
                          className="checkbox w-4 h-4 rounded p-0.5 before:bg-main-color border-2 border-main-color"
                          onChange={(event) => {
                            setPage(1);
                            handelBrandChange(event);
                          }}
                        />

                        <label
                          htmlFor={brand.name}
                          className="text-sm font-semibold text-main-color-hover cursor-pointer"
                        >
                          {brand.name}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </form>

            <div className="absolute top-0 -right-10.5 bg-light-color p-1.5 ps-4 lg:hidden">
              <label className="swap swap-flip">
                <input type="checkbox" />

                <div className="swap-on">
                  <MdDoubleArrow
                    className=" rotate-y-180 text-main-color text-4xl"
                    onClick={() => setIsSidebarOpened(false)}
                  />
                </div>
                <div className="swap-off">
                  <MdDoubleArrow
                    className="text-main-color text-4xl"
                    onClick={() => setIsSidebarOpened(true)}
                  />
                </div>
              </label>
            </div>
          </aside>
        </div>

        <div className="lg:col-span-3 lg:pe-15">
          <ProductList
            products={products}
            isProductsLoading={isProductsLoading}
            numberOfPages={numberOfPages}
          />

          <div className="w-full mt-8">
            <ul className="flex items-center justify-center gap-2">
              {Array.from(
                { length: numberOfPages },
                (_, index) => index + 1
              ).map((num) => (
                <li
                  key={num}
                  onClick={() => {
                    setParams((prev) => ({ ...prev, page: num }));
                    setPage(num);
                  }}
                  className={`rounded px-3 py-1 cursor-pointer font-semibold text-white transition-all duration-500
                  ${
                    page === num
                      ? "bg-main-color-hover "
                      : "bg-main-color  hover:bg-main-color-hover"
                  }`}
                >
                  {num}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
