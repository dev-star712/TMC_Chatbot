import { Carousel } from "react-responsive-carousel";
import Modal from "react-modal";
import { IconButton } from "@material-tailwind/react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { focusVehicle } from "../redux/slices/chatbotSlice";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "100%",
    maxWidth: "1024px",
    transform: "translate(-50%, -50%)",
    padding: "0px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: 1000,
  },
};

export default function Carslider(data) {
  const dispatch = useDispatch();

  const setFocusVehicle = (value) => {
    dispatch(focusVehicle(value));
  };

  const focusedVehicle = useSelector((state) => state.chatbot.focusedVehicle);

  const [cur, setCur] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log(cur);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cur]);
  return (
    <div className="w-full relative">
      <Modal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        style={customStyles}
        contentLabel="all reviews"
      >
        <img
          src={data.images[cur].replace("w600h450", "w1024h768")}
          alt={`Thumbnail ${cur}`}
        />
      </Modal>
      <IconButton
        variant="text"
        key="left"
        size="sm"
        onClick={() => {
          if (cur === 0) {
            if (data.forBot && data.vins && data.vins.length > 0) {
              setFocusVehicle(data.vins[data.images.length - 1]);
            }
            setCur(data.images.length - 1);
          } else {
            if (data.forBot && data.vins && data.vins.length > 0) {
              setFocusVehicle(data.vins[cur - 1]);
            }
            setCur(cur - 1);
          }
        }}
        className="!absolute bottom-[7px] z-50 left-0  border border-gray-800 -translate-y-2/4 bg-white hover:bg-gray-300 rounded-full bg-opacity-70 active:bg-gray-900 "
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5 15.8332L6.66667 9.99984L12.5 4.1665"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </IconButton>
      <IconButton
        variant="text"
        key="right"
        size="sm"
        onClick={() => {
          if (cur === data.images.length - 1) {
            if (data.forBot && data.vins && data.vins.length > 0) {
              setFocusVehicle(data.vins[0]);
            }
            setCur(0);
          } else {
            if (data.forBot && data.vins && data.vins.length > 0) {
              setFocusVehicle(data.vins[cur + 1]);
            }
            setCur(cur + 1);
          }
        }}
        className="!absolute rotate-180 bottom-[7px] z-50 right-0  border border-gray-800 -translate-y-2/4 bg-white hover:bg-gray-300 rounded-full bg-opacity-70 active:bg-gray-900 "
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5 15.8332L6.66667 9.99984L12.5 4.1665"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </IconButton>

      <Carousel
        // autoPlay
        showThumbs={true}
        dynamicHeight={false}
        selectedItem={cur}
        showIndicators={false}
        emulateTouch={true}
        showStatus={true}
        showArrows={false}
        preventMovementUntilSwipeScrollTolerance={true}
        swipeScrollTolerance={15}
        onClickThumb={(i) => {
          if (data.forBot && data.vins && data.vins.length > 0) {
            setFocusVehicle(data.vins[i]);
          }
          setCur(i);
        }}
        renderThumbs={(items) => {
          return data.images.map((image, index) => (
            <div key={index} className="thumbnail-item border-none">
              <img
                src={image}
                alt={`${data.title || "photo"} at ${index}th`}
                className={`${cur === index ? "opacity-50" : ""}`}
                loading={data.forBot ? `lazy` : ""}
              />
            </div>
          ));
        }}
        onChange={(i) => {
          if (data.forBot && data.vins && data.vins.length > 0) {
            setFocusVehicle(data.vins[i]);
          }
          setCur(i);
        }}
        renderItem={(Item) => {
          return (
            <div
              className="cursor-pointer"
              onClick={(e) => {
                if (!data.forBot) setOpen(true);
              }}
            >
              {Item}
            </div>
          );
        }}
      >
        {/* {data.images.map((a, i) => (
          <div key={i}>
            <img src={a} alt="" className="rounded-lg" />
          </div>
        ))} */}
        {data.images.map((image, i) => (
          <div className="relative overflow-hidden object-cover opacity-1/2">
            {/* {Item} */}
            <img
              src={image}
              alt={`${data.title || i}`}
              className="object-fill w-full"
            />
            {data.forBot && data.vins && data.vins.length > 0 && (
              <Link
                to={`/vehicles-for-sale/viewdetail/${data.vins[i]}`}
                className="absolute top-1 left-1 m-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                >
                  <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
                </svg>
              </Link>
            )}
          </div>
        ))}
      </Carousel>
    </div>
  );
}
