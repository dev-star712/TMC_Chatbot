import { useEffect, useState } from "react";
import _ from "lodash";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { parseLocalStorageValue } from "../utils";
import {
  addBotMessage,
  addHumanMessage,
  openChatbot,
  thinkChatbot,
} from "../redux/slices/chatbotSlice";
import QuickCarInfo from "./QuickCarInfo";

export default function SecondQuickValue({ visible, vehicle, registration }) {
  const [mileage, setMileage] = useState(100);
  const [confirm, setConfirm] = useState(false);

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

  const handleBack = () => {
    visible(1); // This will call the setOpenQuick function and pass true as an argument
  };
  const handleContinue = () => {
    setConfirm(true);
    console.log(vehicle, mileage);
    let message = `Hi, Can you value my vehicle?\nThese are my vehicle details;\n\nRegistration Number: ${registration}\nMake: ${vehicle.make}\nModel: ${vehicle.model}\nVersion: ${vehicle.derivative}\nFuel Type: ${vehicle.fuelType}\nRegistration Date: ${vehicle.firstRegistrationDate}\nColour: ${vehicle.colour}\nEngine Size: ${vehicle.engineCapacityCC} CC\nNumber Of Doors: ${vehicle.doors}\nTransmission: ${vehicle.transmissionType}\nMileage: ${mileage}`;
    setIsBotChatOpen(true);
    setTimeout(() => {
      addHMessage(message);
    }, 1500);
    // visible(3); // This will call the setOpenQuick function and pass true as an argument
  };

  useEffect(() => {
    setConfirm(false);
  }, [mileage]);

  return (
    <div className="w-full bg-[#f6f6f6] flex flex-col md:flex-row justify-center items-center py-[50px]  px-[20px] md:px-0">
      <div className="w-full max-w-[1360px] mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between rounded-2xl">
          <div className="w-full md:w-[27%]">
            <QuickCarInfo vehicle={vehicle} registration={registration} />
          </div>
          <div className="w-full md:w-[70%]">
            <div className="w-full bg-white rounded-2xl p-8 flex flex-col">
              <div className="  uppercase font-bold text-black text-3xl">
                Additional Information
              </div>
              <div className="  mt-4">
                You are now at the last step of your valuation.
              </div>
              <div className="mt-8   ">What is the current Mileage? </div>
              <input
                type="number"
                value={mileage}
                min={1}
                max={1000000}
                onChange={(e) => {
                  if (e.target.value === "") {
                    setMileage(e.target.value);
                  } else if (e.target.value < 1) {
                    setMileage(1);
                  } else if (e.target.value > 1000000) {
                    setMileage(1000000);
                  } else {
                    setMileage(e.target.value);
                  }
                }}
                onBlur={(e) => {
                  if (e.target.value === "") {
                    setMileage(1);
                  }
                }}
                className="outline-none mt-2 w-full bg-[#f6f6f6] border-2 border-gray-200 rounded-full py-3 px-6"
              ></input>
              <div className="mt-8 border-t-2"></div>
              <div className="mt-8 flex flex-wrap flex-row w-full text-[14px] justify-between">
                <div
                  className="hover:cursor-pointer uppercase py-2 px-2 md:px-8 rounded-full border-2 border-black bg-white hover:text-white hover:bg-black"
                  onClick={handleBack}
                >
                  <div className="flex flex-row justify-center items-center">
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M896 810.666667c-8.533333 0-17.066667-4.266667-25.6-8.533333l-384-256C477.866667 537.6 469.333333 524.8 469.333333 512s8.533333-25.6 17.066667-34.133333l384-256c12.8-8.533333 29.866667-8.533333 42.666667 0C930.133333 226.133333 938.666667 238.933333 938.666667 256l0 512c0 17.066667-8.533333 29.866667-21.333333 38.4C908.8 810.666667 904.533333 810.666667 896 810.666667zM588.8 512l264.533333 174.933333L853.333333 337.066667 588.8 512z" />
                      <path d="M512 810.666667c-8.533333 0-17.066667-4.266667-25.6-8.533333l-384-256C93.866667 537.6 85.333333 524.8 85.333333 512s8.533333-25.6 17.066667-34.133333l384-256c12.8-8.533333 29.866667-8.533333 42.666667 0C546.133333 226.133333 554.666667 238.933333 554.666667 256l0 512c0 17.066667-8.533333 29.866667-21.333333 38.4C524.8 810.666667 520.533333 810.666667 512 810.666667zM204.8 512l264.533333 174.933333L469.333333 337.066667 204.8 512z" />
                    </svg>
                    <div className="ml-2">GO BACK</div>
                  </div>
                </div>
                <div
                  className={`uppercase py-2 px-3 md:px-8 rounded-full border-2 border-black ${
                    !confirm
                      ? "hover:cursor-pointer hover:text-white hover:bg-black bg-white"
                      : "text-white bg-gray-600"
                  }`}
                  onClick={(e) => {
                    if (!confirm) {
                      handleContinue();
                    }
                  }}
                >
                  valuate
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
