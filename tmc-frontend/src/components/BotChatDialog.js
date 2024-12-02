import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { parseLocalStorageValue } from "../utils";
import TypingEffect from "./TypingEffect";
import Carslider from "../components/Carslider";
import logo from "../assets/icon/logo.svg";
import assistant from "../assets/images/assistant.png";

const options = {
  amount: 14900,
  currency: "gbp",
  mode: "payment",

  // Fully customizable with appearance API.
  appearance: {
    theme: "flat",
    variables: {
      fontFamily: ' "Gill Sans", sans-serif',
      fontLineHeight: "1.5",
      borderRadius: "10px",
      colorBackground: "#F6F8FA",
      accessibleColorOnColorPrimary: "#262626",
    },
    rules: {
      ".Block": {
        backgroundColor: "var(--colorBackground)",
        boxShadow: "none",
        padding: "12px",
      },
      ".Input": {
        padding: "12px",
        borderRadius: "9999px",
        backgroundColor: "#f6f6f6",
        boxSizing: "border-box",
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: "#eeeeee",
        color: "black",
      },
      ".Input:disabled, .Input--invalid:disabled": {
        color: "lightgray",
      },
      ".Tab": {
        padding: "10px 12px 8px 12px",
        border: "none",
      },
      ".Tab:hover": {
        border: "none",
        boxShadow:
          "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)",
      },
      ".Tab--selected, .Tab--selected:focus, .Tab--selected:hover": {
        border: "none",
        backgroundColor: "#fff",
        boxShadow:
          "0 0 0 1.5px var(--colorPrimaryText), 0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)",
      },
      ".Label": {
        fontWeight: "500",
      },
    },
  },
};

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
};

