import '../RangePriceSlider/RangePriceSlider.css'

export default function RangePriceSlider({staticMaxPrice , staticMinPrice , maxPrice , minPrice , handlePriceChange}) {
  return (
    <div className="rounded-lg range-slider">
      <div className="relative mt-4 slider-container">
        <input 
          type="range" 
          id="minRange"
          min={staticMinPrice} 
          max={staticMaxPrice} 
          value={minPrice}
          onChange={(event) => {
            handlePriceChange(event);
          }}
        />

        <input
          type="range"
          id="maxRange"
          min={staticMinPrice}
          max={staticMaxPrice}
          value={maxPrice}
          onChange={(event) => {
            handlePriceChange(event);
          }}
        />
        <div className="relative w-full h-2 bg-gray-300 rounded-md">
          <div
            id="rangeTrack"
            className="absolute h-2 bg-gradient-to-r from-main-color-hover to-main-color rounded-md"
          />
        </div>
      </div>


      <div className="flex justify-between mt-3 text-sm font-semibold text-main-color-hover">
        <span>
          Min: <span id="minValue" className='text-gray-700'>EGP {minPrice}</span>
        </span>
        <span>
          Max: <span id="maxValue" className='text-gray-700'>EGP {maxPrice}</span>
        </span>
      </div>
    </div>
  );
}