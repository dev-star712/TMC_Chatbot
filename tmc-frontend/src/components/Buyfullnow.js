import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Buyfullnow({
  item,
  type,
  deposit,
  term,
  vin,
  submit,
  setFirstTabFilled,
  formRef,
}) {
  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(0);

  const [fname, setFname] = useState(localStorage.getItem("fname") || "");
  const [sname, setSname] = useState(localStorage.getItem("sname") || "");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [cemail, setCemail] = useState(localStorage.getItem("cemail") || "");
  const [phoneNumber, setPhoneNumber] = useState(
    localStorage.getItem("phoneNumber") || ""
  );

  const [postcode, setPostcode] = useState(
    localStorage.getItem("postcode") || ""
  );
  const [isValidPostcode, setIsValidPostcode] = useState(
    (localStorage.getItem("isValidPostcode") || "0") === "1"
  );
  const [address1, setAddress1] = useState(
    localStorage.getItem("address1") || ""
  );
  const [address1List, setAddress1List] = useState([]);
  const [address2, setAddress2] = useState(
    localStorage.getItem("address2") || ""
  );
  const [town, setTown] = useState(localStorage.getItem("town") || "");
  const [county, setCounty] = useState(localStorage.getItem("county") || "");

  useEffect(() => {
    if (
      !fname ||
      !sname ||
      !email ||
      (email.length && !isValidEmail(email)) ||
      !cemail ||
      cemail !== email ||
      phoneNumber.length <= 1 ||
      !postcode ||
      (postcode && !isValidPostcode) ||
      !address1 ||
      !town ||
      !county
    ) {
      setFirstTabFilled(false);
    } else {
      setFirstTabFilled(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    fname,
    sname,
    email,
    cemail,
    phoneNumber,
    postcode,
    address1,
    town,
    county,
    isValidPostcode,
  ]);

  const isValidEmail = (email) => {
    // Define a regular expression pattern for email validation.
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  useEffect(() => {
    console.log(type);
    if (type === "full") {
      setIsChecked(1);
    } else if (type === "finance") {
      setIsChecked(2);
    } else {
      setIsChecked(3);
    }
  }, [type]);

  const handleCheckboxChange = (id) => {
    setIsChecked(id);
    if (id === 2 && (!deposit || !term || type !== "finance")) {
      navigate(`/vehicles-for-sale/viewdetail/${vin}?#finance`);
    } else if (id === 1 && type !== "full") {
      navigate(`/checkout/${vin}?type=full`);
    } else if (id === 3 && type !== "reserve") {
      navigate(`/checkout/${vin}?type=reserve`);
    }
  };

  return (
    <div ref={formRef}>
      <div className="text-gray-900 font-open-sans-condensed text-4xl font-bold leading-40 uppercase   ">
        choose how you'd like to buy
      </div>
      <div className="mt-4 flex flex-col md:flex-row md:justify-between">
        <div
          className={`p-4 w-full md:w-[32%] border-2 rounded-2xl flex flex-col ${
            isChecked === 1
              ? "bg-black text-white"
              : "bg-[#f6f6f6] text-black hover:bg-black hover:text-white"
          }`}
          onClick={() => handleCheckboxChange(1)}
        >
          <div className="flex flex-row justify-between text-black">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.39922 6.3999C4.63191 6.3999 3.19922 7.83259 3.19922 9.5999V11.1999H28.7992V9.5999C28.7992 7.83259 27.3665 6.3999 25.5992 6.3999H6.39922Z"
                fill="gray"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M28.7992 14.3999H3.19922V22.3999C3.19922 24.1672 4.63191 25.5999 6.39922 25.5999H25.5992C27.3665 25.5999 28.7992 24.1672 28.7992 22.3999V14.3999ZM6.39922 20.7999C6.39922 19.9162 7.11556 19.1999 7.99922 19.1999H9.59922C10.4829 19.1999 11.1992 19.9162 11.1992 20.7999C11.1992 21.6836 10.4829 22.3999 9.59922 22.3999H7.99922C7.11556 22.3999 6.39922 21.6836 6.39922 20.7999ZM14.3992 19.1999C13.5156 19.1999 12.7992 19.9162 12.7992 20.7999C12.7992 21.6836 13.5156 22.3999 14.3992 22.3999H15.9992C16.8829 22.3999 17.5992 21.6836 17.5992 20.7999C17.5992 19.9162 16.8829 19.1999 15.9992 19.1999H14.3992Z"
                fill="gray"
              />
            </svg>
            <label className="custom-checkbox1">
              <input
                type="checkbox"
                checked={isChecked === 1}
                className="hidden"
              />
              <span className="checkmark"></span>
            </label>
          </div>
          <div className="mt-2 text-dark font-open-sans-condensed sm:font-open-sans text-18 font-semibold leading-26">
            Cash Purchase
          </div>
          <div className="">Buy in full price</div>
        </div>
        <div
          className={`p-4 w-full md:w-[32%]  mt-4 md:mt-0 border-2 rounded-2xl flex flex-col ${
            isChecked === 2
              ? "bg-black text-white"
              : "bg-[#f6f6f6] text-black hover:bg-black hover:text-white"
          }`}
          onClick={() => handleCheckboxChange(2)}
        >
          <div className="flex flex-row justify-between text-black">
            <svg
              width="33"
              height="32"
              viewBox="0 0 33 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.2664 3.19995C8.49909 3.19995 7.06641 4.63264 7.06641 6.39995V25.5999C7.06641 27.3673 8.49909 28.7999 10.2664 28.7999H23.0664C24.8337 28.7999 26.2664 27.3673 26.2664 25.5999V11.8627C26.2664 11.014 25.9293 10.2001 25.3291 9.59995L19.8664 4.13721C19.2663 3.53709 18.4524 3.19995 17.6037 3.19995H10.2664ZM13.4664 19.2C13.4664 18.3163 12.7501 17.6 11.8664 17.6C10.9828 17.6 10.2664 18.3163 10.2664 19.2V24C10.2664 24.8836 10.9828 25.5999 11.8664 25.5999C12.7501 25.5999 13.4664 24.8836 13.4664 24V19.2ZM16.6664 14.4C17.5501 14.4 18.2664 15.1163 18.2664 16V24C18.2664 24.8836 17.5501 25.5999 16.6664 25.5999C15.7828 25.5999 15.0664 24.8836 15.0664 24V16C15.0664 15.1163 15.7828 14.4 16.6664 14.4ZM23.0664 12.8C23.0664 11.9163 22.3501 11.2 21.4664 11.2C20.5828 11.2 19.8664 11.9163 19.8664 12.8V24C19.8664 24.8836 20.5828 25.5999 21.4664 25.5999C22.3501 25.5999 23.0664 24.8836 23.0664 24V12.8Z"
                fill="gray"
              />
            </svg>
            <label className="custom-checkbox1">
              <input
                type="checkbox"
                checked={isChecked === 2}
                className="hidden"
              />
              <span className="checkmark"></span>
            </label>
          </div>
          <div className="mt-2 text-dark font-open-sans-condensed sm:font-open-sans text-18 font-semibold leading-26">
            Apply for Finance
          </div>
          <div className="">
            Buy with finance for £
            {parseInt(
              item.adverts.forecourtPrice.amountGBP || 0
            ).toLocaleString()}
          </div>
        </div>
        <div
          className={`p-4 w-full md:w-[32%] mt-4 md:mt-0 border-2 rounded-2xl flex flex-col ${
            isChecked === 3
              ? "bg-black text-white"
              : "bg-[#f6f6f6] text-black hover:bg-black hover:text-white"
          }`}
          onClick={() => handleCheckboxChange(3)}
        >
          <div className="flex flex-row justify-between text-black">
            <svg
              width="33"
              height="32"
              viewBox="0 0 33 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M28.6646 14.8686C29.2894 15.4934 29.2894 16.5065 28.6646 17.1313L17.4646 28.3313C16.8397 28.9562 15.8267 28.9562 15.2018 28.3313L4.00183 17.1313C3.68936 16.8189 3.53315 16.4093 3.5332 15.9998V7.99995C3.5332 5.34898 5.68224 3.19995 8.3332 3.19995H16.3336C16.743 3.20006 17.1523 3.35627 17.4646 3.66858L28.6646 14.8686ZM8.3332 9.59995C9.21686 9.59995 9.9332 8.88361 9.9332 7.99995C9.9332 7.1163 9.21686 6.39995 8.3332 6.39995C7.44955 6.39995 6.7332 7.1163 6.7332 7.99995C6.7332 8.88361 7.44955 9.59995 8.3332 9.59995Z"
                fill="gray"
              />
            </svg>

            <label className="custom-checkbox1">
              <input
                type="checkbox"
                checked={isChecked === 3}
                className="hidden"
              />
              <span className="checkmark"></span>
            </label>
          </div>
          <div className="mt-2 text-dark font-open-sans-condensed sm:font-open-sans text-18 font-semibold leading-26">
            Reserve Online
          </div>
          <div className="">Reserve now for just £149</div>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="text-gray-900 font-open-sans-condensed text-32 font-bold leading-40 uppercase   ">
          {type === "full" && "buy in full now"}
          {type === "finance" && "Apply for Finance"}
          {type === "reserve" && "Reserve Online"}
        </div>
        {type === "full" && (
          <div className="">
            Make this{" "}
            <strong>
              {item.vehicle.make}&nbsp; {item.vehicle.model}
            </strong>{" "}
            yours today by buying it in full online through our secure checkout
            in just a few simple steps!
          </div>
        )}
        {type === "finance" && (
          <div className="">
            Make this{" "}
            <strong>
              {item.vehicle.make}&nbsp; {item.vehicle.model}
            </strong>{" "}
            yours today by financing it in full online through our secure
            checkout in just a few simple steps!
          </div>
        )}
        {type === "reserve" && (
          <div className="">
            Reserve this vehicle now for <strong>£149</strong>. This will be
            deducted from your total order. Your{" "}
            <strong>
              {item.vehicle.make}&nbsp; {item.vehicle.model}
            </strong>{" "}
            will be reserved for you for 2 days.
          </div>
        )}
      </div>
      <div className="mt-8 text-gray-900 font-open-sans-condensed text-32 font-bold leading-40 uppercase flex flex-col">
        your contact information
      </div>
      <div className="mt-4 w-full flex flex-col md:flex-row md:justify-between">
        <div className="flex flex-col w-full md:w-[45%]">
          <div className="">
            First Name<span className="text-red-600 font-bold">*</span>
          </div>
          <input
            type="text"
            placeholder="First name"
            className="mt-2 bg-[#f6f6f6] px-6 py-3 border-2 w-full rounded-full"
            onChange={(e) => {
              setFname(e.target.value.trim());
              localStorage.setItem("fname", e.target.value.trim());
            }}
            value={fname}
          ></input>
          {!fname && submit && (
            <div className="mt-2 ml-3 text-sm text-red-500">
              Please enter your first name
            </div>
          )}
        </div>

        <div className="mt-4 md:mt-0 flex flex-col w-full md:w-[45%]">
          <div className="">
            Surname<span className="text-red-600 font-bold">*</span>
          </div>
          <input
            type="text"
            placeholder="Surname"
            className="mt-2 bg-[#f6f6f6] px-6 py-3 border-2 w-full rounded-full"
            onChange={(e) => {
              setSname(e.target.value.trim());
              localStorage.setItem("sname", e.target.value.trim());
            }}
            value={sname}
          ></input>
          {!sname && submit && (
            <div className="mt-2 ml-3 text-sm text-red-500">
              Please enter your surname
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 flex flex-col w-full">
        <div className="">
          Email<span className="text-red-600 font-bold">*</span>
        </div>
        <input
          type="text"
          placeholder="email@mail.com"
          className="mt-2 bg-[#f6f6f6] px-6 py-3 border-2 w-full rounded-full"
          onChange={(e) => {
            setEmail(e.target.value.trim());
            localStorage.setItem("email", e.target.value.trim());
          }}
          value={email}
        ></input>
      </div>
      {(isValidEmail(email) || !email) && !(submit && !email) ? (
        <div className="mt-2 ml-3 text-sm text-gray-500">
          We’ll send your confirmation here
        </div>
      ) : (
        <div className="mt-2 ml-3 text-sm text-red-500">
          Please enter a valid email address (e.g. test@test.com)
        </div>
      )}
      <div className="mt-4">
        Confirm Email<span className="text-red-600 font-bold">*</span>
      </div>
      <input
        type="text"
        placeholder="email@mail.com"
        className="mt-2 bg-[#f6f6f6] px-6 py-3 border-2 w-full rounded-full"
        onChange={(e) => {
          setCemail(e.target.value.trim());
          localStorage.setItem("cemail", e.target.value.trim());
        }}
        value={cemail}
      ></input>
      {(cemail !== email || (submit && !cemail)) && (
        <div className="mt-2 ml-3 text-sm text-red-500">
          Please enter the same email address as above (e.g. test@test.com)
        </div>
      )}
      <div className="mt-4">
        Phone Number<span className="text-red-600 font-bold">*</span>
      </div>
      <input
        type="text"
        placeholder="+44 0000 00 0 000"
        className="mt-2 bg-[#f6f6f6] px-6 py-3 border-2 w-full rounded-full"
        onChange={(e) => {
          setPhoneNumber(`+${e.target.value.replace(/\D/g, "")}`);
          localStorage.setItem(
            "phoneNumber",
            `+${e.target.value.replace(/\D/g, "")}`
          );
        }}
        value={phoneNumber.replace(/\D/g, "").length > 0 ? phoneNumber : ""}
      ></input>
      {phoneNumber.length <= 1 && submit ? (
        <div className="mt-2 ml-3 text-sm text-red-500">
          Please enter your phone number
        </div>
      ) : (
        <div className="mt-2 ml-3 text-sm text-gray-500">
          In case we need to get in touch
        </div>
      )}
      <div className="mt-8 text-gray-900 font-open-sans-condensed text-32 font-bold leading-40 uppercase">
        your address
      </div>
      <div className="mt-2 ">
        Please note: This address must match the billing address entered during
        payment.
      </div>
      <div className="mt-4">
        Postcode<span className="text-red-600 font-bold">*</span>
      </div>
      <div className="flex flex-row w-full justify-between gap-1 pt-2 items-center">
        <input
          type="text"
          placeholder="Postcode"
          className="bg-[#f6f6f6] px-6 py-3 border-2 w-[85%] rounded-full"
          onChange={async (e) => {
            setPostcode(e.target.value.trim());
            setTown("");
            setCounty("");
            setAddress1List([]);
            setAddress1("");
            setAddress2("");
            localStorage.setItem("postcode", e.target.value.trim());
            localStorage.setItem("town", "");
            localStorage.setItem("county", "");
            localStorage.setItem("address1", "");
            localStorage.setItem("address2", "");
            if (!e.target.value.trim()) {
              setIsValidPostcode(true);
              localStorage.setItem("isValidPostcode", "1");
            } else {
              const res = await axios(
                `https://api.postcodes.io/postcodes/${e.target.value}/validate`
              );
              setIsValidPostcode(res.data.result);
              localStorage.setItem(
                "isValidPostcode",
                res.data.result ? "1" : "0"
              );
            }
          }}
          value={postcode}
        ></input>
        <div
          className={`flex justify-center w-12 h-12 rounded-full items-center ${
            postcode && isValidPostcode
              ? "hover:bg-gray-500 cursor-pointer bg-black"
              : "bg-gray-500"
          }`}
          onClick={async () => {
            if (postcode && isValidPostcode) {
              const res = await axios.get(
                `https://${
                  process.env.REACT_APP_API
                }/api/main/postcode?postcode=${encodeURIComponent(postcode)}`
              );
              console.log(res.data);
              setTown(res.data.result.Town);
              localStorage.setItem("town", res.data.result.Town);
              setCounty(res.data.result.County);
              localStorage.setItem("county", res.data.result.County);

              // const addrs = res.data.result.PremiseData.split(";")
              //   .filter((item) => item !== "")
              //   .map((addr) => {
              //     return `${addr
              //       .split(/\/|\|/)
              //       .filter((item) => item !== "")
              //       .join(", ")}, ${res.data.result.Address1}`;
              //   });
              // setAddress1List(addrs);
              setAddress1(res.data.result.Address1);
              setAddress2(res.data.result.Address2);
              // localStorage.setItem("address1", addrs[0] || "");
              localStorage.setItem("address1", res.data.result.Address1);
            }
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {postcode && !isValidPostcode && (
        <div className="mt-2 ml-3 text-sm text-red-500">Invalid Postcode</div>
      )}

      {!postcode && submit && (
        <div className="mt-2 ml-3 text-sm text-red-500">
          Please enter your postcode
        </div>
      )}

      <div className="mt-4 w-full flex flex-col md:flex-row md:justify-between">
        <div className="flex flex-col w-full md:w-[45%]">
          <div className="">
            Address 1<span className="text-red-600 font-bold">*</span>
          </div>
          <input
            placeholder="Address 1"
            className="mt-2 bg-[#f6f6f6] px-6 py-3 border-2 w-full rounded-full"
            onChange={(e) => {
              setAddress1(e.target.value.trim());
              localStorage.setItem("address1", e.target.value.trim());
            }}
            value={address1}
          ></input>
          {/* {address1List.length === 0 ? (
            <>
              <input
                placeholder="Address 1"
                className="mt-2 bg-[#f6f6f6] px-6 py-3 border-2 w-full rounded-full"
                onChange={(e) => {
                  setAddress1(e.target.value.trim());
                  localStorage.setItem("address1", e.target.value.trim());
                }}
                value={address1}
              ></input>
              {!address1 && submit && (
                <div className="mt-2 ml-3 text-sm text-red-500">
                  Please enter your address
                </div>
              )}
            </>
          ) : (
            <select
              type="text"
              placeholder="Address 1"
              className="mt-2 bg-[#f6f6f6] px-6 py-3 border-2 w-full rounded-full"
              value={address1}
              onChange={(e) => {
                setAddress1(e.target.value);
              }}
            >
              {address1List.map((addr) => {
                return (
                  <option key={addr} value={addr}>
                    {addr}
                  </option>
                );
              })}
            </select>
          )} */}
        </div>
        <div className="mt-4 md:mt-0 flex flex-col w-full md:w-[45%]">
          <div className="">Address 2</div>
          <input
            placeholder="Address 2"
            className="mt-2 bg-[#f6f6f6] px-6 py-3 border-2 w-full rounded-full"
            onChange={(e) => {
              setAddress2(e.target.value.trim());
              localStorage.setItem("address2", e.target.value.trim());
            }}
            value={address2}
          ></input>
        </div>
      </div>
      <div className="mt-4 w-full flex flex-col md:flex-row md:justify-between">
        <div className="flex flex-col w-full md:w-[45%]">
          <div className="">
            Town/City<span className="text-red-600 font-bold">*</span>
          </div>
          <input
            placeholder="Town/City"
            className="mt-2 bg-[#f6f6f6] px-6 py-3 border-2 w-full rounded-full"
            onChange={(e) => {
              setTown(e.target.value.trim());
              localStorage.setItem("town", e.target.value.trim());
            }}
            value={town}
          ></input>
          {!town && submit && (
            <div className="mt-2 ml-3 text-sm text-red-500">
              Please enter your town
            </div>
          )}
        </div>
        <div className="mt-4 md:mt-0 flex flex-col w-full md:w-[45%]">
          <div className="">
            County<span className="text-red-600 font-bold">*</span>
          </div>
          <input
            placeholder="County"
            className="mt-2 bg-[#f6f6f6] px-6 py-3 border-2 w-full rounded-full"
            onChange={(e) => {
              setCounty(e.target.value.trim());
              localStorage.setItem("county", e.target.value.trim());
            }}
            value={county}
          ></input>
          {!county && submit && (
            <div className="mt-2 ml-3 text-sm text-red-500">
              Please enter your county
            </div>
          )}
        </div>
      </div>
      <div className="mt-8 border-2 w-full"></div>
    </div>
  );
}
