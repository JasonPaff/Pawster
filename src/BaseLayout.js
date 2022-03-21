import NavBar from "./parts/NavBar"

function BaseLayout(props) {
    return (
        <div>
            <NavBar />
            {props.children}
        </div>
    )

}


export default BaseLayout