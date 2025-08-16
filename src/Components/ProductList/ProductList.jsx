import Card from './../Card/Card';
import NoProductFound from './../../Pages/NoProductFound/NoProductFound';

export default function ProductList({ products, isProductsLoading, numberOfPages }) {
  if (isProductsLoading) {
    return (
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
    );
  }

  return (
    <>{
      numberOfPages === 0 ?
      <NoProductFound/>
      :
      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
      {products.map((product) => (
        <div key={product.id} className="h-full">
          <Card {...product} />
        </div>
      ))}
    </div>
    }</>
  );
}
