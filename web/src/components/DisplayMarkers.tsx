import "../styles/main.css";
import {
  GoogleMap,
  InfoWindow,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Spinner } from "phosphor-react";
import CreateEvent from "./CreateEvent";

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

type eventsFromDB = {
  eventId: string;
  latitude: number;
  longitude: number;
};

function DisplayMarkers() {
  const [markers, setMarkers] = useState<eventsFromDB[]>([]);
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState<LatLngLiteral>({ lat: 0, lng: 0 });
  const [open, setOpen] = useState(false);
  const GoogleApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string;

  // Get the events from the database
  useEffect(() => {
    axios("http://localhost:3333/get-events").then((response) => {
      setMarkers(response.data);
      setLoading(false);
    });
  }, []);

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

  // Load the map
  const { isLoaded } = useLoadScript({
    //FIXME: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    googleMapsApiKey: GoogleApiKey,
  });

  // If the map is not loaded, show a spinner
  if (!isLoaded) {
    return <Spinner />;
  }

  return (
    <GoogleMap
      zoom={15}
      center={center}
      mapContainerClassName="w-[60%] h-[512px] rounded-xl mt-12 mb-12 mx-auto"
      options={options}
      onClick={(event) => {
        const coordinates = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        setEvent(coordinates);
        console.log(coordinates);
      }}
    >
      {loading ? (
        // If events are not loaded show a spinner
        <Spinner />
      ) : (
        markers.map((marker) => (
          <MarkerF
            key={marker.eventId}
            position={{ lat: marker.latitude, lng: marker.longitude }}
          />
        ))
      )}
      {/* Custom marker when user clicks on the map */}
      <MarkerF
        position={event}
        onClick={() => {
          setOpen(true);
          console.log(event);
        }}
      />
      {/* Open InfoWindow when user clicks on the marker */}
      {open && (
        <InfoWindow
          position={event}
          onCloseClick={() => {
            setOpen(false);
          }}
        >
          {/* Modal for creating an event */}
          <CreateEvent {...event} />
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

export default DisplayMarkers;
