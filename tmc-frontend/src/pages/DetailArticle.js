import MainLayout from "../layouts/MainLayout";
import { WhiteBtn1 } from "../components/gallery/WhiteBtn1";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ResponsiveArticleSlider from "../components/gallery/ResponsiveArticleSlider";
import ShowContent from "../components/ShowContent";
import Meta from "../components/Meta";

export default function DetailArticle() {
  const { url } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [featuredArticles, setFeaturedArticles] = useState([]);

  const getNewsData = async () => {
    setLoading(true);
    await axios
      .get(
        `https://${process.env.REACT_APP_CMS_API}/api/content/article-by-url/${url}`
      )
      .then((response) => {
        if (response.status === 200) {
          setData(response.data.article);
          setFeaturedArticles(response.data.featuredArticles);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getNewsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return (
    <MainLayout>
      {data && (
        <Meta
          meta_title={data.meta_title || data.title}
          meta_description={data.meta_description || data.synopsis}
          canonical_url={
            data.canonical_url ? data.canonical_url : `/news${data.url}/`
          }
        />
      )}

      {["review", "news"].includes(data?.article_type) ? (
        <>
          {!loading && (
            <div className="max-w-[1440px] w-full mx-auto px-[20px] xl:px-[100px] md:px-[50px] pt-8 pb-[50px] bg-white  clear-both">
              {data ? (
                <div className="flex-col justify-start items-start gap-6 flex">
                  <h2 className="self-stretch text-neutral-800 text-[40px] md:text-5xl font-bold font-open-sans-condensed uppercase leading-[56px] clear-both w-full">
                    {data.title}
                  </h2>
                  <div className="self-stretch  clear-both text-neutral-800 text-xl font-normal font-open-sans-condensed sm:font-open-sans leading-loose">
                    <ShowContent htmlContent={data.content} />
                  </div>
                </div>
              ) : (
                <div className="mt-10 flex w-full h-full text-center subtitle text-[20px] sm:text-[40px] md:text-[60px]">
                  <div className="mt-2 mb-4 w-full flex justify-center items-center ml-3 mr-3">
                    We couldn't found this article.
                  </div>
                </div>
              )}
            </div>
          )}

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

          <div className="max-w-[1240px] mx-auto my-10  px-8 py-[50px] bg-gray-100 rounded-3xl flex-col justify-start items-center gap-8">
            <div className="self-stretch md:w-[400px] mx-auto  text-center scale-y-110 text-gray-800 text-[32px] font-bold font-open-sans-condensed uppercase leading-10">
              Do you need help?
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
        </>
      ) : (
        <>
          {!loading && (
            <div className="max-w-[1440px] w-full mx-auto px-[20px] sm:px-[60px] md:px-[100px] py-[50px] bg-white justify-center items-start gap-[50px] flex xl:flex-row flex-col-reverse">
              {data ? (
                <>
                  <div className="xl:w-1/2 w-full flex-col justify-start items-start gap-6 inline-flex">
                    <h2 className="self-stretch text-neutral-800 text-[40px] md:text-5xl font-bold font-open-sans-condensed uppercase leading-[56px] clear-both w-full">
                      {data.title}
                    </h2>
                    <div className="self-stretch leading-loose">
                      <ShowContent htmlContent={data.content} />
                    </div>
                  </div>
                  <div className="xl:w-1/2 w-full self-stretch flex-col justify-start items-center gap-8 inline-flex">
                    <div className="w-full">
                      <iframe
                        className="rounded-3xl w-full min-h-[400px]"
                        src={data.video_url}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div className="max-w-[1240px] bg-gray-100 w-full mx-auto  px-8 py-[50px] bg-neutral-100 rounded-3xl flex-col justify-start items-center gap-8 hidden xl:flex">
                      <div className="w-[400px] mx-auto  self-stretch text-center scale-y-110 text-neutral-800 text-[32px] font-bold font-open-sans-condensed uppercase leading-10">
                        Do you need help?
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
                  </div>
                </>
              ) : (
                <div className="mt-10 flex w-full h-full text-center subtitle text-[20px] sm:text-[40px] md:text-[60px]">
                  <div className="mt-2 mb-4 w-full flex justify-center items-center ml-3 mr-3">
                    We couldn't found this article.
                  </div>
                </div>
              )}
            </div>
          )}

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

          <div
            className={`max-w-[1240px] mx-auto my-10  px-8 py-[50px] bg-gray-100 rounded-3xl flex-col justify-start items-center gap-8 ${
              data ? "xl:hidden" : ""
            }`}
          >
            <div className="self-stretch md:w-[400px] mx-auto  text-center scale-y-110 text-gray-800 text-[32px] font-bold font-open-sans-condensed uppercase leading-10">
              Do you need help?
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
        </>
      )}

      {data && (
        <div className=" w-full mb-10">
          <div className="mx-4 md:mt-[20px] mt-0 max-w-[1360px] bg-transparent md:w-full flex lg:flex-row flex-col  md:justify-between items-center md:mx-auto lg:pt-[50px] pt-[20px] md:pb-10">
            <h3 className=" lg:pb-0 flex flex-wrap justify-center items-center">
              <span className="subtitle  text-[48px] leading-[56px] md:text-[72px] md:leading-[80px] uppercase">
                Featured
              </span>
              {data.article_type === "news" && (
                <span className="magictitle text-[48px] leading-[56px] md:text-[72px] md:leading-[80px] uppercase">
                  &nbsp;Blogs
                </span>
              )}
              {data.article_type === "review" && (
                <span className="magictitle text-[48px] leading-[56px] md:text-[72px] md:leading-[80px] uppercase">
                  &nbsp;Reviews
                </span>
              )}
              {data.article_type === "video" && (
                <span className="magictitle text-[48px] leading-[56px] md:text-[72px] md:leading-[80px] uppercase">
                  &nbsp;Videos
                </span>
              )}
            </h3>
            <div className="hidden gap-3 lg:flex">
              {data.article_type === "news" && (
                <Link to="/motoring-hub/blog/">
                  <WhiteBtn1 name="VIEW ALL BLOGS" />
                </Link>
              )}
              {data.article_type === "review" && (
                <Link to="/motoring-hub/reviews/">
                  <WhiteBtn1 name="VIEW ALL REVIEWS" />
                </Link>
              )}
              {data.article_type === "video" && (
                <Link to="/motoring-hub/videos/">
                  <WhiteBtn1 name="VIEW ALL VIDEOS" />
                </Link>
              )}
            </div>
          </div>

          <div className="px-5 w-full flex justify-center md:px-0 pb-3 lg:pb-10 ">
            <div className="max-w-[1360px] w-full">
              <ResponsiveArticleSlider data={featuredArticles} />
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
