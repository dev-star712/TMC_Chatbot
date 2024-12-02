import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import MeetTeamCard from "../components/MeetTeamCard";
import EmpCard from "../components/gallery/EmpCard";
import feedback1 from "../assets/images/feedback1.jpg";
import feedback2 from "../assets/images/feedback2.png";
import HeroPic from "../assets/images/hero_pic.jpg";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Meta from "../components/Meta";

export default function MeetTeam() {
  const [teammates, setTeammates] = useState([]);

  const getStaticData = async () => {
    const url = `https://${process.env.REACT_APP_CMS_API}/api/content/allmember`;
    await axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          setTeammates(response.data.members);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getStaticData();
  }, []);

  //SEO
  const [data, setData] = useState(null);

  const getData = async () => {
    const url = `https://${process.env.REACT_APP_CMS_API}/api/content/load?page=0-16-0`;
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
          canonical_url="/meet-the-team/"
        />
      )}
      <div className="w-full flex flex-col md:flex-row justify-center items-center py-[50px] md:py-[100px] px-[20px] sm:px-[60px] 2xl:px-[20px]">
        <div className="w-full flex flex-col lg:flex-row justify-between max-w-[1380px]">
          <div className="w-full flex flex-col gap-[32px] xl:gap-0 lg:flex-row justify-between items-center">
            <div className="flex flex-col justify-between gap-[107px]">
              <div className="flex flex-col gap-[16px]">
                <h1 className="text-[50px] md:text-[100px] w-[74%] md:w-full ">
                  <span className="subtitle md:text-[100px] text-[70px] leading-[70px] md:leading-[100px] uppercase">
                    Meet
                  </span>
                  <span className="flex flex-row">
                    <span className="subtitle md:text-[100px] text-[70px] leading-[70px] md:leading-[100px] uppercase">
                      The
                    </span>
                    <span className="magictitle md:text-[100px] text-[70px] leading-[70px] md:leading-[100px] uppercase">
                      &nbsp;Team
                    </span>
                  </span>
                </h1>
                <MeetTeamCard title="Meet our team of experts and highly-trained consultants here at TMC" />
              </div>
              <div className="hidden md:flex flex-row gap-[12px]">
                <Link
                  to="https://www.feefo.com/en-GB/reviews/thatchers-motor-company?displayFeedbackType=SERVICE&timeFrame=YEAR"
                  target="_blank"
                >
                  <div className="hidden lg:flex mt-0 mx-1 w-[60px] justify-center ">
                    <img alt="feefo logo" title="" src={feedback1} />
                  </div>
                </Link>
                <div className="hidden lg:flex mt-0 mx-1 w-[80px]  justify-center">
                  <img alt="feefo logo" title="" src={feedback2} />
                </div>
                <div className="hidden self-end relative lg:flex mt-0 mx-1 w-[175px] h-[44px] justify-center ">
                  <img
                    alt="feefo logo"
                    title=""
                    src="https://api.feefo.com/api/logo?merchantidentifier=thatchers-motor-company&template=Service-Stars-White-175x44.png&since=all"
                  />
                </div>
              </div>
            </div>
            <div className="max-w-[600px]">
              <img
                src={HeroPic}
                alt="The TMC Team"
                className="w-fit h-fit rounded-[25px]"
              ></img>
            </div>
            <div className="flex md:hidden flex-row gap-[12px] items-baseline">
              <img
                alt="feefo logo"
                title=""
                src={feedback1}
                className="h-[50px]"
              />
              <img
                alt="feefo logo"
                title=""
                src={feedback2}
                className="h-[50px]"
              />
              <img
                alt="feefo logo"
                src="https://api.feefo.com/api/logo?merchantidentifier=thatchers-motor-company&template=Service-Stars-White-175x44.png&since=all"
                className="h-[30px]"
              />
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full flex flex-col md:flex-row justify-center items-center py-[100px]  px-[20px] md:px-0">
        <div className="w-full flex flex-col max-w-[1380px]">
          <div className="mx-auto">
            <div className="flex flex-row   text-[30px] md:text-center text-left md:text-6xl ">
              <div className="text-gray-800 md:text-center text-left font-open-sans-condensed font-bold leading-tight uppercase">
                Meet the
              </div>
              <div className="text-transparent magictitle bg-clip-text font-open-sans-condensed font-bold leading-tight uppercase">
                &nbsp;team
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap justify-evenly">
            {teammates.map((item, index) => (
              <EmpCard data={item} key={index} />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
