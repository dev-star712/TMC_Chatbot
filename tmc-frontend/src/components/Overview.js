import { useState } from "react";
export default function Overview(props) {
  const item = props.ele;
  const [more, setMore] = useState(false);
  const description = item.adverts.retailAdverts.description
    ? item.adverts.retailAdverts.description.replace(
        /www\.tmcmotors\.co\.uk/g,
        process.env.REACT_APP_APP
      )
    : "";
  const descriptions =
    description.length <= 350
      ? [description, ""]
      : [description.substring(0, 350), description.substring(350)];
  const handleReadMore = () => {
    setMore(!more);
  };
  return (
    <div className="py-6 flex flex-col justify-center bg-white">
      <h3 className="hidden">Overview</h3>
      <p className="text-gray-900 font-open-sans-condensed sm:font-open-sans text-base font-normal leading-6">
        {more
          ? descriptions.map((desc) => <span>{desc}</span>)
          : `${descriptions[0]}...`}
      </p>
      <div
        className="mt-4 hover:cursor-pointer hover:text-blue-800 text-blue-600 font-open-sans-condensed sm:font-open-sans text-base font-normal leading-6"
        onClick={handleReadMore}
      >
        Read {more ? "less" : "more"}
      </div>
      <div className="text-sm mt-6 w-full md:w-1/2 bg-[#f6f6f6] rounded-2xl">
        <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
          <p className="text-black">Registration</p>
          <p className="font-bold">{item.vehicle.registration}</p>
        </div>
        <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
          <p className="text-black">Exterior Colour</p>
          <p className="font-bold">{item.vehicle.colour}</p>
        </div>
        <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
          <p className="text-black">Fuel Type</p>
          <p className="font-bold">{item.vehicle.fuelType}</p>
        </div>
        <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
          <p className="text-black">Bodystyle</p>
          <p className="font-bold">{item.vehicle.bodyType}</p>
        </div>
        <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
          <p className="text-black">Mileage</p>
          <p className="font-bold">
            {parseInt(item.vehicle.odometerReadingMiles || 0).toLocaleString()}
          </p>
        </div>
        <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
          <p className="text-black">Engine Size(CC)</p>
          <p className="font-bold">
            {parseInt(item.vehicle.engineCapacityCC || 0).toLocaleString()}
          </p>
        </div>
        <div className="flex flex-row justify-between py-2 px-4 border-gray-300">
          <p className="text-black">Transmission</p>
          <p className="font-bold">{item.vehicle.transmissionType}</p>
        </div>
      </div>
    </div>
  );
}
