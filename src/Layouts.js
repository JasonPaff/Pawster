import NavBar from "./parts/NavBar";
import Footer from "./parts/Footer";
import Dashboard from "./parts/Dashboard";
import { Outlet } from "react-router-dom";

function BaseLayout(props) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <Outlet /> {/*  <-- nested routes rendered here */}
      <Footer />
    </div>
  );
}

function DashboardLayout(props) {
  return (
    <div className="flex flex-col min-h-screen ">
      <NavBar />
      <div className="flex container mx-auto pt-4 pb-24 gap-3 h-full flex-grow w-full">
        <div className="flex flex-col  w-64 gap-3 shrink-0">
          <Dashboard />
        </div>

        <div className="card flex-auto ">
          <Outlet /> {/*  <-- nested routes rendered here */}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export { BaseLayout, DashboardLayout };
