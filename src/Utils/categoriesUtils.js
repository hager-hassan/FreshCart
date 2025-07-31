import axios from "axios";

// Check if a brand has available products
export async function isCategoryAvailable(id) {
  try {
    const url = `https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`;
    const { data } = await axios.get(url);
    return data.results > 0;
  } catch (error) {
    console.log(error.response?.data?.message || error.message);
    return false;
  }
}

// Get all brands with their availability
export default async function fetchAllCategoriesWithAvailability() {
  try {
    const response = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    const data = response.data.data;

    const categoriesWithAvailability = await Promise.all(
      data.map(async (category) => {
        const available = await isCategoryAvailable(category._id);
        return {
          name: category.name,
          image: category.image,
          id: category._id,
          available: available,
        };
      })
    );

    return categoriesWithAvailability;
  } catch (error) {
    console.log(error?.response?.data?.message || error.message || error);
    return [];
  }
}