const BotChatDialog = ({
  isOpen,
  onClose,
  messages,
  addHMessage,
  thinking,
  exitChat,
  stripeFlag,
}) => {
  const components = {
    a: ({ href, children }) => {
      if (
        href.startsWith("/") ||
        href.startsWith(`https://${process.env.REACT_APP_APP}`)
      )
        return (
          <Link to={href} style={{ textDecoration: "underline" }}>
            {children}
          </Link>
        );
      else
        return (
          <Link
            to={href}
            target="_blank"
            style={{ textDecoration: "underline" }}
          >
            {children}
          </Link>
        );
    },
  };

  const calcTimeDiff = (value) => {
    const now = new Date();
    const time = new Date(value);

    let diff = now.getTime() - time.getTime();

    if (Math.round(diff / 1000) < 10) {
      return "Just Now";
    } else {
      return time.toLocaleTimeString();
    }
  };

  function extractYouTubeLinks(text) {
    const regex =
      /\((http:|https:)?\/\/(www\.)?(youtube.com|youtu.be)\/(watch)?(\?v=)?(\S+)?\)/g;
    const matches = (text || "").match(regex);
    return (matches || []).map((match) => match.slice(1, -1));
  }

  function convertToEmbedURL(url) {
    if (url.startsWith("https://youtu.be/")) {
      const videoID = url.split("youtu.be/")[1];
      return `https://www.youtube.com/embed/${videoID}`;
    }
    if (url.startsWith("https://www.youtube.com/watch?v=")) {
      const videoID = url.split("www.youtube.com/watch?v=")[1];
      return `https://www.youtube.com/embed/${videoID}`;
    }
    return url;
  }

  const scrollRef = useRef();

  const [showsliders, setShowsliders] = useState([]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    console.log("length", messages.length);
    const temp = [];
    const vinsWithImage = [];
    for (let i = 0; i < messages.length - 1; i++) {
      if (!messages[i].isBot || !messages[i].img) temp.push(0);
      else if (messages[i].img.length === 0) {
        temp.push(0);
      } else {
        temp.push(-1);
        if (messages[i].img.every((val, j, img) => val.vin === img[0].vin)) {
          vinsWithImage.push(messages[i].img[0].vin);
        }
      }
    }

    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.isBot && lastMessage.img && lastMessage.img.length > 0) {
        if (
          lastMessage.img.every((val, j, img) => val.vin === img[0].vin) &&
          vinsWithImage.includes(lastMessage.img[0].vin)
        ) {
          temp[messages.length - 1] = -1;
        } else {
          temp[messages.length - 1] = 1;
        }
      }
    }

    setShowsliders(temp);
  }, [messages]);

  const [text, setText] = useState("");

  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  const minRows = 1;
  const maxRows = 3;
  const [rows, setRows] = useState(minRows);

  const barHeight = 36;

  const [offset, setOffset] = useState(0);
  const [startY, setStartY] = useState(0);
  const [draggable, setDraggable] = useState(false);

  const handleMouseDown = (event) => {
    console.log("start");
    setDraggable(true);
    setStartY(event.changedTouches[0].clientY);
  };

  const handleMouseUp = (event) => {
    setDraggable(false);
  };

  const { height } = useWindowSize();

  const handleMouseMove = (event) => {
    if (draggable) {
      let y = offset + (event.changedTouches[0].clientY - startY);
      if (y < 0) y = 0;
      else if (y > height - barHeight) y = height - barHeight;
      setOffset(y);
    }
  };

  useEffect(() => {
    if (offset + barHeight > height) setOffset(height - barHeight);
  }, [height]);

  useEffect(() => {
    if (draggable) {
      document.addEventListener("touchend", handleMouseUp);
      document.addEventListener("touchmove", handleMouseMove);

      // Cleanup
      return () => {
        document.removeEventListener("touchend", handleMouseUp);
        document.removeEventListener("touchmove", handleMouseMove);
      };
    }
  }, [draggable]);

  return (
    <div
      className="font-sans fixed flex rounded-none sm:rounded-3xl shadow-2xl items-end z-50 sm:top-auto sm:left-auto"
      onTouchStart={(e) => (document.body.style.overflow = "hidden")}
      onTouchEnd={(e) => (document.body.style.overflow = "")}
    >
      <div
        className={`origin-bottom-right sm:bottom-11 sm:right-[35px] bg-gray-50 sm:bg-white fixed shadow-custom-top-gray ${
          offset && "border-t"
        } border-white sm:border-gray-300 ${
          offset && "rounded-t-3xl"
        } sm:rounded-3xl sm:shadow-lg flex flex-col z-200 sm:w-[370px] transition-all transform duration-300 ease-in-out ${
          isOpen ? "z-50 scale-100" : "scale-0"
        }`}
        style={{
          height: `${
            window.innerWidth < 540 ? `${height - offset}px` : "650px"
          }`,
          top: `${window.innerWidth < 540 ? `${offset}px` : "auto"}`,
        }}
      >
        <div
          className={`sm:hidden absolute z-50 top-0 left-0 right-0 flex space-x-4 px-3 items-center text-lg magicbackground text-white ${
            offset && `rounded-t-3xl`
          }`}
        >
          <div className="flex flex-row gap-2 justify-start w-1/2">
            <div
              className="rounded-full w-7 h-7 my-1 flex items-start cursor-pointer hover:drop-shadow-lg border border-white"
              onClick={() => setOffset(0)}
            >
              <svg className="fill-current w-3 h-3 my-auto mx-auto">
                <use href="#arrow-up"></use>
              </svg>
            </div>
            <div
              className="rounded-full w-7 h-7 my-1 flex items-start cursor-pointer hover:drop-shadow-lg border border-white"
              onClick={() => setOffset(height - barHeight)}
            >
              <svg className="fill-current w-3 h-3 my-auto mx-auto">
                <use href="#arrow-down"></use>
              </svg>
            </div>
          </div>
          <div className="flex flex-row gap-2 justify-end w-1/2">
            <div
              className="rounded-full w-7 h-7 my-1 flex items-start cursor-pointer hover:drop-shadow-lg border border-white"
              onClick={() => {
                setIsOpenConfirmModal(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="fill-current w-5 h-5 my-1 mx-auto"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  fill="currentColor"
                  d="M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13H6zm3-4h6a1 1 0 0 1 1 1v1h5v2H4V5h5V3a1 1 0 0 1 1-1z"
                />
              </svg>
            </div>
            <div
              className="rounded-full w-7 h-7 my-1 flex items-start cursor-pointer hover:drop-shadow-lg border border-white"
              onClick={onClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 8.586l2.293-2.293 1.414 1.414L11.414 10l2.293 2.293-1.414 1.414L10 11.414l-2.293 2.293-1.414-1.414L8.586 10 6.293 7.707l1.414-1.414L10 8.586z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div
              className="handle rounded-full w-7 h-7 my-1 flex items-start cursor-pointer hover:drop-shadow-lg border border-white"
              onTouchStart={handleMouseDown}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M12 4L12 20M12 4L8 8M12 4L16 8M12 20L8 16M12 20L16 16"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="hidden sm:flex bg-gray-50 px-2 pt-2 h-[73px] sm:rounded-3xl shadow-black w-full items-start justify-between rounded-t-4xl sm:bg-[#ffffff] text-[#000000]">
          <div className="flex flex-row items-center py-2">
            <img
              id="bot-logo"
              itemProp="logo"
              alt="TMC Logo"
              src={logo}
              className="max-w-[200px] mx-2"
            />
          </div>
          <div className="mr-2 mt-2 flex flex-row gap-2">
            <div
              className="rounded-full w-8 h-8 flex items-start cursor-pointer bg-gray-300 hover:bg-gray-500 hover:drop-shadow-lg"
              onClick={() => {
                setIsOpenConfirmModal(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="fill-current w-5 h-5 my-1 mx-auto"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  fill="currentColor"
                  d="M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13H6zm3-4h6a1 1 0 0 1 1 1v1h5v2H4V5h5V3a1 1 0 0 1 1-1z"
                />
              </svg>
            </div>
            <div
              className="rounded-full w-8 h-8 flex items-start cursor-pointer bg-gray-300 hover:bg-gray-500 hover:drop-shadow-lg"
              onClick={onClose}
            >
              <svg className="fill-current w-3 h-3 my-auto mx-auto">
                <use href="#arrow-down"></use>
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 flex-grow rounded-3xl shadow-black flex flex-col rounded-t-4xl rounded-b-4xl overflow-hidden sm:bg-[#ffffff] text-[#000000]">
          <div className="bg-gray-50 h-full sm:bg-[#f9f9f9]  message-container flex-grow py-4 flex flex-col gap-y-4  rounded-3xl mb-1.5 mr-1.5 ml-1.5 text-sm relative">
            <div className="hidden sm:flex absolute z-50 top-0 left-0 right-0 px-3 items-center justify-center text-lg bg-[#0d47a1] text-white rounded-t-3xl">
              Aime
            </div>
            <div
              tabIndex="-1"
              className={`${
                isOpenConfirmModal ? "" : "hidden"
              }  font-open-sans-condensed sm:font-open-sans absolute overflow-y-auto overflow-x-hidden right-0 left-0 bottom-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
            >
              <div className="relative p-4 w-full max-w-md max-h-full top-2 sm:top-5">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <button
                    type="button"
                    className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => {
                      setIsOpenConfirmModal(false);
                    }}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                  <div className="p-4 md:p-5 text-center">
                    <svg
                      className="mx-auto mb-4 text-gray-400 w-6 h-6 dark:text-gray-200"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <h3 className="mb-5 font-normal text-gray-700 dark:text-gray-400">
                      Do you want to clear the chat history?
                    </h3>
                    <button
                      type="button"
                      className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-2.5 py-1 text-center me-2"
                      onClick={() => {
                        localStorage.removeItem("jwtToken");
                        localStorage.removeItem("user");
                        setIsOpenConfirmModal(false);
                        exitChat();
                      }}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-2.5 py-1 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                      onClick={() => {
                        setIsOpenConfirmModal(false);
                      }}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              id="chatbot_panel"
              ref={scrollRef}
              className="h-full overflow-y-auto flex flex-col justify-between px-4"
            >
              <div className="w-full">
                <div className="flex w-full flex-col mt-2 sm:mt-0">
                  {messages.map((message, index) => {
                    if (message.isBot) {
                      const videos = extractYouTubeLinks(message.text);
                      return (
                        <div
                          key={index}
                          className="mt-4 relative self-start w-full"
                        >
                          <div className="flex flex-row justify-between">
                            <div className="w-8 h-8 rounded-full flex justify-center items-center border-2 border-white">
                              <img
                                id="bot-logo"
                                itemProp="bot logo"
                                alt="Bot Logo"
                                src={assistant}
                                className="max-w-[32px] rounded-full"
                              />
                            </div>
                            <div className="flex flex-col w-[85%]">
                              <div className="rounded-b-xl rounded-tr-xl border-2 text-gray-800 py-2 px-3">
                                {message.img && message.img.length > 0 && (
                                  <div className="mb-1">
                                    {showsliders[index] !== 0 && (
                                      <div
                                        className={`flex justify-center py-1 mb-2 cursor-pointer ${
                                          showsliders[index] === -1 &&
                                          "bg-gray-300"
                                        } hover:bg-gray-400 rounded-xl`}
                                        onClick={() => {
                                          const temp = [...showsliders];
                                          temp[index] = temp[index] * -1;
                                          setShowsliders(temp);
                                        }}
                                      >
                                        {showsliders[index] === -1 ? (
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                          >
                                            <path
                                              fill="none"
                                              stroke="#000"
                                              stroke-width="1.5"
                                              d="M5 6l5 5 5-5"
                                            />
                                          </svg>
                                        ) : (
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                          >
                                            <path
                                              fill="none"
                                              stroke="#000"
                                              stroke-width="1.5"
                                              d="M5 14l5-5 5 5"
                                            />
                                          </svg>
                                        )}
                                      </div>
                                    )}
                                    {showsliders[index] === 1 && (
                                      <Carslider
                                        images={message.img.map(
                                          (image) => image.href
                                        )}
                                        vins={message.img.map(
                                          (image) => image.vin
                                        )}
                                        forBot={true}
                                      />
                                    )}
                                  </div>
                                )}
                                {videos.length > 0 && (
                                  <>
                                    {videos.map((video) => (
                                      <div className="mb-1">
                                        <iframe
                                          className="rounded-2xl w-full"
                                          src={convertToEmbedURL(video)}
                                          title="YouTube video player"
                                          frameBorder="0"
                                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                          allowFullScreen
                                        ></iframe>
                                      </div>
                                    ))}
                                  </>
                                )}
                                {stripeFlag === "paying" &&
                                  index === messages.length - 1 && (
                                    <Elements
                                      stripe={loadStripe(
                                        `${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`
                                      )}
                                      options={options}
                                    >
                                      <CheckoutForm messages={messages} />
                                    </Elements>
                                  )}
                                <div className="text-gray-800">
                                  {message.play ? (
                                    <TypingEffect
                                      text={message.text}
                                      scrollRef={scrollRef}
                                    />
                                  ) : (
                                    <ReactMarkdown components={components}>
                                      {message.text}
                                    </ReactMarkdown>
                                  )}
                                </div>
                              </div>
                              {(index === messages.length - 1 ||
                                !messages[index + 1].isBot) && (
                                <div className="text-gray-700 mt-1 ">
                                  {calcTimeDiff(message.time)}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={index}
                          className="mt-1 flex flex-row justify-end"
                        >
                          <div className="w-4/5">
                            <div className="w-full flex-col">
                              <div className="rounded-t-xl rounded-bl-xl px-3 py-2 bg-[#0449c8] text-white whitespace-pre-wrap break-words selectionText">
                                {message.text}
                              </div>
                              {(index === messages.length - 1 ||
                                messages[index + 1].isBot) && (
                                <div className="mt-1 text-right text-gray-500">
                                  {calcTimeDiff(message.time)}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
                  {thinking && (
                    <div className="mt-4 relative self-start w-full">
                      <div className="flex flex-row justify-between">
                        <div className="w-8 h-8 rounded-full flex justify-center items-center border-2 border-white bg-gradient-to-r from-red-600 to-blue-900">
                          <img
                            id="bot-logo"
                            itemProp="bot logo"
                            alt="Bot Logo"
                            src={assistant}
                            className="max-w-[32px] rounded-full"
                          />
                        </div>
                        <div className="flex flex-col w-[85%]">
                          <div className="rounded-b-xl rounded-tr-xl border-2 text-gray-800 py-3 px-3">
                            <div className="flex space-x-2 justify-center items-center">
                              <div
                                className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                                style={{ animationDelay: "0.0s" }}
                              ></div>
                              <div
                                className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                              ></div>
                              <div
                                className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                                style={{ animationDelay: "0.4s" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-between text-sm ">
              <div className="border-2 w-4/5 bg-[#f6f6f6] rounded-[25px] flex justify-between items-end ml-2">
                {/* <div
                    className="p-1 m-1 rounded-full border-2 border-gray-800 cursor-pointer hover:bg-gray-400"
                    onClick={() => {
                      fileInputRef.current.click();
                    }}
                  >
                    PX
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    multiple={false}
                  /> */}
                <textarea
                  rows={rows}
                  onChange={(e) => {
                    //update text state
                    setText(e.target.value);

                    //update rows of textarea smoothly
                    const textareaLineHeight = 24;

                    e.target.rows = minRows;
                    e.target.style.overflow = "hidden";
                    console.log(e.target.scrollHeight);

                    const currentRows = ~~(
                      e.target.scrollHeight / textareaLineHeight
                    );

                    if (currentRows > maxRows) {
                      e.target.rows = maxRows;
                      e.target.scrollTop = e.target.scrollHeight;
                      e.target.style.overflow = "auto";
                    } else {
                      e.target.rows = currentRows;
                    }

                    setRows(currentRows < maxRows ? currentRows : maxRows);
                  }}
                  onKeyDown={(e) => {
                    if ((e.ctrlKey || e.shiftKey) && e.key === "Enter") {
                      e.preventDefault(); // Prevent the default behavior (new line)

                      //insert \n at postion where ctrl+enter event occured
                      const textarea = e.target;
                      const value = textarea.value;
                      const selectionStart = textarea.selectionStart;
                      const selectionEnd = textarea.selectionEnd;

                      const newValue =
                        value.substring(0, selectionStart) +
                        "\n" +
                        value.substring(selectionEnd);
                      textarea.value = newValue; //insert

                      const newPosition = selectionStart + 1;
                      textarea.setSelectionRange(newPosition, newPosition);

                      setText(newValue); //update state

                      //update rows
                      const textareaLineHeight = 24;

                      e.target.rows = minRows;
                      e.target.style.overflow = "hidden";
                      console.log(e.target.scrollHeight);

                      const currentRows = ~~(
                        e.target.scrollHeight / textareaLineHeight
                      );

                      if (currentRows > maxRows) {
                        e.target.rows = maxRows;
                        e.target.scrollTop = e.target.scrollHeight;
                        e.target.style.overflow = "auto";
                      } else {
                        e.target.rows = currentRows;
                      }

                      setRows(currentRows < maxRows ? currentRows : maxRows);
                    } else if (e.key === "Enter" && !thinking) {
                      e.preventDefault();
                      if (text.length > 0) {
                        addHMessage(text);
                        setText("");
                        setRows(1);
                      }
                    }
                  }}
                  value={text}
                  placeholder="Type a message..."
                  className="selectionText ml-3 my-2 w-full transition-all duration-200 resize-none test border-2 bg-[#f9f9f9] border-none outline-none whitespace-pre-wrap break-words selection:border-blue-800 text-base target:border-none active:border-none border-blue-800 focus:border-blue-900 focus-within:border-blue-900 focus-visible:border-none"
                ></textarea>
                <div className="p-1 m-1 rounded-full border-2 border-gray-800 cursor-pointer hover:bg-gray-400">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.0001 14.3996C11.5347 14.3996 14.4001 11.5342 14.4001 7.99961C14.4001 4.46499 11.5347 1.59961 8.0001 1.59961C4.46548 1.59961 1.6001 4.46499 1.6001 7.99961C1.6001 11.5342 4.46548 14.3996 8.0001 14.3996ZM5.6001 7.19961C6.04192 7.19961 6.4001 6.84144 6.4001 6.39961C6.4001 5.95778 6.04192 5.59961 5.6001 5.59961C5.15827 5.59961 4.8001 5.95778 4.8001 6.39961C4.8001 6.84144 5.15827 7.19961 5.6001 7.19961ZM11.2001 6.39961C11.2001 6.84144 10.8419 7.19961 10.4001 7.19961C9.95827 7.19961 9.6001 6.84144 9.6001 6.39961C9.6001 5.95778 9.95827 5.59961 10.4001 5.59961C10.8419 5.59961 11.2001 5.95778 11.2001 6.39961ZM10.8285 10.828C11.1409 10.5155 11.1409 10.009 10.8285 9.69659C10.5161 9.38417 10.0096 9.38417 9.69715 9.69659C8.75989 10.6338 7.2403 10.6338 6.30304 9.69659C5.99062 9.38417 5.48409 9.38417 5.17167 9.69659C4.85925 10.009 4.85925 10.5155 5.17167 10.828C6.73377 12.3901 9.26643 12.3901 10.8285 10.828Z"
                      fill="#3F3F3F"
                    />
                  </svg>
                </div>
              </div>
              <button
                onClick={(e) => {
                  if (text.length > 0 && !thinking) {
                    addHMessage(text);
                    setText("");
                    setRows(1);
                  }
                }}
                className="border-black border-2 w-12 h-12 mr-2 flex justify-center items-center rounded-full hover:bg-gray-400"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.0732 3.06373C12.87 2.65719 12.4544 2.40039 11.9999 2.40039C11.5454 2.40039 11.1299 2.65719 10.9266 3.06373L2.5266 19.8637C2.31378 20.2894 2.37259 20.8006 2.6765 21.1668C2.98042 21.5329 3.47201 21.685 3.92958 21.5542L9.92957 19.8399C10.4447 19.6927 10.7999 19.2219 10.7999 18.6861V13.2004C10.7999 12.5376 11.3372 12.0004 11.9999 12.0004C12.6626 12.0004 13.1999 12.5376 13.1999 13.2004V18.6861C13.1999 19.2219 13.5551 19.6927 14.0702 19.8399L20.0703 21.5542C20.5278 21.685 21.0194 21.5329 21.3233 21.1668C21.6272 20.8006 21.686 20.2894 21.4732 19.8637L13.0732 3.06373Z"
                    fill="#272727"
                  />
                </svg>
              </button>
            </div>
            <div className="text-xs px-2 text-justify text-gray-700">
              TMC may record a transcript of this chat. For more information,
              please see{" "}
              <Link
                to={"/privacy-policy"}
                style={{ textDecoration: "underline" }}
              >
                TMC Privacy Policy
              </Link>
              .&nbsp;&nbsp;Powered by <a href="https://motortech.ai" target="_blank" style={{ textDecoration: "underline"}}>MotorTech.ai</a>
            </div>
          </div>
        </div>
      </div>
      <svg className="hidden">
        <symbol
          id="arrow-down"
          style={{
            enableBackground: "new 0 0 100 100",
          }}
          viewBox="0 0 100 100"
        >
          <path d="M50 70L10 30h80L50 70z"></path>
        </symbol>
      </svg>
      <svg className="hidden">
        <symbol
          id="arrow-up"
          style={{
            enableBackground: "new 0 0 100 100",
          }}
          viewBox="0 0 100 100"
        >
          <path d="M50 30L10 70h80L50 30z"></path>
        </symbol>
      </svg>
    </div>
  );
};

const CheckoutForm = ({ messages }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      // Show error to your customer
      setErrorMessage(submitError.message);
      return;
    }

    try {
      const state = parseLocalStorageValue("state") || {
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

      localStorage.setItem("fname", state.user_contact_info.name);

      const response = await axios.post(
        `https://${process.env.REACT_APP_API}/api/stripe/create-intent`,
        {
          //reserve amount
          amount: 14900,
          currency: "gbp",

          //vehicle info & checkout type
          type:
            state.finance_info.active === "true"
              ? "finance"
              : state.full_pay_info.active === "true"
              ? "full"
              : "reserve",
          term:
            state.finance_info.active === "true" ? state.finance_info.term : "",
          deposit:
            state.finance_info.active === "true"
              ? state.finance_info.deposit
              : "",
          vin:
            state.finance_info.active === "true"
              ? state.finance_info.vin
              : state.full_pay_info.active === "true"
              ? state.full_pay_info.vin
              : "",

          //customer detail
          fname: state.user_contact_info.name,
          sname: "",
          email: state.user_contact_info["e-mail"],
          phoneNumber: state.user_contact_info.number,
          postcode: state.user_location_info.postcode,
          // address1: localStorage.getItem("address1"),
          // address2: localStorage.getItem("address2"),
          town: state.user_location_info.town,
          county: state.user_location_info.county,

          //collection & delivery
          isDelivery: "",
          date: "",
          bestTime: "",
          note: "This enquiry came up in a chat with Aime.",
          phone: state.user_contact_info.number ? true : false,
          mail: state.user_contact_info["e-mail"] ? true : false,
          sms: false,
          letter: false,
          messages: messages.map((message) => {
            return {
              isBot: message.isBot,
              text: message.text,
            };
          }),
          px:
            state.user_vehicle_info.active === "true"
              ? {
                  vrn: state.user_vehicle_info.vrn,
                  mileage: state.user_vehicle_info.mileage,
                  cost: state.user_vehicle_info.cost,
                }
              : null,
        }
      );

      // Handle the response
      if (response.status === 200) {
        const data = response.data;
        const { client_secret: clientSecret } = data;

        localStorage.setItem("clientSecret", clientSecret);
        console.log(clientSecret);

        const { error } = await stripe.confirmPayment({
          //`Elements` instance that was used to create the Payment Element
          elements,
          clientSecret,
          confirmParams: {
            return_url: `https://${process.env.REACT_APP_API}/api/stripe/confirm-intent?bot=${clientSecret}`,
          },
        });

        if (error) {
          // This point will only be reached if there is an immediate error when
          // confirming the payment. Show error to your customer (for example, payment
          // details incomplete)
          setErrorMessage(error.message);
        } else {
          // Your customer will be redirected to your `return_url`. For some payment
          // methods like iDEAL, your customer will be redirected to an intermediate
          // site first to authorize the payment, then redirected to the `return_url`.
        }
      } else {
        console.log("Request failed with status:", response.status);
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.log("Error:", error);
      if (error.response) setErrorMessage(error.response.data.message);
      else setErrorMessage(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {errorMessage && <div>{errorMessage}</div>}
      <button
        type="submit"
        disabled={!stripe || !elements}
        className="my-6 text-zinc-950 text-sm font-semibold text-white w-full px-4 py-2 bg-[#131313] cursor-pointer hover:bg-[#272727] hover:cursor-pointer flex justify-center border border-black items-center self-center rounded-full"
      >
        Reserve now for £149
      </button>
    </form>
  );
};

export default BotChatDialog;