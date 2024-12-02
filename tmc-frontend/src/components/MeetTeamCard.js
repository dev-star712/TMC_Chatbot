import { Link } from "react-router-dom";

export default function MeetTeamCard(props) {
  const { title } = props;
  return (
    <div className="flex flex-col items-left gap-[32px]">
      <h4 className="w-[74%] text-[11px] md:text-[18px] text-gray-800  ">
        {title}
      </h4>
      <div className="flex flex-row justify-between md:justify-start">
        <Link
          to="/vehicles-for-sale/used-trucks"
          className="py-[12px] px-[24px] hover:bg-gray-800 rounded-full  text-white relative bg-black shadow border"
        >
          <span className="absolute inset-0 border-2 border-gray-800 rounded-full "></span>
          <span className="relative z-10 uppercase text-[12px] md:text-[14px]">
            View All Stock
          </span>
        </Link>
        <Link
          to="/contact-us"
          className="text-gray-800 bg-white py-[12px] px-[24px] rounded-full  md:ml-4 hover:text-white relative hover:bg-gray-800"
        >
          <span className="absolute inset-0 border-2 border-gray-800 rounded-full "></span>
          <span className="relative z-10   uppercase text-[12px] md:text-[14px]">
            Contact us
          </span>
        </Link>
      </div>
    </div>
  );
}
