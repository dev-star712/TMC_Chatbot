import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HeroSection from "../components/gallery/HeroSection";
import financeImg from "../assets/images/finance.png";
import financeImg1 from "../assets/images/finance1.png";
import { ReactComponent as CheckSVG } from "../components/svg/check3.svg";
import Meta from "../components/Meta";

export default function Finance() {
  //SEO
  const [data, setData] = useState(null);

  const getData = async () => {
    const url = `https://${process.env.REACT_APP_CMS_API}/api/content/load?page=0-10-0`;
    await axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          setData(response.data);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainLayout>
      {data && (
        <Meta
          meta_title={data.meta_title}
          meta_description={data.meta_description}
          canonical_url="/motoring-hub/finance/"
        />
      )}
      <HeroSection
        img={financeImg}
        words={["Motoring hub", "finance"]}
        mt={"mt-20"}
      />
      <div className="h-fit w-full mx-auto max-w-[1440px]  px-5 lg:px-[100px] pt-[100px] bg-white justify-center items-start gap-[50px] flex lg:flex-row flex-col">
        <div className="lg:w-1/2 w-full flex-col justify-start items-start gap-6 inline-flex">
          <h2 className="self-stretch  text-neutral-800 text-[35px] leading-none md:text-[56px] font-bold font-open-sans-condensed sm:font-open-sans uppercase  ">
            About TMC Finance
          </h2>
          <p className="font-open-sans-condensed sm:font-open-sans text-base font-normal self-stretch text-black   mt-14 leading-loose">
            We know that buying a car is a significant investment, which is why
            we offer a variety of finance options to help you stretch your car
            payment and stay on top of your budget.
            <br />
            <br />
            Even if you are new to the world of car finance, the finance
            specialists that work with TMC will help by giving you the
            professional advice you need.We support and work with the following
            finance companies who are experts in understanding your financial
            needs and requirements. Alternatively, if you have a preferred
            finance company that is not on the below list, please give us a call
            and we will be happy to set up directly with them.
          </p>
          <div className="mt-12 self-stretch  flex-col justify-start items-start gap-2 flex">
            <div className="self-stretch justify-start items-start gap-2 inline-flex">
              <div className="p-1 rounded-[100px] border border-red-600 justify-center items-center gap-2 flex">
                <div className="w-4 h-4 relative">
                  <CheckSVG />
                </div>
              </div>
              <h6 className="grow shrink basis-0 text-black text-base font-semibold font-open-sans-condensed sm:font-open-sans   leading-normal">
                Close Brothers Motor Finance
              </h6>
            </div>
            <div className="self-stretch justify-start items-start gap-2 inline-flex">
              <div className="p-1 rounded-[100px] border border-red-600 justify-center items-center gap-2 flex">
                <div className="w-4 h-4 relative">
                  <CheckSVG />
                </div>
              </div>
              <h6 className="grow shrink basis-0 text-black text-base font-semibold font-open-sans-condensed sm:font-open-sans   leading-normal">
                Car Finance 24/7
              </h6>
            </div>
            <div className="self-stretch justify-start items-start gap-2 inline-flex">
              <div className="p-1 rounded-[100px] border border-red-600 justify-center items-center gap-2 flex">
                <div className="w-4 h-4 relative">
                  <CheckSVG />
                </div>
              </div>
              <h6 className="grow shrink basis-0 text-black text-base font-semibold font-open-sans-condensed sm:font-open-sans   leading-normal">
                Moto Novo
              </h6>
            </div>
            <div className="self-stretch justify-start items-start gap-2 inline-flex">
              <div className="p-1 rounded-[100px] border border-red-600 justify-center items-center gap-2 flex">
                <div className="w-4 h-4 relative">
                  <CheckSVG />
                </div>
              </div>
              <h6 className="grow shrink basis-0 text-black text-base font-semibold font-open-sans-condensed sm:font-open-sans   leading-normal">
                Credit Plus
              </h6>
            </div>
            <div className="self-stretch justify-start items-start gap-2 inline-flex">
              <div className="p-1 rounded-[100px] border border-red-600 justify-center items-center gap-2 flex">
                <div className="w-4 h-4 relative">
                  <CheckSVG />
                </div>
              </div>
              <h6 className="grow shrink basis-0 text-black text-base font-semibold font-open-sans-condensed sm:font-open-sans   leading-normal">
                Zuto
              </h6>
            </div>
            <div className="self-stretch justify-start items-start gap-2 inline-flex">
              <div className="p-1 rounded-[100px] border border-red-600 justify-center items-center gap-2 flex">
                <div className="w-4 h-4 relative">
                  <CheckSVG />
                </div>
              </div>
              <h6 className="grow shrink basis-0 text-black text-base font-semibold font-open-sans-condensed sm:font-open-sans   leading-normal">
                MoneyBarn
              </h6>
            </div>
            <div className="self-stretch justify-start items-start gap-2 inline-flex">
              <div className="p-1 rounded-[100px] border border-red-600 justify-center items-center gap-2 flex">
                <div className="w-4 h-4 relative">
                  <CheckSVG />
                </div>
              </div>
              <h6 className="grow shrink basis-0 text-black text-base font-semibold font-open-sans-condensed sm:font-open-sans   leading-normal">
                Advantage Finance
              </h6>
            </div>
            <div className="self-stretch justify-start items-start gap-2 inline-flex">
              <div className="p-1 rounded-[100px] border border-red-600 justify-center items-center gap-2 flex">
                <div className="w-4 h-4 relative">
                  <CheckSVG />
                </div>
              </div>
              <h6 className="grow shrink basis-0 text-black text-base font-semibold font-open-sans-condensed sm:font-open-sans   leading-normal">
                First Response
              </h6>
            </div>
            <div className="self-stretch justify-start items-start gap-2 inline-flex">
              <div className="p-1 rounded-[100px] border border-red-600 justify-center items-center gap-2 flex">
                <div className="w-4 h-4 relative">
                  <CheckSVG />
                </div>
              </div>
              <h6 className="grow shrink basis-0 text-black text-base font-semibold font-open-sans-condensed sm:font-open-sans   leading-normal">
                Alphera Financial Services
              </h6>
            </div>
            <div className="self-stretch justify-start items-start gap-2 inline-flex">
              <div className="p-1 rounded-[100px] border border-red-600 justify-center items-center gap-2 flex">
                <div className="w-4 h-4 relative">
                  <CheckSVG />
                </div>
              </div>
              <h6 className="grow shrink basis-0 text-black text-base font-semibold font-open-sans-condensed sm:font-open-sans   leading-normal">
                Mallard vehicle Finance
              </h6>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 w-full self-stretch flex-col justify-start items-center gap-8 inline-flex">
          <div className="w-fit">
            <img
              className="rounded-3xl w-fit"
              src={financeImg1}
              alt="Dealership Photo"
            />
          </div>
          <p className="font-open-sans-condensed sm:font-open-sans text-base font-normal self-stretch text-black   mt-20 leading-loose">
            Apply for finance today and get in touch to learn more about our
            offers and selection of used vans & cars. We look forward to helping
            you purchase your next dream vehicle.
            <br />
            <br />
            Thatchers Motor Company Ltd is authorised and regulated by the
            Financial Conduct Authority under FRN Reference number: 756740.
            Finance Subject to status. Thatchers Motor Company Ltd is authorised
            as a CREDIT BROKER and NOT A LENDER. This means we work with a
            number of carefully selected credit providers who may be able to
            offer you finance for your purchase.
            <br />
            <br />
            TMC - The Motor Company, The Goodwood Building, The Yard, Oakhanger,
            Hampshire, GU35 9JU
            <br />
            Registered office: Thatchers Motor Company, 8 The Briars,
            Waterlooville, Hampshire PO7 7YH
          </p>
        </div>
      </div>
      <div className="max-w-[1240px] w-full mx-auto px-5 md:px-8 py-[50px] bg-neutral-100 rounded-3xl flex-col justify-start items-center gap-8 ">
        <div className="bg-[#f6f6f6] rounded-2xl py-[50px] md:px-0 px-8">
          <div className="  text-center text-neutral-800 text-[20px] md:text-[32px] font-bold font-open-sans-condensed sm:font-open-sans uppercase leading-10">
            Apply for finance today
          </div>
          <div className="md:w-fit md:mx-auto mt-8">
            <div className="md:w-[454px]  justify-start items-center gap-6 flex md:flex-row flex-col">
              <Link
                to={`/contact-us?type=Finance Enquiry#contact`}
                className="grow shrink w-full basis-0 h-12 px-6 py-3 bg-black hover:bg-gray-800 rounded-[100px] shadow border border-gray-900 justify-center items-center gap-1 flex"
              >
                <div className="text-white text-sm font-semibold font-open-sans-condensed sm:font-open-sans uppercase leading-snug tracking-tight">
                  Make an enquiry
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
