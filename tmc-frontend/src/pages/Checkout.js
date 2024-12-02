import MainLayout from "../layouts/MainLayout";
import Buyfullnow from "../components/Buyfullnow";
import CollectionOrDelivery from "../components/CollectionOrDelivery";
import Paywithcard from "../components/Paywithcard";
import OrderSummary from "../components/OrderSummary";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { parseLocalStorageValue } from "../utils";
import {
  addBotMessage,
  addHumanMessage,
  openChatbot,
  thinkChatbot,
} from "../redux/slices/chatbotSlice";
import Meta from "../components/Meta";

export default function Checkout() {
  const vin = useParams().vin.toUpperCase();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Accessing individual query parameters
  const type = queryParams.get("type") || "full";
  const deposit = queryParams.get("deposit");
  const term = queryParams.get("term");
  const clientSecret = queryParams.get("payment_intent_client_secret");
  const bot = queryParams.get("bot");

  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(null);

  const dispatch = useDispatch();

  const setIsBotChatOpen = (value) => {
    // localStorage.setItem("extraAssistant", JSON.stringify(true));
    dispatch(openChatbot(value));
  };

  const addBMessage = (text) => {
    dispatch(addBotMessage(text));
  };

  const addHMessage = (text) => {
    sendPostRequest(text);
    dispatch(addHumanMessage(text));
  };

  const setThinking = (value) => {
    dispatch(thinkChatbot(value));
  };

  const messages = useSelector((state) => state.chatbot.messages);

  const focusedVehicle = useSelector((state) => state.chatbot.focusedVehicle);

  const sendPostRequest = async (query) => {
    const data = {
      query,
    };

    data.chat_id = parseLocalStorageValue("chat_id");
    data.history = messages.slice(-30).map((message) => {
      const temp = _.cloneDeep(message);
      if (temp.img) {
        temp.img = temp.img.map((i) => {
          return {
            vin: i.vin,
          };
        });
      }
      return temp;
    });
    data.state = parseLocalStorageValue("state") || {
      user_contact_info: { name: "", "e-mail": "", number: "" },
      user_vehicle_info: {
        vrn: "",
        mileage: "",
        cost: "",
        active: "",
        make: "",
        model: "",
        generation: "",
        links: [],
        condition: "",
        service_history: "",
      },
      finance_info: { vin: "", deposit: "", term: "", active: "" },
      full_pay_info: { vin: "", active: "" },
      user_location: {},
      stripe: "",
      viewed_vehicles: [],
      user_location_info: { postcode: "", town: "", county: "" },
    };

    if (focusedVehicle) {
      data.focusedVehicle = focusedVehicle;
    }

    setThinking(true);

    const token = localStorage.getItem("jwtToken");

    axios
      .post(`https://${process.env.REACT_APP_API}/api/bot/query`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          if (response.headers.authorization) {
            localStorage.setItem("jwtToken", response.headers.authorization);
            console.log(response.headers.authorization);
          }
          addBMessage(response.data.data);
        } else {
          addBMessage({
            text: "Sorry, could you please try again?",
          });
        }
        setThinking(false);
      })
      .catch((error) => {
        addBMessage({
          text: "Sorry, could you please try again?",
        });
        setThinking(false);
      });
  };

  useEffect(() => {
    if (type === "finance") {
      if (!deposit || !term) navigate(`/vehicles-for-sale/viewdetail/${vin}`);
    } else if (type === "full") {
    } else if (type === "reserve") {
    } else {
      navigate(`/vehicles-for-sale/viewdetail/${vin}`);
    }
    getVehicle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deposit, term, type, vin]);

  useEffect(() => {
    if (clientSecret) {
      if (clientSecret === localStorage.getItem("clientSecret")) {
        setCurtab(3);
        if (bot === localStorage.getItem("clientSecret")) {
          setIsBotChatOpen(true);
          setTimeout(() => {
            addHMessage("All right. I just paid £149 to reserve.");
          }, 3000);
        }
      } else {
        navigate("/vehicles-for-sale/used-trucks/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientSecret]);

  const [curtab, setCurtab] = useState(0);
  const [firstTabFilled, setFirstTabFilled] = useState(false);
  const [submit, setSubmit] = useState(false);

  const [movable, setMovable] = useState(false);
  const [payable, setPayable] = useState(false);

  const payButtonRef = useRef();

  const clickPayButton = () => {
    payButtonRef.current.clickPayButton();
  };

  const myRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    myRef.current.scrollIntoView({ behavior: "smooth" });
    // eslint-disable-next-line no-use-before-define
  }, [curtab]);

  const next = () => {
    if (curtab < 3 && item && !(item.vehicle.status === "sold")) {
      if (curtab === 0 && !firstTabFilled) {
        setSubmit(true);
        formRef.current.scrollIntoView({ behavior: "smooth" });
      } else if (curtab === 1 && !movable && type === "full") {
        console.log("button disabled!");
      } else if (curtab === 2 && !payable) {
        console.log("button disabled!");
      } else {
        if (curtab === 2 && payable) {
          clickPayButton();
        } else {
          setSubmit(false);
          setCurtab(curtab + 1);
        }
      }
    }
  };
  const prev = () => {
    if (curtab > 0) {
      setSubmit(false);
      setCurtab(curtab - 1);
    } else window.location.href = "/vehicles-for-sale/used-trucks/";
  };

  const getVehicle = async () => {
    setLoading(true);
    const url = `https://${process.env.REACT_APP_API}/api/vehicle/retrieveVehicleByVin`;

    const body = {
      vin, // Add your data here
    };

    await axios
      .post(url, body)
      .then(async (response) => {
        if (response.status === 200) {
          if (response.data.data.totalResults === 0) {
            setItem(null);
            setLoading(false);
            navigate("/vehicles-for-sale/used-trucks/");
          } else {
            setItem(response.data.data.results[0]);
            setLoading(false);
          }
        } else {
          setItem(null);
          setLoading(false);
          navigate("/vehicles-for-sale/used-trucks/");
        }
      })
      .catch((err) => {
        setLoading(false);
        setItem(null);
        navigate("/vehicles-for-sale/used-trucks/");
      });
  };

  return (
    <MainLayout>
      <Meta meta_title={"Checkout"} />
      <div
        className="w-full bg-[#F6F6F6] lg:py-8 lg:px-[100px] py-6"
        ref={myRef}
      >
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="md:w-[27%] w-full md:order-1 order-2">
            {!loading && item ? (
              <OrderSummary
                item={item}
                type={type}
                deposit={deposit}
                term={term}
              />
            ) : (
              <div className="mt-6 md:mt-0 mx-5 md:mx-0 bg-white rounded-xl px-4 py-4 flex flex-col">
                <div className="flex flex-row border-b-2 pb-2 justify-between">
                  <div className=" subtitle text-[20px] leading-[28px]">
                    Order Summary
                  </div>
                  <Link
                    to="/vehicles-for-sale/used-trucks/"
                    className="underline text-[#0000ff] uppercase text-[10px] font-bold"
                  >
                    change vehicle?
                  </Link>
                </div>
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
                <div className="mt-4 mx-4 md:mx-0 flex flex-row justify-between flex-wrap">
                  <div className="flex flex-row justify-center items-center">
                    <div className="text-gray-700 font-open-sans-condensed text-[10px] md:text-base lg:text-md font-normal leading-20">
                      Powered by{" "}
                      <strong className="text-purple-800">Stripe</strong>
                    </div>
                  </div>
                  <div className="flex flex-row flex-wrap">
                    <div className="text-gray-700 font-open-sans-condensed text-[10px] md:text-base lg:text-md font-normal leading-20">
                      View Full&nbsp;&nbsp;
                    </div>
                    <div className="text-gray-700 font-open-sans-condensed text-[10px] md:text-base lg:text-md font-semibold leading-19 underline uppercase">
                      <Link to="/terms-and-conditions" target="_blank">
                        terms & conditions
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="testflex flex-col md:w-[70%] w-full md:order-2 order-1">
            <div className="relative w-4/5 mx-auto">
              {curtab === 0 && (
                <div className="absolute w-full top-[23px] flex flex-row justify-center">
                  <div className="w-[40%] xl:w-[43%] border-t-2 border-[#b3b3b3]"></div>
                  <div className="w-[40%] xl:w-[43%] border-t-2 border-[#b3b3b3]"></div>
                </div>
              )}
              {curtab === 1 && (
                <div className="absolute w-full top-[23px] flex flex-row justify-center">
                  <div className="w-[40%] xl:w-[43%] border-t-2 border-green-500"></div>
                  <div className="w-[40%] xl:w-[43%] border-t-2 border-[#b3b3b3]"></div>
                </div>
              )}
              {curtab === 2 && (
                <div className="absolute w-full top-[23px] flex flex-row justify-center">
                  <div className="w-[40%] xl:w-[43%] border-t-2 border-green-500"></div>
                  <div className="w-[40%] xl:w-[43%] border-t-2 border-green-500"></div>
                </div>
              )}
              <div className="flex flex-row justify-between">
                <div className="min-w-[47px] flex flex-col items-center z-10 ">
                  {curtab >= 1 ? (
                    <label className="custom-checkbox2">
                      <input type="checkbox" checked className="hidden" />
                      <span className="checkmark"></span>
                    </label>
                  ) : curtab < 1 ? (
                    <div className="bg-black text-white border-2 h-12 w-12 flex justify-center items-center text-center font-open-sans-condensed sm:font-open-sans text-18 font-semibold leading-26 rounded-2xl">
                      1
                    </div>
                  ) : (
                    <div className="bg-white border-2 h-12 w-12 flex justify-center items-center text-center font-open-sans-condensed sm:font-open-sans text-18 font-semibold leading-26 rounded-2xl">
                      1
                    </div>
                  )}
                  {curtab >= 1 ? (
                    <div className="text-center text-[#48b74f]">
                      Confirm Details{" "}
                    </div>
                  ) : (
                    <div className="text-center text-black">
                      Confirm Details{" "}
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-center z-10">
                  {curtab >= 2 ? (
                    <label className="custom-checkbox2">
                      <input type="checkbox" checked className="hidden" />
                      <span className="checkmark"></span>
                    </label>
                  ) : curtab === 1 ? (
                    <div className="bg-black text-white border-2 h-12 w-12 flex justify-center items-center text-center font-open-sans-condensed sm:font-open-sans text-18 font-semibold leading-26 rounded-2xl">
                      2
                    </div>
                  ) : (
                    <div className="bg-white border-2 h-12 w-12 flex justify-center items-center text-center font-open-sans-condensed sm:font-open-sans text-18 font-semibold leading-26 rounded-2xl">
                      2
                    </div>
                  )}
                  {curtab >= 2 ? (
                    <div className="text-center text-[#48b74f]">
                      Organise Collection or delivery{" "}
                    </div>
                  ) : (
                    <div className="text-center text-black">
                      Organise Collection or delivery
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-center z-10">
                  {curtab >= 3 ? (
                    <label className="custom-checkbox2">
                      <input type="checkbox" checked className="hidden" />
                      <span className="checkmark"></span>
                    </label>
                  ) : curtab === 2 ? (
                    <div className="bg-black text-white border-2 h-12 w-12 flex justify-center items-center text-center font-open-sans-condensed sm:font-open-sans text-18 font-semibold leading-26 rounded-2xl">
                      3
                    </div>
                  ) : (
                    <div className="bg-white border-2 h-12 w-12 flex justify-center items-center text-center font-open-sans-condensed sm:font-open-sans text-18 font-semibold leading-26 rounded-2xl">
                      3
                    </div>
                  )}
                  {curtab >= 3 ? (
                    <div className="text-center text-[#48b74f]">
                      Reserve Vehicle
                    </div>
                  ) : (
                    <div className="text-center text-black">
                      Reserve Vehicle
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-8 p-5 bg-white flex flex-col">
              {!(
                clientSecret &&
                clientSecret === localStorage.getItem("clientSecret")
              ) ? (
                <>
                  <div className="w-full">
                    {curtab === 0 ? (
                      item ? (
                        <Buyfullnow
                          item={item}
                          type={type}
                          deposit={deposit}
                          term={term}
                          vin={vin}
                          submit={submit}
                          setFirstTabFilled={setFirstTabFilled}
                          formRef={formRef}
                        />
                      ) : (
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
                      )
                    ) : curtab === 1 ? (
                      item && (
                        <CollectionOrDelivery
                          item={item}
                          setMovable={setMovable}
                          type={type}
                        />
                      )
                    ) : (
                      item && (
                        <Paywithcard
                          item={item}
                          vin={vin}
                          type={type}
                          deposit={deposit}
                          term={term}
                          setPayable={setPayable}
                          payButtonRef={payButtonRef}
                        />
                      )
                    )}
                  </div>
                  {item && item.vehicle.status === "sold" && (
                    <div className="mt-2 ml-3 text-sm text-red-500">
                      <strong>{`${item.vehicle.make} ${item.vehicle.model}`}</strong>{" "}
                      ({`${item.vehicle.derivative}`}) is already sold out.
                    </div>
                  )}
                  <div className="mt-8 w-full flex justify-between text-[10px] sm:text-[14px]">
                    <div
                      onClick={prev}
                      className="rounded-full border-black border-2 px-8 py-2 md:px-4 text-center uppercase bg-white hover:bg-black text-black hover:text-white hover:cursor-pointer"
                    >
                      Back
                    </div>
                    {curtab !== 2 ? (
                      <div
                        className={`rounded-full  border-2 text-center px-8  py-2 md:px-4 uppercase text-black  ${
                          (movable || type !== "full" || curtab !== 1) &&
                          item &&
                          !(item.vehicle.status === "sold")
                            ? "border-black bg-white hover:text-white hover:cursor-pointer hover:bg-black"
                            : "bg-gray-500 border-gray-500"
                        }`}
                        onClick={next}
                      >
                        continue
                      </div>
                    ) : (
                      <div
                        className={`rounded-full border-2 text-center px-6  flex flex-row items-center py-2 md:px-4 uppercase text-white ${
                          payable
                            ? "border-black bg-black hover:bg-gray-800 hover:cursor-pointer"
                            : "bg-gray-500 border-gray-500"
                        }`}
                        onClick={next}
                      >
                        Confirm Payment
                        <svg
                          width="16"
                          height="17"
                          viewBox="0 0 16 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="ml-1"
                        >
                          <path
                            d="M4.00039 7.91006V6.31006C4.00039 4.10092 5.79125 2.31006 8.00039 2.31006C10.2095 2.31006 12.0004 4.10092 12.0004 6.31006V7.91006C12.884 7.91006 13.6004 8.6264 13.6004 9.51006V13.5101C13.6004 14.3937 12.884 15.1101 12.0004 15.1101H4.00039C3.11673 15.1101 2.40039 14.3937 2.40039 13.5101V9.51006C2.40039 8.6264 3.11673 7.91006 4.00039 7.91006ZM10.4004 6.31006V7.91006H5.60039V6.31006C5.60039 4.98458 6.67491 3.91006 8.00039 3.91006C9.32587 3.91006 10.4004 4.98458 10.4004 6.31006Z"
                            fill="white"
                          />
                          <path
                            d="M4.00039 7.91006V6.31006C4.00039 4.10092 5.79125 2.31006 8.00039 2.31006C10.2095 2.31006 12.0004 4.10092 12.0004 6.31006V7.91006C12.884 7.91006 13.6004 8.6264 13.6004 9.51006V13.5101C13.6004 14.3937 12.884 15.1101 12.0004 15.1101H4.00039C3.11673 15.1101 2.40039 14.3937 2.40039 13.5101V9.51006C2.40039 8.6264 3.11673 7.91006 4.00039 7.91006ZM10.4004 6.31006V7.91006H5.60039V6.31006C5.60039 4.98458 6.67491 3.91006 8.00039 3.91006C9.32587 3.91006 10.4004 4.98458 10.4004 6.31006Z"
                            stroke="white"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="pr-5 pl-5">
                  <div className="text-gray-900 mt-6 mb-2 font-open-sans-condensed text-4xl font-bold leading-40">
                    Hi <strong>{localStorage.getItem("fname")}</strong>! 😊👏
                  </div>
                  <div className="mb-8 mt-6 font-bold">
                    Your reservation was successful! We will prepare this
                    vehicle for you and if you have any questions please feel
                    free to{" "}
                    <Link to="/contact-us" className="underline text-[#0000ff]">
                      contact us
                    </Link>
                    .
                  </div>
                  <div className="flex justify-end">
                    <Link
                      to="/vehicles-for-sale/used-trucks"
                      className="rounded-full border-2 text-center px-8  py-2 md:px-4 uppercase text-black border-black bg-white hover:text-white hover:cursor-pointer hover:bg-black"
                    >
                      View More
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
