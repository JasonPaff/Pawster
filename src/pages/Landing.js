import ServicesCard from "../components/Filter&Sort/ServicesCard";
import InfoFilter from "../components/InfoFilter";

export default function Landing() {
  return (
    <>
      <div id="banner" className="flex justify-center items-center">
        <ServicesCard />
      </div>
      <InfoFilter />
    </>
  );
}
