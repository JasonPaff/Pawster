import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import {Combobox, ComboboxInput, ComboboxOption, ComboboxPopover} from "@reach/combobox";
import React from "react";

export default function MapSearch(props) {
    const {
        ready, value, suggestions: {status, data}, setValue, clearSuggestions
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
                    const {lat, lng} = await getLatLng(results[0])
                    props.panTo({lat, lng})
                } catch (error) {
                    console.log("Error!")
                }
            }}>
                <ComboboxInput value={value}
                    disabled={!ready}
                    placeholder="Enter an Address"
                    onChange={(e) => { setValue(e.target.value) }}
                />
                <ComboboxPopover className="popup">
                    {status === "OK" && data.map(({id, description}) => (
                        <ComboboxOption key={id} value={description}/>))}
                </ComboboxPopover>
            </Combobox>
        </div>
    );
};