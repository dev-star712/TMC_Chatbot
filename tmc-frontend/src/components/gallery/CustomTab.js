import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { VehicleCard } from "./VehicleCard";
import React, { useState } from "react";

export function CustomTab({ title, data, tabs }) {
  const [activeTab, setActiveTab] = useState(tabs[0].value);

  const items = data.map((ele) => {
    let price = "None";
    if (!ele.adverts.forecourtPrice.amountGBP) price = "Not set";
    else price = ele.adverts.forecourtPrice.amountGBP.toLocaleString();
    let imgurl = "";
    if (ele.media.images.length === 0) {
      imgurl =
        "https://m-qa.atcdn.co.uk/a/media/w600h450/7c170800b6f241bf86132ccb21af9c93.jpg";
    } else {
      imgurl = ele.media.images[0].href;
    }
    let item = {
      make: ele.vehicle.make,
      model: ele.vehicle.model,
      vin: ele.vehicle.vin,
      bodyType: ele.vehicle.bodyType,
      vehicleType: ele.vehicle.vehicleType,
      branch: ele.vehicle.branch,
      price: price,
      forecourtPriceVatStatus: ele.adverts.forecourtPriceVatStatus,
      desc: ele.vehicle.derivative,
      distance: ele.vehicle.odometerReadingMiles || 0,
      fuel: ele.vehicle.fuelType,
      method: ele.vehicle.transmissionType,
      location: ele.vehicle.derivative,
      image: imgurl,
      finance: ele.vehicle.finance,
      status: ele.vehicle.status,
    };
    return item;
  });

  return (
    <div className="">
      <div className="block md:hidden mb-8 text-gray-800  text-left subtitle text-[48px] leading-[56px] uppercase">
        {title}
      </div>
      <Tabs value={activeTab} className=" w-full">
        <TabsHeader
          className="overflow-x-scroll md:overflow-x-hidden lg:pb-[50px] pb-6 bg-transparent w-full   flex lg:flex-row flex-col lg:justify-between lg:items-center px-6"
          indicatorprops={{
            className: "bg-gray-600 shadow-none hidden !text-gray-900",
          }}
        >
          <div className="md:flex hidden pb-8 lg:pb-0  flex-wrap justify-center items-center">
            <div className="text-gray-800 text-left font-open-sans-condensed text-6xl font-bold leading-tight uppercase">
              {title}
            </div>
          </div>
          <div className=" flex gap-3">
            {tabs.map(({ label, value }) => (
              <Tab
                key={value}
                value={value}
                onClick={() => setActiveTab(value)}
                className="w-fit"
              >
                <div
                  className={`${
                    activeTab !== value
                      ? "text-black bg-white"
                      : "bg-gray-900 text-white "
                  }hover:cursor-pointer uppercase text-center  rounded-full px-4 py-2  w-fit border-2 border-black hover:text-white hover:bg-black`}
                >
                  {label}
                </div>
              </Tab>
            ))}
          </div>
        </TabsHeader>
        <TabsBody className="">
          {tabs.map(({ value }) => (
            <TabPanel key={value} value={value}>
              <div className=" flex flex-wrap w-full justify-evenly">
                {value === "All"
                  ? items.map((item) => {
                      return <VehicleCard key={item.vin} item={item} />;
                    })
                  : value === "Pickup"
                  ? items
                      .filter((item) => item.bodyType === value)
                      .map((item) => {
                        return <VehicleCard key={item.vin} item={item} />;
                      })
                  : items
                      .filter((item) => item.vehicleType === value)
                      .map((item) => {
                        return <VehicleCard key={item.vin} item={item} />;
                      })}
              </div>
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
}
