import Geocode from "react-geocode";

export async function getGeocode(address) {
    Geocode.setApiKey("AIzaSyDLGK5HZ52V33C4nbX8kXQ-IIveo_A0QpM");
    Geocode.setLanguage('en');
    Geocode.setLocationType("ROOFTOP");

    const response = await Geocode.fromAddress(address);
    if(!response) return { lat: 33.7490, lng: -84.5610312}
    const {lat, lng} = response.results[0].geometry.location;
    return {lat, lng};
}