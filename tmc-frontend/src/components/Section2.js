import { Link } from "react-router-dom";
import { useState } from "react";

export default function Section2() {
  const [tab, setTab] = useState(1);

  return (
    <div className="relative w-full  custom-gradients flex justify-center px-5 md:px-0 py-[50px] md:py-[100px]">
      <div className="relative w-full sm:px-4 flex max-w-[1280px] flex-col justify-between text-white items-center lg:items-start">
        <div className="flex flex-row w-fit justify-center items-center md:justify-start border-[1px] border-white rounded-full p-1">
          <div
            onClick={() => setTab(1)}
            className={`${
              tab === 1
                ? "bg-white text-black border-white"
                : "border-transparent hover:border-white hover:bg-opacity-50 hover:bg-white"
            } border-[1px] text-sm  rounded-full px-8 text-center py-3 hover:cursor-pointer mr-4 transition-all duration-1500`}
          >
            <div>How To Buy</div>
          </div>
          <div
            onClick={() => setTab(2)}
            className={`${
              tab === 2
                ? "bg-white text-black border-white"
                : "border-transparent hover:border-white hover:bg-opacity-50 hover:bg-white"
            } border-[1px] text-sm rounded-full px-8 text-center py-3 hover:cursor-pointer ml-4 transition-all duration-1500`}
          >
            <div>How To Sell</div>
          </div>
        </div>
        {tab === 1 ? (
          <div className="mt-6 lg:mt-[50px] flex flex-col lg:flex-row lg:justify-between ">
            <div className="flex flex-col justify-between lg:w-1/3 w-full">
              <div className="">
                <h2 className="text-white font-open-sans-condensed text-4xl md:text-6xl font-bold leading-10">
                  How To Buy
                </h2>
                <p className="mt-4 text-2xl">
                  We have a whole range of pick-up trucks, used vans for
                  business, and used cars for sale.
                </p>
              </div>
              <div className="flex justify-center items-center lg:justify-start">
                <Link
                  to="/vehicles-for-sale/used-trucks"
                  className="text-sm mt-4 lg:mt-0 border-2 border-white rounded-full w-full max-w-[320px] lg:w-[169px] text-center py-3 hover:text-black hover:bg-white hover:cursor-pointer"
                >
                  <div className="">VIEW OUR VEHICLES</div>
                </Link>
              </div>
            </div>
            <div className="mt-[50px] lg:mt-0 flex flex-col gap-2 items-start justify-between w-full lg:w-[62%]">
              <div className="flex flex-col">
                <div className="flex flex-row justify-left items-center">
                  <div className="w-2 h-2 bg-white rounded-full ml-4 mr-4"></div>
                  <h3 className="text-white font-open-sans-condensed text-2xl font-bold leading-8">
                    Buy Online
                  </h3>
                </div>
                <p className="mt-2">
                  Order online or over the phone with one of our consultants,
                  complete the transaction and we'll deliver the vehicle
                  directly to your home with the peace of mind of a money back
                  guarantee if you're not satisfied.
                </p>
              </div>
              <div className="md:mt-6 mt-4 flex flex-col">
                <div className="flex  h-fit flex-row justify-left items-center">
                  <div className="w-2 h-2 bg-white rounded-full ml-4 mr-4"></div>
                  <h3 className="text-white font-open-sans-condensed text-2xl font-bold leading-8 h-fit">
                    Click & Collect
                  </h3>
                </div>
                <div className="mt-2">
                  <p className="">
                    Order online or over the phone with one of our consultants,
                    complete the transaction and come to collect the vehicle
                    from our safe collection zone away from our showroom. All
                    with the peace of mind of a money back guarantee if you're
                    not satisfied.
                  </p>
                </div>
              </div>
              <div className="md:mt-6 mt-4 flex flex-col">
                <div className="flex flex-row justify-left items-center">
                  <div className="w-2 h-2 bg-white rounded-full ml-4 mr-4"></div>
                  <h3 className="text-white font-open-sans-condensed text-2xl font-bold leading-8 md: ">
                    Visit Our Showroom
                  </h3>
                </div>
                <p className=" md:  mt-2 ">
                  We operate a strictly no-pressure approach, allowing you to
                  take your own time to browse and inspect our vehicles.
                  Meanwhile, our trained specialists will always be on hand for
                  expert help and advice as and when you need it.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6 lg:mt-[50px] flex flex-col lg:flex-row lg:justify-between ">
            <div className="flex flex-col justify-between lg:w-1/3 w-full">
              <div className="">
                <h2 className="text-white font-open-sans-condensed text-4xl md:text-6xl font-bold leading-10">
                  How To Sell
                </h2>
                <p className="mt-4 text-2xl">
                  We have a whole range of pick-up trucks, used vans for
                  business, and used cars for sale.
                </p>
              </div>
              <div className="flex justify-center items-center lg:justify-start">
                <Link
                  to="/sell-your-vehicle"
                  className="text-sm mt-4 lg:mt-0 border-2 border-white rounded-full w-full max-w-[320px] lg:w-[169px] text-center py-3 hover:text-black hover:bg-white hover:cursor-pointer"
                >
                  <div className="">SELL YOUR VEHICLE</div>
                </Link>
              </div>
            </div>
            <div className="mt-[50px] lg:mt-0 flex flex-col gap-2 items-start justify-between w-full lg:w-[62%]">
              <div className="flex flex-col">
                <div className="flex flex-row justify-left items-center">
                  <div className="w-2 h-2 bg-white rounded-full ml-4 mr-4"></div>
                  <h3 className="text-white font-open-sans-condensed text-2xl font-bold leading-8">
                    Sell Online
                  </h3>
                </div>
                <p className="mt-2">
                  Simply enter your registration and some basic details and
                  we'll line up a valuation for you. If you're happy with the
                  price we'll get your vehicle collected with full payment on
                  arrival. No further haggling.
                </p>
              </div>
              <div className="md:mt-6 mt-4 flex flex-col">
                <div className="flex  h-fit flex-row justify-left items-center">
                  <div className="w-2 h-2 bg-white rounded-full ml-4 mr-4"></div>
                  <h3 className="text-white font-open-sans-condensed text-2xl font-bold leading-8 h-fit">
                    Contact Us
                  </h3>
                </div>
                <div className=" mt-2 ">
                  <p className="">
                    Order online or over the phone with one of our consultants,
                    complete the transaction and come to collect the vehicle
                    from our safe collection zone away from our showroom. All
                    with the peace of mind of a money back guarantee if you're
                    not satisfied.Simply enter your registration and some basic
                    details and we'll line up a valuation for you. If you're
                    happy with the price we'll get your vehicle collected with
                    full payment on arrival. No further haggling.
                  </p>
                </div>
              </div>
              <div className="md:mt-6 mt-4 flex flex-col">
                <div className="flex flex-row justify-left items-center">
                  <div className="w-2 h-2 bg-white rounded-full ml-4 mr-4"></div>
                  <h3 className="text-white font-open-sans-condensed text-2xl font-bold leading-8 md: ">
                    Visit Our Showroom
                  </h3>
                </div>
                <p className=" md:  mt-2 ">
                  We operate a strictly no-pressure approach, allowing you to
                  take your own time to browse and inspect our vehicles.
                  Meanwhile, our trained specialists will always be on hand for
                  expert help and advice as and when you need it.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
