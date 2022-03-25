import NavBar from "./parts/NavBar";
import Footer from "./parts/Footer";

export default function BaseLayout(props) {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <main className=" flex-grow">{props.children}</main>
      <Footer />
    </div>
  );
}
