import { Link } from "react-router-dom";
import _ from "lodash";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { parseLocalStorageValue } from "../utils";
import {
  addBotMessage,
  addHumanMessage,
  openChatbot,
  thinkChatbot,
  focusVehicle,
} from "../redux/slices/chatbotSlice";

export default function Needanother({ item }) {
  const { vin } = item.vehicle;

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

  const setFocusVehicle = (value) => {
    dispatch(focusVehicle(value));
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

    data.focusedVehicle = vin;

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

  const askAime = () => {
    let message = "Let me know details of this vehicle";
    setIsBotChatOpen(true);
    setFocusVehicle(vin);
    setTimeout(() => {
      addHMessage(message);
    }, 1500);
    // visible(3); // This will call the setOpenQuick function and pass true as an argument
  };

  return (
    <div className="bg-white rounded-2xl mt-[50px] p-[24px] flex flex-col justify-center items-center">
      <h2 className="subtitle text-[24px] leading-[32px] font-normal">
        Need another way to buy?
      </h2>
      <p className="mt-2   text-black text-center font-open-sans-condensed sm:font-open-sans text-base font-normal leading-6 ">
        Want to try another way of buying click Reserve Vehicle, Checking you
        finance availability, or have any question? Ask{" "}
        <span className="font-bold">Aime</span> any questions you have about
        this vehicle
      </p>
      <div className="w-full mt-6 flex flex-col md:flex-row justify-between">
        <Link
          to={`/checkout/${vin}?type=reserve`}
          className="border-2 magicbutton shadow-md text-white hover:shadow-lg flex flex-row justify-center text-center items-center py-[10px] w-full  md:w-[30%] rounded-full"
        >
          <div className="flex flex-row items-center">Reserve Vehicle</div>
        </Link>

        <div
          onClick={() => askAime()}
          className="border-2 bg-black text-white hover:bg-gray-700 flex flex-row justify-center text-center items-center py-[10px] w-full mt-2 md:mt-0 md:w-[30%] rounded-full cursor-pointer"
        >
          <div className="flex flex-row items-center">Ask Aime</div>
        </div>
        <a
          href="https://www.mycarcreditscore.co.uk/TMCMotors/95641"
          target="_blank"
          className="border-2 bg-black text-white hover:bg-gray-700 flex flex-row justify-center text-center items-center py-[10px] w-full mt-2 md:mt-0  md:w-[30%] rounded-full"
          rel="noreferrer"
        >
          <div className="flex flex-row items-center">Free Finance Check</div>
        </a>
      </div>
    </div>
  );
}
