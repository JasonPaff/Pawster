import DisplayHosts from "../components/DisplayHosts";
import FilterOptions from "../components/FilterOptions";
import Map from "../parts/Map";
import "../styles/tailwind.output.css";

function Search() {
  return (
    <div className="flex-col justify-center">
      <h1>Search Page</h1>
      <FilterOptions />
      <DisplayHosts />
      <Map />
    </div>
  );
}

export default Search;