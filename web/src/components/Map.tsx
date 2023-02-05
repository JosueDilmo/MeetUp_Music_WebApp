import "../styles/main.css";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useCallback, useMemo, useRef, useState, useEffect } from "react";

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;
type eventsFromDatabase = {
  eventId: string;
  latitude: number;
  longitude: number;
};

export default function Map() {
  const [events, setEvents] = useState<eventsFromDatabase[]>([]);

  useEffect(() => {
    fetch("http://localhost:3333/get-events")
      .then((response) => response.json())
      .then((data) => setEvents(data));
  }, []);

  console.log(events);

  // Reference to the map instance
  const mapRef = useRef<GoogleMap>();
  // Set the center of the map at Dublin
  const center = useMemo<LatLngLiteral>(
    () => ({ lat: 53.345, lng: -6.262 }),
    []
  );
  // Options for the map
  const options = useMemo<MapOptions>(
    () => ({ disableDefaultUI: true, clickableIcons: false }),
    []
  );
  // Callback to set the map instance
  // TODO:FIXME: Parameter 'map' implicitly has an 'any' type.ts(7006)
  const onLoad = useCallback((map: any) => (mapRef.current = map), []);

  const { isLoaded } = useLoadScript({
    //TODO:FIXME: Replace this with PROCESS.ENV.GOOGLE_MAPS_API_KEY
    // process.env.GOOGLE_MAPS_API_KEY,
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) {
    return <div className="">Loading...</div>;
  }

  return (
    <GoogleMap
      zoom={15}
      center={center}
      mapContainerClassName=" w-[60%] h-[512px] justify-center mx-auto rounded-xl mt-12 mb-12"
      options={options}
      onLoad={onLoad}
    >
      {events.map((event) => {
        return (
          <Marker
            key={event.eventId}
            position={{ lat: event.latitude, lng: event.longitude }}
          />
        );
      })}

      {/* TODO:FIXME: Add markers */}
    </GoogleMap>
  );
}
