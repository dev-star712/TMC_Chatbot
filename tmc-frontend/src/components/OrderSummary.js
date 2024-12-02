import washy from "../assets/images/checkout.png";
import { Link } from "react-router-dom";
export default function OrderSummary({ item, type, deposit, term }) {
  return (
    <div>
      <div className="mt-6 md:mt-0 mx-5 md:mx-0 bg-white rounded-xl px-4 py-4 flex flex-col">
        <div className="flex flex-row border-b-2 pb-2 justify-between">
          <div className=" subtitle text-[20px] leading-[28px]">
            Order Summary
          </div>
          <Link
            to="/vehicles-for-sale/used-trucks/"
            className="underline text-[#0000ff] uppercase text-[10px] font-bold"
          >
            change vehicle?
          </Link>
        </div>
        <div className="mt-4 relative">
          <img
            src={
              item.media.images.length === 0 ? washy : item.media.images[0].href
            }
            className="w-full rounded-lg"
            alt="as"
          ></img>
          {item.vehicle.status && item.vehicle.status !== "available" && (
            <div className="absolute top-2 right-1">
              <span
                className={`${
                  item.vehicle.status === "reserved"
                    ? "bg-blue-700"
                    : "bg-red-600"
                }  text-white font-open-sans-condensed sm:font-open-sans px-2 py-1 rounded-full`}
              >
                {item.vehicle.status.charAt(0).toUpperCase() +
                  item.vehicle.status.slice(1)}
              </span>
            </div>
          )}
        </div>
        <div className="mt-2   font-bold text-lg">
          {item.vehicle.make}&nbsp; {item.vehicle.model}
        </div>
        <div className="mt-2 text-[14px] border-b-2 pb-2 ">
          {item.vehicle.derivative}
        </div>
        <div className="mt-2 flex flex-row justify-between flex-wrap">
          <div className="uppercase">price:</div>
          <div className="text-[#0000ff] font-bold">
            £{" "}
            {parseInt(
              item.adverts.forecourtPrice.amountGBP || 0
            ).toLocaleString()}
            {item.adverts.forecourtPriceVatStatus === "Ex VAT" && " +VAT"}
          </div>
        </div>
        {item.adverts.forecourtPriceVatStatus === "Ex VAT" && (
          <div className="mt-2 flex flex-row justify-between flex-wrap">
            <div className="uppercase">vat (20%):</div>
            <div className="text-[#0000ff] font-bold">
              £{" "}
              {parseInt(
                item.adverts.forecourtPrice.amountGBP * 0.2 || 0
              ).toLocaleString()}
            </div>
          </div>
        )}
        <div className="mt-2 flex flex-row justify-between flex-wrap">
          <div className="uppercase">mileage:</div>
          <div className="text-[#0000ff] font-bold">
            {parseInt(item.vehicle.odometerReadingMiles || 0).toLocaleString()}{" "}
            miles
          </div>
        </div>
        <div className="mt-2 flex flex-row justify-between flex-wrap">
          <div className="uppercase">transmission:</div>
          <div className="text-[#0000ff] font-bold">
            {item.vehicle.transmissionType}
          </div>
        </div>
        <div className="mt-2 flex flex-row justify-between flex-wrap">
          <div className="uppercase">fuel type:</div>
          <div className="text-[#0000ff] font-bold">
            {item.vehicle.fuelType}
          </div>
        </div>
        <div className="mt-2 flex flex-row border-b-2 pb-2 justify-between flex-wrap">
          <div className="uppercase">number of doors:</div>
          <div className="text-[#0000ff] font-bold">{item.vehicle.doors}</div>
        </div>
        <div className="mt-6 w-full bg-[#f6f6f6] rounded-xl py-2 flex justify-center items-cneter">
          <div className="flex flex-col">
            <div className="uppercase  text-[14px] md:text-[16px]  ">
              payable now:
            </div>
            <div className="text-center font-open-sans-condensed text-[28px] md:text-2xl font-semibold leading-40 bg-gradient-to-r from-red-600 to-blue-600 text-transparent bg-clip-text">
              £{" "}
              {type === "full" && (
                <>
                  {parseInt(
                    item.adverts.forecourtPriceVatStatus === "Ex VAT"
                      ? item.adverts.forecourtPrice.amountGBP * 1.2 || 0
                      : item.adverts.forecourtPrice.amountGBP || 0
                  ).toLocaleString()}
                </>
              )}
              {type === "finance" && (
                <>
                  {parseInt(
                    item.adverts.forecourtPriceVatStatus === "Ex VAT"
                      ? (deposit || 0) * 1 +
                          (item.adverts.forecourtPrice.amountGBP * 0.2 || 0) * 1
                      : deposit || 0
                  ).toLocaleString()}
                </>
              )}
              {type === "reserve" && <>149</>}
            </div>
          </div>
        </div>

        <div className="mt-2 mb-2 pt-3 w-full flex flex-col">
          {type === "finance" && (
            <>
              <div className="flex flex-row justify-between flex-wrap">
                <div className="uppercase">deposit amount:</div>
                <div className="font-bold">
                  £ {parseInt(deposit || 0).toLocaleString()}
                </div>
              </div>
              <div className="flex flex-row justify-between flex-wrap pb-2">
                <div className="uppercase">term:</div>
                <div className="font-bold">{term || 0} months</div>
              </div>
            </>
          )}
          <div className="flex flex-row pt-3 border-t-2 justify-between flex-wrap">
            <div className="uppercase">deposit to reserve vehicle:</div>
            <div className="font-bold">£ 149</div>
          </div>
        </div>
      </div>
      <div className="mt-4 mx-4 md:mx-0 flex flex-row justify-between flex-wrap">
        <div className="flex flex-row justify-center items-center">
          <div className="text-gray-700 font-open-sans-condensed text-[10px] md:text-base lg:text-md font-normal leading-20">
            Powered by <strong className="text-purple-800">Stripe</strong>
          </div>
        </div>
        <div className="flex flex-row flex-wrap">
          <div className="text-gray-700 font-open-sans-condensed text-[10px] md:text-base lg:text-md font-normal leading-20">
            View Full&nbsp;&nbsp;
          </div>
          <div className="text-gray-700 font-open-sans-condensed text-[10px] md:text-base lg:text-md font-semibold leading-19 underline uppercase">
            <Link to="/terms-and-conditions" target="_blank">
              terms & conditions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
