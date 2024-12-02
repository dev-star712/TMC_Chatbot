import React, { useState, useEffect } from "react";
import axios from "axios";
import { parseLocalStorageValue } from "../utils";
import MainLayout from "../layouts/MainLayout";
import { CustomTab } from "../components/gallery/CustomTab";
import Meta from "../components/Meta";

export default function ShortList() {
  const shortlist = parseLocalStorageValue("shortlist") || [];

  const [loading, setLoading] = useState(false);
  const [viewlist, setViewlist] = useState([]);

  const getStockData = async () => {
    setLoading(true);
    const url = `https://${process.env.REACT_APP_API}/api/vehicle/stock?page=1&pageSize=ALL`;
    await axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          const vehicles = response.data.data.results.filter((item) =>
            shortlist.includes(item.vehicle.vin)
          );
          setViewlist(vehicles);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (shortlist.length > 0) {
      getStockData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tabs = [
    {
      label: "All",
      value: "All",
    },
    {
      label: "Pickup",
      value: "Pickup",
    },
    {
      label: "Car",
      value: "Car",
    },
    {
      label: "Van",
      value: "Van",
    },
  ];

  return (
    <MainLayout>
      <Meta meta_title={"My Shortlist"} canonical_url="/shortlist/" />
      <h1 className="hidden">My Shortlist</h1>
      <div className="w-full bg-[#F6F6F6] lg:py-8 lg:px-[100px] py-6 px-5">
        {!loading ? (
          <CustomTab data={viewlist} tabs={tabs} title={"my shortlist"} />
        ) : (
          <div className="mt-10 flex w-full h-full text-center subtitle text-[60px]">
            <div className="mt-2 mb-4 w-full flex justify-center items-center ml-3 mr-3">
              <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            </div>
          </div>
        )}

        {shortlist.length === 0 && (
          <div className="w-full items-center text-lg pb-40">
            You currently have no vehicles in your shortlist.
          </div>
        )}
      </div>
    </MainLayout>
  );
}
