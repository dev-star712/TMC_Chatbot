import { useDispatch } from "react-redux"
import carintro from "../assets/images/carintoro.png";

import {
  addBotMessage,
  openChatbot,
  exit
} from "../redux/slices/chatbotSlice";
export default function Asksell() {
  const dispatch = useDispatch()
  const addBMessage = (text) => {
    dispatch(addBotMessage(text));
  };
  const setIsBotChatOpen = (value) => {
    // localStorage.setItem("extraAssistant", JSON.stringify(true));
    dispatch(openChatbot(value));
  };
  const handleGetInstantValue = async () => {
    await dispatch(exit({ initMsg: false }))
    setIsBotChatOpen(true);
    let message = `Hi, I see you are looking to Part Exchange your vehicle, please let me know the registration number to begin.`;
    addBMessage({ text: message});
  }
  return (
    <div className="mt-6 w-full flex flex-row rounded-xl">
      <img
        src={carintro}
        alt="carlock"
        className="w-[42%] h-[184px] md:h-fit hidden sm:block"
        style={{
          borderRadius: "16px 0px 0px 16px",
          background: "white",
        }}
      />
      <div className="w-full sm:w-[58%] bg-white flex flex-col justify-center items-center rounded-md sm:rounded-tr-md sm:rounded-br-md p-[24px] sm:p-0">
        <h3 className="text-gray-800 text-center font-bold text-xl">
          Part Exchange Your Vehicle?
        </h3>
        <p className="text-black text-center   ">
          Try to value your car first to see how worth your car is.
        </p>
        <div
          onClick={() => {
            handleGetInstantValue()
          }}
          className="mt-1 md:mt-2 text-white magicbutton mb-2 border-2 w-[95%] md:w-4/5 rounded-full py-2 text-center text-[14px] hover:cursor-pointer "
        >
          Value my Part Exchange
        </div>
      </div>
    </div>
  );
}
