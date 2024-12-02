export function VehicleCardSkeleton() {
  return (
    <div className="max-w-[320px] items-center bg-white border border-gray-200 w-full flex flex-col mt-8 min-w-[230px] rounded-lg overflow-hidden ml-1 mr-1 mb-8 transition duration-200 ease-in-out hover:scale-105 scale-100">
      <div className="w-full rounded-lg relative">
        <div className="bg-gray-300 h-[235.8px] animate-pulse"></div>
      </div>
      <div className=" mt-4 flex justify-between pl-2 pr-2">
        <div className="bg-gray-300 h-[32px] w-[120px] animate-pulse rounded-xl"></div>
      </div>
      <div className="w-full pl-2 pr-2 pb-1">
        <div className="bg-gray-300 h-[20px] animate-pulse rounded-xl mt-2"></div>
      </div>

      <div className="flex justify-between gap-1">
        <div className="bg-gray-300 h-[32px] w-[120px] animate-pulse rounded-xl"></div>
      </div>

      <div className="w-full">
        <div className="my-4 py-1 flex mx-6 justify-between border-y border-gray-300">
          <div className="flex-row min-w-[60px] min-h-[25px] justify-between items-center bg-gray-300 animate-pulse rounded-full py-1"></div>
          <div className="min-w-[60px] min-h-[25px] bg-gray-300 animate-pulse rounded-full py-1"></div>
          <div className="min-w-[60px] min-h-[25px] bg-gray-300 animate-pulse rounded-full py-1 "></div>
        </div>
      </div>

      <div className="min-w-[150px] min-h-[26px] my-[2px] bg-gray-300 animate-pulse rounded-full"></div>
      <div className="min-w-[200px] min-h-[17.5px] bg-gray-300 animate-pulse rounded-full"></div>

      <div className="pt-4 pb-4 flex justify-between pl-2 pr-2">
        <div className="magicborder rounded-full">
          <div className="animate-pulse cursor-pointer px-4 py-[10px] text-center no-underline transition-all duration-150 ease-in-out select-none align-middle text-sm font-semibold font-open-sans-condensed sm:font-open-sans uppercase leading-tight tracking-tight">
            View Details
          </div>
        </div>
      </div>
    </div>
  );
}
