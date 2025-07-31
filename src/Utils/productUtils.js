import axios from "axios";

export default async function fetchProduct(productID) {
    try{
        const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${productID}`
      );

      const productDetails = response.data.data;

      const product = {
        id: productDetails.id,
        brand: productDetails.brand?.name || "No Brand",
        title: productDetails.title,
        category: productDetails.category?.name || "No Category",
        imageCover: productDetails.imageCover,
        rating: productDetails.ratingsAverage,
        price: productDetails.price,
        priceAfterDiscount: productDetails.priceAfterDiscount ?? null,
        quantity: productDetails.quantity,
        imageOne: productDetails.images[0],
        imageTwo: productDetails.images[1],
        imageThree: productDetails.images[2],
      };

      return product;
    } catch(error){
        console.log(error?.response?.data?.message || error.message || error);
        return {};
    }
}