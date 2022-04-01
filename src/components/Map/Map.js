import React, {useCallback, useRef, useState} from 'react';
import { connect } from 'react-redux';
import { GoogleMap,Marker, useLoadScript } from '@react-google-maps/api';
import "@reach/combobox/styles.css";
import '../../styles/Map.css';
import MapSearch from "./MapSearch";

// TODO: Split map and mapsearch functions?

const mapStateToProps = (state) => {
    return {
        filteredHosts: state.hostsRed.filteredHosts
    }
}

function Map(props) {
    const [pinMarkers, setPinMarkers] = useState([]);
    const [ libraries ] = useState(['places']);
    const mapRef = useRef();
    const onLoad = useCallback(map => (mapRef.current = map), []);
    const API_KEY = process.env.REACT_APP_GOOGLE_API;
    const google = window.google;
    const geocoder = new google.maps.Geocoder();
    const panTo = useCallback(({lat, lng}) => {
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(14);
    },[]);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: API_KEY,
        libraries,
    });

    if (!isLoaded) return <div>Loading...</div>
      
    // const options = useMemo(() => ({
    //     disableDefaultUI: false,
    //     clickableIcons: true
    // }), [])

    const buildMarkers = (callback) => {
        const markers = []
        const addresses = props.filteredHosts.map((host) => {
            return `${host.street} , ${host.city}`;
        })
        for (let i = 0; i < addresses.length; i++) {
            (function(i) {

            // Use geocoder to grab lat & long for user entered address
            geocoder.geocode({'address': addresses[i]}, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    // Redefine map center location
                    // if (i == 1){map.setCenter(results[0].geometry.location); }
                    // Create dynamic markers on map as per the address array
                    const markerComponent = <Marker
                    key={i}
                    position={{lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()}}
                    icon={{
                        url: "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_blue"+(i+1)+".png",
                        scaledSize: new window.google.maps.Size(28,43),
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15)
                        }}/>
                    markers.push(markerComponent)
                    if (markers.length === addresses.length) {
                        callback(markers)
                    }
                }}).catch((err) => console.log(err));
            })(i);
        }
    }

    buildMarkers((markers)=>{setPinMarkers(markers)});
    
    return (
        <div className="flex-col justify-end">
            <MapSearch panTo={panTo}/>
            <GoogleMap
            zoom={9}
            center={{lat: 33.7490, lng: -84.5610312}}
            mapContainerClassName="mapContainer"
            // options={options}
            onLoad={onLoad}
            >
                
            {pinMarkers}

                {/* {props.listings.map((listing) => (
                    <Marker 
                    key={listing.id} 
                    position={{lat: listing.lat, lng: listing.lng}} 
                    onClick={() => setSelectedListing(listing)} 
                    />
                ))}

                <Marker 
                position={{lat: props.latitude, lng: props.longitude}} 
                icon={{
                    url: home, 
                    scaledSize: new window.google.maps.Size(30,30),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(15, 15)
                    }}/> */}
            </GoogleMap>
        </div>
    )
}

export default connect(mapStateToProps)(Map)