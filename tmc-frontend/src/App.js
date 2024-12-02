import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import AutotraderVehicle from "./pages/AutotraderVehicle"
import VehicleLayout from "./layouts/VehicleLayout";
import MotoringLayout from "./layouts/MotoringLayout";
import UsedVehicle from "./pages/UsedVehicle";
import UsedTrucks from "./pages/UsedTrucks";
import UsedCars from "./pages/UsedCars";
import UsedVans from "./pages/UsedVans";
import Viewdetail from "./pages/Viewdetail";
import ContactUs from "./pages/ContactUs";
import SellYourVehicle from "./pages/SellYourVehicle";
import Finance from "./pages/Finance";
import Reviews from "./pages/Reviews";
import Videos from "./pages/Videos";
import Article from "./pages/Article";
import Warranties from "./pages/Warranties";
import MeetTeam from "./pages/MeetTeam";
import ShortList from "./pages/ShortList";
import BuyOnline from "./pages/BuyOnline";
import Checkout from "./pages/Checkout";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import FCADisclaimer from "./pages/FCADisclaimer";
import Disclaimer from "./pages/Disclaimer";
import SiteMap from "./pages/SiteMap";
import FAQ from "./pages/FAQ";
import TermsAndConditions from "./pages/TermsAndConditions";
import DetailArticle from "./pages/DetailArticle";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/autotradervehiclelocator",
      element: <AutotraderVehicle />,
    },
    {
      path: "/vehicles-for-sale/",
      element: <VehicleLayout />,
      children: [
        {
          path: "/vehicles-for-sale/",
          element: <UsedVehicle />,
        },
        {
          path: "/vehicles-for-sale/used-trucks",
          element: <UsedTrucks />,
        },
        {
          path: "/vehicles-for-sale/used-cars",
          element: <UsedCars />,
        },
        {
          path: "/vehicles-for-sale/used-vans",
          element: <UsedVans />,
        },
        {
          path: "/vehicles-for-sale/viewdetail/:vin",
          element: <Viewdetail />,
        },
        {
          path: "/vehicles-for-sale/viewdetail/:title/:vin",
          element: <Viewdetail />,
        },
      ],
    },
    {
      path: "/sell-your-vehicle",
      element: <SellYourVehicle />,
    },
    {
      path: "/checkout/:vin",
      element: <Checkout />,
    },
    {
      path: "/shortlist",
      element: <ShortList />,
    },
    {
      path: "/buy-online",
      element: <BuyOnline />,
    },
    {
      path: "/motoring-hub/",
      element: <MotoringLayout />,
      children: [
        {
          path: "/motoring-hub/finance",
          element: <Finance />,
        },
        {
          path: "/motoring-hub/warranties",
          element: <Warranties />,
        },
        {
          path: "/motoring-hub/reviews",
          element: <Reviews />,
        },
        {
          path: "/motoring-hub/videos",
          element: <Videos />,
        },
        {
          path: "/motoring-hub/blog",
          element: <Article />,
        },
      ],
    },
    {
      path: "/news/:url",
      element: <DetailArticle />,
    },
    {
      path: "/meet-the-team",
      element: <MeetTeam />,
    },
    {
      path: "/contact-us",
      element: <ContactUs />,
    },
    {
      path: "/sitemap",
      element: <SiteMap />,
    },
    {
      path: "/disclaimer",
      element: <Disclaimer />,
    },
    {
      path: "/privacy-policy",
      element: <PrivacyPolicy />,
    },
    {
      path: "/fca-disclaimer",
      element: <FCADisclaimer />,
    },
    {
      path: "/faq",
      element: <FAQ />,
    },
    {
      path: "/terms-and-conditions",
      element: <TermsAndConditions />,
    },
    {
      path: "*",
      index: true,
      element: <Navigate to="/" />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
