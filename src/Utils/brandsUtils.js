import axios from "axios";

// Check if a brand has available products
export async function isBrandAvailable(id) {
  try {
    const url = `https://ecommerce.routemisr.com/api/v1/products?brand=${id}`;
    const { data } = await axios.get(url);
    return data.results > 0;
  } catch (error) {
    console.log(error.response?.data?.message || error.message);
    return false;
  }
}

// Get all brands with their availability
export default async function fetchAllBrandsWithAvailability() {
  try {
    const response = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/brands"
    );
    const data = response.data.data;

    const brandsWithAvailability = await Promise.all(
      data.map(async (brand) => {
        const available = await isBrandAvailable(brand._id);
        return {
          name: brand.name,
          image: brand.image,
          id: brand._id,
          available: available,
        };
      })
    );

    return brandsWithAvailability;
  } catch (error) {
    console.log(error?.response?.data?.message || error.message || error);
    return [];
  }
}
