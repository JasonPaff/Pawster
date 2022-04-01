import Map, {Marker} from "react-map-gl";
import {connect} from "react-redux";
import {getGeocode} from "./Geocode";
import {useEffect, useState} from "react";
import 'mapbox-gl/dist/mapbox-gl.css';

const mapStateToProps = (state) => {
    return {
        filteredHosts: state.hostsRed.filteredHosts
    }
}
const token = "pk.eyJ1Ijoic2xlZXB5Ym9va3dvcm0iLCJhIjoiY2wxZmF2cnE4MDBrajNrcGI0cTdmOXkxdCJ9.cVgltjTDgAB4Ger4rGjSBA";

let hostAddresses = [];
function ReactMap(props) {
    const [loaded, setLoaded] = useState(false);
    const [markers, setMarkers] = useState([]);

    async function load() {
        console.log('ehee')
        const addresses = props.filteredHosts.map((host) => {
            return `${host.street} , ${host.city}`;
        })
        if (!addresses) return;

        for (let c = 0; c < addresses.length; c++) {
            const result = await getGeocode(addresses[c]).catch((err) => console.log(err));
            hostAddresses.push({lat: result.lat, lng: result.lng});
        }
        let pins = [];
        hostAddresses = hostAddresses.map((address) => {
            return (<Marker key={address.lng} longitude={address.lng} latitude={address.lat} color="blue"/>)
        });
        await setMarkers(pins);

        if (hostAddresses.length > 0)
            setLoaded(true);
    }
    useEffect(() => {
        console.log(props.filteredHosts);
        load().catch((err) => console.log(err));
    }, [props.filteredHosts])

    return (
        <>
            {hostAddresses.length > 0 && <Map
                initialViewState={{
                    longitude: hostAddresses[0].lng,
                    latitude: hostAddresses[0].lat,
                    zoom: 13
                }}
                style={{width: '100%', height: 800}}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken={token}
            >
                {markers}
            </Map>}
        </>
    );
}

export default connect(mapStateToProps)(ReactMap);