import React, { useEffect, useState } from "react";
import UnsplashCard from "./UnsplashCard";
import { Link } from "react-router-dom";
import axios from "axios";

export default function FeaturedHub() {
  const [tab, setTab] = useState(1);

  const [reviews, setReviews] = useState([]);
  const [videos, setVideos] = useState([]);
  const [articles, setArticles] = useState([]);

  const getData = async () => {
    await axios
      .get(`https://${process.env.REACT_APP_CMS_API}/api/content/allreview`)
      .then((response) => {
        if (response.status === 200) {
          const temp = [...response.data.articles];
          temp.sort((a, b) => {
            if (a.featured && !b.featured) {
              return -1;
            } else if (!a.featured && b.featured) {
              return 1;
            } else {
              return 0;
            }
          });
          setReviews(temp.slice(0, 3));
        }
      })
      .catch((err) => {});

    await axios
      .get(`https://${process.env.REACT_APP_CMS_API}/api/content/allvideo`)
      .then((response) => {
        if (response.status === 200) {
          const temp = [...response.data.articles];
          temp.sort((a, b) => {
            if (a.featured && !b.featured) {
              return -1;
            } else if (!a.featured && b.featured) {
              return 1;
            } else {
              return 0;
            }
          });
          setVideos(temp.slice(0, 3));
        }
      })
      .catch((err) => {});

    await axios
      .get(`https://${process.env.REACT_APP_CMS_API}/api/content/allnews`)
      .then((response) => {
        if (response.status === 200) {
          const temp = [...response.data.articles];
          temp.sort((a, b) => {
            if (a.featured && !b.featured) {
              return -1;
            } else if (!a.featured && b.featured) {
              return 1;
            } else {
              return 0;
            }
          });
          setArticles(temp.slice(0, 3));
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-fit bg-[#1a1a1a] flex justify-center items-center lg:p-[100px] px-4 py-[50px]">
      <div className="flex flex-col max-w-[1280px] w-full">
        <div className="">
          <div className="flex flex-col xl:flex-row  xl:justify-between">
            <h2 className="text-white text-[40px] md:text-6xl font-bold text-left md:text-center flex justify-center">
              Motoring Hub
            </h2>
            <div className="mt-6 xl:mt-0 flex flex-row self-center border-[1px] border-white rounded-full p-1">
              <div
                onClick={() => setTab(1)}
                className={`${
                  tab === 1
                    ? "bg-white text-black border-white"
                    : "text-white border-transparent hover:border-white hover:bg-opacity-50 hover:bg-white"
                } px-4 py-3 flex items-center justify-center  text-sm text-center  hover:cursor-pointer border-[1px] mr-4 rounded-full transition-all duration-1500`}
              >
                <h3 className=" ">REVIEWS</h3>
              </div>
              <div
                onClick={() => setTab(2)}
                className={`${
                  tab === 2
                    ? "bg-white text-black border-white"
                    : "text-white border-transparent hover:border-white hover:bg-opacity-50 hover:bg-white"
                } px-4 py-3 flex items-center justify-center  text-sm text-center  hover:cursor-pointer border-[1px] mx-4 rounded-full transition-all duration-1500`}
              >
                <h3 className=" ">VIDEOS</h3>
              </div>
              <div
                onClick={() => setTab(3)}
                className={`${
                  tab === 3
                    ? "bg-white text-black border-white"
                    : "text-white border-transparent hover:border-white hover:bg-opacity-50 hover:bg-white"
                } px-4 py-3 flex items-center justify-center  text-sm text-center  hover:cursor-pointer border-[1px] ml-4 rounded-full transition-all duration-1500`}
              >
                <h3 className=" ">ARTICLES</h3>
              </div>
            </div>
          </div>
        </div>
        {tab === 1 ? (
          <>
            <div className="mt-12 flex flex-row text-white">
              {reviews.length > 0 ? (
                <div className="w-full flex flex-col xl:flex-row justify-between items-center">
                  <div className="max-w-[630px] xl:self-start">
                    <div className="text-white-80 font-open-sans-condensed sm:font-open-sans text-xs text-center xl:text-start font-normal leading-5">
                      Review | {reviews[0].date}
                    </div>
                    <h4 className="mt-10 text-white font-open-sans-condensed text-[30px] text-center xl:text-start md:text-5xl font-medium leading-10  ">
                      {reviews[0].title}
                    </h4>
                    <p className="mt-8 text-white font-open-sans-condensed sm:font-open-sans text-base font-normal leading-7 text-center xl:text-start">
                      {reviews[0].synopsis}
                    </p>
                    <div className="mt-8 w-32 border-2 mx-auto border-white rounded-full font-open-sans-condensed sm:font-open-sans text-sm hover:text-black hover:bg-white font-semibold leading-5 tracking-tighter uppercase text-center">
                      <Link to="/motoring-hub/reviews/">
                        <div className="py-2">View More</div>
                      </Link>
                    </div>
                  </div>
                  <div className=" xl:pt-0 pt-[40px]">
                    <img
                      src={`https://${process.env.REACT_APP_CMS_API}/public/image/${reviews[0].image}`}
                      alt="unslash"
                      className="w-fit h-fit lg:w-[500px]"
                    />
                  </div>
                </div>
              ) : (
                <>Sorry, We have no articles.</>
              )}
            </div>
            <div className="mt-12 flex flex-row">
              <div className="w-full flex flex-wrap justify-evenly ">
                {reviews.map((item, index) => (
                  <UnsplashCard key={index} data={item} type={"review"} />
                ))}
              </div>
            </div>
          </>
        ) : tab === 2 ? (
          <>
            <div className="mt-12 flex flex-row text-white">
              {videos.length > 0 ? (
                <div className="w-full flex flex-col xl:flex-row justify-between items-center">
                  <div className="max-w-[630px] xl:self-start">
                    <div className="text-white-80 font-open-sans-condensed sm:font-open-sans text-xs text-center xl:text-start font-normal leading-5">
                      Video | {videos[0].date}
                    </div>
                    <h4 className="mt-10 text-white font-open-sans-condensed text-[30px] text-center xl:text-start md:text-5xl font-medium leading-10">
                      {videos[0].title}
                    </h4>
                    <p className="mt-8 text-white font-open-sans-condensed sm:font-open-sans text-base font-normal leading-7 text-center xl:text-start">
                      {videos[0].synopsis}
                    </p>
                    <div className="mt-8 w-32 border-2 mx-auto border-white rounded-full font-open-sans-condensed sm:font-open-sans text-sm hover:cursor-pointer hover:text-black hover:bg-white font-semibold leading-5 tracking-tighter uppercase text-center">
                      <Link to="/motoring-hub/videos/">
                        <div className="py-2">View More</div>
                      </Link>
                    </div>
                  </div>
                  <div className="xl:pt-0 pt-[40px]">
                    <img
                      src={`https://${process.env.REACT_APP_CMS_API}/public/image/${videos[0].image}`}
                      alt="unslash"
                      className="w-fit h-fit lg:w-[500px]"
                    />
                  </div>
                </div>
              ) : (
                <>Sorry, We have no articles.</>
              )}
            </div>
            <div className="mt-12 flex flex-row">
              <div className="w-full flex flex-wrap justify-evenly ">
                {videos.map((item, index) => (
                  <UnsplashCard key={index} data={item} type={"video"} />
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mt-12 flex flex-row text-white">
              {articles.length > 0 ? (
                <div className="w-full flex flex-col xl:flex-row justify-between items-center">
                  <div className="max-w-[630px] xl:self-start">
                    <div className="text-white-80 font-open-sans-condensed sm:font-open-sans text-xs text-center xl:text-start font-normal leading-5">
                      Article | {articles[0].date}
                    </div>
                    <h4 className="mt-10 text-white font-open-sans-condensed text-[30px] text-center xl:text-start  md:text-5xl font-medium leading-10">
                      {articles[0].title}
                    </h4>
                    <p className="mt-8 text-white font-open-sans-condensed sm:font-open-sans text-base font-normal leading-7 text-center xl:text-start">
                      {articles[0].synopsis}
                    </p>
                    <div className="mt-8 w-32 border-2 mx-auto border-white rounded-full font-open-sans-condensed sm:font-open-sans text-sm hover:cursor-pointer hover:text-black hover:bg-white font-semibold leading-5 tracking-tighter uppercase text-center">
                      <Link to="/motoring-hub/blog/">
                        <div className="py-2">View More</div>
                      </Link>
                    </div>
                  </div>
                  <div className=" xl:pt-0 pt-[40px]">
                    <img
                      src={`https://${process.env.REACT_APP_CMS_API}/public/image/${articles[0].image}`}
                      alt="unslash"
                      className="w-fit h-fit lg:w-[500px]"
                    />
                  </div>
                </div>
              ) : (
                <>Sorry, We have no articles.</>
              )}
            </div>
            <div className="mt-12 flex flex-row">
              <div className="w-full flex flex-wrap justify-evenly ">
                {articles.map((item, index) => (
                  <UnsplashCard key={index} data={item} type={"news"} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
