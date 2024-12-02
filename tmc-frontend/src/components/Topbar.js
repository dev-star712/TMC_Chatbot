import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openChatbot } from "../redux/slices/chatbotSlice";

export default function Topbar() {
  const dispatch = useDispatch();

  const setIsBotChatOpen = (value) => {
    dispatch(openChatbot(value));
  };

  return (
    <div className="hidden md:flex justify-between sm:justify-center items-center h-[82px] md:h-[53px] py-2 px-3 flex-row bg-gray-900 text-white">
      <ul className="flex me-3 xl:me-20 w-fit">
        <li>
          <Link to="/shortlist" className="flex items-center mx-2">
            <div className="flex items-center cursor-pointer mr-1">
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
                  d="M2.53736 4.13721C3.78703 2.88753 5.81316 2.88753 7.06284 4.13721L8.0001 5.07447L8.93736 4.13721C10.187 2.88753 12.2132 2.88753 13.4628 4.13721C14.7125 5.38689 14.7125 7.41302 13.4628 8.66269L8.0001 14.1254L2.53736 8.66269C1.28768 7.41302 1.28768 5.38689 2.53736 4.13721Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="hidden sm:block text-white font-open-sans-condensed text-[14px] font-medium leading-6 tracking-tighter uppercase">
              SHORTLIST
            </div>
          </Link>
        </li>
        <li>
          <Link to="/buy-online" className="flex items-center mx-2">
            <div className="flex items-center cursor-pointer  mr-1">
              <svg
                width="24"
                height="24"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="8"
                  cy="8"
                  r="7"
                  fill="white"
                  stroke="white"
                  stroke-width="1"
                />
                <text
                  x="8"
                  y="12"
                  text-anchor="middle"
                  fill="black"
                  font-size="12px"
                  font-weight="bold"
                  font-family="Arial"
                >
                  £
                </text>
              </svg>
            </div>
            <div className="hidden sm:block text-white font-open-sans-condensed text-[14px]  font-medium leading-6 tracking-tighter uppercase">
              BUY ONLINE
            </div>
          </Link>
        </li>
        <li
          className="flex items-center mx-2 cursor-pointer"
          onClick={() => setIsBotChatOpen(true)}
        >
          <div className="flex items-center mr-1">
            <svg
              width="24"
              height="24"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.6001 3.9999C1.6001 3.11625 2.31644 2.3999 3.2001 2.3999H8.8001C9.68375 2.3999 10.4001 3.11625 10.4001 3.9999V7.1999C10.4001 8.08356 9.68375 8.7999 8.8001 8.7999H7.2001L4.8001 11.1999V8.7999H3.2001C2.31644 8.7999 1.6001 8.08356 1.6001 7.1999V3.9999Z"
                fill="white"
              />
              <path
                d="M12.0001 5.5999V6.3999C12.0001 8.60904 10.2092 10.3999 8.0001 10.3999H7.86284L6.44948 11.8133C6.67333 11.9324 6.92883 11.9999 7.2001 11.9999H8.8001L11.2001 14.3999V11.9999H12.8001C13.6838 11.9999 14.4001 11.2836 14.4001 10.3999V7.1999C14.4001 6.31625 13.6838 5.5999 12.8001 5.5999H12.0001Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="hidden sm:block text-white font-open-sans-condensed text-[14px]  font-medium leading-6 tracking-tighter uppercase">
            TALK ON LIVECHAT
          </div>
        </li>
      </ul>
      <ul className="flex nav--social w-fit">
        <li className="flex items-center mr-4">
          <a href="https://www.facebook.com/tmcmotorsales">
            <svg
              width="25"
              height="24"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.2005 13.2466V17.0834H15.5926C17.1667 17.0834 17.1667 15.5093 17.1667 15.5093V4.88434C17.1667 2.91675 15.5926 2.91675 15.5926 2.91675H4.57407C4.57407 2.91675 3 2.91675 3 4.88434V15.5093C3 17.0834 4.57407 17.0834 4.57407 17.0834H9.84162V13.2466H8.0069V11.1151H9.84162V8.32763C9.84162 8.32763 9.84162 6.85193 11.4142 6.85194L14.0353 6.85193V9.06547H12.2005V11.1151H14.0353V13.2466H12.2005Z"
                fill="white"
              />
            </svg>
          </a>
        </li>
        <li className="flex items-center mr-4">
          <a href="https://www.instagram.com/tmcmotorsales/">
            <svg
              width="25"
              height="24"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.2678 8.23223C13.2441 9.20854 13.2441 10.7915 12.2678 11.7678C11.2915 12.7441 9.70854 12.7441 8.73223 11.7678C7.75592 10.7915 7.75592 9.20854 8.73223 8.23223C9.70854 7.25592 11.2915 7.25592 12.2678 8.23223Z"
                fill="#676A71"
              />
              <path
                d="M13.7812 2.5H7.21875C4.89239 2.5 3 4.39239 3 6.71875V13.2812C3 15.6076 4.89239 17.5 7.21875 17.5H13.7812C16.1076 17.5 18 15.6076 18 13.2812V6.71875C18 4.39239 16.1076 2.5 13.7812 2.5ZM10.5 13.75C8.43228 13.75 6.75 12.0682 6.75 10C6.75 7.93183 8.43228 6.25 10.5 6.25C12.5677 6.25 14.25 7.93183 14.25 10C14.25 12.0682 12.5677 13.75 10.5 13.75ZM14.7188 6.25C14.4599 6.25 14.25 6.04012 14.25 5.78125C14.25 5.52233 14.4599 5.3125 14.7188 5.3125C14.9776 5.3125 15.1875 5.52233 15.1875 5.78125C15.1875 6.04012 14.9776 6.25 14.7188 6.25Z"
                fill="white"
              />
            </svg>
          </a>
        </li>
        <li className="flex items-center mr-4">
          <a href="https://www.youtube.com/channel/UCRKpJyWUA02C2ChaJ7FTg1g">
            <svg
              width="25"
              height="24"
              viewBox="0 0 17 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.166504 4.75C0.166504 2.54086 1.95737 0.75 4.1665 0.75H12.8332C15.0423 0.75 16.8332 2.54086 16.8332 4.75V9.25C16.8332 11.4591 15.0423 13.25 12.8332 13.25H4.1665C1.95737 13.25 0.166504 11.4591 0.166504 9.25V4.75Z"
                fill="white"
              />
              <path
                d="M7.0293 7.47926V6.64096C7.0293 5.8729 7.85923 5.39156 8.52589 5.77297L9.31488 6.22437C10.011 6.62261 9.97863 7.63711 9.25859 7.99021L8.46959 8.37712C7.80517 8.70294 7.0293 8.21927 7.0293 7.47926Z"
                fill="black"
                stroke="black"
                strokeWidth="1.5"
              />
            </svg>
          </a>
        </li>

        <li className="flex items-center">
          <a href="https://wa.me/+447985432019">
            <svg
              width="25"
              height="24"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.9168 16.6667C14.8288 16.6667 18.0002 13.4953 18.0002 9.58333C18.0002 5.67132 14.8288 2.5 10.9168 2.5C7.00481 2.5 3.8335 5.67132 3.8335 9.58333C3.8335 11.0759 4.29516 12.4607 5.0835 13.6027L4.44726 15.5864C4.19505 16.3727 4.95076 17.1086 5.73013 16.8355L8.00016 16.0402C8.88964 16.4426 9.87707 16.6667 10.9168 16.6667Z"
                fill="white"
              />
              <path
                d="M7.1665 6.302C7.1665 6.04312 7.37637 5.83325 7.63525 5.83325H8.64441C8.87356 5.83325 9.06911 5.99891 9.10679 6.22494L9.45334 8.30426C9.48717 8.50724 9.38466 8.70855 9.2006 8.80058L8.47491 9.16343C8.99817 10.4637 10.036 11.5016 11.3363 12.0248L11.6992 11.2992C11.7912 11.1151 11.9925 11.0126 12.1955 11.0464L14.2748 11.393C14.5008 11.4306 14.6665 11.6262 14.6665 11.8553V12.8645C14.6665 13.1234 14.4566 13.3333 14.1978 13.3333H13.2603C9.89477 13.3333 7.1665 10.605 7.1665 7.2395V6.302Z"
                fill="black"
              />
            </svg>
          </a>
        </li>
      </ul>
    </div>
  );
}
