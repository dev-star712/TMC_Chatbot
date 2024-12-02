import { configureStore } from "@reduxjs/toolkit";
import chatbotReducer from "./slices/chatbotSlice";
import vehicleReducer from "./slices/vehicleSlice";

const reducer = {
  chatbot: chatbotReducer,
  vehicle: vehicleReducer,
};

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production",
});
