import React, { useMemo, useCallback, useRef, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { GoogleMap, InfoWindow, Marker, useLoadScript } from '@react-google-maps/api'
import usePlacesAutocomplete, {getGeocode, getLatLng} from 'use-places-autocomplete'
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox'
import "@reach/combobox/styles.css"
import '../../styles/Map.css'

// TODO: Split map and mapsearch functions?

const mapStateToProps = (state) => {
    return {
        filteredHosts: state.hostsRed.filteredHosts
    }
}

function Map(props) {

    const [pinMarkers, setPinMarkers] = useState([])
    const [ libraries ] = useState(['places']);


    const mapRef = useRef()
    const onLoad = useCallback(map => (mapRef.current = map), [])

    const API_KEY = process.env.REACT_APP_GOOGLE_API

    const google = window.google


    const panTo = React.useCallback(({lat, lng}) => {
        mapRef.current.panTo({lat, lng})
        mapRef.current.setZoom(14);
    })

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: API_KEY,
        libraries,
    })

    if (!isLoaded) return <div>Loading...</div>
      
    // const options = useMemo(() => ({
    //     disableDefaultUI: false,
    //     clickableIcons: true
    // }), [])


    var geocoder=new google.maps.Geocoder();

    const buildMarkers = (callback) => {
        const markers = []
        const addresses = props.filteredHosts.map((host) => {
            return host.street +", "+ host.city
        })
        for (var i = 0; i < addresses.length; i++) {
            (function(i) {
    
            // Use geocoder to grab latlong for user inputed address
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
                }
                });
            })(i);
        }
    }

    buildMarkers((markers)=>{setPinMarkers(markers)})


    function MapSearch({ panTo }) {
        const {ready, value, suggestions: {status, data}, setValue, clearSuggestions
        } = usePlacesAutocomplete({
            requestOptions: {
                location: {lat: () => 53.7490, lng: () => -84.5610312},
                radius: 200 * 1000,
            }
        })

        return (
            <div className="search">
                <Combobox onSelect={async (address) => {
                    setValue(address, false);
                    clearSuggestions();
                    try {
                        const results = await getGeocode({address});
                        console.log(results)
                        const { lat, lng } = await getLatLng(results[0])
                        panTo({ lat, lng })
                    } catch (error) {
                        console.log("Error!")
                    }
                }}>
                    <ComboboxInput value={value} onChange={(e) => {
                        setValue(e.target.value)
                    }}
                    disabled={!ready}
                    placeholder="Enter an Address"
                    />
                    <ComboboxPopover className="popup">
                        {status === "OK" && data.map(({id, description}) => (<ComboboxOption key={id} value={description}/>))}
                    </ComboboxPopover>
                </Combobox>
            </div>
        ) 
    }
    
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