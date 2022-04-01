import {Marker} from "@react-google-maps/api";
import React from "react";

export default function buildMarkers (props) {
    const markers = []
    const google = window.google;
    const geocoder = new google.maps.Geocoder();
    const addresses = props.filteredHosts.map((host) => {
        return `${host.street} , ${host.city}`;
    });

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
                        props.callback(markers)
                    }
                }
            }).catch((err) => console.log(err));
        })(i);
    }
}