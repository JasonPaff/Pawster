// eslint-disable-next-line import/no-webpack-loader-syntax
import Map, {Marker, Popup} from "!react-map-gl";
import {connect} from "react-redux";
import {getGeocode} from "./Geocode";
import {useEffect, useState} from "react";
import 'mapbox-gl/dist/mapbox-gl.css';
import Pin from "./Pin";
import MapProfilePic from "./MapProfilePic";

const mapStateToProps = (state) => {
    return {
        filteredHosts: state.hostsRed.filteredHosts
    }
}
const token = "pk.eyJ1Ijoic2xlZXB5Ym9va3dvcm0iLCJhIjoiY2wxZmF2cnE4MDBrajNrcGI0cTdmOXkxdCJ9.cVgltjTDgAB4Ger4rGjSBA";

function ReactMap(props) {
    const [loaded, setLoaded] = useState(false);
    const [markers, setMarkers] = useState([]);
    const [popupInfo, setPopupInfo] = useState(null);

    let hostAddresses = [{lat: 33.74831, lng: -84.39111}];

    async function load() {
           const addresses = props.filteredHosts.map((host) => {
            return `${host.street} , ${host.city}`;
        })
        if (!addresses) return;

        for (let c = 0; c < addresses.length; c++) {
            const result = await getGeocode(addresses[c]).catch((err) => console.log(err));
            hostAddresses.push({lat: result.lat, lng: result.lng});
        }
        let pins = [];
        hostAddresses.map((address, index) => {
            if (index !== 0) {
                address.street = props.filteredHosts[index - 1].street;
                address.city = props.filteredHosts[index - 1].city;
                address.state = props.filteredHosts[index - 1].state;
                address.zipcode = props.filteredHosts[index - 1].zipcode;
                address.firstName = props.filteredHosts[index - 1].firstName;
                address.hostId = props.filteredHosts[index - 1].userId;
                pins.push(
                    <Marker key={address.lng} longitude={address.lng} latitude={address.lat} color="blue">
                        <Pin onClick={() => setPopupInfo(address)}/>
                    </Marker>
                )
            }
        });
        await setMarkers(pins);

        if (hostAddresses.length > 0)
            setLoaded(true);
    }

    useEffect(() => {
        load().catch((err) => console.log(err));
    }, [props.filteredHosts])

    return (
        <>
            {loaded && <Map
                initialViewState={{
                    longitude: hostAddresses[0].lng,
                    latitude: hostAddresses[0].lat,
                    zoom: 10
                }}
                style={{width: '100%', height: 800}}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken={token}
            >
                {markers}
                {popupInfo && (
                    <Popup
                        anchor="top"
                        longitude={Number(popupInfo.lng)}
                        latitude={Number(popupInfo.lat)}
                        closeOnClick={false}
                        onClose={() => setPopupInfo(null)}
                    >
                        <div>
                            <div className="mt-5">
                                <MapProfilePic hostId={popupInfo.hostId}/>
                                <div>{popupInfo.firstName}</div>
                                <div>{popupInfo.street}</div>
                                <div>{popupInfo.city} {popupInfo.state},{popupInfo.zipcode}</div>
                            </div>
                        </div>
                    </Popup>
                )}
            </Map>}
        </>
    );
}

export default connect(mapStateToProps)(ReactMap);