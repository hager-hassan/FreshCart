import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import fetchAllBrandsWithAvailability from '../../Utils/brandsUtils'

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();

  async function getAllBrands() {
    setIsLoading(true)
    try {
      const response = await fetchAllBrandsWithAvailability();
      setBrands(response);
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    } finally{
      setIsLoading(false)
    }
  }

  function goToProducts(id){
    navigate(`/brand/${id}`);
  }

  useEffect(() => {
    getAllBrands();
  }, []);

  if(isLoading){
    return(
          <>
      <section className='pt-21 w-full bg-white'>
        <header className='pb-5'>
          <h2 className='text-center text-gray-300 text-lg py-2 tracking-[1px] font-semibold border-[1px] border-gray-200 border-l-0 border-r-0 animate-pulse'>Shop by brand</h2>
        </header>
      
        <div className='pb-12 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:gap-y-10'>
          {
            Array.from({length: 10}).map((_,index)=>{
              return(
                <>
                  <div
                key={index}
                className='p-2 mb-10 mx-auto w-fit bg-gray-200 rounded-xl overflow-hidden animate-pulse'
                >
                  <div className='w-[200px] h-[200px] bg-gray-300 rounded-xl'></div>
                </div>
                </>
              )
            })
          }
        </div>
      </section>
    </>
    )
  }

  return (
    <section className='pt-21 w-full'>
        <header className='pb-5'>
          <h2 className='text-center text-main-color text-lg py-2 tracking-[1px] font-semibold border-[1px] border-gray-200 border-l-0 border-r-0'>Shop by brand</h2>
        </header>

        <div className='pb-12 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:gap-y-10'>
          { brands &&
            brands.map((brand) => (
                <div key={brand.id}
                className='cursor-pointer'
                onClick={ () => goToProducts(brand.id) }
                >
                    <div className='p-2 mx-auto w-fit bg-white shadow-md rounded-xl overflow-hidden group'>
                    <div className={brand.available ?
                    'w-[200px] h-[200px] flex items-center justify-center overflow-hidden rounded-xl transition-all duration-700 group-hover:scale-110'
                    :
                    'w-[200px] h-[200px] flex items-center justify-center overflow-hidden rounded-xl relative transition-all duration-700 group-hover:scale-110'
                    }
                    >
                    <img src={brand.image} className='w-full'/>
                    {
                      !brand.available &&
                      <span className='absolute w-full top-1/2 -translate-y-1/2 uppercase text-white text-center text-sm font-semibold bg-[#fb2c36b7]'>out off stock</span>
                    }
                    </div>
                  </div>

                  <div className='mt-3'>
                    <h2 className='text-center text-main-color-hover font-bold'>{brand.name}</h2>
                  </div>
                </div>
              )
            )
          }
        </div>
    </section>
  )
}
