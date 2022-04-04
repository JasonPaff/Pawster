import NavBar from "./parts/NavBar";
import Footer from "./parts/Footer";
import Dashboard from "./parts/Dashboard";
import DashboardMobile from "./parts/DashboardMobile";
import { Outlet } from "react-router-dom";

function BaseLayout(props) {
  return (
    <div className="flex flex-col min-h-screen pb-24 ">
      <NavBar />
      <main className="flex flex-col justify-center ">
        <Outlet /> {/*  <-- nested routes rendered here */}
      </main>
      <footer className="flex absolute bottom-0 w-full justify-center items-center py-3 bg-background-darker">
        <Footer />
      </footer>
    </div>
  );
}

function DashboardLayout(props) {
  return (
    <div className="flex flex-col min-h-screen pb-24">
      <NavBar />
      <main className="flex flex-col container mx-auto py-4 gap-3 xl:px-14 flex-grow w-full h-full">
        <div className="flex flex-col md:flex-row gap-4 xl:gap-6 ">
          <div className="hidden md:flex flex-col  w-64 gap-3 shrink-0">
            <Dashboard />
          </div>
          <div className="md:hidden relative">
            <DashboardMobile />
          </div>
          <div className="card flex-auto">
            <Outlet /> {/*  <-- nested routes rendered here */}
          </div>
        </div>
      </main>
      <footer className="flex absolute bottom-0 w-full justify-center items-center py-3 bg-background-darker">
        <Footer />
      </footer>
    </div>
  );
}

export { BaseLayout, DashboardLayout };
