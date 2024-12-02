import "react-responsive-carousel/lib/styles/carousel.min.css";
import { VehicleCard } from "./VehicleCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { initVehicles } from "../../redux/slices/vehicleSlice";

export default function ResponsiveCarSlider({ ele }) {
  const [loading, setLoading] = useState(false);
  const [viewlist, setViewlist] = useState([]);

  const dispatch = useDispatch();

  const getStockData = async () => {
    setLoading(true);
    const url = `https://${process.env.REACT_APP_API}/api/vehicle/stock?page=1&pageSize=ALL`;
    await axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          dispatch(initVehicles(response.data.data.results));
          const vehicles = ele
            ? response.data.data.results.filter(
                (item) =>
                  item.vehicle.vehicleType === ele.vehicle.vehicleType &&
                  (item.vehicle.make === ele.vehicle.make ||
                    item.vehicle.model === ele.vehicle.model) &&
                  item.vehicle.vin !== ele.vehicle.vin
              )
            : [...response.data.data.results]
                .sort((a, b) => {
                  if (
                    (a.adverts.forecourtPrice.amountGBP || 0) <
                    (b.adverts.forecourtPrice.amountGBP || 0)
                  ) {
                    return 1;
                  } else if (
                    (a.adverts.forecourtPrice.amountGBP || 0) >
                    (b.adverts.forecourtPrice.amountGBP || 0)
                  ) {
                    return -1;
                  } else {
                    return 0;
                  }
                })
                .slice(0, 10);
          setViewlist(vehicles);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(initVehicles([]));
        setLoading(false);
      });
  };

  useEffect(() => {
    getStockData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenWidth]);
  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };
  return (
    <div className="w-full relative">
      {!loading ? (
        <Swiper
          slidesPerView={
            screenWidth > 1300
              ? 4
              : screenWidth > 1000
              ? 3
              : screenWidth > 700
              ? 2
              : 1
          }
          spaceBetween={30}
          pagination={false}
          modules={[Pagination, Navigation]}
          className="mySwiper"
          navigation={true}
          autoplay={true}
        >
          {viewlist.map((ele, index) => {
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
            return (
              <SwiperSlide
                key={index}
                style={{
                  paddingRight: "10px",
                  paddingLeft: "10px",
                  marginRight: "15px;!important",
                  marginLeft: "15px",
                }}
              >
                <VehicleCard key={ele.vehicle.vin} item={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
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
    </div>
  );
}
