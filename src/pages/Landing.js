import ServicesCard from "../components/Filter&Sort/ServicesCard";
import InfoFilter from "../components/InfoFilter";

export default function Landing() {
  return (
    <>
      <div className="bg-[url('/src/img/banners/pexels-5255523.jpg')]  flex justify-center items-center min-h-[46vh] bg-cover bg-center bg-no-repeat ">
        <ServicesCard />
      </div>
      <InfoFilter />
    </>
  );
}
