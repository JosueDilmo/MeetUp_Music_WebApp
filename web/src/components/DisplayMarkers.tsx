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
import * as Dialog from "@radix-ui/react-dialog";
import DisplayEvents from "./DisplayEvents";

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
  //const GoogleApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string;

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
          <Dialog.Root>
            <Dialog.Trigger>Add event?</Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className=" bg-black/60 inset-0 fixed" />
              <Dialog.Content className="bg-gray-900 text-white fixed py-8 px-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg">
                <Dialog.Title className="text-3xl font-black">
                  Create your event
                </Dialog.Title>
                <Dialog.Content>
                  <form>
                    <div>
                      <label htmlFor="hourStart">
                        Introduce the duration of the event:
                      </label>
                      <div>
                        <input
                          id="hourStart"
                          type="time"
                          placeholder="Start"
                        ></input>
                        <input
                          id="hourEnd"
                          type="time"
                          placeholder="End"
                        ></input>
                      </div>
                    </div>
                    <footer>
                      <button>Cancel</button>
                      <button type="submit">Start Busking</button>
                    </footer>
                  </form>
                </Dialog.Content>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

export default DisplayMarkers;
