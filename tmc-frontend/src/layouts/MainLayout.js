import Header from "../components/Header";
import Bottom from "../components/Bottom";
import Footer from "../components/Footer";
import Topbar from "../components/Topbar";
import LiveChat from "../components/LiveChat";
import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeTheFirstQuestion } from "../redux/slices/chatbotSlice";

export default function MainLayout({ children }) {
  const location = useLocation();
  const dispatch = useDispatch();

  const setUrl = (value) => {
    dispatch(changeTheFirstQuestion(value));
  };

  useLayoutEffect(() => {
    setUrl(location);
    document.documentElement.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />
      <Header />
      <div className="block overflow-hidden flex-grow">{children}</div>
      <Footer />
      <Bottom />
      <LiveChat />
    </div>
  );
}
