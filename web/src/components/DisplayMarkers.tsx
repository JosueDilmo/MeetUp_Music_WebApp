import "../styles/main.css";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Spinner } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import { CreateEvent } from "./CreateEvent";

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
    //FIXME: Replace this with PROCESS.ENV.GOOGLE_MAPS_API_KEY
    // process.env.GOOGLE_MAPS_API_KEY
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  });

  // If the map is not loaded, show a spinner
  if (!isLoaded) {
    return <Spinner />;
  }

  return (
    <Dialog.Root>
      <GoogleMap
        zoom={15}
        center={center}
        mapContainerClassName="w-[60%] h-[512px] mx-auto rounded-xl mt-12 mb-12"
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
        {/*event.lat !== 0 && event.lng !== 0 && <CreateEvent coordinates={event} />*/}
        {/*DIALOG TRIGGER NA MARKER PRA ABRIR O MODAL*/}
        <Dialog.Trigger>
          <MarkerF
            clickable={true}
            position={{ lat: event.lat, lng: event.lng }}
          />
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className=" bg-black/60 inset-0 fixed" />
          <Dialog.Content>
            <Dialog.Title>Add Your Event</Dialog.Title>
            <Dialog.Content>CREATE YOUR EVENT</Dialog.Content>
          </Dialog.Content>
        </Dialog.Portal>
      </GoogleMap>
    </Dialog.Root>
  );
}

export default DisplayMarkers;
