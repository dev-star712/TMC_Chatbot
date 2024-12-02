import React, { useEffect, useState } from "react";
import cars from "../assets/images/cars.png";
import process1 from "../assets/images/process1.png";
import process2 from "../assets/images/process2.png";
import process3 from "../assets/images/process3.png";
import process4 from "../assets/images/process4.png";
import SearchBtn from "./gallery/SearchBtn";
import info1 from "./svg/info1.svg";
import info3 from "./svg/info3.svg";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Meta from "./Meta";

export default function Hero() {
  const [_bodyType, setBodyType] = useState("all");
  const [_make, setMake] = useState("all");
  const [_model, setModel] = useState("all");

  const [number, setNumber] = useState(0);

  const [taxonomy, setTaxonomy] = useState({
    bodyType: {},
    make: {},
    model: {},
  });

  const [image, setImage] = useState(null);
  const [imageAltText, setImageAltText] = useState(null);
  const [bannerSubheading, setBannerSubheading] = useState(null);
  const [bannerText, setBannerText] = useState(null);

  const [meta_title, setMetaTitle] = useState("");
  const [meta_description, setMetaDescription] = useState("");

  const vehicles = useSelector((state) => state.vehicle.data);

  const extractTaxonomy = (data, _bodyType, _make, _model) => {
    const make = {};
    const model = {};
    const bodyType = {};

    let count = 0;

    data.forEach((item) => {
      bodyType[item.vehicle.bodyType] =
        (bodyType[item.vehicle.bodyType] || 0) + 1;
      if (item.vehicle.bodyType === _bodyType || _bodyType === "all") {
        make[item.vehicle.make] = (make[item.vehicle.make] || 0) + 1;
        if (item.vehicle.make === _make || _make === "all") {
          model[item.vehicle.model] = (model[item.vehicle.model] || 0) + 1;
          if (item.vehicle.model === _model || _model === "all") {
            count += 1;
          }
        }
      }
    });

    setNumber(count);

    return {
      make,
      model,
      bodyType,
    };
  };

  const getStaticData = async () => {
    const url = `https://${process.env.REACT_APP_CMS_API}/api/content/load?page=0-0-0`;
    await axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          setImage(response.data.image);
          setImageAltText(response.data.image_alt_text);
          setBannerSubheading(response.data.banner_subheading);
          setBannerText(response.data.banner_text);

          setMetaTitle(response.data.meta_title);
          setMetaDescription(response.data.meta_description);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    setTaxonomy(extractTaxonomy(vehicles || [], _bodyType, _make, _model));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicles, _bodyType, _make, _model]);

  useEffect(() => {
    getStaticData();
  }, []);

  return (
    <div className="pb-0 sm:pb-10">
      {meta_title.length > 0 && (
        <Meta meta_title={meta_title} meta_description={meta_description} />
      )}
      <div className="w-full h-fit magicbackground flex flex-col justify-center items-center py-[25px] sm:py-[30px] xl:py-[85px] relative">
        <div className="absolute bottom-0 w-full h-1/2 lg:h-4/5 bg-gradient-to-b from-transparent to-white -z-20"></div>
        <div className="lg:w-fit md:w-2/3 sm:w-5/6 w-11/12">
          <h2 className="flex lg:hidden flex-wrap justify-center items-center text-white font-bold font-open-sans-condensed text-[48px] leading-[56px] sm:text-[56px] md:text-[72px] md:leading-[80px] sm:pt-4 lg:pb-0 mb-[15px] sm:mb-[25px]">
            <span>Your Premier&nbsp;</span>
            <span>Vehicle Retailer</span>
          </h2>
          <div className="bg-white rounded-[10px] lg:rounded-full border border-black border-opacity-10 justify-start items-center gap-4 flex-row lg:inline-flex py-5 lg:py-1 lg:pl-8 lg:pr-0 px-4">
            <div className="lg:p-0 py-2 mx-2 text-[40px] font-bold block lg:hidden">
              Begin search
            </div>
            <div className="lg:p-0 py-2 mx-2">
              <select
                label="SELECT TYPE"
                variant="standard"
                value={_bodyType}
                onChange={(e) => {
                  setBodyType(e.target.value);
                  setMake("all");
                  setModel("all");
                }}
                className="w-full lg:w-[150px] h-full bg-transparent text-blue-gray-700 font-sans font-normal text-left outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all border-b text-sm pt-2 pb-1.5 border-blue-gray-200"
              >
                <option value="all" key="1">
                  Select Type
                </option>
                {Object.keys(taxonomy.bodyType).map((key, index) => (
                  <option
                    value={key}
                    key={index + 1}
                  >{`${key} (${taxonomy.bodyType[key]})`}</option>
                ))}
              </select>
            </div>
            <div className="lg:p-0 py-2 mx-2">
              <select
                label="SELECT Make"
                variant="standard"
                value={_make}
                onChange={(e) => {
                  setMake(e.target.value);
                  setModel("all");
                }}
                className="w-full lg:w-[150px] h-full bg-transparent text-blue-gray-700 font-sans font-normal text-left outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all border-b text-sm pt-2 pb-1.5 border-blue-gray-200"
              >
                <option value="all" key="1">
                  Select Make
                </option>
                {Object.keys(taxonomy.make).map((key, index) => (
                  <option
                    value={key}
                    key={index + 1}
                  >{`${key} (${taxonomy.make[key]})`}</option>
                ))}
              </select>
            </div>
            <div className="lg:p-0 py-2 mx-2">
              <select
                label="SELECT MODEL"
                variant="standard"
                value={_model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full lg:w-[150px] h-full bg-transparent text-blue-gray-700 font-sans font-normal text-left outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all border-b text-sm pt-2 pb-1.5 border-blue-gray-200"
              >
                <option value="all" key="1">
                  Select Model
                </option>
                {Object.keys(taxonomy.model).map((key, index) => (
                  <option
                    value={key}
                    key={index + 1}
                  >{`${key} (${taxonomy.model[key]})`}</option>
                ))}
              </select>
            </div>
            <Link
              to={`/vehicles-for-sale/used-trucks?bodyType=${_bodyType}&make=${_make}&model=${_model}`}
              className="lg:p-0 py-2"
            >
              <SearchBtn
                name={`Search ${
                  _bodyType === "all" && _make === "all" && _model === "all"
                    ? "All"
                    : number
                } Vehicles`}
              />
            </Link>
          </div>
        </div>
        <div className="max-w-[1480px] mt-8 w-full flex justify-center xl:justify-between items-center flex-col xl:flex-row">
          <h2 className="hidden lg:flex xl:hidden flex-wrap justify-center items-center text-white font-bold font-open-sans-condensed text-[48px] leading-[56px] sm:text-[56px] md:text-[72px] md:leading-[80px] sm:pt-4 lg:pb-0 mb-0 sm:mb-[15px]">
            <span>Your Premier&nbsp;</span>
            <span>Vehicle Retailer</span>
          </h2>
          <div className="relative h-fit w-full z-10 xl:hidden block">
            <img
              src={
                image
                  ? `https://${process.env.REACT_APP_CMS_API}/public/image/${image}`
                  : cars
              }
              alt={imageAltText || "cars"}
              className="my-4 lg:mt-0 xl:absolute xl:right-1 mx-auto xl:mt-0 "
              width={750}
            ></img>
          </div>
          <div className="w-full xl:w-[80%] 2xl:w-[65%] xl:mt-8 sm:flex sm:flex-col sm:justify-center items-center mb-0 md:mb-[90px] xl:mb-0 xl:ml-12">
            <h2 className="hidden text-white font-bold font-open-sans-condensed text-[48px] leading-[56px] sm:text-[56px] md:text-[72px] 2xl:text-[78px] md:leading-[80px] sm:pt-4 lg:pb-0 xl:flex flex-wrap justify-center items-center xl:justify-start xl:items-start mb-0 sm:mb-[15px]">
              <span>Your Premier&nbsp;</span>
              <span>Vehicle Retailer</span>
            </h2>
            <div className="sm:gap-4 sm:flex block mx-auto items-center xl:justify-start xl:items-start xl:w-full sm:w-fit w-11/12 sm:p-0 px-4 2xl:mt-3">
              <Link
                to="/sell-your-vehicle/"
                className="mb-4 sm:mb-0 bg-white border-2 border-white hover:bg-gray-200 hover:border-gray-200 cursor-pointer w-full sm:w-fit flex justify-center items-center rounded-full"
              >
                <div className="flex flex-row px-4 py-3">
                  <div className="text-zinc-950 text-sm font-semibold uppercase">
                    Get Valuation
                  </div>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M13 7L18 12M18 12L13 17M18 12L6 12"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
              <Link
                to="https://www.mycarcreditscore.co.uk/TMCMotors/95641"
                target="_blank"
                className="cursor-pointer w-full sm:w-fit flex justify-center items-center rounded-full border-2 border-white hover:border-gray-400"
              >
                <div className="flex flex-row rounded-full w-full sm:w-fit justify-center items-center px-3 py-3">
                  <div className="text-zinc-950 text-sm font-semibold uppercase text-white hover:text-gray-400">
                    Free Finance Check
                  </div>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M13 7L18 12M18 12L13 17M18 12L6 12"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
          <div className="relative h-fit w-full z-10 hidden xl:block">
            <img
              src={
                image
                  ? `https://${process.env.REACT_APP_CMS_API}/public/image/${image}`
                  : cars
              }
              alt={imageAltText || "cars"}
              className="mt-16 md:mt-0 xl:absolute xl:right-1 2xl:right-4 mx-auto xl:-mt-20"
              width={750}
            ></img>
          </div>
        </div>
      </div>
      <div className="max-w-[700px] xl:max-w-[1300px] mb-[100px] mt-[40px] xl:mt-[50px] px-5 mx-auto relative">
        <h2 className="magictitle text-[48px] leading-[56px] md:text-[72px] md:leading-[80px] lg:pb-0 flex flex-wrap justify-center items-center mb-[15px]">
          <span>How does it&nbsp;</span>
          <span>work?</span>
        </h2>
        <VerticalTimeline lineColor="black">
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{
              background: "rgb(246, 246, 246)",
              color: "#000",
              padding: "1em",
            }}
            contentArrowStyle={{ borderRight: "7px solid  rgb(246, 246, 246)" }}
            iconStyle={{ background: "rgb(97, 97, 97)", color: "#fff" }}
            icon={
              <div className="flex justify-center w-full h-full items-center text-2xl">
                01
              </div>
            }
          >
            <img
              src={process1}
              alt="Choose your vehicle"
              className="max-w-[70px]"
            />
            <h3 className="font-bold">Choose your vehicle:</h3>
            <p className="mt-1">
              We work with you to find your perfect choice of vehicle.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{
              background: "rgb(246, 246, 246)",
              color: "#000",
              padding: "1em",
            }}
            contentArrowStyle={{ borderRight: "7px solid  rgb(246, 246, 246)" }}
            iconStyle={{ background: "rgb(97, 97, 97)", color: "#fff" }}
            icon={
              <div className="flex justify-center w-full h-full items-center text-2xl">
                02
              </div>
            }
          >
            <img
              src={process2}
              alt="Assure & verify"
              className="max-w-[70px]"
            />
            <h3 className="font-bold">Assure & verify:</h3>
            <p className="mt-1">
              We supply you fully detailed videos, mechanical reports, Hpi
              certificates & documentation & history to ensure you are entirely
              satisfied.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{
              background: "rgb(246, 246, 246)",
              color: "#000",
              padding: "1em",
            }}
            contentArrowStyle={{ borderRight: "7px solid  rgb(246, 246, 246)" }}
            iconStyle={{ background: "rgb(97, 97, 97)", color: "#fff" }}
            icon={
              <div className="flex justify-center w-full h-full items-center text-2xl">
                03
              </div>
            }
          >
            <img src={process3} alt="Payment" className="max-w-[70px]" />
            <h3 className="font-bold">Payment:</h3>
            <p className="mt-1">
              Only when you are entirely satisfied, you can select from our
              secure payment portal or if you’d prefer, over the phone with one
              of our team.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{
              background: "rgb(246, 246, 246)",
              color: "#000",
              padding: "1em",
            }}
            contentArrowStyle={{ borderRight: "7px solid  rgb(246, 246, 246)" }}
            iconStyle={{ background: "rgb(97, 97, 97)", color: "#fff" }}
            icon={
              <div className="flex justify-center w-full h-full items-center text-2xl">
                04
              </div>
            }
          >
            <img src={process4} alt="Delivery" className="max-w-[70px]" />
            <h3 className="font-bold">Delivery:</h3>
            <p className="mt-1">
              Have your chosen vehicle delivered to your front door or place of
              work all with the piece of mind of your 14 day money back
              guarantee.
            </p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
      <div className="max-w-[1480px] mt-[0px] xl:mt-[250px] px-5 mx-auto relative">
        <div className="w-full flex justify-center xl:justify-between items-center gap-10 flex-col xl:flex-row z-10">
          <h1 className="mt-0 xl:-mt-60 flex flex-wrap max-w-[700px] xl:max-w-[700px] text-[45px] sm:text-[70px] md:text-[80px] xl:text-[80px] z-10 justify-center xl:justify-start leading-6">
            <span className="subtitle leading-[50px] sm:leading-[70px] xl:leading-[100px]">
              Used&nbsp;
            </span>
            <span className="magictitle leading-[50px] sm:leading-[70px] xl:leading-[100px]">
              Vans &&nbsp;
            </span>
            <span className="magictitle leading-[50px] sm:leading-[70px] xl:leading-[100px] lg:pb-2 xl:pb-0">
              Pickup&nbsp;
            </span>
            <span className="magictitle subtitle leading-[50px] sm:leading-[70px] xl:leading-[100px]">
              Trucks&nbsp;
            </span>
            <span className="subtitle leading-[50px] sm:leading-[70px] xl:leading-[100px]">
              For&nbsp;
            </span>
            <span className="subtitle leading-[50px] sm:leading-[70px] xl:leading-[100px]">
              Sale
            </span>
          </h1>
          <div className=" flex flex-col h-full justify-between max-w-[700px] xl:max-w-[560px] xl:self-start self-center">
            <p className="  text-black font-open-sans-condensed sm:font-open-sans text-[24px] leading-7 font-bold">
              {bannerText ||
                "As an award winning dealer we specialise in supplying the entire UK with high quality, pre-owned pick-up trucks, commercial vehicles and used second hand cars"}
            </p>
            <div className="flex justify-center xl:justify-start">
              <h3 className="w-full hover:text-black sm:w-fit justify-center items-center mt-8 md:mt-16 text-center px-3 md:px-4 py-2 mb-10 magicborder rounded-full font-open-sans-condensed sm:font-open-sans md:text-[28px] text-[23px] leading-6 sm:leading-8 font-bold text-transparent bg-clip-text">
                {bannerSubheading || "FREE Home delivery"}
              </h3>
            </div>
          </div>
        </div>
        <div className="absolute top-[82%] left-[15%] block md:top-[90%] md:left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
          <img
            src={info1}
            alt=""
            className="md:w-fit md:h-fit w-[77px] h-[77px]"
          ></img>
        </div>

        <div className="absolute hidden xl:block top-[522px] -right-[180px]  z-10">
          <img src={info3} alt="cars" className="w-fit h-fit"></img>
        </div>
      </div>
    </div>
  );
}
