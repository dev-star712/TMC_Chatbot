import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Select,
  Option,
  Rating,
} from "@material-tailwind/react";
import Modal from "react-modal";
import logo from "../../assets/icon/logo.svg";
import downarrow from "../../assets/icon/down-arrow.png";
import { ReactComponent as CloseSVG } from "../svg/close.svg";
import Feedback1 from "../../assets/images/feedback1.jpg";
import Feedback2 from "../../assets/images/feedback2.png";
import { ReactComponent as FeefoSVG } from "../svg/feefo.svg";
import React, { useState, useEffect } from "react";

import axios from "axios";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    marginTop: "10px",
    // borderRadius: "30px",
    transform: "translate(-50%, -50%)",
    height: "100%",
    maxWidth: "auto",
    // overflow: "hidden",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: 1000,
  },
};
const mobileStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    borderRadius: "0px",
    transform: "translate(-50%, -50%)",
    overflowY: "auto !important",
    height: "100%",
    width: "100%",
    zIndex: 1001,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: 1000,
    overflowY: "auto !important",
  },
};
function StarIcon(props) {
  const { size } = props;
  let className = `text-yellow-400`;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      width={`${size}px`}
      height={`${size}px`}
    >
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const ReviewModal = ({
  open,
  setOpen,
  data,
  averageRating,
  totalNumber,
  screenwidth,
  serviceScores,
  setServiceScores,
  setSort,
  sort,
  stars,
  showViewMore,
  viewmore,
  loading,
}) => {
  return (
    <Modal
      isOpen={open}
      onRequestClose={() => {
        setOpen(false);
        document.body.style.overflow = "";
      }}
      style={screenwidth > 550 ? customStyles : mobileStyle}
      contentLabel="all reviews"
    >
      <div className="flex flex-col gap-6 ">
        <div className="flex flex-row justify-between items-start">
          <div className="flex flex-col items-start">
            <img
              id="nav-logo"
              itemProp="logo"
              alt="TMC Logo"
              src={logo}
              className="w-18 h-8"
            />
            <Typography variant="h6" color="blue-gray" className="">
              TMC - The Motor Company
            </Typography>
          </div>
          <div className="">
            <div
              onClick={() => {
                document.body.style.overflow = "";
                setOpen(false);
              }}
              className="w-8 h-8 p-2 rounded-full border border-black justify-center items-center gap-2 inline-flex  "
            >
              <div className="w-4 h-4">
                <CloseSVG />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row flex-wrap justify-center gap-6 sm:justify-between items-center">
          <div className="flex flex-col">
            <div
              className="flex flex-row cursor-pointer rounded-md p-2 hover:shadow-custom-blue transition duration-500 ease-in-out"
              onClick={() => {
                window.open(
                  "https://www.feefo.com/en-GB/reviews/thatchers-motor-company",
                  "_blank"
                );
              }}
            >
              <Rating value={5} readonly />
              <Typography variant="h6" className="ml-2">
                {averageRating}/5.0{" "}
              </Typography>
              <FeefoSVG />
            </div>
            <div className="">
              <Typography
                variant="small"
                className="mt-4 overflow-hidden text-gray-500 h-[21px] max-w-[320px] sm:max-w-[500px]"
              >
                Rating Service Independent given based
              </Typography>
              <Typography
                variant="small"
                className="mt-2 overflow-hidden text-center text-gray-500 h-[21px] max-w-[320px] sm:max-w-[500px]"
              >
                {totalNumber} review verified
              </Typography>
            </div>
          </div>
          <div className="flex flex-row ">
            <img
              src={Feedback1}
              alt="feefo reviews square"
              className="ignore-purify-1h0Ih  ignore-purify-2n3Sp w-[70px] h-[60px]"
            ></img>
            <img
              src={Feedback2}
              alt="car gurus logo"
              className="w-[70px] h-[60px] pl-1"
            />
          </div>
        </div>
      </div>

      <div className="w-full justify-between flex-col sm:flex-row items-center gap-2 py-3 flex">
        <div className="flex gap-3 w-full sm:w-fit">
          <div
            className={`px-4 w-1/2 py-3 sm:w-fit cursor-pointer ${
              sort === "newest"
                ? "bg-gray-800 hover:bg-gray-900 text-white"
                : "bg-white hover:bg-gray-100 border border-gray-800 text-gray-800"
            } rounded-full justify-center items-center gap-2 flex`}
            onClick={(e) => {
              setSort("newest");
            }}
          >
            <div className="text-sm font-semibold font-open-sans-condensed sm:font-open-sans uppercase tracking-tight">
              Newest
            </div>
          </div>
          <div
            className={`px-4 w-1/2 py-3 sm:w-fit cursor-pointer ${
              sort !== "newest"
                ? "bg-gray-800 hover:bg-gray-900 text-white"
                : "bg-white hover:bg-gray-100 border border-gray-800 text-gray-800"
            } rounded-full justify-center items-center gap-2 flex`}
            onClick={(e) => {
              setSort("oldest");
            }}
          >
            <div className="text-sm font-semibold font-open-sans-condensed sm:font-open-sans uppercase  tracking-tight">
              Oldest
            </div>
          </div>
        </div>
        <div className="mt-5 w-full sm:w-fit pl-4 float-right items-end">
          <Select
            label="ALL RATINGS"
            variant="standard"
            value={serviceScores}
            onChange={(e) => {
              setServiceScores(e);
            }}
          >
            <Option value="ALL" disabled={!stars.some((star) => star > 0)}>
              All ratings
            </Option>
            <Option value="5" disabled={!stars[4]}>
              5 Stars
            </Option>
            <Option value="4" disabled={!stars[3]}>
              4 Stars
            </Option>
            <Option value="3" disabled={!stars[2]}>
              3 Stars
            </Option>
            <Option value="2" disabled={!stars[1]}>
              2 Stars
            </Option>
            <Option value="1" disabled={!stars[0]}>
              1 Star
            </Option>
          </Select>

          {/* <select className="mt-2 w-full  bg-white  border-2 border-gray-200 rounded-full py-3 px-6">                
                <option value="option3">2</option>
                <option value="option1">1</option>
              </select> */}
        </div>
      </div>
      <div className="flex max-w-[500px] flex-row flex-wrap justify-between gap-4">
        {data.map((item) => {
          return (
            <Card
              className="px-6 border-b bg-gray-100 w-full mx-auto cursor-pointer hover:shadow-custom-blue transition duration-500 ease-in-out"
              onClick={() => {
                window.open(item.url, "_blank");
              }}
            >
              <CardBody className="py-1">
                <Rating
                  value={
                    item.serviceFeedback.numericalScore
                      ? item.serviceFeedback.numericalScore
                      : 5
                  }
                  readonly
                />
                {item.summary && (
                  <Typography variant="h6" color="blue-gray" className="mb-2">
                    {item.summary.length < 50
                      ? item.summary
                      : `${item.summary.slice(0, 46)} ...`}
                  </Typography>
                )}
                <Typography variant="small">
                  {item.serviceFeedback.consumerComment.length < 100
                    ? item.serviceFeedback.consumerComment
                    : `${item.serviceFeedback.consumerComment.slice(
                        0,
                        96
                      )} ...`}
                </Typography>
                <Typography variant="small" className="text-gray-500">
                  {item.consumerDisplayName}&nbsp;- &nbsp;
                  {new Date(
                    item.serviceFeedback.createDate
                  ).toLocaleDateString()}
                </Typography>
              </CardBody>
            </Card>
          );
        })}
        {loading && (
          <div
            className={`mt-2 mb-4 w-full flex justify-center items-center ml-3 mr-3 ${
              !data.length
                ? "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                : ""
            }`}
          >
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        )}
        {showViewMore && (
          <div className="mt-2 mb-4 w-full flex flex-row justify-between items-center ml-3 mr-3">
            <div className="hidden md:block w-fit border-b-2 border-gray-700 md:w-4/12 lg:w-4/12 xl:w-1/3"></div>
            <div
              onClick={viewmore}
              className=" w-full hover:cursor-pointer flex justify-center flex-row gap-2 items-center md:w-fit bg-black text-white text=[14px] hover:bg-gray-800 py-2  px-6 rounded-full mx-auto"
            >
              <div>View more</div>
              <img src={downarrow} alt="" className="w-3 h-3" />
            </div>
            <div className="hidden md:block w-fit border-b-2 border-gray-700 md:w-4/12 lg:w-4/12 xl:w-1/3"></div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export function FeedbackCard() {
  const [open, setOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [averageRating, setAverageRating] = useState(0);
  const [totalNumber, setTotalNumber] = useState(0);
  const [onestar, setOnestar] = useState(0);
  const [twostar, setTwostar] = useState(0);
  const [threestar, setThreestar] = useState(0);
  const [fourstar, setFourstar] = useState(0);
  const [fivestar, setFivestar] = useState(0);
  const [serviceScores, setServiceScores] = useState("ALL");
  const [sort, setSort] = useState("newest");
  const [pageNumber, setPageNumber] = useState(1);
  const [lastId, setLastId] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [reviewData, setReviewData] = useState([]);
  const [loading, setLoading] = useState(false);

  const showViewMore = () => {
    if (loading) return false;
    if (serviceScores === "ALL") {
      return (
        onestar + twostar + threestar + fourstar + fivestar > 10 * pageNumber
      );
    } else if (serviceScores === "1") {
      return onestar > 10 * pageNumber;
    } else if (serviceScores === "2") {
      return twostar > 10 * pageNumber;
    } else if (serviceScores === "3") {
      return threestar > 10 * pageNumber;
    } else if (serviceScores === "4") {
      return fourstar > 10 * pageNumber;
    } else if (serviceScores === "5") {
      return fivestar > 10 * pageNumber;
    }
  };

  const getFeedbacks = async (
    sort,
    serviceScores,
    pageNumber,
    lastId,
    lastDate
  ) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://${process.env.REACT_APP_API}/api/feefo/feedbacks?sort=${sort}&serviceScores=${serviceScores}&pageNumber=${pageNumber}&lastId=${lastId}&lastDate=${lastDate}`
      );
      setLoading(false);
      return response.data.data;
    } catch (error) {
      console.log(error);
      setLoading(false);
      return null;
    }
  };

  const viewmore = () => {
    (async () => {
      const data = await getFeedbacks(
        sort,
        serviceScores,
        pageNumber + 1,
        lastId,
        lastDate
      );
      if (data) {
        setReviewData([...reviewData, ...data.sales]);
        setPageNumber(pageNumber + 1);
        setLastId(data.lastId);
        setLastDate(data.lastDate);
      }
    })();
  };

  useEffect(() => {
    axios
      .get(`https://${process.env.REACT_APP_API}/api/feefo/stats`)
      .then((response) => {
        setAverageRating(response.data.data.stats[0].averageRating);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(
        `https://${process.env.REACT_APP_API}/api/feefo/count?serviceScores=ALL`
      )
      .then((response) => {
        setTotalNumber(response.data.data.feedbackCount);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(
        `https://${process.env.REACT_APP_API}/api/feefo/count?serviceScores=1`
      )
      .then((response) => {
        setOnestar(response.data.data.feedbackCount);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(
        `https://${process.env.REACT_APP_API}/api/feefo/count?serviceScores=2`
      )
      .then((response) => {
        setTwostar(response.data.data.feedbackCount);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(
        `https://${process.env.REACT_APP_API}/api/feefo/count?serviceScores=3`
      )
      .then((response) => {
        setThreestar(response.data.data.feedbackCount);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(
        `https://${process.env.REACT_APP_API}/api/feefo/count?serviceScores=4`
      )
      .then((response) => {
        setFourstar(response.data.data.feedbackCount);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(
        `https://${process.env.REACT_APP_API}/api/feefo/count?serviceScores=5`
      )
      .then((response) => {
        setFivestar(response.data.data.feedbackCount);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    (async () => {
      const temp = [...reviewData];
      setReviewData([]);
      const data = await getFeedbacks(sort, serviceScores, 1, "", "");
      if (data) {
        setReviewData(data.sales);
        setPageNumber(1);
        setLastId(data.lastId);
        setLastDate(data.lastDate);
      } else {
        setReviewData(temp);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, serviceScores]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenWidth]);
  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };
  // let subtitle

  return (
    <Card
      color="transparent"
      shadow={false}
      className="relative max-w-[1360px]  lg:w-[1100px]"
    >
      <CardHeader
        color="transparent"
        floated={false}
        shadow={false}
        className="mx-0 flex justify-center items-center gap-4 pt-0 pb-0"
      >
        <ReviewModal
          open={open}
          setOpen={setOpen}
          data={reviewData}
          averageRating={averageRating}
          totalNumber={totalNumber}
          screenwidth={screenWidth}
          serviceScores={serviceScores}
          setServiceScores={setServiceScores}
          setSort={setSort}
          sort={sort}
          stars={[onestar, twostar, threestar, fourstar, fivestar]}
          showViewMore={showViewMore()}
          viewmore={viewmore}
          loading={loading}
        />
        <div className="hidden lg:flex w-full gap-0.5 justify-center items-center">
          <div className="hidden lg:flex flex-col gap-0.5">
            <div className="flex items-center justify-center">
              <Typography variant="h5" color="blue-gray">
                Customer Average Rating:
              </Typography>
              <div className="5 flex items-center gap-0 w-[150px]">
                <StarIcon size={30} className="scale-100" />
                <StarIcon size={30} />
                <StarIcon size={30} />
                <StarIcon size={30} />
                <StarIcon size={30} />
              </div>
              <div className="blue-gray font-extrabold">{averageRating}</div>
              <div className="blue-gray font-extrabold">/5</div>
              <div className="border-r-4 w-4 h-8 mr-2 border-gray-200"></div>
            </div>
            <p className="flex flex-row items-center justify-center">
              <span className="text-xs font-black text-gray-500 pr-1  ">
                Independent Service Rating
              </span>
              <span className="text-xs font-normal text-gray-500 pr-1  ">
                based on
              </span>
              <span className="text-xs font-black text-gray-500 pr-1  ">
                {totalNumber}
              </span>
              <span className="text-xs font-black text-gray-500 pr-1  ">
                verified reviews.
              </span>
              <span
                onClick={() => {
                  document.body.style.overflow = "hidden";
                  setOpen(true);
                }}
                className="text-xs font-bold text-blue-600 cursor-pointer  "
              >
                Read all reviews
              </span>
            </p>
          </div>
          <div className="hidden lg:flex w-[120px]">
            <img
              src={Feedback1}
              alt="feefo reviews square"
              className="ignore-purify-1h0Ih  ignore-purify-2n3Sp w-1/2"
            ></img>
            <img
              src={Feedback2}
              alt="car gurus logo"
              className="w-[70px] h-[60px] pl-1"
            />{" "}
            {/* </div> */}
          </div>
        </div>

        <div className="flex flex-col max-lg:w-[320px] max-lg:px-[15px] lg:hidden">
          <div className=" items-center justify-center">
            <Typography variant="h5" color="blue-gray" className="text-center">
              Customer Average Rating
            </Typography>
            <div className="5 flex items-center gap-0 w-[150px] mx-auto">
              <StarIcon size={30} className="scale-100" />
              <StarIcon size={30} />
              <StarIcon size={30} />
              <StarIcon size={30} />
              <StarIcon size={30} />
            </div>
            <div className="flex mx-auto items-center justify-center">
              <Typography color="blue-gray">{averageRating}</Typography>
              <Typography color="blue-gray">/5</Typography>
            </div>
          </div>
          <p className="text-center py-4">
            Independent Service Rating based on {totalNumber} verified reviews.{" "}
            <span
              onClick={() => {
                document.body.style.overflow = "hidden";
                setOpen(true);
              }}
              className="text-xs font-bold text-blue-600 cursor-pointer"
            >
              Read all reviews
            </span>
          </p>
          <div className="inline-flex mx-auto lg:hidden w-[120px]">
            <img
              src={Feedback1}
              alt="feefo reviews square"
              className="ignore-purify-1h0Ih  ignore-purify-2n3Sp w-1/2"
            ></img>
            <img
              src={Feedback2}
              alt="car gurus logo"
              className="w-[70px] h-[60px] pl-1"
            />{" "}
            {/* </div> */}
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
