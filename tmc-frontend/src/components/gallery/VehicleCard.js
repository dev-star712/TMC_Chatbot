import React, { useState } from "react";
import { Link } from "react-router-dom";

export function VehicleCard({ item }) {
  const {
    make,
    model,
    vin,
    price,
    forecourtPriceVatStatus,
    desc,
    distance,
    fuel,
    method,
    image,
    finance,
    status,
  } = item;

  const [isImgLoaded, setIsImgLoaded] = useState(false);

  return (
    <div className="max-w-[320px] items-center bg-white border shadow-custom-gray border-gray-200 w-full flex flex-col mt-8 min-w-[230px] rounded-lg overflow-hidden ml-1 mr-1 mb-8 transition duration-200 ease-in-out hover:scale-105 scale-100">
      <div className="w-full rounded-lg relative">
        <Link
          to={`/vehicles-for-sale/viewdetail/${`used ${make} ${model} ${desc}   ${method} ${fuel}`
            .toLowerCase()
            .replace(/[^0-9a-zA-Z \-]/g, "")
            .replace(/\s/g, "-")}/${vin}`}
        >
          <img
            src={image.replace("w600h450", "w340h255")}
            alt={`${make} ${model}`}
            onLoad={() => setIsImgLoaded(true)}
            style={isImgLoaded ? {} : { display: "none" }}
          />

          {!isImgLoaded && (
            <div className="bg-gray-300 h-[235.8px] animate-pulse"></div>
          )}
        </Link>
        {status && status !== "available" && (
          <div className="absolute top-2 right-1">
            <span
              className={`${
                status === "reserved" ? "bg-blue-700" : "bg-red-600"
              }  text-white font-open-sans-condensed sm:font-open-sans px-2 py-1 rounded-full`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
        )}
      </div>
      <div className=" mt-4 flex justify-between pl-2 pr-2">
        <Link
          to={`/vehicles-for-sale/viewdetail/${`used ${make} ${model} ${desc}   ${method} ${fuel}`
            .toLowerCase()
            .replace(/[^0-9a-zA-Z \-]/g, "")
            .replace(/\s/g, "-")}/${vin}`}
        >
          <h3 className="text-black font-bold font-open-sans-condensed text-2xl leading-8">
            {`${make} ${model}`}
          </h3>
        </Link>
      </div>
      <Link
        to={`/vehicles-for-sale/viewdetail/${`used ${make} ${model} ${desc}   ${method} ${fuel}`
          .toLowerCase()
          .replace(/[^0-9a-zA-Z \-]/g, "")
          .replace(/\s/g, "-")}/${vin}`}
      >
        <h4 className="mt-2 line-clamp-1 text-neutral-700 text-base font-normal font-open-sans-condensed sm:font-open-sans leading-normal pl-2 pr-2">
          {desc}
        </h4>
      </Link>

      <div className="flex justify-between gap-1">
        <span className="font-open-sans-condensed text-3xl font-semibold leading-8 magictitle bg-clip-text text-transparent">
          £{price}
        </span>
        {forecourtPriceVatStatus === "Ex VAT" && (
          <span className="font-open-sans-condensed bg-gray-700 text-xl font-semibold leading-8 bg-clip-text text-transparent">
            +VAT
          </span>
        )}
      </div>

      <div className="w-full">
        <div className="my-4 py-1 flex mx-6 justify-between border-y border-gray-300">
          <div className="flex-row min-w-[50px] justify-between items-center py-1">
            <div className="flex flex-row justify-between items-center ">
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.66667 11.1667H8V8.5H7.33333M8 5.83333H8.00667M14 8.5C14 11.8137 11.3137 14.5 8 14.5C4.68629 14.5 2 11.8137 2 8.5C2 5.18629 4.68629 2.5 8 2.5C11.3137 2.5 14 5.18629 14 8.5Z"
                  stroke="#0449C8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="text-neutral-700 text-xs font-medium font-open-sans-condensed sm:font-open-sans leading-[17px]">
                {distance} miles
              </div>
            </div>
          </div>
          <div className="font-open-sans-condensed sm:font-open-sans text-12 font-medium leading-17 py-1">
            <div className="flex flex-row justify-between items-center ">
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.66699 7.16667V2.5L2.66699 9.83333H7.33366L7.33366 14.5L13.3337 7.16667L8.66699 7.16667Z"
                  stroke="#0449C8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="text-neutral-700 text-xs font-medium font-open-sans-condensed sm:font-open-sans leading-[17px]">
                {fuel}
              </div>
            </div>
          </div>
          <div className="font-open-sans-condensed sm:font-open-sans text-12 font-medium leading-17 py-1 ">
            <div className="flex flex-row justify-between items-center ">
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 5.16667C10.7364 5.16667 11.3333 5.76362 11.3333 6.5M14 6.5C14 8.70914 12.2091 10.5 10 10.5C9.59589 10.5 9.20577 10.4401 8.83805 10.3286L7.33333 11.8333H6V13.1667H4.66667V14.5H2.66667C2.29848 14.5 2 14.2015 2 13.8333V12.1095C2 11.9327 2.07024 11.7631 2.19526 11.6381L6.17138 7.66195C6.05993 7.29423 6 6.90412 6 6.5C6 4.29086 7.79086 2.5 10 2.5C12.2091 2.5 14 4.29086 14 6.5Z"
                  stroke="#0449C8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="text-neutral-700 text-xs font-medium font-open-sans-condensed sm:font-open-sans leading-[17px]">
                {method}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row">
        {finance ? (
          <p>
            <span className="self-end pb-[2px] pr-2 text-neutral-900 text-md font-normal font-open-sans-condensed sm:font-open-sans leading-none tracking-tight text-gray-700">
              PCM
            </span>
            <span className="text-black text-xl font-semibold font-open-sans-condensed leading-tight">
              £{finance}
            </span>
          </p>
        ) : (
          <Link
            to={`/vehicles-for-sale/viewdetail/${`used ${make} ${model} ${desc}   ${method} ${fuel}`
              .toLowerCase()
              .replace(/[^0-9a-zA-Z \-]/g, "")
              .replace(/\s/g, "-")}/${vin}`}
            className=" text-blue-700 text-[13px] font-bold font-open-sans-condensed sm:font-open-sans underline uppercase leading-tight tracking-tight"
          >
            View finance options
          </Link>
        )}
      </div>
      <div className="text-sm font-open-sans-condensed sm:font-open-sans uppercase leading-tight tracking-tight text-gray-800">
        (Term: 48m & Deposit: <strong className="text-black">£3000</strong>)
      </div>
      <div className="pt-4 pb-4 flex justify-between pl-2 pr-2">
        <Link
          to={`/vehicles-for-sale/viewdetail/${`used ${make} ${model} ${desc}   ${method} ${fuel}`
            .toLowerCase()
            .replace(/[^0-9a-zA-Z \-]/g, "")
            .replace(/\s/g, "-")}/${vin}`}
          className="magicborder rounded-full cursor-pointer px-4 py-[10px] text-center no-underline transition-all duration-150 ease-in-out select-none align-middle text-sm font-semibold font-open-sans-condensed sm:font-open-sans uppercase leading-tight tracking-tight"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
