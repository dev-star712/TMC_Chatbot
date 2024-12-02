import { Link } from "react-router-dom";

export default function UnsplashCard({ data, type }) {
  return (
    <div className="py-5 flex flex-row text-white">
      <div className="w-32 h-32  flex justify-center items-start rounded-[4px] mr-8">
        <img
          src={`https://${process.env.REACT_APP_CMS_API}/public/image/${data.image}`}
          alt="my"
          width="128px"
        />
      </div>
      <div className="flex flex-col max-w-[260px]">
        <div className="text-gray-200 font-open-sans-condensed sm:font-open-sans text-xs font-normal leading-5  ">
          {data.date}
        </div>
        <h4
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
          className="mt-2  "
        >
          {data.title}
        </h4>
        <Link
          to={`/news${data.url}/`}
          className="mt-8 flex justify-start items-center font-open-sans-condensed sm:font-open-sans text-2 hover:cursor-pointer hover:text-gray-200 leading-5 tracking-tighter  "
        >
          View Detail
        </Link>
      </div>
    </div>
  );
}
