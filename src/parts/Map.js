import React, { useMemo, useCallback, useRef, useState } from 'react'
import { GoogleMap, InfoWindow, Marker, useLoadScript } from '@react-google-maps/api'
import '../styles/Map.css'

function Map(props) {
    
    const mapRef = useRef()
    const onLoad = useCallback(map => (mapRef.current = map), [])

    const API_KEY = process.env.REACT_APP_GOOGLE_API

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: API_KEY
    })

    if (!isLoaded) return <div>Loading...</div>
      

    // const options = useMemo(() => ({
    //     disableDefaultUI: false,
    //     clickableIcons: true
    // }), [])



    return (
        <div>
            <GoogleMap
            zoom={9}
            center={{lat: 33.7490, lng: -84.5610312}}
            mapContainerClassName="mapContainer"
            // options={options}
            onLoad={onLoad}
            >
                {/* {props.listings.map((listing) => (
                    <Marker 
                    key={listing.id} 
                    position={{lat: listing.lat, lng: listing.lng}} 
                    onClick={() => setSelectedListing(listing)} 
                    />
                ))}

                {selectedListing ? (
                    <InfoWindow 
                        position={{lat:selectedListing.lat, lng: selectedListing.lng}}
                        onCloseClick={() => {
                            setSelectedListing(null)
                        }}
                    >
                        <div>
                            <h3>{selectedListing.title}</h3>
                        </div>
                    </InfoWindow>): null}

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


export default Map