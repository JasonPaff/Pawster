import NavBar from "./parts/NavBar";

export default function BaseLayout(props) {
  return (
    <div>
      <NavBar />
      {props.children}
    </div>
  );
}
