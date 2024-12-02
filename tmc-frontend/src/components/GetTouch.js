import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function GetTouch() {
  const location = useLocation();
  const navigate = useNavigate();

  const myRef = useRef(null);

  useEffect(() => {
    console.log(location.hash);
    if (
      location.hash &&
      (location.hash === "#thankyou" || location.hash === "#contact")
    ) {
      myRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.hash]);

  const queryParams = new URLSearchParams(location.search);

  const [letterChecked, setLetterChecked] = useState(false);
  const [smsChecked, setSmsChecked] = useState(false);
  const [phoneChecked, setPhoneChecked] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);

  const [isDelivery, setIsDelivery] = useState(
    queryParams.get("location") &&
      ["TMC Oakhanger (Head Office)"].includes(queryParams.get("location"))
      ? queryParams.get("location")
      : "TMC Oakhanger (Head Office)"
  );
  const [title, setTitle] = useState("Mr");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [type, setType] = useState(
    queryParams.get("type") &&
      [
        "Aftersales Enquiry",
        "Business User Enquiry",
        "Call Back Request",
        "Finance Enquiry",
        "General Enquiry",
        "Test Drive Request",
        "Used Car Enquiry",
        "Used Truck Enquiry",
        "Used Van Enquiry",
        "Valuation Request",
        "Video Enquiry",
        "Warranty Enquiry",
      ].includes(queryParams.get("type"))
      ? queryParams.get("type")
      : "undefined"
  );
  const [note, setNote] = useState("");

  const [submit, setSubmit] = useState(false);

  const make = queryParams.get("make");
  const model = queryParams.get("model");
  const reg = queryParams.get("reg");

  const isValidEmail = (email) => {
    // Define a regular expression pattern for email validation.
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const sendEnquiry = async () => {
    const data = {
      isDelivery,
      title,
      name,
      email,
      phoneNumber,
      type,
      note,
      make,
      model,
      reg,
      phoneChecked,
      emailChecked,
      smsChecked,
      letterChecked,
    };

    try {
      axios
        .post(`https://${process.env.REACT_APP_API}/api/main/enquiry`, data)
        .then((response) => {
          if (response.status === 200) {
            navigate("/contact-us#thankyou");
          } else {
            console.log("failed");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full py-8 px-5 md:px-10" ref={myRef}>
      <div className="flex flex-col items-left ">
        <h3 className="text-4xl font-bold  ">
          {location.hash && location.hash === "#thankyou"
            ? "Thank You For Your Enquiry 😃"
            : "Get in touch with us"}
        </h3>
        {!(location.hash && location.hash === "#thankyou") && (
          <div className="flex flex-col mt-6">
            <div className="mt-4">
              <div className="mb-2 w-full float-right border-0">
                <select
                  className="mt-2 w-full bg-[#f6f6f6] border-2 border-gray-200 rounded-full py-3 px-6"
                  value={isDelivery}
                  onChange={(e) => setIsDelivery(e.target.value)}
                >
                  <option value="TMC Oakhanger (Head Office)">
                    TMC Oakhanger (Head Office)
                  </option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap flex-row justify-between">
              <div className="w-full lg:w-[46%] flex flex-col">
                <select
                  className="mt-2 w-full bg-[#f6f6f6] border-2 border-gray-200 rounded-full py-3 px-6"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                >
                  <option value="Mr">Mr</option>
                  <option value="Miss">Miss</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Ms">Ms</option>
                  <option value="Dr">Dr</option>
                </select>
              </div>
              <div className="w-full lg:w-[46%] flex flex-col">
                <input
                  type="text"
                  placeholder="Name*"
                  className="mt-2 w-full bg-[#f6f6f6] border-2 border-gray-200 rounded-full py-3 px-6"
                  value={name}
                  onChange={(e) => setName(e.target.value.trim())}
                ></input>
                {!name && submit && (
                  <div className="mt-2 ml-3 text-sm text-red-500">
                    Please enter your name
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4 flex flex-wrap flex-row justify-between">
              <div className="w-full lg:w-[46%] flex flex-col">
                <input
                  type="text"
                  placeholder="Email*"
                  className="mt-2 w-full bg-[#f6f6f6] border-2 border-gray-200 rounded-full py-3 px-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.trim())}
                ></input>
                {((!isValidEmail(email) && email) || (submit && !email)) && (
                  <div className="mt-2 ml-3 text-sm text-red-500">
                    Please enter a valid email address (e.g. test@test.com)
                  </div>
                )}
              </div>
              <div className="w-full lg:w-[46%] flex flex-col">
                <input
                  type="text"
                  placeholder="+44 0000 00 0 000*"
                  className="mt-2 w-full bg-[#f6f6f6] border-2 border-gray-200 rounded-full py-3 px-6"
                  value={
                    phoneNumber.replace(/\D/g, "").length > 0 ? phoneNumber : ""
                  }
                  onChange={(e) => {
                    setPhoneNumber(`+${e.target.value.replace(/\D/g, "")}`);
                  }}
                ></input>
                {phoneNumber.length <= 1 && submit && (
                  <div className="mt-2 ml-3 text-sm text-red-500">
                    Please enter your phone number
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4">
              <div className="mb-2 w-full float-right border-0">
                <select
                  className="mt-2 w-full bg-[#f6f6f6] border-2 border-gray-200 rounded-full py-3 px-6"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="undefined">Please Select...</option>
                  <option value="Aftersales Enquiry">Aftersales Enquiry</option>
                  <option value="Business User Enquiry">
                    Business User Enquiry
                  </option>
                  <option value="Call Back Request">Call Back Request</option>
                  <option value="Finance Enquiry">Finance Enquiry</option>
                  <option value="General Enquiry">General Enquiry</option>
                  <option value="Test Drive Request">Test Drive Request</option>
                  <option value="Used Car Enquiry">Used Car Enquiry</option>
                  <option value="Used Truck Enquiry">Used Truck Enquiry</option>
                  <option value="Used Van Enquiry">Used Van Enquiry</option>
                  <option value="Valuation Request">Valuation Request</option>
                  <option value="Video Enquiry">Video Enquiry</option>
                  <option value="Warranty Enquiry">Warranty Enquiry</option>
                </select>
              </div>
            </div>
            {make && (
              <div className="mt-4">
                <div className="mb-2 w-full float-right border-0">
                  <div className="mt-2 ml-3 text-sm">Make:</div>
                  <div className="mt-2 w-full bg-[#f6f6f6] border-2 border-gray-200 rounded-full py-3 px-6">
                    {make}
                  </div>
                </div>
              </div>
            )}
            {model && (
              <div>
                <div className="mb-2 w-full float-right border-0">
                  <div className="mt-2 ml-3 text-sm">Model:</div>
                  <div className="mt-2 w-full bg-[#f6f6f6] border-2 border-gray-200 rounded-full py-3 px-6">
                    {model}
                  </div>
                </div>
              </div>
            )}
            {reg && (
              <div>
                <div className="mb-2 w-full float-right border-0">
                  <div className="mt-2 ml-3 text-sm">Registration Number:</div>
                  <div className="mt-2 w-full bg-[#f6f6f6] border-2 border-gray-200 rounded-full py-3 px-6">
                    {reg}
                  </div>
                </div>
              </div>
            )}
            <textarea
              className="mt-6 w-full pl-2 pt-4 border-2 border-gray-300 h-20 rounded-2xl"
              placeholder="Your Enquiry"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
          </div>
        )}
      </div>
      {!(location.hash && location.hash === "#thankyou") ? (
        <>
          <div className="mt-20">
            <div className="flex flex-col items-left ">
              <h5 className="text-2xl font-bold  ">Consumer Information</h5>
              <p className="mt-8">
                We would like to stay in touch with you to keep up to date with
                our latest product news, marketing services and offers. If you
                would like to receive future information by either of the
                methods below, please indicate by selecting the option. All
                information provided will be used and processed in accordance
                with our Privacy Policy. For more information please see our{" "}
                <Link to="/privacy-policy" className="text-blue-500 underline">
                  <span className="underline hover:text-blue-500">
                    Privacy Policy
                  </span>
                </Link>
                .
              </p>
              <div className="flex flex-wrap flex-row mt-8">
                <label
                  className="flex flex-row items-center py-2 pl-2 pr-4 hover:cursor-pointer mr-4 mt-1 md:mt-1 rounded-lg bg-[#f6f6f6]"
                  htmlFor="phone"
                >
                  <label className="custom-checkboxr">
                    <input
                      type="checkbox"
                      className="hidden"
                      id="phone"
                      onChange={() => {
                        setPhoneChecked(!phoneChecked);
                      }}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <div
                    className={`ml-3 uppercase + ${
                      phoneChecked ? "font-bold" : ""
                    }`}
                  >
                    phone
                  </div>
                </label>
                <label
                  className="flex flex-row items-center py-2 pl-2 pr-4 hover:cursor-pointer mr-4 mt-1 rounded-lg bg-[#f6f6f6]"
                  htmlFor="email"
                >
                  <label className="custom-checkboxr">
                    <input
                      type="checkbox"
                      className="hidden"
                      id="email"
                      onChange={() => {
                        setEmailChecked(!emailChecked);
                      }}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <div
                    className={`ml-3 uppercase + ${
                      emailChecked ? "font-bold" : ""
                    }`}
                  >
                    email
                  </div>
                </label>
                <label
                  className="flex flex-row items-center py-2 pl-2 pr-4 hover:cursor-pointer mr-4 mt-1 rounded-lg bg-[#f6f6f6]"
                  htmlFor="sms"
                >
                  <label className="custom-checkboxr">
                    <input
                      type="checkbox"
                      className="hidden"
                      id="sms"
                      onChange={() => {
                        setSmsChecked(!smsChecked);
                      }}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <div
                    className={`ml-3 uppercase + ${
                      smsChecked ? "font-bold" : ""
                    }`}
                  >
                    sms
                  </div>
                </label>
                <label
                  className="flex flex-row items-center py-2 pl-2 pr-4 hover:cursor-pointer mr-4 mt-1 rounded-lg bg-[#f6f6f6]"
                  htmlFor="letter"
                >
                  <label className="custom-checkboxr">
                    <input
                      type="checkbox"
                      className="hidden"
                      id="letter"
                      onChange={() => {
                        setLetterChecked(!letterChecked);
                      }}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <div
                    className={`ml-3 uppercase + ${
                      letterChecked ? "font-bold" : ""
                    }`}
                  >
                    letter
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div
            className="mt-16 py-2 border-2 border-gray-800 text-center uppercase :cursor-pointer hover:text-white hover:bg-gray-800 bg-white w-full rounded-full text-black text-base font-semibold leading-relaxed cursor-pointer"
            onClick={() => {
              if (
                !name ||
                (!isValidEmail(email) && email) ||
                !email ||
                phoneNumber.length <= 1
              ) {
                setSubmit(true);
                myRef.current.scrollIntoView({ behavior: "smooth" });
              } else {
                console.log({
                  isDelivery,
                  title,
                  name,
                  email,
                  phoneNumber,
                  type,
                  note,
                  make,
                  model,
                  reg,
                  phoneChecked,
                  emailChecked,
                  smsChecked,
                  letterChecked,
                });
                sendEnquiry();
              }
            }}
          >
            Enquire Today
          </div>
        </>
      ) : (
        <>
          <div className="mt-10">
            <div className="flex flex-col items-left ">
              <div className="text-2xl font-bold  ">
                A member of our team will be in touch as soon as possible.
              </div>
            </div>
          </div>
          <div className="mt-10 flex">
            <Link
              to="/"
              className="p-2 border-2 border-blue-800 text-center uppercase :cursor-pointer hover:border-blue-900 hover:bg-blue-900 bg-blue-800 w-full rounded-full text-white text-base font-semibold leading-relaxed cursor-pointer"
            >
              Return to the home page
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
