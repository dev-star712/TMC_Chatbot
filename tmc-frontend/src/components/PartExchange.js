import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux"

import {
  addBotMessage,
  openChatbot,
  exit
} from "../redux/slices/chatbotSlice";

export default function PartExchange() {
  const [registration, setRegistration] = useState("");
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
    <div className="p-5 xl:p-[100px]  mx-auto">
      <div className="block w-full max-w-[1280px] mx-auto">
        <div className="mb-6 w-full xl:justify-between justify-center items-center xl:items-start flex xl:flex-row flex-col ">
          <div className="w-full flex flex-wrap max-w-[750px] relative">
            <h2 className="flex flex-wrap max-w-[700px] xl:max-w-[560px] text-[45px] sm:text-[70px] md:text-[80px] xl:text-[80px] z-10 justify-center xl:justify-start leading-6">
              <span className="subtitle leading-[50px] sm:leading-[70px] xl:leading-[100px]">
                Want&nbsp;to&nbsp;
              </span>
              <span className="magictitle leading-[50px] sm:leading-[70px] xl:leading-[100px]">
                Sell&nbsp;
              </span>
              <span className="subtitle leading-[50px] sm:leading-[70px] xl:leading-[100px]">
                or&nbsp;
              </span>
              <span className="magictitle leading-[50px] pb-1 sm:pb-3 md:pb-4 sm:leading-[70px] xl:leading-[100px]">
                Part Exchange&nbsp;
              </span>
              <span className="subtitle leading-[50px] sm:leading-[70px] xl:leading-[100px]">
                ?
              </span>
            </h2>
          </div>
          <div className="w-11/12 xl:max-w-[580px] xl:self-stretch self-center flex-col justify-end relative items-start gap-9 mt-9 flex">
            {/* <div className="mt-2 text-[24px] leading-7">
              Enter your registration number below to get a quote for part
              exchanging your vehicle.{" "}
            </div> */}
            <div className="w-full mx-auto">
              <div className="hidden  mt-4  pr-1 py-1 lg:flex flex-row justify-between w-full  bg-white rounded-full text-gray-700 font-open-sans-condensed font-medium text-base leading-6">
                {/* <input
                  type="text"
                  className="w-1/2 ml-6 outline-none"
                  placeholder="Enter your registration number"
                  value={registration}
                  onChange={(e) => {
                    if (e.target.value.replace(/\s/g, "").length <= 7) {
                      setRegistration(e.target.value);
                    }
                  }}
                /> */}
                <div
                  onClick={() => {
                    handleGetInstantValue()
                  }}
                  className="text-sm rounded-full mt-1 text-center w-full hover:cursor-pointer py-3 px-6 magicbutton"
                  style={{ marginTop: "-20px!important!important"}}
                >
                  Value my Part Exchange
                </div>
              </div>

              <div className="lg:hidden flex flex-col justify-center items-center">
                {/* <div className="mt-12 lg:hidden flex flex-row justify-between w-full bg-white rounded-full border-2 border-gray-300 text-gray-700 font-open-sans-condensed font-medium text-base leading-6">
                  <input
                    type="text"
                    className="h-12 px-6 border-2 rounded-full w-full outline-none"
                    placeholder="Enter your registration number"
                    value={registration}
                    onChange={(e) => {
                      if (e.target.value.replace(/\s/g, "").length <= 7) {
                        setRegistration(e.target.value);
                      }
                    }}
                  />
                </div> */}
                <div
                  onClick={() => {
                    handleGetInstantValue()
                  }}
                  className="text-center mt-4 w-fit hover:cursor-pointer rounded-full py-3 px-6 magicbutton"
                >
                  Value my Part Exchange
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
