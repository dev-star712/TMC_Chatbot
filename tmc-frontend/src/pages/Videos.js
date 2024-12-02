import React, { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";

import MainLayout from "../layouts/MainLayout";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { MotoringHubCard } from "../components/gallery/MotoringHubCard";
import HeroSection1 from "../components/gallery/HeroSection1";
import { Link } from "react-router-dom";
import Meta from "../components/Meta";

export default function Videos() {
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([
    {
      label: "All",
      value: "All",
      desc: [],
    },
  ]);

  const getVideosData = async () => {
    setLoading(true);
    const url = `https://${process.env.REACT_APP_CMS_API}/api/content/allvideo`;
    await axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          const temp = _.cloneDeep(data);
          temp[0].desc = response.data.articles;
          const bundledByCategory = response.data.articles.reduce(
            (acc, article) => {
              const category = article.category;
              if (!acc[category]) {
                acc[category] = [];
              }
              acc[category].push(article);
              return acc;
            },
            {}
          );
          Object.keys(bundledByCategory).forEach((key) => {
            temp.push({
              label: key,
              value: key,
              desc: bundledByCategory[key],
            });
          });
          setData(temp);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getVideosData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //SEO
  const [sdata, setSData] = useState(null);

  const getData = async () => {
    const url = `https://${process.env.REACT_APP_CMS_API}/api/content/load?page=0-13-0`;
    await axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          setSData(response.data);
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
      {sdata && (
        <Meta
          meta_title={sdata.meta_title}
          meta_description={sdata.meta_description}
          canonical_url="/motoring-hub/videos/"
        />
      )}
      <HeroSection1 img={null} words={["motoring hub video"]} mt={"mt-0"} />
      <div className="md:px-11 p-3 w-full  max-w-[1600px] mx-auto">
        <Tabs id="custom-animation" value="All">
          <TabsHeader
            className="w-full lg:w-full mx-auto px-4 lg:px-10 bg-white"
            indicatorprops={{
              className: "bg-gray-200 hidden shadow-none !text-white",
            }}
          >
            <div className="flex md:nb-0 mb-6 lg:flex-row flex-col w-full lg:justify-between justify-center items-center">
              <div className="overflow-x-scroll w-full md:w-auto md:overflow-x-hidden flex flex-row">
                {data.map(({ label, value }) => (
                  <Tab
                    key={value}
                    value={value}
                    onClick={() => setActiveTab(value)}
                    className="w-full text-left"
                  >
                    <h3
                      className={`${
                        activeTab !== value
                          ? " text-black"
                          : "bg-gray-900 text-white "
                      } uppercase border-gray-800 border rounded-full text-center cursor-pointer text-base font-semibold px-3 py-2 no-underline transition-all duration-150 ease-in-out align-middle`}
                    >
                      {label}&nbsp;{label === "All" ? "VIDEO" : ""}
                    </h3>
                  </Tab>
                ))}
              </div>
            </div>
          </TabsHeader>
          <TabsBody
            animate={{
              initial: {
                y: 250,
              },
              mount: {
                y: 0,
              },
              unmount: {
                y: 250,
              },
            }}
          >
            {data.map(({ value, desc }) => (
              <TabPanel key={value} value={value}>
                <div className="flex flex-wrap justify-evenly">
                  {desc.map((item) => (
                    <div
                      key={item._id}
                      className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/3 lg:p-5 p-3"
                    >
                      <MotoringHubCard
                        name={item.title}
                        desc={item.synopsis}
                        type={"View Article"}
                        image={`https://${process.env.REACT_APP_CMS_API}/public/image/${item.image}`}
                        url={`/news${item.url}/`}
                      />
                    </div>
                  ))}
                  {loading && (
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
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
      <div className="max-w-[1240px] mb-[50px] bg-gray-100 w-full mx-auto  px-8 py-[50px] bg-neutral-100 rounded-3xl flex-col justify-start items-center gap-8 hidden md:flex">
        <div className="self-stretch text-center scale-y-110 text-neutral-800 text-[32px] font-bold font-open-sans-condensed uppercase leading-10">
          Make a request now
        </div>
        <div className="md:w-fit md:mx-auto mt-8">
          <div className="md:w-[454px] md:px-0 px-5 justify-start items-center gap-6 flex md:flex-row flex-col">
            <Link
              to={`/contact-us?type=General Enquiry#contact`}
              className="grow shrink w-full basis-0 h-12 px-6 py-3 bg-black hover:bg-gray-800 rounded-[100px] shadow border border-gray-900 justify-center items-center gap-1 flex"
            >
              <div className="text-white text-sm font-semibold font-open-sans-condensed sm:font-open-sans uppercase leading-snug tracking-tight">
                enquire today
              </div>
            </Link>
            <Link
              to={`/contact-us?type=Video Enquiry#contact`}
              className="grow shrink w-full  basis-0 h-12 px-6 py-3 bg-white hover:bg-gray-800 hover:text-white rounded-[100px] shadow border border-gray-800 justify-center items-center gap-1 flex"
            >
              <div className="text-neutral-800 text-sm font-semibold font-open-sans-condensed sm:font-open-sans uppercase leading-snug tracking-tight">
                request a video
              </div>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
