import { Link } from "react-router-dom";
import carcrash from "../assets/icon/car-crash.svg";
import guarantee from "../assets/icon/guarantee.svg";
import peoplecarry from "../assets/icon/people-carry.svg";

export default function Value() {
  const values = [
    {
      icon: carcrash,
      link: "/vehicles-for-sale/used-trucks/",
      title: "Value My Car",
      description:
        "We sell all brands of cars and trucks meaning we can give you a great price.",
    },
    {
      icon: guarantee,
      link: "/buy-online",
      title: "Affordable Finance",
      description:
        "Affordable, flexible finance solutions. We offer a wide range of finance packages to help with your new purchase.",
    },
    {
      icon: peoplecarry,
      link: "/meet-the-team/",
      title: "Meet the team",
      description:
        "We have been selling a wide range of used vehicles for many years and pride ourselves in our personal customer service.",
    },
  ];
  return (
    <div className="w-full h-fit custom-gradients px-5 md:px-24 flex justify-center items-center">
      <div className="border-t-2 border-[#474747] lg:py-[100px] py-[50px]">
        <div className="max-w-[1280px] w-full flex flex-col justify-center gap-6 lg:grid lg:grid-cols-3 lg:gap-[50px]">
          {values.map((item, index) => (
            <div
              key={index}
              className="mt-6 md:mt-0 flex flex-row text-white gap-6 md:gap-8"
            >
              <div className="p-3 md:p-4 h-max flex justify-center items-center rounded-[16px] bg-opacity-25 bg-white">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-6 h-6 md:w-8 md:h-8"
                />
              </div>

              <div className="flex flex-col justify-between w-full">
                <div className="flex flex-col">
                  <h5 className="text-white font-open-sans-condensed text-2xl font-bold leading-10">
                    {item.title}
                  </h5>
                  <p className="mt-2 text-white font-open-sans-condensed sm:font-open-sans text-base font-normal leading-7  ">
                    {item.description}
                  </p>
                </div>
                <Link
                  to={item.link}
                  className="mt-8 w-36 h-10 flex justify-center items-center border-2 border-white rounded-full font-open-sans-condensed sm:font-open-sans  text-sm hover:cursor-pointer hover:text-black hover:bg-white font-semibold leading-5 tracking-tighter uppercase"
                >
                  <div className="  ">FIND OUT MORE</div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
