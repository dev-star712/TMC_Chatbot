import Hero from "./Hero";
import PartExchange from "./PartExchange";
import AboutUsSummary from "./AboutUsSummary";
import CustomerFeedback from "./CustomerFeedback";
import Value from "./Value";
import Section1 from "./Section1";
import Section2 from "./Section2";
import FeaturedHub from "./FeaturedHub";
import SimilarVehicle from "../components/SimilarVehicle";

export default function Main() {
  return (
    <div className="block overflow-hidden w-screen">
      <Hero />
      <Section1 />
      <PartExchange />
      <Section2 />
      <CustomerFeedback />
      <AboutUsSummary />
      <SimilarVehicle
        title={["Featured", "Vehicles"]}
        link="/vehicles-for-sale/used-trucks"
      />
      <FeaturedHub />
      <Value />
    </div>
  );
}
