import MainLayout from "../layouts/MainLayout";
import VadX from "../components/VadX";
import { useState, useEffect, useRef } from "react";
import { ShareModal } from "../components/ShareModal";
import HirePuchase from "../components/HirePuchase";
import SPSBtns from "../components/SPSBtns";
// import ExchangeVehicle from "../components/ExchangeVehicle";
import SimilarVehicle from "../components/SimilarVehicle";
import NeedAssistance from "../components/NeedAssistance";
import Carslider from "../components/Carslider";
import Representative1 from "../components/Representative1";
import Asksell from "../components/Asksell";
// import Carlock from "../components/Carlock";
import Perks from "../components/Perks";
import Needanother from "../components/Needanother";
import OFSE from "../components/OFSE";
import VehicleSummary from "../components/VehicleSummary";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { focusVehicle } from "../redux/slices/chatbotSlice";
import axios from "axios";
import Meta from "../components/Meta";

export default function Viewdetail() {
  const vin = useParams().vin.toUpperCase();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(null);
  const [imglist, setImagelist] = useState([]);

  const [depositMax, setDepositMax] = useState(100000);
  const [depositMin, setDepositMin] = useState(0);
  const [termMax, setTermMax] = useState(60);
  const [termMin, setTermMin] = useState(12);

  const [deposit, setDeposit] = useState(0);
  const [term, setTerm] = useState(60);

  const [financeInfo, setFinanceInfo] = useState({});

  const [financeVisible, setFinanceVisible] = useState(false);

  const dispatch = useDispatch();

  const setFocusVehicle = (value) => {
    dispatch(focusVehicle(value));
  };

  const getVehicle = async () => {
    setLoading(true);
    const url = `https://${process.env.REACT_APP_API}/api/vehicle/retrieveVehicleByVin`;

    const body = {
      vin, // Add your data here
    };

    await axios
      .post(url, body)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.data.totalResults === 0) {
            setItem(null);
            setLoading(false);
          } else {
            setItem(response.data.data.results[0]);
            if (
              (response.data.data.results[0].adverts.forecourtPrice.amountGBP ||
                0) >= 2500
            ) {
              getLimitation(response.data.data.results[0]);
            } else {
              setLoading(false);
            }
          }
        } else {
          setItem(null);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        setItem(null);
      });
  };

  const getLimitation = async (item) => {
    const url = `https://${process.env.REACT_APP_API}/api/finance/limit`;

    const params = {
      vin,
    };

    await axios
      .get(url, {
        params,
      })
      .then((response) => {
        if (response.status === 200) {
          setDepositMax(response.data.data.deposit_max);
          setDepositMin(response.data.data.deposit_min);
          setTermMax(response.data.data.term_max);
          setTermMin(response.data.data.term_min);
          setDeposit(
            Math.max(
              Math.min(
                response.data.data.deposit_min,
                (item.adverts.forecourtPrice.amountGBP || 0) * 0.2
              ),
              Math.min(
                response.data.data.deposit_max,
                (item.adverts.forecourtPrice.amountGBP || 0) * 0.2
              )
            )
          );
          setTerm(response.data.data.term_max);
          setFinanceVisible(true);
        } else {
          setDepositMax(100000);
          setDepositMin(0);
          setTermMax(60);
          setTermMin(12);
          setDeposit((item.adverts.forecourtPrice.amountGBP || 0) * 0.2);
          setTerm(60);
          setFinanceVisible(false);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setDepositMax(100000);
        setDepositMin(0);
        setTermMax(60);
        setTermMin(12);
        setDeposit((item.adverts.forecourtPrice.amountGBP || 0) * 0.2);
        setTerm(60);
        setFinanceVisible(false);
      });
  };

  const calculateFinance = async (term, deposit) => {
    const url = `https://${process.env.REACT_APP_API}/api/finance/calculate`;

    const params = {
      vin,
      term,
      deposit,
    };

    await axios
      .get(url, {
        params,
      })
      .then((response) => {
        if (response.status === 200) {
          setFinanceInfo(response.data.data);
          setFinanceVisible(true);
        } else {
          setFinanceVisible(false);
        }
      })
      .catch((err) => {
        setFinanceVisible(false);
      });
  };

  useEffect(() => {
    setFocusVehicle(vin);
    getVehicle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vin]);

  const debounceTimeoutRef = useRef();

  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      if (item && (item.adverts.forecourtPrice.amountGBP || 0) > 2500) {
        console.log(term, deposit);
        calculateFinance(term, deposit);
      }
    }, 500);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deposit, term, item]);

  useEffect(() => {
    if (item) {
      let temp = [];
      if (item.media.images.length === 0)
        temp = [
          "https://m-qa.atcdn.co.uk/a/media/w600h450/7c170800b6f241bf86132ccb21af9c93.jpg",
        ];
      else {
        for (let i = 0; i < item.media.images.length; i++)
          temp.push(item.media.images[i].href);
      }

      setImagelist(temp);
    }
  }, [item]);

  return (
    <MainLayout>
      {item && (
        <Meta
          meta_title={`Used ${item.vehicle.make} ${item.vehicle.model} ${
            item.vehicle.derivative
          } £${(item.adverts.forecourtPrice.amountGBP || 0).toLocaleString()} ${
            item.adverts.forecourtPriceVatStatus === "Ex VAT" ? "Ex VAT" : ""
          } ${(
            item.vehicle.odometerReadingMiles || 0
          ).toLocaleString()} miles ${
            item.vehicle.colour
          } | TMC - The Motor Company`}
          meta_description={`Buy a Used ${item.vehicle.make} ${
            item.vehicle.model
          } ${item.vehicle.derivative} with ${(
            item.vehicle.odometerReadingMiles || 0
          ).toLocaleString()} miles on the clock for £${(
            item.adverts.forecourtPrice.amountGBP || 0
          ).toLocaleString()} ${
            item.adverts.forecourtPriceVatStatus === "Ex VAT" ? "Ex VAT" : ""
          } from TMC - The Motor Company.`}
          canonical_url={`/vehicles-for-sale/viewdetail/${`used ${item.vehicle.make} ${item.vehicle.model} ${item.vehicle.derivative}   ${item.vehicle.transmissionType} ${item.vehicle.fuelType}`
            .toLowerCase()
            .replace(/[^0-9a-zA-Z \-]/g, "")
            .replace(/\s/g, "-")}/${item.vehicle.vin}/`}
        />
      )}
      <div className="flex py-10 flex-col md:flex-row justify-center w-full  bg-[#f6f6f6]">
        <div className="flex flex-col md:flex-row md:justify-between max-w-[1280px] ">
          <div className="flex flex-col">
            {!loading && item && (
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Car",
                    name: `${item.vehicle.make} ${item.vehicle.model} ${item.vehicle.derivative}`,

                    url: `https://${
                      process.env.REACT_APP_APP
                    }/vehicles-for-sale/viewdetail/${`used ${item.vehicle.make} ${item.vehicle.model} ${item.vehicle.derivative}   ${item.vehicle.transmissionType} ${item.vehicle.fuelType}`
                      .toLowerCase()
                      .replace(/[^0-9a-zA-Z \-]/g, "")
                      .replace(/\s/g, "-")}/${item.vehicle.vin}`,

                    image: item.media.images[0]
                      ? item.media.images[0].href
                      : "https://m-qa.atcdn.co.uk/a/media/w600h450/7c170800b6f241bf86132ccb21af9c93.jpg",
                    manufacturer: item.vehicle.make,
                    brand: item.vehicle.make,
                    model: item.vehicle.model,
                    vehicleConfiguration: item.vehicle.derivative,
                    color: item.vehicle.colour,
                    fuelType: item.vehicle.fuelType,
                    vehicleTransmission: item.vehicle.transmissionType,
                    modelDate: item.vehicle.generation
                      ? item.vehicle.generation.match(/\d+/g)[0]
                      : item.vehicle.generation,
                    description: item.features
                      .map((feature) => feature.name)
                      .join(", "),
                    seatingCapacity: `${item.vehicle.seats}`,
                    numberOfDoors: `${item.vehicle.doors}`,
                    bodyType: item.vehicle.bodyType,
                    sku: item.vehicle.vin,
                    offers: {
                      "@type": "Offer",

                      availability: "https://schema.org/InStock",

                      price: `${item.adverts.forecourtPrice.amountGBP || 0}`,
                      priceCurrency: "GBP",

                      url: `https://${
                        process.env.REACT_APP_APP
                      }/vehicles-for-sale/viewdetail/${`used ${item.vehicle.make} ${item.vehicle.model} ${item.vehicle.derivative}   ${item.vehicle.transmissionType} ${item.vehicle.fuelType}`
                        .toLowerCase()
                        .replace(/[^0-9a-zA-Z \-]/g, "")
                        .replace(/\s/g, "-")}/${item.vehicle.vin}`,

                      seller: {
                        "@type": "Organization",
                        name: "TMC - The Motor Company",
                      },
                    },
                  }),
                }}
              />
            )}
            {!loading && item && (
              <>
                <ShareModal open={open} setOpen={setOpen} item={item} />
                <div className="w-full flex justify-end">
                  <SPSBtns vin={item.vehicle.vin} openShareModel={setOpen} />
                </div>
              </>
            )}
            {!loading && item ? (
              <div className="mt-8 w-full flex flex-col md:flex-row md:justify-between bg-[#f6f6f6]">
                <div className=" w-full md:w-[47%]">
                  <div className="">
                    <div className="mx-5 ">
                      <Carslider
                        images={imglist}
                        title={`${item.vehicle.make} ${item.vehicle.model} ${item.vehicle.derivative}`}
                      />
                    </div>
                    <div className="md:hidden block mx-5">
                      <VehicleSummary ele={item} />
                      {(item.adverts.forecourtPrice.amountGBP || 0) > 2500 &&
                        financeVisible && (
                          <HirePuchase
                            deposit={deposit}
                            term={term}
                            depositMax={depositMax}
                            depositMin={depositMin}
                            termMax={termMax}
                            termMin={termMin}
                            financeInfo={financeInfo}
                            setDeposit={setDeposit}
                            setTerm={setTerm}
                            ele={item}
                          />
                        )}
                    </div>
                    <div className="mt-6 mx-5">
                      <VadX ele={item} />
                    </div>
                    <div className="md:hidden block bg-white">
                      <OFSE ele={item} />
                    </div>
                    <div className="mx-5 hidden md:block">
                      <NeedAssistance />
                    </div>
                  </div>
                </div>
                <div className="md:px-0 mt-8 md:mt-0 w-full md:w-1/2 flex flex-col mb-8 pb-4">
                  <div className="md:block hidden">
                    <VehicleSummary ele={item} />
                    {(item.adverts.forecourtPrice.amountGBP || 0) > 2500 &&
                      financeVisible && (
                        <HirePuchase
                          deposit={deposit}
                          term={term}
                          depositMax={depositMax}
                          depositMin={depositMin}
                          termMax={termMax}
                          termMin={termMin}
                          financeInfo={financeInfo}
                          setDeposit={setDeposit}
                          setTerm={setTerm}
                          ele={item}
                        />
                      )}
                    <OFSE ele={item} />
                  </div>
                  <div className="mx-5 md:mx-0">
                    <Needanother item={item} />
                  </div>
                  <Perks />
                  <div className="mx-5 md:mx-0">
                    {/* <Carlock item={item} /> */}
                    <Asksell />
                  </div>
                  <div className="block mx-5 md:hidden">
                    <NeedAssistance />
                  </div>
                  <div className="mx-5 md:mx-0">
                    <Representative1 />
                  </div>
                </div>
              </div>
            ) : (
              <>
                {loading ? (
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
                ) : (
                  <div className="mt-10 flex w-full h-full text-center subtitle text-[20px] sm:text-[40px] md:text-[60px]">
                    <div className="mt-2 mb-4 w-full flex justify-center items-center ml-3 mr-3">
                      {item
                        ? ""
                        : "There is no vehicle associated with the provided VIN."}
                    </div>
                  </div>
                )}
              </>
            )}
            {!loading && item && (
              <SimilarVehicle
                title={["Similar", "Vehicles"]}
                link="/vehicles-for-sale/used-trucks"
                ele={item}
              />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
