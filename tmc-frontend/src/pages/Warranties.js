import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HeroSection from "../components/gallery/HeroSection";
import warranty from "../assets/images/warranty.png";
import ShowContent from "../components/ShowContent";
import Meta from "../components/Meta";

export default function Warranties() {
  //SEO
  const [data, setData] = useState(null);

  const getData = async () => {
    setLoading(true);
    const url = `https://${process.env.REACT_APP_CMS_API}/api/content/load?page=0-11-0`;
    await axios
      .get(url)
      .then((response) => {
        setLoading(false);
        if (response.status === 200) {
          setData(response.data);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [loading, setLoading] = useState(false);

  return (
    <MainLayout>
      {data && (
        <Meta
          meta_title={data.meta_title}
          meta_description={data.meta_description}
          canonical_url="/motoring-hub/warranties/"
        />
      )}
      <HeroSection
        img={warranty}
        words={["motoring hub", "warranties"]}
        mt={"mt-0"}
        long={true}
      />
      {/* <div className="h-fit w-full mx-auto max-w-[1440px]  px-5 sm:px-[30px] md:px-[50px] lg:px-[80px] xl:px-[100px] pt-[100px] bg-white justify-center items-start gap-[50px] flex xl:flex-row flex-col">
        <div className="xl:w-[45%] w-full flex-col justify-start items-start gap-6 inline-flex">
          <h2 className="xl:w-[1117px] text-neutral-800   text-left md:text-center text-[32px] md:text-7xl font-bold font-open-sans-condensed sm:font-open-sans uppercase leading-none md:leading-[80px]">
            The Road to Peace of Mind
          </h2>
          <p className="self-stretch text-black text-xl font-normal font-open-sans-condensed sm:font-open-sans leading-loose">
            Here at TMC, we’re confident in the vehicles we sell. We understand
            the need for complete peace of mind when changing to an unfamiliar
            vehicle - and that’s why we’ve partnered with Crystal Clear
            Warranties.
          </p>
          <p className="self-stretch text-black text-xl font-normal font-open-sans-condensed sm:font-open-sans leading-loose">
            We offer only their highest “Diamond” level of cover, to offer you
            almost complete reassurance on the road ahead.
          </p>
          <div className="self-stretch h-[88px] flex-col justify-start items-start gap-2 flex">
            <div className="self-stretch justify-start items-start gap-2 inline-flex">
              <div className="p-1 rounded-[100px] border border-red-600 justify-center items-center gap-2 flex">
                <div className="w-4 h-4 relative">
                  <CheckSVG />
                </div>
              </div>
              <h6 className="grow shrink basis-0 text-black text-base font-semibold font-open-sans-condensed sm:font-open-sans leading-normal">
                No excess to pay on a claim
              </h6>
            </div>
            <div className="self-stretch justify-start items-start gap-2 inline-flex">
              <div className="p-1 rounded-[100px] border border-red-600 justify-center items-center gap-2 flex">
                <div className="w-4 h-4 relative">
                  <CheckSVG />
                </div>
              </div>
              <h6 className="grow shrink basis-0 text-black text-base font-semibold font-open-sans-condensed sm:font-open-sans leading-normal">
                No limit on your total number of claims
              </h6>
            </div>
            <div className="self-stretch justify-start items-start gap-2 inline-flex">
              <div className="p-1 rounded-[100px] border border-red-600 justify-center items-center gap-2 flex">
                <div className="w-4 h-4 relative">
                  <CheckSVG />
                </div>
              </div>
              <h6 className="grow shrink basis-0 text-black text-base font-semibold font-open-sans-condensed sm:font-open-sans leading-normal">
                An individual claim limit of up to £3,000
              </h6>
            </div>
          </div>
          <p className="mt-6 self-stretch text-black text-xl font-normal font-open-sans-condensed sm:font-open-sans leading-loose">
            A £3,000 claim limit is unusually high compared to what you’ll get
            from other dealerships, which often put this limit nearer the £500
            mark - our warranty really will protect your vehicle and your
            finances in the event of a claim.
          </p>
        </div>
        <div className="xl:w-[52%] w-full mt-0 lg:mt-[120px] self-stretch flex-col justify-start items-center gap-8 inline-flex">
          <div className="justify-start items-start flex flex-wrap lg:flex-row w-full">
            <div className="m-2 w-[31%] grow shrink basis-0 p-4  bg-gray-100 rounded-2xl flex-col justify-center items-center gap-4 inline-flex">
              <div className="p-4 bg-gradient-to-r from-red-600 to-blue-700 rounded-2xl border border-red-600 justify-center items-center gap-1 inline-flex">
                <div className="w-8 h-8 relative">
                  <BookSVG />
                </div>
              </div>
              <h4 className="self-stretch text-center text-neutral-800 text-[14px] md:text-2xl font-semibold font-open-sans-condensed sm:font-open-sans ">
                Underwritten by TMC
              </h4>
            </div>
            <div className="m-2 w-[31%] grow shrink basis-0 p-4  bg-gray-100 rounded-2xl flex-col justify-center items-center gap-4 inline-flex">
              <div className="p-4 bg-gradient-to-r from-red-600 to-blue-700 rounded-2xl border border-red-600 justify-center items-center gap-4 inline-flex">
                <div className="w-8 h-8 relative">
                  <ThumbSVG />
                </div>
              </div>
              <h4 className="self-stretch text-center text-neutral-800 text-[14px] md:text-2xl font-semibold font-open-sans-condensed sm:font-open-sans ">
                Highest Level of Cover
              </h4>
            </div>
            <div className="m-2 w-[31%] grow shrink basis-0  p-4 bg-gray-100 rounded-2xl flex-col justify-center items-center gap-4 inline-flex">
              <div className="p-4 bg-gradient-to-r from-red-600 to-blue-700 rounded-2xl border border-red-600 justify-center items-center gap-1 inline-flex">
                <div className="w-8 h-8 relative">
                  <DolarSVG />
                </div>
              </div>
              <h4 className="self-stretch text-center text-neutral-800 text-[14px] md:text-2xl font-semibold font-open-sans-condensed sm:font-open-sans">
                Up to £3,000 Claim Limit
              </h4>
            </div>
          </div>
          <p className="self-stretch text-black text-xl font-normal font-open-sans-condensed sm:font-open-sans leading-loose">
            The Diamond warranty will also cover you for diagnostics, and is
            underwritten by us at TMC. This means you're not dealing with a
            third party to recover your costs - making the whole process easier
            and faster.
          </p>
          <p className="self-stretch text-black text-xl font-normal font-open-sans-condensed sm:font-open-sans leading-loose">
            With cover starting from just £199, no excess costs to pay on
            claims, and coverage periods of 3, 6 or 12 months available - you
            can relax in the knowledge that parts and labour can be taken care
            of in the event of a mechanical or electrical failure.
          </p>
        </div>
      </div>
      <div className="max-w-[1440px]  px-5 md:px-[100px] pt-[50px] mx-auto bg-white justify-start items-center gap-[50px] ">
        <div className="flex flex-wrap justify-evenly">
          <div className="mb-5 w-[280px] flex-col justify-start items-start pt-5 lg:pt-20 gap-4 inline-flex">
            <h4 className="w-[280px] text-black text-2xl font-semibold font-open-sans-condensed sm:font-open-sans ">
              Engine
            </h4>
            <p className="self-stretch  flex-col justify-start items-start gap-2 flex">
              Cylinder block, cylinder head, cylinder-head gasket, cylinder
              bores, rocker assembly, hydraulic lifters, valves and guides
              (except carbonised, burnt or pitted valves), pushrods, camshafts,
              camshaft bearings, camshaft followers, timing gears, oil pump,
              pistons, piston rings, connecting rods and bearings, crankshafts
              and bearings, distributor drive gear, internal bushes.
            </p>
          </div>
          <div className="mb-5 w-[280px] flex-col justify-start items-start pt-5 lg:pt-20 gap-4 inline-flex">
            <h4 className="w-[280px] text-black text-2xl font-semibold font-open-sans-condensed sm:font-open-sans ">
              Transmission / drivetrain
            </h4>
            <p className="self-stretch  flex-col justify-start items-start gap-2 flex">
              All parts within the transmission casings and transfer box. Not
              including seals and gaskets.
            </p>
          </div>
          <div className="mb-5 w-[280px] flex-col justify-start items-start pt-5 lg:pt-20 gap-4 inline-flex">
            <h4 className="w-[280px] text-black text-2xl font-semibold font-open-sans-condensed sm:font-open-sans ">
              Automatic transmission
            </h4>
            <p className="self-stretch  flex-col justify-start items-start gap-2 flex">
              Gears, torque convertor, clutches, brake bands, oil pumps, shafts,
              bearings, shims, valves, governors and servos.
            </p>
          </div>
          <div className="mb-5 w-[280px] flex-col justify-start items-start pt-5 lg:pt-20 gap-4 inline-flex">
            <h4 className="w-[280px] text-black text-2xl font-semibold font-open-sans-condensed sm:font-open-sans ">
              Differential assembly and final drive
            </h4>
            <p className="self-stretch  flex-col justify-start items-start gap-2 flex">
              Crown wheel and pinion, planet gears, bearings (not wheel
              bearings), shims and drive flanges.
            </p>
          </div>
          <div className="mb-5 w-[280px] flex-col justify-start items-start pt-5 lg:pt-20 gap-4 inline-flex">
            <h4 className="w-[280px] text-black text-2xl font-semibold font-open-sans-condensed sm:font-open-sans ">
              Electrics
            </h4>
            <p className="self-stretch  flex-col justify-start items-start gap-2 flex">
              Alternator and starter motor.
            </p>
          </div>
          <div className="mb-5 w-[280px] flex-col justify-start items-start pt-5 lg:pt-20 gap-4 inline-flex">
            <h4 className="w-[280px] text-black text-2xl font-semibold font-open-sans-condensed sm:font-open-sans ">
              Fuel system
            </h4>
            <p className="self-stretch  flex-col justify-start items-start gap-2 flex">
              Fuel pump.
            </p>
          </div>
          <div className="mb-5 w-[280px] flex-col justify-start items-start pt-5 lg:pt-20 gap-4 inline-flex">
            <h4 className="w-[280px] text-black text-2xl font-semibold font-open-sans-condensed sm:font-open-sans ">
              Heater and cooling system
            </h4>
            <p className="self-stretch  flex-col justify-start items-start gap-2 flex">
              Thermostat and housing Manual transmission Gears, shafts,
              bearings, shims, synchromesh hubs, selectors and extension shaft.
              Prop shaft Universal joint and bearings
            </p>
          </div>
        </div>
        <p className="w-full md:self-stretch pt-10 text-black text-xl font-normal font-open-sans-condensed sm:font-open-sans leading-sm md:leading-loose">
          From pumps to pistons, head gaskets to hoses - apply for your warranty
          as soon as possible after purchase, before it’s too late. And enjoy
          peace of mind on the road ahead.
        </p>
      </div> */}
      {data && (
        <div className="max-w-[1440px] w-full mx-auto px-[20px] xl:px-[100px] md:px-[50px] pt-8 pb-[50px] bg-white  clear-both">
          <div className="flex-col justify-start items-start gap-6 flex">
            <div className="self-stretch  clear-both text-neutral-800 text-xl font-normal font-open-sans-condensed sm:font-open-sans leading-loose">
              <ShowContent htmlContent={data.content} />
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className="mt-10 flex w-full h-full text-center subtitle text-[60px]">
          <div className="mt-2 mb-4 w-full flex justify-center items-center ml-3 mr-3">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-[1240px] w-full mx-auto px-5 md:px-8 py-[50px] bg-neutral-100 rounded-3xl flex-col justify-start items-center gap-8 ">
        <div className="bg-[#f6f6f6] rounded-2xl py-[50px] md:px-0 px-8">
          <div className="  text-center text-neutral-800 text-[20px] md:text-[32px] font-bold font-open-sans-condensed sm:font-open-sans uppercase leading-10">
            Upgrade Now
          </div>
          <div className="md:w-fit md:mx-auto mt-8">
            <div className="md:w-[454px]  justify-start items-center gap-6 flex md:flex-row flex-col">
              <Link
                to={`/contact-us?type=Warranty Enquiry#contact`}
                className="grow shrink w-full basis-0 h-12 px-6 py-3 bg-black hover:bg-gray-800 rounded-[100px] shadow border border-gray-900 justify-center items-center gap-1 flex"
              >
                <div className="text-white text-sm font-semibold font-open-sans-condensed sm:font-open-sans uppercase leading-snug tracking-tight">
                  Request a warranty
                </div>
              </Link>
              <Link
                to="/contact-us"
                className="grow shrink w-full  basis-0 h-12 px-6 py-3 bg-white hover:bg-gray-800 hover:text-white rounded-[100px] shadow border border-gray-800 justify-center items-center gap-1 flex"
              >
                <div className="text-neutral-800 text-sm font-semibold font-open-sans-condensed sm:font-open-sans uppercase leading-snug tracking-tight">
                  contact us
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
