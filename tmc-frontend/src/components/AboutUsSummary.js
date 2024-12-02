import { CustomCarousel } from "./gallery/CustomCarousel";
import aboutUsImg1 from "../assets/images/aboutus1.png";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { openChatbot } from "../redux/slices/chatbotSlice";

export default function AboutUsSummary() {
  const [images, setImages] = useState([]);
  const [bannerParagraph1, setBannerParagraph1] = useState(null);
  const [bannerParagraph2, setBannerParagraph2] = useState(null);

  const getStaticData = async () => {
    const url = `https://${process.env.REACT_APP_CMS_API}/api/content/load?page=0-0-1`;
    await axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          setImages(response.data.image);
          setBannerParagraph1(response.data.banner_paragraph1);
          setBannerParagraph2(response.data.banner_paragraph2);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getStaticData();
  }, []);

  const dispatch = useDispatch();

  const setIsBotChatOpen = (value) => {
    dispatch(openChatbot(value));
  };

  return (
    <div className="flex justify-center align-center lg:py-[7rem] max-w-[1140px] mx-auto lg:mb-36 mb-5 py-[50px]">
      <div className="flex  lg:flex-row flex-col justify-center items-center lg:items-start p-5">
        <div className=" px-3 max-w-[600px] relative">
          <CustomCarousel>
            {images.length > 0 ? (
              images.map((image, i) => (
                <img
                  src={
                    image
                      ? `https://${process.env.REACT_APP_CMS_API}/public/image/${image}`
                      : aboutUsImg1
                  }
                  alt={i}
                  key={i}
                  className="h-full w-full object-cover"
                />
              ))
            ) : (
              <img
                src={aboutUsImg1}
                alt="first"
                className="h-full w-full object-cover"
              />
            )}
          </CustomCarousel>
        </div>
        <div className="px-3 max-w-[600px] lg:-mt-6 pt-8 lg:pt-0">
          <h2 className="magictitle xl:max-w-[560px] text-[45px] sm:text-[70px] md:text-[80px] xl:text-[80px]">
            About Us
          </h2>
          <div className="lg:mt-0 pb-4 text-gray-800 text-xl md:text-2xl font-semibold ">
            {(
              bannerParagraph1 ||
              "TMC is your local specialist when it comes to buying a new pick-up truck, van or car. With the largest selection of high-quality used pick-up trucks for sale in the south, every used vehicle at TMC has been hand-picked by our specialists - and undergoes a rigorous multi-point inspection, full valet and test prior to sale."
            )
              .split("\n")
              .filter((p) => p.trim() !== "")
              .map((p, i) => (
                <p
                  key={i}
                  className={`py-1 font-open-sans-condensed ${
                    i === 0 ? "sm:font-open-sans" : ""
                  }`}
                >
                  {p}
                </p>
              ))}
          </div>

          {bannerParagraph2 ? (
            <>
              {bannerParagraph2
                .split("\n")
                .filter((p) => p.trim() !== "")
                .map((p, i) => (
                  <p
                    key={i}
                    className="py-2 text-gray-800 font-open-sans-condensed sm:font-open-sans text-base font-medium leading-6"
                  >
                    {p}
                  </p>
                ))}
              <p className="py-4 text-gray-800 font-open-sans-condensed sm:font-open-sans text-base font-medium leading-6 pb-11"></p>
            </>
          ) : (
            <>
              <p className="py-4 text-gray-800 font-open-sans-condensed sm:font-open-sans text-base font-medium leading-6">
                We are TMC - The Motor Company. We are a family run business
                based in Oakhanger, near Bordon in Hampshire. We provide
                high-quality used cars for sale locally for Farnham, Surrey,
                London and the South East - but our customers come from all
                across the UK to visit our countryside showroom. So why is this?
                Put simply, quality and service. We’re proud to be a multi
                award-winning dealership, recognised for our outstanding levels
                of customer service. Established since 2016 in the local Farnham
                area, and with over 25 years of experience in the Motor Trade -
                we hope you’d expect nothing less.​​
              </p>
              <p className="py-4 text-gray-800 font-open-sans-condensed sm:font-open-sans text-base font-medium leading-6 pb-11">
                We operate a strictly no-pressure approach, allowing you to take
                your own time to browse and inspect our vehicles. Meanwhile, our
                trained specialists will always be on hand for expert help and
                advice as and when you need it.
              </p>
            </>
          )}
          <div className="flex flex-col w-full md:w-fit md:flex-row justify-center items-center mt-6 gap-4">
            <div
              className="w-full md:w-fit uppercase font-semibold text-base rounded-full py-3 px-5 text-center hover:cursor-pointer magicbutton"
              onClick={() => setIsBotChatOpen(true)}
            >
              Speak To An Advisor
            </div>
            <Link
              to="/contact-us"
              className="w-full md:w-fit uppercase font-semibold text-base rounded-full py-[10px] px-8 text-center magicborder"
              formNoValidate="formnoValidate"
            >
              Visit Us
            </Link>
            <Link
              to="/meet-the-team"
              className="w-full md:w-fit uppercase font-semibold text-base rounded-full py-[10px] px-5 text-center magicborder"
              formNoValidate="formnoValidate"
            >
              Meet The Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
