import { Link, useParams } from "react-router-dom";

export default function VehicleSummary(props) {
  const vin = useParams().vin.toUpperCase();
  const item = props.ele;
  return (
    <div className="flex flex-col w-full border-2 rounded-2xl">
      <div className="rounded-t-2xl bg-white p-6">
        <h1 className="subtitle text-[30px] leading-[40px] md:text-[40px] md:leading-[56px] ">
          {item.vehicle.make}&nbsp; {item.vehicle.model}
        </h1>
        <p className="mt-2">{item.vehicle.derivative}</p>
        <div className="mt-6 flex flex-wrap gap-4">
          <div className="flex flex-row items-center  text-sm md:text-base bg-[#f6f6f6] px-2 py-1 rounded-full">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.66667 10.6667H8V8H7.33333M8 5.33333H8.00667M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z"
                stroke="#0449C8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="mr-1">
              {parseInt(
                item.vehicle.odometerReadingMiles || 0
              ).toLocaleString()}
            </p>
            miles
          </div>
          <div className="flex flex-row items-center bg-[#f6f6f6] text-sm md:text-base px-2 py-1 rounded-full ">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.66602 6.66667V2L2.66602 9.33333H7.33268L7.33268 14L13.3327 6.66667L8.66602 6.66667Z"
                stroke="#0449C8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="mr-1">{item.vehicle.fuelType}</p>
          </div>
          <div className="flex flex-row items-center text-sm md:text-base bg-[#f6f6f6] px-2 py-1 rounded-full ">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 4.66667C10.7364 4.66667 11.3333 5.26362 11.3333 6M14 6C14 8.20914 12.2091 10 10 10C9.59589 10 9.20577 9.94007 8.83805 9.82862L7.33333 11.3333H6V12.6667H4.66667V14H2.66667C2.29848 14 2 13.7015 2 13.3333V11.6095C2 11.4327 2.07024 11.2631 2.19526 11.1381L6.17138 7.16195C6.05993 6.79423 6 6.40412 6 6C6 3.79086 7.79086 2 10 2C12.2091 2 14 3.79086 14 6Z"
                stroke="#0449C8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="mr-1">{item.vehicle.transmissionType}</p>
          </div>
        </div>
      </div>
      <div className="mb-4 px-6 mt-4 flex justify-between items-center">
        <div className="flex flex-col">
          <h3 className="mb-2 text-gray-900 font-open-sans-condensed sm:font-open-sans font-medium text-md tracking-wider leading-5">
            Cash Price
          </h3>
          <p className="flex justify-between gap-1">
            <span className="font-open-sans-condensed text-4xl font-bold leading-none magictitle">
              £&nbsp;
              {parseInt(
                item.adverts.forecourtPrice.amountGBP || 0
              ).toLocaleString()}
            </span>
            {item.adverts.forecourtPriceVatStatus === "Ex VAT" && (
              <span className="flex flex-col justify-center text-transparent bg-clip-text font-open-sans-condensed bg-gray-700 text-2xl font-bold leading-none">
                +VAT
              </span>
            )}
          </p>
        </div>
        <Link
          to={`/checkout/${vin}?type=full`}
          className="magicbutton px-4 md:px-12 py-2 rounded-full hover:shadow-lg shadow-md text-white"
        >
          BUY NOW
        </Link>
      </div>
    </div>
  );
}
