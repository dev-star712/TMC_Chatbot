import Modal from "react-modal";
import { useState } from "react";
import { ReactComponent as FacebookSVG } from "./svg/facebook.svg";
import { ReactComponent as WhatsAppSVG } from "./svg/whatsapp.svg";
import { ReactComponent as EmailSVG } from "./svg/email.svg";
import { ReactComponent as CloseSVG } from "./svg/close.svg";
import { ReactComponent as CopySVG } from "./svg/copy.svg";
import { ReactComponent as CheckSVG } from "./svg/check3.svg";
import { Typography } from "@material-tailwind/react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "100%",
    maxWidth: "400px",
    borderRadius: "20px",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: 1000,
  },
};

export const ShareModal = ({ open, setOpen, item }) => {
  const [copied, setCopied] = useState(false);
  return (
    <Modal
      isOpen={open}
      onRequestClose={() => setOpen(false)}
      style={customStyles}
      contentLabel="all reviews"
    >
      <div className="w-full p-5">
        <div className="flex justify-between w-full">
          <div
            className=" "
            itemScope=""
            itemType="https://schema.org/AutomotiveBusiness"
            bis_skin_checked="1"
          >
            <Typography variant="h4" color="blue-gray" className="">
              Share To
            </Typography>
          </div>
          <div className="relative">
            <div
              onClick={() => setOpen(false)}
              className="w-8 h-8 p-2 rounded-full border border-black justify-center items-center gap-2 inline-flex  absolute top-0 right-0"
            >
              <div className="w-4 h-4">
                <CloseSVG />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row w-full gap-2 pt-5">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=https://${
              process.env.REACT_APP_APP
            }/vehicles-for-sale/viewdetail/${`used ${item.vehicle.make} ${item.vehicle.model} ${item.vehicle.derivative}   ${item.vehicle.transmissionType} ${item.vehicle.fuelType}`
              .toLowerCase()
              .replace(/[^0-9a-zA-Z \-]/g, "")
              .replace(/\s/g, "-")}/${
              item.vehicle.vin
            }&title=${encodeURIComponent(
              `${item.vehicle.make} ${item.vehicle.model} ${item.vehicle.derivative}`
            )}`}
            target="_blank"
            className="w-full sm:w-1/3 p-2 cursor-pointer gap-1 bg-gray-100 rounded-xl flex flex-col justify-center items-center"
            rel="noreferrer"
          >
            <FacebookSVG />
            <Typography variant="lead">Facebook</Typography>
          </a>
          <a
            href={`https://wa.me/?text=https://${
              process.env.REACT_APP_APP
            }/vehicles-for-sale/viewdetail/${`used ${item.vehicle.make} ${item.vehicle.model} ${item.vehicle.derivative}   ${item.vehicle.transmissionType} ${item.vehicle.fuelType}`
              .toLowerCase()
              .replace(/[^0-9a-zA-Z \-]/g, "")
              .replace(/\s/g, "-")}/${item.vehicle.vin}`}
            target="_blank"
            className="w-full sm:w-1/3 p-2 cursor-pointer gap-1 bg-gray-100 rounded-xl flex flex-col justify-center items-center"
            rel="noreferrer"
          >
            <WhatsAppSVG />
            <Typography variant="lead">WhatsApp</Typography>
          </a>
          <a
            href={`mailto:?subject=${item.vehicle.make} ${item.vehicle.model} ${
              item.vehicle.derivative
            }&body=Check out this ${item.vehicle.make} ${
              item.vehicle.model
            } at TMC Motors https://${
              process.env.REACT_APP_APP
            }/vehicles-for-sale/viewdetail/${`used ${item.vehicle.make} ${item.vehicle.model} ${item.vehicle.derivative}   ${item.vehicle.transmissionType} ${item.vehicle.fuelType}`
              .toLowerCase()
              .replace(/[^0-9a-zA-Z \-]/g, "")
              .replace(/\s/g, "-")}/${item.vehicle.vin}`}
            target="_blank"
            className="w-full sm:w-1/3 p-2 cursor-pointer gap-1 bg-gray-100 rounded-xl flex flex-col justify-center items-center"
            rel="noreferrer"
          >
            <EmailSVG />
            <Typography variant="lead">Email</Typography>
          </a>
        </div>

        <div className="bg-gray-100 p-3 rounded-full relative mt-2">
          <div className=" w-11/12 text-gray-700 font-normal mx-2 lowercase  rounded-full bg-gray-100 truncate pr-2">
            {`https://${
              process.env.REACT_APP_APP
            }/vehicles-for-sale/viewdetail/${`used ${item.vehicle.make} ${item.vehicle.model} ${item.vehicle.derivative}   ${item.vehicle.transmissionType} ${item.vehicle.fuelType}`
              .toLowerCase()
              .replace(/[^0-9a-zA-Z \-]/g, "")
              .replace(/\s/g, "-")}/${item.vehicle.vin}`}
          </div>
          <div
            className="  absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
            onMouseLeave={() => {
              setCopied(false);
            }}
            onClick={() => {
              navigator.clipboard
                .writeText(
                  `https://${
                    process.env.REACT_APP_APP
                  }/vehicles-for-sale/viewdetail/${`used ${item.vehicle.make} ${item.vehicle.model} ${item.vehicle.derivative}   ${item.vehicle.transmissionType} ${item.vehicle.fuelType}`
                    .toLowerCase()
                    .replace(/[^0-9a-zA-Z \-]/g, "")
                    .replace(/\s/g, "-")}/${item.vehicle.vin}`
                )
                .then(() => {
                  setCopied(true);
                  console.log("Text copied to clipboard");
                })
                .catch((err) => {
                  console.error("Could not copy text: ", err);
                });
            }}
          >
            {copied ? <CheckSVG /> : <CopySVG />}
          </div>
        </div>
      </div>
    </Modal>
  );
};
