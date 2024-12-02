import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState, useRef } from "react";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

export default function Paywithcard({
  item,
  type,
  term,
  deposit,
  vin,
  setPayable,
  payButtonRef,
}) {
  const stripePromise = loadStripe(
    `${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`
  );

  const options = {
    mode: "payment",
    amount: 14900,
    currency: "gbp",

    type,
    term,
    deposit,
    vin,

    setPayable,
    payButtonRef,

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

  return (
    <div>
      <div className="text-gray-900 font-open-sans-condensed text-4xl font-bold leading-40 uppercase   ">
        pay with card
      </div>
      <div className="mt-6 md:mt-2 text-black font-open-sans-condensed sm:font-open-sans text-base font-normal leading-6   ">
        Simply enter your payment details below to purchase your{" "}
        <strong className="text-[#0000ff]">
          {item.vehicle.make}&nbsp; {item.vehicle.model}
        </strong>
        !
      </div>
      <div className="mt-6 md:mt-4 rounded-2xl px-4 py-8 w-full bg-[#f6f6f6] flex justify-center items-center flex-row">
        <div className="ml-3 text-[#0000FF] font-open-sans-condensed sm:font-open-sans text-[14px] font-medium leading-6  ">
          Once you have clicked to submit your card details and pay, please DO
          NOT close this browser. If you do, it may take payment but not place
          your order.
        </div>
      </div>

      <div className="mt-8 flex flex-col w-full">
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm options={options} />
        </Elements>
      </div>
      <div className="mt-8 border-2 w-full"></div>
    </div>
  );
}

const CheckoutForm = ({ options }) => {
  const {
    amount,
    currency,

    type,
    term,
    deposit,
    vin,

    setPayable,
    payButtonRef,
  } = options;
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    setPayable(stripe && elements);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stripe, elements]);

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
      const response = await axios.post(
        `https://${process.env.REACT_APP_API}/api/stripe/create-intent`,
        {
          //reserve amount
          amount,
          currency,

          //vehicle info & checkout type
          type,
          term,
          deposit,
          vin,

          //customer detail
          fname: localStorage.getItem("fname"),
          sname: localStorage.getItem("sname"),
          email: localStorage.getItem("email"),
          phoneNumber: localStorage.getItem("phoneNumber"),
          postcode: localStorage.getItem("postcode"),
          address1: localStorage.getItem("address1"),
          address2: localStorage.getItem("address2"),
          town: localStorage.getItem("town"),
          county: localStorage.getItem("county"),

          //collection & delivery
          isDelivery: localStorage.getItem("isDelivery"),
          date: localStorage.getItem("date"),
          bestTime: localStorage.getItem("bestTime"),
          note: localStorage.getItem("note"),
          phone: localStorage.getItem("phone") === "true",
          mail: localStorage.getItem("mail") === "true",
          sms: localStorage.getItem("sms") === "true",
          letter: localStorage.getItem("letter") === "true",
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
            return_url: `https://${process.env.REACT_APP_API}/api/stripe/confirm-intent`,
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

  const buttonRef = useRef();

  const clickPayButton = () => {
    console.log("pay!");
    buttonRef.current.click();
  };

  // Assign the clickPayButton function to the ref
  // so it can be accessed by the parent component
  React.useImperativeHandle(payButtonRef, () => ({
    clickPayButton,
  }));

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {errorMessage && <div>{errorMessage}</div>}
      <button
        ref={buttonRef}
        type="submit"
        disabled={!stripe || !elements}
        className="hidden"
      >
        Pay
      </button>
      {/* Show error message to your customers */}
    </form>
  );
};
