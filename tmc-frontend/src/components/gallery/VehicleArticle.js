import { Link } from "react-router-dom";

export function VehicleArticle({ item }) {
  const { title, image, synopsis, url } = item;
  return (
    <div className="md:max-w-[330px] w-full flex flex-col mt-8 min-w-fit md:min-w-[280px] rounded-lg overflow-hidden">
      <div className="w-full rounded-lg">
        <img
          src={`https://${process.env.REACT_APP_CMS_API}/public/image/${image}`}
          alt={title}
          className="h-[330px]"
        />
      </div>
      <div className=" mt-4 flex justify-start">
        <h5 className="text-gray-800 font-bold font-open-sans-condensed text-2xl leading-8">
          {title}
        </h5>
      </div>

      <p className=" my-4 flex flex-wrap gap-2 text-left">{synopsis}</p>
      <div className=" pt-4 flex justify-start border-t-[1px] border-gray-500">
        <Link
          to={`/news${url}/`}
          className="bg-gray-900   rounded-full cursor-pointer px-4 py-[10px] text-center no-underline transition-all duration-150 ease-in-out select-none align-middle hover:bg-gray-700 hover:text-white text-white text-sm font-semibold font-open-sans-condensed sm:font-open-sans uppercase leading-tight tracking-tight"
        >
          View Article
        </Link>
      </div>
    </div>
  );
}
