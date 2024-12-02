import { useState } from "react";

export default function FirstQuickValue({
  visible,
  vehicle,
  setVehicle,
  registration,
  isWrongRegistration,
  wrongRegistrationEffect,
}) {
  const [emptyDetail, setEmptyDetail] = useState(false);

  const handleBack = () => {
    visible(0); // This will call the setOpenQuick function and pass true as an argument
  };
  const handleContinue = () => {
    if (
      !vehicle.make.length ||
      !vehicle.model.length ||
      !vehicle.derivative.length ||
      !vehicle.colour.length
    ) {
      setEmptyDetail(true);
      setTimeout(() => {
        setEmptyDetail(false);
      }, 500);
    } else {
      visible(2); // This will call the setOpenQuick function and pass true as an argument
    }
  };
  const setVehicleDetail = (key, value) => {
    const temp = { ...vehicle };
    temp[key] = value;
    setVehicle(temp);
  };
  return (
    <div className="w-full bg-[#f6f6f6] flex flex-col md:flex-row justify-center items-center py-[50px]  px-[20px] md:px-0">
      <div className="w-full lg:w-3/5 mx-auto">
        <div className="flex flex-col bg-white rounded-2xl p-8">
          <div className="uppercase text-2xl    font-bold">
            get a quick valuation on your vehicle
          </div>
          <div className="mt-2">
            <div
              className={`flex flex-row gap-2 items-center transition duration-500 ease-in-out transform ${
                wrongRegistrationEffect ? "scale-105" : ""
              }`}
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mt-1 w-12 h-12 sm:w-4 sm:h-4"
              >
                <path
                  d="M8.66667 10.6667H8V8H7.33333M8 5.33333H8.00667M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z"
                  stroke="#0449C8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {isWrongRegistration
                ? "We couldn't find your vehicle. You can input your car info and get your vehicle valuation."
                : "These are your vehicle details and click the 'CONTINUE' button to continue."}
            </div>
          </div>
          <div className="mt-8  ">
            Registration Number
            <span className="text-red-600 font-bold">*</span>
          </div>
          <input
            type="text"
            value={registration}
            disabled
            className="mt-2 w-full bg-[#f6f6f6] border-2 border-gray-200 rounded-full py-3 px-6"
          ></input>
          <div className="mt-4 flex flex-wrap flex-row justify-between">
            <div className="w-full lg:w-[30%] flex flex-col">
              <div className="  ">
                Make
                <span className="text-red-600 font-bold">*</span>
              </div>
              <input
                type="text"
                value={vehicle.make}
                disabled={!isWrongRegistration}
                onChange={(e) => {
                  setVehicleDetail("make", e.target.value);
                }}
                className={`mt-2 w-full bg-[#f6f6f6] border-2 border-gray-200 rounded-full py-3 px-6 ${
                  !vehicle.make.length && emptyDetail ? "animate-shake" : ""
                }`}
              ></input>
            </div>
            <div className="w-full lg:w-[30%] flex flex-col">
              <div className="  ">
                Model<span className="text-red-600 font-bold">*</span>
              </div>
              <input
                type="text"
                value={vehicle.model}
                disabled={!isWrongRegistration}
                onChange={(e) => {
                  setVehicleDetail("model", e.target.value);
                }}
                className={`mt-2 w-full bg-[#f6f6f6] border-2 border-gray-200 rounded-full py-3 px-6 ${
                  !vehicle.model.length && emptyDetail ? "animate-shake" : ""
                }`}
              ></input>
            </div>
            <div className="w-full lg:w-[30%] flex flex-col">
              <div className="  ">
                Version<span className="text-red-600 font-bold">*</span>
              </div>
              <input
                type="text"
                value={vehicle.derivative}
                disabled={!isWrongRegistration}
                onChange={(e) => {
                  setVehicleDetail("derivative", e.target.value);
                }}
                className={`mt-2 w-full bg-[#f6f6f6] border-2 border-gray-200 rounded-full py-3 px-6 ${
                  !vehicle.derivative.length && emptyDetail
                    ? "animate-shake"
                    : ""
                }`}
              ></input>
            </div>
          </div>
          <div className="mt-4  ">
            Fuel Type<span className="text-red-600 font-bold">*</span>
          </div>

          <div className="mb-2 w-full float-right border-0">
            <select
              value={vehicle.fuelType}
              disabled={!isWrongRegistration}
              onChange={(e) => {
                setVehicleDetail("fuelType", e.target.value);
              }}
              className="mt-2 w-full bg-[#f6f6f6] border-2 border-gray-200 rounded-full py-3 px-6"
            >
              <option value="Petrol">Petrol</option>
              <option value="Dissel">Dissel</option>
            </select>
          </div>

          <div className="mt-4">
            Registration Date
            <span className="text-red-600 font-bold">*</span>
          </div>
          <div className="mb-2 w-full float-right border-0">
            <input
              type="date"
              value={vehicle.firstRegistrationDate}
              disabled={!isWrongRegistration}
              onChange={(e) => {
                setVehicleDetail("firstRegistrationDate", e.target.value);
              }}
              className="mt-2 w-full bg-[#f6f6f6] border-2 border-gray-200 rounded-full py-3 px-6"
            ></input>
          </div>

          <div className="mt-4">
            Engine Size (cc)<span className="text-red-600 font-bold">*</span>
          </div>
          <input
            type="number"
            min={1}
            max={10000}
            value={vehicle.engineCapacityCC}
            disabled={!isWrongRegistration}
            onChange={(e) => {
              if (e.target.value === "") {
                setVehicleDetail("engineCapacityCC", "");
              } else if (e.target.value < 1) {
                setVehicleDetail("engineCapacityCC", 1);
              } else if (e.target.value > 10000) {
                setVehicleDetail("engineCapacityCC", 10000);
              } else {
                setVehicleDetail("engineCapacityCC", e.target.value);
              }
            }}
            onBlur={(e) => {
              if (e.target.value === "") {
                setVehicleDetail("engineCapacityCC", 1);
              }
            }}
            className="mt-2 w-full bg-[#f6f6f6] border-2 border-gray-200 rounded-full py-3 px-6"
          ></input>
          <div className="mt-4 flex flex-col lg:flex-row md:justify-between">
            <div className="w-full lg:w-[30%] flex flex-col">
              <div className="">
                Number of Doors
                <span className="text-red-600 font-bold">*</span>
              </div>
              <div className="mb-2 w-full float-right border-0">
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={vehicle.doors}
                  disabled={!isWrongRegistration}
                  onChange={(e) => {
                    if (e.target.value === "") {
                      setVehicleDetail("doors", "");
                    } else if (e.target.value < 1) {
                      setVehicleDetail("doors", 1);
                    } else if (e.target.value > 10) {
                      setVehicleDetail("doors", 10);
                    } else {
                      setVehicleDetail("doors", e.target.value);
                    }
                  }}
                  onBlur={(e) => {
                    if (e.target.value === "") {
                      setVehicleDetail("doors", 1);
                    }
                  }}
                  className="mt-2 w-full bg-[#f6f6f6] border-2 border-gray-200 rounded-full py-3 px-6"
                ></input>
              </div>
            </div>
            <div className="w-full lg:w-[30%] flex flex-col">
              <div className="">
                Colour<span className="text-red-600 font-bold">*</span>
              </div>
              <div className="mb-2 w-full float-right border-0">
                <input
                  type="text"
                  value={vehicle.colour}
                  disabled={!isWrongRegistration}
                  onChange={(e) => {
                    setVehicleDetail("colour", e.target.value);
                  }}
                  className={`mt-2 w-full bg-[#f6f6f6] border-2 border-gray-200 rounded-full py-3 px-6 ${
                    !vehicle.colour.length && emptyDetail ? "animate-shake" : ""
                  }`}
                ></input>
              </div>
            </div>
            <div className="w-full lg:w-[30%] flex flex-col">
              <div className="">
                Transmission
                <span className="text-red-600 font-bold">*</span>
              </div>
              <div className="mb-2 w-full float-right border-0">
                <select
                  value={vehicle.transmissionType}
                  disabled={!isWrongRegistration}
                  onChange={(e) => {
                    setVehicleDetail("transmissionType", e.target.value);
                  }}
                  className="mt-2 w-full bg-[#f6f6f6] border-2 border-gray-200 rounded-full py-3 px-6"
                >
                  <option value="Automatic">
                    <div className="flex flex-row pl-2 items-center">
                      <div className="w-5 h-5 border-2 border-red-500 rounded-full bg-red-500"></div>
                      <div className="ml-2">Automatic</div>
                    </div>
                  </option>
                  <option value="Manual">
                    <div className="flex flex-row pl-2 items-center">
                      <div className="w-5 h-5 border-2 border-red-500 rounded-full bg-red-500"></div>
                      <div className="ml-2">Manual</div>
                    </div>
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t-2"></div>
          <div className="mt-8 flex flex-wrap flex-row w-full justify-between">
            <div
              className="hover:cursor-pointer px-2 uppercase py-2 md:px-8 rounded-full border-2 border-black bg-white hover:text-white hover:bg-black"
              onClick={handleBack}
            >
              <div className="flex flex-row  px-1 justify-center items-center">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M896 810.666667c-8.533333 0-17.066667-4.266667-25.6-8.533333l-384-256C477.866667 537.6 469.333333 524.8 469.333333 512s8.533333-25.6 17.066667-34.133333l384-256c12.8-8.533333 29.866667-8.533333 42.666667 0C930.133333 226.133333 938.666667 238.933333 938.666667 256l0 512c0 17.066667-8.533333 29.866667-21.333333 38.4C908.8 810.666667 904.533333 810.666667 896 810.666667zM588.8 512l264.533333 174.933333L853.333333 337.066667 588.8 512z" />
                  <path d="M512 810.666667c-8.533333 0-17.066667-4.266667-25.6-8.533333l-384-256C93.866667 537.6 85.333333 524.8 85.333333 512s8.533333-25.6 17.066667-34.133333l384-256c12.8-8.533333 29.866667-8.533333 42.666667 0C546.133333 226.133333 554.666667 238.933333 554.666667 256l0 512c0 17.066667-8.533333 29.866667-21.333333 38.4C524.8 810.666667 520.533333 810.666667 512 810.666667zM204.8 512l264.533333 174.933333L469.333333 337.066667 204.8 512z" />
                </svg>
                <div className="ml-2 text-[14px] ">GO BACK</div>
              </div>
            </div>
            <div
              className="text-[14px] px-3 hover:cursor-pointer uppercase py-2 md:px-8 rounded-full border-2 border-black bg-white hover:text-white hover:bg-black"
              onClick={handleContinue}
            >
              continue
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
