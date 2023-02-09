import "../styles/main.css";
import { MarkerF } from "@react-google-maps/api";
import { Spinner } from "phosphor-react";

interface eventsFromDB {
  eventId: string;
  latitude: number;
  longitude: number;
}
export default function DisplayMarkers(markers: eventsFromDB[]) {
  console.log(markers);
  if (markers.length == 0) return <Spinner />;

  return markers.map((marker) => (
    <MarkerF
      key={marker.eventId}
      position={{ lat: marker.latitude, lng: marker.longitude }}
    />
  ));
}
