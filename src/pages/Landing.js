import ServiceOptions from "../components/Filter&Sort/ServiceOptions";
import InfoFilter from "../components/InfoFilter";

export default function Landing() {
  return (
    <div className="flex-col justify-center h-full">
      <div id="banner" className="flex justify-center items-center">
        <ServiceOptions />
      </div>
      <InfoFilter />
    </div>
  );
}
