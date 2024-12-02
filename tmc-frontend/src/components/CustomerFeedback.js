import { FeedbackCard } from "./gallery/FeedbackCard";
import { ReviewCarousel } from "./gallery/ReviewCarousel";
import { ReviewCard } from "./gallery/ReviewCard";
import info1 from "./svg/info1.svg";
import axios from "axios";
import { useEffect, useState } from "react";

export default function CustomerFeedback() {
  const [reviewData, setReviewData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://${process.env.REACT_APP_API}/api/feefo/feedbacks?sort=newest&serviceScores=ALL&pageNumber=1&lastId=&lastDate=`
      )
      .then((response) => {
        console.log(response.data.data.sales);
        setReviewData(response.data.data.sales);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="relative xl:mx-[94.5px] mx-4 lg:py-[80px] px-3">
      <h2 className="mt-[50px] xl:mt-0 text-center text-[45px] sm:text-[70px] md:text-[80px] xl:text-[80px] font-bold leading-none font-open-sans-condensed">
        Customer Feedback
      </h2>

      <div className="absolute hidden xl:block  right-80 -top-20 -z-10">
        <img src={info1} alt="" className="w-fit h-fit"></img>
      </div>

      <div className="mt-8 flex justify-center w-full">
        <FeedbackCard />
      </div>
      <div className="mt-6 hidden sm:flex max-w-[1040px] justify-center items-center w-full h-fit mx-auto">
        <ReviewCarousel>
          <div className="flex justify-between">
            {reviewData.slice(0, 4).map((item, i) => {
              return <ReviewCard key={i} data={item} />;
            })}
          </div>
          <div className="flex justify-between">
            {reviewData.slice(4, 8).map((item, i) => {
              return <ReviewCard key={i} data={item} />;
            })}
          </div>
        </ReviewCarousel>
      </div>
      <div className="mt-8 block sm:hidden max-w-[1040px] justify-center items-center w-full h-fit mx-auto">
        {reviewData.slice(0, 4).map((item, i) => {
          return <ReviewCard key={i} data={item} />;
        })}
      </div>
    </div>
  );
}
