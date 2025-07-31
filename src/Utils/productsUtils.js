import axios from "axios";

export default async function fetchProducts({
  limit = "",
  page = "",
  brand = [],
  category = [],
  sort = "+price",
  maxPrice = '',
  minPrice = '',
} = {}) {
  try {
    const params = [];

    if (limit) params.push(`limit=${limit}`);
    if (page) params.push(`page=${page}`);
    if (brand){
      for(let i = 0; i < brand.length ; ++i){
        params.push(`brand=${brand[i]}`);
      }
    }
    if (category){
      for(let i = 0; i < category.length ; ++i){
        params.push(`category[in]=${category[i]}`);
      }
    }
    if (sort) params.push(`sort=${sort}`);
    if (maxPrice) params.push(`price[lte]=${maxPrice}`);
    if (minPrice) params.push(`price[gte]=${minPrice}`);

    const paramsString = params.join("&");
    const url = `https://ecommerce.routemisr.com/api/v1/products?${paramsString}`;

    const response = await axios.get(url);
    const data = response.data.data;

    const Products = data.map((product) => {
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

    return {
      products: Products,
      numberOfPages: response.data.metadata.numberOfPages,
    };
  } catch (error) {
    console.log(error?.response?.data?.message || error.message || error);
    return {
      products: [],
      numberOfPages: 0,
    };
  }
}
