import { createSlice } from "@reduxjs/toolkit";
import { parseLocalStorageValue } from "../../utils";

export const chatbot = createSlice({
  name: "chatbot",
  initialState: {
    messages: [],
    open: false,
    page: 0,
    guest: true,
    load: false,
    url: "/",
    search: "",
    hash: "",
    chat_id: "",
  },
  reducers: {
    addBotMessage: (state, action) => {
      state.messages.push({
        isBot: true,
        text: action.payload.text,
        sliderType: action.payload.sliderType,
        img: action.payload.img,
        time: Date(),
        play: true,
      });
      if (action.payload.img && action.payload.img.length > 0) {
        state.focusedVehicle = action.payload.img[0].vin;
      }
      if (state.guest) {
        localStorage.setItem("messages", JSON.stringify(state.messages));
        localStorage.setItem(
          "state",
          JSON.stringify(
            action.payload.state || {
              user_contact_info: {
                name: "",
                "e-mail": "",
                number: "",
              },
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
            }
          )
        );
      }
      state.stripe = action.payload.state ? action.payload.state.stripe : "";
    },
    addHumanMessage: (state, action) => {
      state.messages.push({
        isBot: false,
        text: action.payload,
        time: Date(),
        play: true,
      });
      console.log(state.messages);
    },
    openChatbot: (state, action) => {
      state.open = action.payload;

      if (action.payload)
        localStorage.setItem("hasExperience", JSON.stringify(true)); //you has previous exp about bot

      localStorage.setItem("open", JSON.stringify(action.payload));
      state.messages = state.messages.map((message) => {
        const temp = { ...message };
        temp.play = false;
        return temp;
      });
    },
    thinkChatbot: (state, action) => {
      state.thinking = action.payload;
    },
    movePage: (state, action) => {
      state.page = action.payload;
      if (action.payload * 1 === 3) {
        let chat_id = parseLocalStorageValue("chat_id");
        if (!chat_id) {
          chat_id = new Date().getTime();
          localStorage.setItem("chat_id", chat_id);
        }

        state.chat_id = chat_id;
      }
      localStorage.setItem("page", action.payload);
    },
    initMessage: (state, action) => {
      console.log("init history");
      const messages = action.payload.map((message) => {
        return message.isBot
          ? {
              isBot: message.isBot,
              text: message.text,
              time: message.time,
              sliderType: message.sliderType || "nothing",
              img: message.img || [],
              play: false,
            }
          : {
              isBot: message.isBot,
              text: message.text,
              time: message.time,
              play: false,
            };
      });

      state.messages = messages;

      if (action.payload.length === 0) {
        if (state.url.startsWith("/sell-your-vehicle")) {
          state.messages = [
            {
              isBot: true,
              text: "Hello! This is Aime from TMC. I see you want to sell you car, let me have your phone number or email before provide a valuation service.",
              time: Date(),
              play: true,
            },
          ];
        } else if (state.url.startsWith("/vehicles-for-sale/used-trucks")) {
          const queryParams = new URLSearchParams(state.search);
          // Accessing individual query parameters
          const _bodyType = queryParams.get("bodyType");
          const _make = queryParams.get("make");
          const _model = queryParams.get("model");
          const filter = `${
            _bodyType
              ? _bodyType === "all"
                ? ""
                : ` body type of ${_bodyType},`
              : ""
          }${_make ? (_make === "all" ? "" : ` make of ${_make},`) : ""}${
            _model ? (_model === "all" ? "" : ` model of ${_model},`) : ""
          }`.slice(0, -1);
          state.messages = [
            {
              isBot: true,
              text: `Hello! This is Aime from TMC. I see you are looking at vehicles${
                filter ? " at " : ""
              }${filter}. How can I help?`,
              time: Date(),
              play: true,
            },
          ];
        } else if (state.url.startsWith("/vehicles-for-sale/used-cars")) {
          state.messages = [
            {
              isBot: true,
              text: "Hello! This is Aime from TMC. I see you are looking at used cars. How can I help?",
              time: Date(),
              play: true,
            },
          ];
        } else if (state.url.startsWith("/vehicles-for-sale/used-vans")) {
          state.messages = [
            {
              isBot: true,
              text: "Hello! This is Aime from TMC. I see you are looking at used vans. How can I help?",
              time: Date(),
              play: true,
            },
          ];
        } else if (state.url.startsWith("/vehicles-for-sale/viewdetail")) {
          state.messages = [
            {
              isBot: true,
              text: "Hello! This is Aime from TMC. I see you are interested in this vehicle. How can I help?",
              time: Date(),
              play: true,
            },
          ];
        } else if (state.url.startsWith("/checkout")) {
          state.messages = [
            {
              isBot: true,
              text: "Hi! This is Aime from TMC. Kindly fill in the necessary forms to finalize your vehicle reservation. Should you require any assistance, feel free to ask.",
              time: Date(),
              play: true,
            },
          ];
        } else {
          state.messages = [
            {
              isBot: true,
              text: "Hi, I'm Aime. Welcome to our showroom. Which specific type of vehicle are you interested in?",
              time: Date(),
              play: true,
            },
          ];
        }
      }

      if (state.guest) {
        const bot_state = parseLocalStorageValue("state");
        state.stripe = bot_state ? bot_state.stripe : "";
      } else {
        const lastMessage = state.messages.slice(-1)[0];
        if (lastMessage.isBot && lastMessage.state && lastMessage.state.stripe)
          state.stripe = lastMessage.state.stripe;
        else state.stripe = "";
      }
      state.load = true;
    },
    focusVehicle: (state, action) => {
      console.log("focus", action.payload);
      state.focusedVehicle = action.payload;
    },
    exit: (state) => {
      if (state.url.startsWith("/sell-your-vehicle")) {
        state.messages = [
          {
            isBot: true,
            text: "Hello! This is Aime from TMC. I see you want to sell you car, let me have your phone number or email before provide a valuation service.",
            time: Date(),
            play: true,
          },
        ];
      } else if (state.url.startsWith("/vehicles-for-sale/used-trucks")) {
        const queryParams = new URLSearchParams(state.search);
        // Accessing individual query parameters
        const _bodyType = queryParams.get("bodyType");
        const _make = queryParams.get("make");
        const _model = queryParams.get("model");
        const filter = `${
          _bodyType
            ? _bodyType === "all"
              ? ""
              : ` body type of ${_bodyType},`
            : ""
        }${_make ? (_make === "all" ? "" : ` make of ${_make},`) : ""}${
          _model ? (_model === "all" ? "" : ` model of ${_model},`) : ""
        }`.slice(0, -1);
        state.messages = [
          {
            isBot: true,
            text: `Hello! This is Aime from TMC. I see you are looking at vehicles${
              filter ? " at " : ""
            }${filter}. How can I help?`,
            time: Date(),
            play: true,
          },
        ];
      } else if (state.url.startsWith("/vehicles-for-sale/used-cars")) {
        state.messages = [
          {
            isBot: true,
            text: "Hello! This is Aime from TMC. I see you are looking at used cars. How can I help?",
            time: Date(),
            play: true,
          },
        ];
      } else if (state.url.startsWith("/vehicles-for-sale/used-vans")) {
        state.messages = [
          {
            isBot: true,
            text: "Hello! This is Aime from TMC. I see you are looking at used vans. How can I help?",
            time: Date(),
            play: true,
          },
        ];
      } else if (state.url.startsWith("/vehicles-for-sale/viewdetail")) {
        state.messages = [
          {
            isBot: true,
            text: "Hello! This is Aime from TMC. I see you are interested in this vehicle. How can I help?",
            time: Date(),
            play: true,
          },
        ];
      } else if (state.url.startsWith("/checkout")) {
        state.messages = [
          {
            isBot: true,
            text: "Hi! This is Aime from TMC. Kindly fill in the necessary forms to finalize your vehicle reservation. Should you require any assistance, feel free to ask.",
            time: Date(),
            play: true,
          },
        ];
      } else {
        state.messages = [
          {
            isBot: true,
            text: "Hi, I'm Aime. Welcome to our showroom. Which specific type of vehicle are you interested in?",
            time: Date(),
            play: true,
          },
        ];
      }
      state.page = 0;
      state.guest = true;
      state.focusedVehicle = null;
      state.load = false;
      state.stripe = "";
      state.chat_id = "";
      localStorage.removeItem("messages");
      localStorage.removeItem("open");
      localStorage.removeItem("page");
      localStorage.removeItem("state");
      localStorage.removeItem("chat_id");
    },
    changeMode: (state, action) => {
      state.guest = action.payload;
    },
    changeTheFirstQuestion: (state, action) => {
      console.log(action.payload);
      state.url = action.payload.pathname;
      state.search = action.payload.search;
      state.hash = action.payload.hash;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addBotMessage,
  addHumanMessage,
  openChatbot,
  thinkChatbot,
  movePage,
  initMessage,
  focusVehicle,
  exit,
  changeMode,
  changeTheFirstQuestion,
  load,
} = chatbot.actions;

export default chatbot.reducer;
