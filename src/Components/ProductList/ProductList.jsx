import Card from './../Card/Card';
import NoProductFound from './../../Pages/NoProductFound/NoProductFound';

export default function ProductList({ products, isProductsLoading, numberOfPages, getLimitByWidth }) {
  if (isProductsLoading) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
              {Array.from({
                length: getLimitByWidth(),
              }).map((_, index) => (
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
                          <div className="rounded bg-gray-300 h-5 w-5"></div>
                        </div>
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
