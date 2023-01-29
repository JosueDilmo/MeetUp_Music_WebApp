import { GoogleMap, useLoadScript } from "@react-google-maps/api";

function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
  return (
    <div>
      <h1>Map</h1>
    </div>
  );
}

export default Map;
