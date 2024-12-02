import React, { useEffect, useState } from "react";
import axios from "axios";
import { ReactComponent as SectionStar } from "./svg/section2Star.svg";
import { ReactComponent as Check2 } from "./svg/check2.svg";
import { ReactComponent as CircleWithCheck } from "./svg/circleWithCheck.svg";

export default function Section1() {
  const [videoUrl, setVideoUrl] = useState(null);
  const getStaticData = async () => {
    const url = `https://${process.env.REACT_APP_CMS_API}/api/content/load?page=0-0-0`;
    await axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          setVideoUrl(response.data.video_url);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getStaticData();
  }, []);

  return (
    <div className="mx-auto max-w-[1340px] w-full">
      <div className="flex flex-col md:flex-row px-5 py-[50px] md:justify-between">
        <div className="w-full md:w-1/2 md:mr-3 lg:mr-0">
          <div className="flex w-full lg:max-w-[400px] bg-[#F6F6F6] p-6 my-4 rounded-[16px] ">
            <div className="min-w-[64px] h-[64px] rounded-lg border border-gray-700 bg-gray-700 flex justify-center items-center">
              <SectionStar
                className="w-full"
                title="Multi-award winning van and pick-up truck specialist"
              />
            </div>
            <p className="  ml-4 text-gray-700 font-open-sans-condensed sm:font-open-sans font-semibold text-[18px] md:ml-6 md:text-lg leading-none md:leading-8 flex items-center">
              Multi-award winning van and pick-up truck specialist
            </p>
          </div>
          <div className="flex w-full lg:max-w-[400px] bg-[#F6F6F6] p-6 my-4 rounded-[16px] ">
            <div className="min-w-[64px] h-[64px] rounded-lg border border-gray-700 bg-gray-700 flex justify-center items-center">
              <Check2
                className="w-full"
                title="We carry out multi-point inspections as standard"
              />
            </div>

            <p className="  ml-4 text-gray-700 font-open-sans-condensed sm:font-open-sans font-semibold  text-[18px] md:ml-6 md:text-lg leading-none md:leading-8 flex items-center">
              We carry out multi-point inspections as standard
            </p>
          </div>
          <div className="flex w-full lg:max-w-[400px] bg-[#F6F6F6] p-6 my-4 rounded-[16px] ">
            <div className="min-w-[64px] h-[64px] rounded-lg border border-gray-700 bg-gray-700 flex justify-center items-center">
              <CircleWithCheck
                className="w-full"
                title="14-day money back guarantee available"
              />
            </div>
            <p className="  ml-4 text-gray-700 font-open-sans-condensed sm:font-open-sans font-semibold  text-[18px] md:ml-6 md:text-lg leading-none md:leading-8 flex items-center">
              14-day money back guarantee available
            </p>
          </div>
        </div>
        <div className="w-full h-[250px] md:h-[400px] md:w-1/2 md:ml-3 lg:ml-0 flex justify-center items-center lg:mt-0 mt-5">
          <iframe
            className="video_homepage w-full h-[250px] md:h-[400px]"
            src={
              videoUrl ||
              "https://www.youtube.com/embed/buNT9D2_WCc?si=jAJ6y8S1KbzD6Zgr"
            }
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
