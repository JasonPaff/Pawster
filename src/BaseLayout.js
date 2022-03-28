import NavBar from "./parts/NavBar";
import Footer from "./parts/Footer";

export default function BaseLayout(props) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main>{props.children}</main>
        <Footer />
      </div>
    </>
  );
}
