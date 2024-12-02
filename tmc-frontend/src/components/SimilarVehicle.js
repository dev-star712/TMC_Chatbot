import { Link } from "react-router-dom";
import { WhiteBtn1 } from "../components/gallery/WhiteBtn1";
import ResponsiveCarSlider from "./gallery/ResponsiveCarSlider";

export default function SimilarVehicle({ title, ele, link }) {
  return (
    <>
      <div className="md:mt-[50px] mt-0 max-w-[1360px] bg-transparent w-full flex lg:flex-row flex-col  md:justify-between items-center md:mx-auto lg:pt-[50px] pt-[50px] md:pb-10">
        <h2 className="lg:pb-0 flex flex-wrap justify-center items-center">
          <span className="subtitle  text-[48px] leading-[56px] md:text-[72px] md:leading-[80px]">
            {title[0]}
          </span>
          <span className="magictitle text-[48px] leading-[56px] md:text-[72px] md:leading-[80px]">
            &nbsp;{title[1]}&nbsp;
          </span>
        </h2>
        <div className="hidden gap-3 lg:flex">
          <Link to={link} className="scale-100">
            <WhiteBtn1 name="VIEW ALL VEHICLE" />
          </Link>
        </div>
      </div>

      <div className="px-5 w-full flex justify-center md:px-0 pb-3 lg:pb-10 ">
        <div className="max-w-[1360px] w-full">
          <ResponsiveCarSlider ele={ele} />
        </div>
      </div>
    </>
  );
}
