import DisplayHosts from "../components/DisplayHosts";
import FilterOptions from "../components/Filter&Sort/FilterOptions";
import ReactMap from "../components/Map/ReactMap";

function Search() {
  return (
    <div className="container mx-auto flex flex-col justify-between py-4 px-2 md:px-10">
      <FilterOptions />
      <div className="flex flex-col sm:flex-row w-full justify-between gap-3 mt-3">
        <div className="card sm:w-1/2 overflow-auto h-[calc(100vh-300px)]">
          <DisplayHosts />
        </div>
        <div className="sm:w-1/2 overflow-hidden h-[calc(100vh-300px)] rounded-md border border-slate-300">
          <ReactMap />
        </div>
      </div>
    </div>
  );
}

export default Search;
