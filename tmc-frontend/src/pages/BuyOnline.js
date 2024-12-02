import { useState, useEffect } from "react";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";
import HeroSection from "../components/gallery/HeroSection";
import buyonline from "../assets/images/buyonline.png";
import { Link } from "react-router-dom";
import Meta from "../components/Meta";

export default function BuyOnline() {
  //SEO
  const [data, setData] = useState(null);

  const getData = async () => {
    const url = `https://${process.env.REACT_APP_CMS_API}/api/content/load?page=0-15-0`;
    await axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          setData(response.data);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainLayout>
      {data && (
        <Meta
          meta_title={data.meta_title}
          meta_description={data.meta_description}
          canonical_url="/buy-online/"
        />
      )}
      <HeroSection
        img={buyonline}
        mt={"mt-4 lg:mt-20"}
        words={["Buy", "online"]}
      />
      <div className="w-full h-fit px-5 md:px-12 lg:px-24 flex justify-center items-center pb-12 md:pb-0">
        <div className="flex md:flex-row md:justify-between w-full max-w-[1360px] py-[100px] flex-col">
          <div className="w-full md:mx-0 mx-auto md:self-start md:w-[43%]">
            <h2 className="text-gray-800 uppercase py-2 font-open-sans-condensed text-[39px] md:text-6xl font-bold leading-none tracking-tighter">
              Buy online Safely and easily with TMC.
            </h2>

            <p className="  mt-12 text-black font-open-sans-condensed sm:font-open-sans text-base font-normal leading-8">
              Discover a safe and seamless online buying experience where
              quality meets convenience. At TMC, not only do we offer an
              unmatched collection of pre-owned vehicles, but we also provide an
              umbrella of services designed for your utmost satisfaction and
              peace of mind.
            </p>
            <Link
              to="/vehicles-for-sale/used-trucks/"
              className="text-center flex justify-start md:justify-center rounded-full px-8 w-fit py-3 mt-10 text-white bg-black hover:bg-gray-800 border-2 border-black hover:cursor-pointer uppercase text-[10px] md:text-[15px]"
            >
              View All Vehicles
            </Link>
          </div>
          <div className="w-full flex justify-center items-center lg:mt-0 mt-5 md:w-[53%]">
            <div className="w-full h-[250px] md:h-[400px] flex justify-center items-center lg:mt-0 mt-5">
              <iframe
                className="video_homepage w-full h-[250px] md:h-[400px]"
                src="https://www.youtube.com/embed/rgTukF_uZMI?feature=oembed"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
