import Map, {Marker} from "react-map-gl";
import {connect} from "react-redux";
import {getGeocode} from "./Geocode";
import {useState} from "react";
import 'mapbox-gl/dist/mapbox-gl.css';

const mapStateToProps = (state) => {
    return {
        filteredHosts: state.hostsRed.filteredHosts
    }
}
const token = "pk.eyJ1Ijoic2xlZXB5Ym9va3dvcm0iLCJhIjoiY2wxZmF2cnE4MDBrajNrcGI0cTdmOXkxdCJ9.cVgltjTDgAB4Ger4rGjSBA";

function ReactMap(props) {
    const [loaded, setLoaded] = useState(false);

    let lat = 33.7490;
    let lng = -84.5610312;
    function load () {
        const addresses = props.filteredHosts.map((host) => {
            return `${host.street} , ${host.city}`;
        })
        if(!addresses) return;
        getGeocode(addresses[0]).then((result) => {
            lat = result.lat;
            lng = result.lng;
            setLoaded(true);
        });
    }

    load();
    return (
        <>
            {loaded && <Map
                initialViewState={{
                    longitude: lng,
                    latitude: lat,
                    zoom: 13
                }}
                style={{width: 1200, height: 800}}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken={token}
            >
                <Marker longitude={-84.5610312} latitude={33.7490} color="red"/>
            </Map>}
        </>
    );
}

export default connect(mapStateToProps)(ReactMap);