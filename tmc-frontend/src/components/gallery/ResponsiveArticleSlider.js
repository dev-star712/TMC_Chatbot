import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { MotoringHubCard } from "./MotoringHubCard";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";
import React, { useState, useEffect } from "react";

export default function ResponsiveArticleSlider({ data }) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  // const swiper = useSwiper()
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
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <MotoringHubCard
              name={item.title}
              desc={item.synopsis}
              type={"View Article"}
              image={`https://${process.env.REACT_APP_CMS_API}/public/image/${item.image}`}
              url={`/news${item.url}/`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
