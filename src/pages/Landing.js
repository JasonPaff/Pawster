import ServiceCard from "../components/Filter&Sort/ServiceCard";
import InfoFilter from "../components/InfoFilter";

export default function Landing() {
  return (
    <div className="flex-col justify-center h-full">
      <div id="banner" className="flex justify-center items-center">
        <ServiceCard />
      </div>
      <InfoFilter />
    </div>
  );
}
