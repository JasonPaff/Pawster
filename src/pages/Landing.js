import ServiceOptions from "../components/Filter&Sort/ServiceOptions";
import InfoFIlter from "../components/InfoFIlter";

export default function Landing() {
  return (
    <div className="flex-col justify-center h-full">
      <div id="banner" className="flex justify-center items-center">
        <ServiceOptions />
      </div>
      <InfoFIlter />
    </div>
  );
}
