import { ReactComponent as HeroSectionSVG } from "../svg/herosection.svg";

export default function HeroSection({ mt, words }) {
  return (
    <div className="w-full h-fit magicbackground flex flex-col justify-center items-center  relative">
      <div
        className={`h-1/3 absolute bottom-0 w-full bg-gradient-to-b from-transparent to-white -z-20`}
      ></div>
      <div className="w-full items-center lg:items-start  py-10 px-5 max-w-[1400px] justify-between md:px-10 ">
        <h1 className=" h-full sm:items-start lg:items-start text-left lg:justify-start justify-center text-white font-open-sans-condensed font-bold text-7xl leading-6 uppercase flex flex-wrap">
          {words.map((word, index) => {
            return (
              <span
                key={index}
                className={`${
                  index === 0 ? "lg:w-full lg:text-start  " : ""
                }  title text-[70px] md:text-[100px] leading-[70px] md:leading-[100px]`}
              >
                {word}
                {index === 0 ? "" : ""}&nbsp;
              </span>
            );
          })}
        </h1>
        <div className=" absolute top-5 left-1/2">
          <HeroSectionSVG />
        </div>
      </div>
      <div className="h-[50px]"></div>
    </div>
  );
}
