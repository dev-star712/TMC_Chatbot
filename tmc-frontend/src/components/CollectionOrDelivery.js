import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Datepicker from "tailwind-datepicker-react";

export default function CollectionOrDelivery({ item, setMovable, type }) {
  const [show, setShow] = useState(false);
  const [bestTime, setBestTime] = useState("morning");

  const [termChecked, setTermChecked] = useState(false);
  const [policyChecked, setPolicyChecked] = useState(false);
  const [contractChecked, setContractChecked] = useState(false);

  const [phoneChecked, setPhoneChecked] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);
  const [smsChecked, setSmsChecked] = useState(false);
  const [letterChecked, setLetterChecked] = useState(false);

  const [isDelivery, setIsDelivery] = useState("Driven home delivery (FREE)");
  const [note, setNote] = useState("");

  const today = new Date();
  const [date, setDate] = useState(
    new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000)
  );

  useEffect(() => {
    const thirdDay = new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000);
    localStorage.setItem("date", thirdDay.toISOString());
    localStorage.setItem("bestTime", "morning");
    localStorage.setItem("note", "");
    localStorage.setItem("phone", false);
    localStorage.setItem("mail", false);
    localStorage.setItem("sms", false);
    localStorage.setItem("letter", false);
    localStorage.setItem("isDelivery", "Driven home delivery (FREE)");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (selectedDate) => {
    setDate(selectedDate);
    localStorage.setItem("date", selectedDate.toISOString());
  };
  const handleClose = (state) => {
    setShow(state);
  };
  const options = {
    todayBtn: false,
    clearBtn: false,
    theme: {
      background: "",
      todayBtn: "",
      clearBtn: "",
      icons: "",
      text: "text-gray-600",
      disabledText: "bg-gray-200",
      input: "",
      inputIcon: "",
      selected: "",
    },
    datepickerClassNames: "top-240 rounded-full",
    minDate: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000),
    defaultDate: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000),
  };

  useEffect(() => {
    setMovable(termChecked && policyChecked && contractChecked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [termChecked, policyChecked, contractChecked]);

  return (
    <div className="">
      <div className="text-gray-900 font-open-sans-condensed text-[20px] md:text-4xl font-bold leading-40 uppercase   ">
        getting your{" "}
        <strong className="text-[#0000ff]">
          "{item.vehicle.make}&nbsp; {item.vehicle.model}"
        </strong>
      </div>
      <div className="mt-8 flex flex-col w-full">
        <div className="">
          Choose how you’d like to get{" "}
          <strong>
            {item.vehicle.make}&nbsp; {item.vehicle.model}
          </strong>
          :
        </div>
        <select
          type="text"
          placeholder="Address 1"
          className="mt-2 bg-[#f6f6f6] px-6 py-3 border-2 w-full rounded-full"
          value={isDelivery}
          onChange={(e) => {
            setIsDelivery(e.target.value);
            localStorage.setItem("isDelivery", e.target.value);
          }}
        >
          <option
            value={`I'm happy to pick up at current location: TMC ${
              item.vehicle.branch || "OAKHANGER"
            } Office`}
          >
            I'm happy to pick up at current location: TMC{" "}
            {item.vehicle.branch || "OAKHANGER"} Office
          </option>
          <option value="Driven home delivery (FREE)">
            Driven home delivery (FREE)
          </option>
        </select>
      </div>
      <div className="mt-8  p-6 bg-[#f6f6f6] flex flex-col rounded-2xl">
        <div className="flex flex-row flex-wrap justify-start items-center mt-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.33398 8.66675L6.00065 11.3334L12.6673 4.66675"
              stroke="#0449C8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          &nbsp;&nbsp;You've chosen to complete at&nbsp;
          <strong className="text-blue-700">
            TMC {item.vehicle.branch || "OAKHANGER"} Office
          </strong>
        </div>
        <div className="flex flex-row flex-wrap justify-start items-center mt-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.33398 8.66675L6.00065 11.3334L12.6673 4.66675"
              stroke="#0449C8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          &nbsp;&nbsp;Your vehicle will be ready in&nbsp;
          <strong className="text-blue-700">3 days</strong>.
        </div>
      </div>
      <div className="mt-6">I'd like to get my vehicle on:</div>

      <div className="mt-2">
        <Datepicker
          options={options}
          onChange={handleChange}
          show={show}
          setShow={handleClose}
          value={date}
        />
      </div>

      <div className="mt-8  p-6 bg-[#f6f6f6] flex flex-col rounded-2xl">
        <div className="text-gray-900 font-open-sans-condensed text-32 font-bold leading-40 uppercase">
          what to expect
        </div>
        <div className="mt-2">
          Once your finance has been processed, a member of our sales team will
          contact you to arrange collection of your{" "}
          <strong>
            {item.vehicle.make}&nbsp; {item.vehicle.model}
          </strong>
          . If you have any questions, you can also contact us on 01252 943974.
        </div>
        <div className="mt-4">
          Please select the best time for us to contact you:
        </div>
        <div className="mt-4 flex flex-row">
          <div className="uppercase flex flex-col md:flex-row">
            <label
              className="text-sm bg-white rounded-md py-2 pr-4 pl-2 flex flex-row hover:cursor-pointer"
              htmlFor="morning"
            >
              <label className="custom-checkboxl">
                <input
                  type="checkbox"
                  className="hidden"
                  id="morning"
                  checked={bestTime === "morning"}
                  onChange={() => {
                    setBestTime("morning");
                    localStorage.setItem("bestTime", "morning");
                  }}
                />
                <span className="checkmark"></span>
              </label>
              <div
                className={`ml-3 + ${
                  bestTime === "morning" ? "font-bold" : ""
                }`}
              >
                morning
              </div>
            </label>
            <label
              className="mt-[14px] md:mt-0 md:ml-[14px] text-sm bg-white rounded-md py-2 pr-4 pl-2 flex flex-row hover:cursor-pointer"
              htmlFor="afternoon"
            >
              <label className="custom-checkboxl">
                <input
                  type="checkbox"
                  className="hidden"
                  id="afternoon"
                  checked={bestTime === "afternoon"}
                  onChange={() => {
                    setBestTime("afternoon");
                    localStorage.setItem("bestTime", "afternoon");
                  }}
                />
                <span className="checkmark"></span>
              </label>
              <div
                className={`ml-3 + ${
                  bestTime === "afternoon" ? "font-bold" : ""
                }`}
              >
                afternoon
              </div>
            </label>
            <label
              className="mt-[14px] md:mt-0 md:ml-[14px] text-sm bg-white rounded-md py-2 pr-4 pl-2 flex flex-row hover:cursor-pointer"
              htmlFor="night"
            >
              <label className="custom-checkboxl">
                <input
                  type="checkbox"
                  className="hidden"
                  id="night"
                  checked={bestTime === "night"}
                  onChange={() => {
                    setBestTime("night");
                    localStorage.setItem("bestTime", "night");
                  }}
                />
                <span className="checkmark"></span>
              </label>
              <div
                className={`ml-3 + ${bestTime === "night" ? "font-bold" : ""}`}
              >
                night
              </div>
            </label>
          </div>
        </div>
        <div className="mt-8 flex flex-col text-gray-900 font-open-sans-condensed text-32 font-bold leading-40 uppercase">
          <div className=" ">Anything else you'd like to add?</div>
          <textarea
            type="text"
            className="mt-2 w-full px-6 py-3 bg-white text-black rounded-xl border-2"
            placeholder="Anything else you'd like to add?"
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
              localStorage.setItem("note", e.target.value);
            }}
          ></textarea>
        </div>
      </div>
      {type === "full" && (
        <>
          <div className="mt-8 text-gray-800 font-open-sans-condensed text-32 font-bold leading-8 uppercase">
            Make This{" "}
            <strong className="text-[#0000ff]">
              {item.vehicle.make}&nbsp; {item.vehicle.model}
            </strong>{" "}
            Yours Today
          </div>
          <div className="mt-10 md:mt-0">
            You're almost there - just one last step to complete! Just go to the
            secure payment gateway to pay the{" "}
            <strong>
              £
              {parseInt(
                item.adverts.forecourtPrice.amountGBP || 0
              ).toLocaleString()}
            </strong>{" "}
            payable now and make this{" "}
            <strong>
              {item.vehicle.make}&nbsp; {item.vehicle.model}
            </strong>{" "}
            yours today!
          </div>
          <div className="mt-8 md:mt-4 flex flex-col">
            <label
              className="flex flex-row items-start hover:cursor-pointer"
              htmlFor="term"
            >
              <label className="mt-1 custom-checkboxr">
                <input
                  type="checkbox"
                  className="hidden"
                  id="term"
                  onChange={() => setTermChecked(!termChecked)}
                />
                <span className="checkmark"></span>
              </label>
              <div className={`ml-3 + ${termChecked ? "font-bold" : ""}`}>
                I have read and accept the{" "}
                <Link
                  to="/terms-and-conditions"
                  target="_blank"
                  className="text-blue-500 underline"
                >
                  Terms and Conditions
                </Link>
                &nbsp;
                <span className="text-red-600 font-bold">*</span>
              </div>
            </label>
            <label
              className="mt-[14px] flex flex-row items-start hover:cursor-pointer"
              htmlFor="policy"
            >
              <label className="mt-1 custom-checkboxr">
                <input
                  type="checkbox"
                  className="hidden"
                  id="policy"
                  onChange={() => setPolicyChecked(!policyChecked)}
                />
                <span className="checkmark"></span>
              </label>
              <div className={`ml-3 + ${policyChecked ? "font-bold" : ""}`}>
                I have read and accept the{" "}
                <Link
                  to="/privacy-policy"
                  target="_blank"
                  className="text-blue-500 underline"
                >
                  Privacy Policy
                </Link>
                &nbsp;
                <span className="text-red-600 font-bold">*</span>
              </div>
            </label>
            <label
              className="mt-[14px] flex flex-row items-start hover:cursor-pointer"
              htmlFor="contract"
            >
              <label className="mt-1 custom-checkboxr">
                <input
                  type="checkbox"
                  className="hidden"
                  id="contract"
                  onChange={() => setContractChecked(!contractChecked)}
                />
                <span className="checkmark"></span>
              </label>
              <div className={`ml-3 + ${contractChecked ? "font-bold" : ""}`}>
                I acknowledge that I have the right to cancel my contract within
                14 days of receiving the vehicle (subject to{" "}
                <Link
                  to="/terms-and-conditions"
                  target="_blank"
                  className="text-blue-500 underline"
                >
                  Terms and Conditions
                </Link>
                )&nbsp;<span className="text-red-600 font-bold">*</span>
              </div>
            </label>
          </div>
          <div className="mt-8 bg-[#f6f6f6] rounded-2xl">
            <div className="p-6 flex flex-col">
              <div className="text-gray-800   font-open-sans-condensed text-32 font-bold leading-8 uppercase">
                Your Preferences
              </div>

              <div className="mt-5 ">
                We would like to, from time to time, send you details of any
                offers and latest news. Please can you indicate, by checking the
                appropriate boxes below, which channels you would like to be
                contacted by.
              </div>
              <div className="mt-4 flex flex-col md:flex-row">
                <label
                  className="flex flex-row items-center py-2 pl-2 pr-4 hover:cursor-pointer"
                  htmlFor="phone"
                >
                  <label className="custom-checkboxr">
                    <input
                      type="checkbox"
                      className="hidden"
                      id="phone"
                      onChange={() => {
                        setPhoneChecked(!phoneChecked);
                        localStorage.setItem("phone", !phoneChecked);
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
                  className="mt-[14px] md:mt-0 flex flex-row items-center py-2 pl-2 pr-4 hover:cursor-pointer"
                  htmlFor="email"
                >
                  <label className="custom-checkboxr">
                    <input
                      type="checkbox"
                      className="hidden"
                      id="email"
                      onChange={() => {
                        setEmailChecked(!emailChecked);
                        localStorage.setItem("mail", !emailChecked);
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
                  className="mt-[14px] md:mt-0 flex flex-row items-center py-2 pl-2 pr-4 hover:cursor-pointer"
                  htmlFor="sms"
                >
                  <label className="custom-checkboxr">
                    <input
                      type="checkbox"
                      className="hidden"
                      id="sms"
                      onChange={() => {
                        setSmsChecked(!smsChecked);
                        localStorage.setItem("sms", !smsChecked);
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
                  className="mt-[14px] md:mt-0 flex flex-row items-center py-2 pl-2 pr-4 hover:cursor-pointer"
                  htmlFor="letter"
                >
                  <label className="custom-checkboxr">
                    <input
                      type="checkbox"
                      className="hidden"
                      id="letter"
                      onChange={() => {
                        setLetterChecked(!letterChecked);
                        localStorage.setItem("letter", !letterChecked);
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
        </>
      )}
    </div>
  );
}
