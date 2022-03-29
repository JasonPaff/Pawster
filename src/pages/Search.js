import DisplayHosts from "../components/DisplayHosts";
import FilterOptions from "../components/Filter&Sort/FilterOptions";
import MapBox from "../components/Map/MapBox";
import Map from "../components/Map/Map";

function Search() {
  return (
    <div className="flex justify-between">
      <div className="flex w-full justify-between p-5">
        <FilterOptions />
        <DisplayHosts />
      </div>
      
      <Map />
    </div>
  );
}

export default Search;