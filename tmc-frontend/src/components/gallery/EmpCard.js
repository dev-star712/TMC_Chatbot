import { useState } from "react";
import team0 from "./../../assets/images/team/team0.png";

export default function EmpCard(props) {
  const { name, role, bio, image } = props.data;
  const [more, setMore] = useState(false);
  return (
    <div className="m-2 flex flex-col max-w-[300px] border-2 rounded-md hover:cursor-pointer hover:border-gray-400 hover:shadow-lg">
      <img
        src={
          image
            ? `https://${process.env.REACT_APP_CMS_API}/public/image/${image}`
            : team0
        }
        alt={`TMC Team Member - ${name}`}
      />
      <div className="px-4 pb-4">
        <h5 className="mt-6 text-gray-700 font-open-sans-condensed text-2xl font-bold leading-8  ">
          {name}
        </h5>
        <h6 className="mt-3 text-black font-inter text-base font-normal  ">
          {role}
        </h6>
        <p
          className={`mt-3 w-full h-[150px]  ${
            more ? "overflow-y-scroll" : "overflow-hidden"
          } text-blue-gray-600  font-inter text-base font-normal  `}
        >
          {bio}
        </p>

        <div
          className="mt-2 hover:text-[#0449c8] text-blue-600   "
          onClick={() => setMore(!more)}
        >
          {!more ? "Know more" : "Know less"}
        </div>
      </div>
    </div>
  );
}
