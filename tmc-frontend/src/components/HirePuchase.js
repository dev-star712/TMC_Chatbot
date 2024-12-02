import { useState, useEffect, useRef } from "react";
import TermRange from "./termRange";
import DepositeRange from "./depositeRange";
import Modal from "react-modal";
import { Link, useParams, useLocation } from "react-router-dom";
import { ReactComponent as CloseSVG } from "./svg/close.svg";
import { Typography } from "@material-tailwind/react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "100vh",
    maxHeight: "700px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: 1000,
  },
  height: "100vh",
};
export default function HirePuchase(props) {
  const {
    deposit,
    term,
    depositMax,
    depositMin,
    termMax,
    termMin,
    setTerm,
    setDeposit,
    financeInfo,
    ele,
  } = props;

  const location = useLocation();
  const myRef = useRef(null);

  useEffect(() => {
    console.log(location.hash);
    if (location.hash && location.hash === "#finance") {
      myRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.hash]);

  const vin = useParams().vin.toUpperCase();
  const [open, setOpen] = useState(false);
  const viewFinance = () => {
    document.body.style.overflow = "hidden";
    setOpen(true);
  };
  return (
    <div
      className={`mt-6 flex flex-col w-full rounded-2xl ${
        location.hash && location.hash === "#finance"
          ? "shadow-custom-red hover:shadow-custom-blue transition duration-500 ease-in-out hover:scale-105"
          : "border-2"
      }`}
      ref={myRef}
    >
      <Modal
        isOpen={open}
        appElement={document.body}
        onRequestClose={() => {
          document.body.style.overflow = "";
          setOpen(false);
        }}
        style={customStyles}
        contentLabel="all reviews"
      >
        <div className="w-full sm:w-[350px] h-fit md:w-[400px] p-2 sm:p-4">
          <div className="flex justify-between w-full">
            <div
              className=" "
              itemScope=""
              itemType="https://schema.org/AutomotiveBusiness"
              bis_skin_checked="1"
            >
              <Typography variant="h4" color="white" className="">
                Share To
              </Typography>
            </div>
            <div className="relative">
              <div
                onClick={() => {
                  document.body.style.overflow = "";
                  setOpen(false);
                }}
                className="w-8 h-8 p-2  justify-center items-center gap-2 inline-flex  absolute top-0 right-0"
              >
                <div className="w-8 h-8">
                  <CloseSVG />
                </div>
              </div>
            </div>
          </div>
          <div className="flex h-full justify-center ">
            <div className="flex flex-col justify-center items-center gap-6">
              <div className=" ">
                <strong>
                  {ele.vehicle.make} {ele.vehicle.model}
                </strong>{" "}
                for <strong>£{financeInfo.AllInclusiveRegularPayment}</strong> a
                month at <strong>{financeInfo.Apr}%</strong> APR
                {/* {" "}<strong>£0.00</strong> optional final payment */}
              </div>
              <div className=" text-sm w-full h-full overflow-y-scroll sm:overflow-hidden">
                <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
                  <div className="">Finance Product</div>
                  <div className="font-bold">Hire Purchase</div>
                </div>
                <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
                  <div className="">Duration of Agreement</div>
                  <div className="font-bold">{term} Months</div>
                </div>
                <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
                  <div className="">
                    Vehicle Price
                    {ele.adverts.forecourtPriceVatStatus === "Ex VAT"
                      ? " (excl VAT)"
                      : ""}
                  </div>
                  <div className="font-bold">
                    £
                    {(
                      ele.adverts.forecourtPrice.amountGBP || 0
                    ).toLocaleString()}
                  </div>
                </div>
                <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
                  <div className="">
                    Customer Deposit
                    {ele.adverts.forecourtPriceVatStatus === "Ex VAT"
                      ? " (excl VAT)"
                      : ""}
                  </div>
                  <div className=" font-bold">
                    £{(deposit || 0).toLocaleString()}
                  </div>
                </div>
                <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
                  <div className="">
                    Total Deposit
                    {ele.adverts.forecourtPriceVatStatus === "Ex VAT"
                      ? " (inc VAT)"
                      : ""}
                  </div>
                  <div className=" font-bold">
                    £
                    {(
                      (deposit || 0) +
                      (ele.adverts.forecourtPriceVatStatus === "Ex VAT"
                        ? (ele.adverts.forecourtPrice.amountGBP || 0) * 0.2
                        : 0)
                    ).toLocaleString()}
                  </div>
                </div>
                <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
                  <div className="">Balance to Finance</div>
                  <div className=" font-bold">
                    £
                    {(
                      (ele.adverts.forecourtPrice.amountGBP || 0) * 1 -
                      (deposit || 0)
                    ).toLocaleString()}
                  </div>
                </div>
                <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
                  <div className="">Total Charge For Credit</div>
                  <div className=" font-bold">
                    £
                    {(
                      (financeInfo.TotalAmountPayableExcludingContributions ||
                        0) - (ele.adverts.forecourtPrice.amountGBP || 0)
                    ).toLocaleString()}
                  </div>
                </div>
                <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
                  <div className="">
                    Total Amount Payable
                    {ele.adverts.forecourtPriceVatStatus === "Ex VAT"
                      ? " (inc VAT)"
                      : ""}
                  </div>
                  <div className=" font-bold">
                    £
                    {(
                      (financeInfo.TotalAmountPayableExcludingContributions ||
                        0) +
                      (ele.adverts.forecourtPriceVatStatus === "Ex VAT"
                        ? (ele.adverts.forecourtPrice.amountGBP || 0) * 0.2
                        : 0)
                    ).toLocaleString()}
                  </div>
                </div>
                <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
                  <div className="">{term} Monthly Payments</div>
                  <div className=" font-bold">
                    £
                    {(
                      financeInfo.AllInclusiveRegularPayment || 0
                    ).toLocaleString()}
                  </div>
                </div>
                <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
                  <div className="">APR</div>
                  <div className=" font-bold">{financeInfo.Apr}% APR</div>
                </div>
                <div className="flex flex-row justify-between border-b-2 py-2 px-4 border-gray-300">
                  <div className="">Interest Rate(Fixed)</div>
                  <div className=" font-bold">
                    {financeInfo.RateOfInterest}%
                  </div>
                </div>
                <div className="flex flex-row justify-between py-2 px-4 border-gray-300">
                  <div className="">
                    Cash Price
                    {ele.adverts.forecourtPriceVatStatus === "Ex VAT"
                      ? " Inc VAT"
                      : ""}
                  </div>
                  <div className="font-bold">
                    £
                    {(
                      (ele.adverts.forecourtPrice.amountGBP || 0) *
                      (ele.adverts.forecourtPriceVatStatus === "Ex VAT"
                        ? 1.2
                        : 1)
                    ).toLocaleString()}
                  </div>
                </div>
                <div className="pt-8 px-4 border-gray-300">
                  You can read the TMC Initial Disclosure Document{" "}
                  <a
                    href="https://docs.google.com/document/d/1l8TCSSwQfBh5uE6Fn34EnDtjn-Dssea7/edit?usp=sharing&ouid=116909609264778630161&rtpof=true&sd=true"
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-blue-500"
                  >
                    here
                  </a>
                  .
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <div className="rounded-t-2xl bg-white p-6">
        <p className="flex flex-row justify-center items-end">
          <span className="mt-2 magictitle text-5xl font-bold text-center  ">
            £{financeInfo.AllInclusiveRegularPayment}
          </span>
          <span className="  text-md">/month</span>
        </p>
        <TermRange
          min={termMin}
          max={termMax}
          term={term}
          symbol={"month"}
          setTerm={setTerm}
        />
        <DepositeRange
          min={
            Number.isInteger(depositMin / 100)
              ? depositMin / 100
              : Math.floor(depositMin / 100) + 1
          }
          max={
            Number.isInteger(depositMax / 100)
              ? depositMax / 100
              : Math.floor(depositMax / 100)
          }
          deposit={
            Number.isInteger(deposit / 100)
              ? deposit / 100
              : Math.floor(deposit / 100)
          }
          symbol={"£"}
          setDeposit={setDeposit}
        />
        <div className="mt-10"></div>
      </div>
      <div className="rounded-b-2xl py-4 px-6 flex flex-col md:justify-between md:flex-row">
        <Link
          to={`/checkout/${vin}?type=finance&deposit=${deposit}&term=${term}`}
          className="magicbutton w-full md:w-[55%] shadow-md text-white flex hover:shadow-lg justify-center items-center py-[10px] rounded-full uppercase"
        >
          APPLY FOR FINANCE
        </Link>
        <div
          className="w-full md:w-[35%] bg-black mt-4 md:mt-0 text-white flex hover:bg-gray-700 text-center justify-center items-center py-[10px] rounded-full uppercase cursor-pointer"
          onClick={viewFinance}
        >
          VIEW FINANCE DETAILS
        </div>
      </div>
    </div>
  );
}
