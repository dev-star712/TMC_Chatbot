import React, { useEffect, useState } from "react";
import MultiRangeSlider from "./multiRangeSlider";
import { GrayBtn } from "./gallery/GrayBtn";
import { WhiteBtn } from "./gallery/WhiteBtn";
import { ReactComponent as Section2Pattern } from "./svg/section2Pattern.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function BudgetOffer() {
  const [cashMin, setCashMin] = useState(0);
  const [cashMax, setCashMax] = useState(100000);
  const [cashRange, setCashRange] = useState([0, 100000]);

  const vehicles = useSelector((state) => state.vehicle.data);

  const extractTaxonomy = (data) => {
    let cashMinT;
    let cashMaxT;

    data.forEach((item) => {
      if (
        cashMinT > (item.adverts.forecourtPrice.amountGBP || 0) ||
        !cashMinT
      ) {
        cashMinT = item.adverts.forecourtPrice.amountGBP || 0;
      }
      if (
        cashMaxT < (item.adverts.forecourtPrice.amountGBP || 0) ||
        !cashMaxT
      ) {
        cashMaxT = item.adverts.forecourtPrice.amountGBP || 0;
      }
    });
    if (cashMinT && cashMaxT) {
      setCashMin(
        Number.isInteger(cashMinT / 2000)
          ? cashMinT
          : Math.floor(cashMinT / 2000) * 2000
      );
      setCashMax(
        Number.isInteger(cashMaxT / 2000)
          ? cashMaxT
          : (Math.floor(cashMaxT / 2000) + 1) * 2000
      );

      setCashRange([
        Number.isInteger(cashMinT / 2000)
          ? cashMinT
          : Math.floor(cashMinT / 2000) * 2000,
        Number.isInteger(cashMaxT / 2000)
          ? cashMaxT
          : (Math.floor(cashMaxT / 2000) + 1) * 2000,
      ]);
    }
  };

  useEffect(() => {
    extractTaxonomy(vehicles || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicles]);

  return (
    <div className="p-5 lg:p-[100px]  mx-auto">
      <div className="block w-full max-w-[1280px] mx-auto">
        <div className="mb-6 w-full lg:justify-between justify-center lg:gap-[180px] items-center lg:items-start flex lg:flex-row flex-col ">
          <div className="w-full flex flex-wrap max-w-[750px] relative">
            <div className="subtitle text-[48px] leading-[56px] md:text-[64px] md:leading-[72px]">
              WHAT CAN I GET FOR{" "}
              <span className="inline md:hidden magictitle text-[48px] leading-[56px] md:text-[64px] md:leading-[72px]">
                MY BUDGET?
              </span>
            </div>
            <div className="hidden md:inline magictitle text-[48px] leading-[56px] md:text-[64px] md:leading-[72px]">
              MY BUDGET?
            </div>
            <div className="hidden lg:block -z-10 absolute right-[0px] top-[90px] scale-90 h-2/3 overflow-hidden">
              <Section2Pattern />
            </div>
          </div>
          <div className="w-11/12 lg:max-w-[580px] lg:self-stretch self-center flex-col justify-end relative items-start gap-9 mt-9 flex">
            <div className="w-[100px] h-[3px] bg-gradient-to-r from-red-600 to-blue-700 absolute top-0 "></div>
            <div className="  lg:max-w-[440px] text-black mt-10 text-[14px] md:text-[20px] font-normal font-open-sans-condensed sm:font-open-sans ">
              Explore what you can get with your budget here at Thatchers Motor
              Company
            </div>
          </div>
        </div>
        <div className="mt-[50px] bg-[#f6f6f6] rounded-2xl w-full flex flex-col">
          <div className="hidden md:flex mt-[50px] w-3/4 px-5 mx-auto py-10 flex-col">
            <MultiRangeSlider
              range
              min={cashRange[0] / 2000}
              max={cashRange[1] / 2000}
              // defaultValue={[cashRange[0] / 2000, cashRange[1] / 2000]}
              tipFormatter={(value) => `${value * 2000}£`}
              styles={{
                tracks: {
                  background: `linear-gradient(to right, blue, red)`,
                  height: "16px",
                },
                track: {
                  background: "transparent",
                },
                handle: {
                  height: "28px",
                  width: "28px",
                  marginTop: "-6px",
                  border: "solid 7px white",
                  background: "gray",
                  opacity: "1",
                },
                rail: {
                  height: "16px",
                },
              }}
              value={[cashMin / 2000, cashMax / 2000]}
              onChange={(value) => {
                setCashMin(value[0] * 2000);
                setCashMax(value[1] * 2000);
              }}
            />
            <div className="mt-8 flex flex-row justify-between text-black   font-bold">
              <div className="">£{(cashRange[0] || 0).toLocaleString()}</div>
              <div className="">£{(cashRange[1] || 0).toLocaleString()}</div>
            </div>
          </div>
          <div className="md:hidden mx-auto mt-[50px] w-3/4">
            <select
              type="text"
              className="w-full h-12 border-2 mx-auto rounded-md px-6 py-3"
              onChange={(e) => {
                console.log(e.target.value);
                setCashMin(e.target.value * 1);
              }}
              value={cashMin}
            >
              {Array.from(
                {
                  length: (cashMax - cashRange[0]) / 2000 + 1,
                },
                (_, i) => i * 2000 + cashRange[0]
              ).map((price) => {
                return (
                  <option key={`cash${price}`} value={price}>
                    {price.toLocaleString()}
                  </option>
                );
              })}
            </select>
            <select
              type="text"
              className="w-full h-12 border-2 mt-3 mb-6 rounded-md px-6 py-3"
              onChange={(e) => {
                console.log(e.target.value);
                setCashMax(e.target.value * 1);
              }}
              value={cashMax}
            >
              {Array.from(
                {
                  length: (cashRange[1] - cashMin) / 2000 + 1,
                },
                (_, i) => i * 2000 + cashMin
              ).map((price) => {
                return (
                  <option key={`cash${price}`} value={price}>
                    {price.toLocaleString()}
                  </option>
                );
              })}
            </select>
          </div>

          <Link
            to={`vehicles-for-sale/used-trucks?cashMin=${cashMin}&cashMax=${cashMax}`}
            className="w-fit mx-auto mb-[50px]"
          >
            <GrayBtn
              name={"search offer"}
              handleClick={null}
              upperCase={true}
            />
          </Link>
        </div>
        <div className="w-full flex my-[50px]">
          <Link to="/sell-your-vehicle" className="mx-auto">
            <WhiteBtn
              name={"want to trade your vehicle?"}
              handleClick={null}
              upperCase={true}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
