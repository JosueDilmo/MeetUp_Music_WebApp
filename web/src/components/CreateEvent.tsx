import * as Dialog from "@radix-ui/react-dialog";
import { MarkerF } from "@react-google-maps/api";

export function CreateEvent(coordinates: { lat: number; lng: number }) {
  console.log(coordinates);
  return <MarkerF position={coordinates}></MarkerF>;
}
