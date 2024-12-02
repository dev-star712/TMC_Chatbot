import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import _ from "lodash";
import BotChatDialog from "./BotChatDialog";
import assistant from "../assets/images/assistant.png";
import { useSelector, useDispatch } from "react-redux";
import {
  addBotMessage,
  addHumanMessage,
  openChatbot,
  thinkChatbot,
  initMessage,
  exit,
} from "../redux/slices/chatbotSlice";
import { parseLocalStorageValue } from "../utils";

export default function LiveChat() {
  const dispatch = useDispatch();
  const location = useLocation();

  const isBotChatOpen = useSelector((state) => state.chatbot.open);

  const setIsBotChatOpen = (value) => {
    dispatch(openChatbot(value));
  };

  const messages = useSelector((state) => state.chatbot.messages);

  const addBMessage = (text) => {
    dispatch(addBotMessage(text));
  };

  const addHMessage = (text) => {
    sendPostRequest(text);
    dispatch(addHumanMessage(text));
  };

  const thinking = useSelector((state) => state.chatbot.thinking);

  const setThinking = (value) => {
    dispatch(thinkChatbot(value));
  };

  const focusedVehicle = useSelector((state) => state.chatbot.focusedVehicle);

  const sendPostRequest = async (query) => {
    const currentLocation = location.pathname + location.search + location.hash;

    const data = {
      query,
      location: currentLocation,
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

  const openBotChat = () => {
    setIsBotChatOpen(!isBotChatOpen);
  };

  const closeBotChat = () => {
    setIsBotChatOpen(false);
  };

  // useEffect(() => {
  //   if (window.innerWidth < 540) {
  //     if (isBotChatOpen) {
  //       document.body.style.overflow = "hidden";
  //     } else {
  //       document.body.style.overflow = "";
  //     }
  //   }
  // }, [isBotChatOpen]);

  const exitChat = () => {
    dispatch(exit());
  };

  const stripeFlag = useSelector((state) => state.chatbot.stripe);

  useEffect(() => {
    if (isBotChatOpen) {
      dispatch(initMessage(parseLocalStorageValue("messages") || []));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBotChatOpen]);

  useEffect(() => {
    const flag = parseLocalStorageValue("open") || false;
    if (flag) {
      openBotChat();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-full">
      <div>
        <div
          className={`fixed right-0 bottom-4 cursor-pointer rounded-full z-20 w-14 h-14 shadow-smooth-6 transition-all transform duration-500 ease-in-out ${
            !isBotChatOpen ? "scale-100" : "scale-0"
          }`}
          onClick={openBotChat}
        >
          <div className="relative rounded-l-full w-full h-full flex items-center justify-center shadow-custom-red hover:shadow-custom-blue transition duration-200 ease-in-out hover:scale-105">
            <img
              id="bot-logo"
              itemProp="bot logo"
              alt="Bot Logo"
              src={assistant}
              className="w-full rounded-l-full"
              style={{ height: "56px", width: "56px" }}
            />
            {parseLocalStorageValue("hasExperience") ? (
              <div className="p-[5px] rounded-full absolute bottom-0 left-0 bg-[#14a800] border" />
            ) : (
              <img
                id="bot-logo"
                itemProp="bot logo"
                alt="Bot Logo"
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdDd1bzkwa2gyazZzcDR4bHY4ZXBlNnk5OWdrejZkejgxdzd3aWcydSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/w1OBpBd7kJqHrJnJ13/giphy.gif"
                className="w-3/4 absolute -top-4 -left-4"
                style={{ width: "42px", height: "42px" }}
              />
            )}
          </div>
        </div>
      </div>

      <BotChatDialog
        isOpen={isBotChatOpen}
        onClose={closeBotChat}
        messages={messages}
        addHMessage={addHMessage}
        thinking={thinking}
        exitChat={exitChat}
        stripeFlag={stripeFlag}
      />
    </div>
  );
}
