import * as Dialog from "@radix-ui/react-dialog";
import { MarkerF } from "@react-google-maps/api";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";

type LatLngLiteral = google.maps.LatLngLiteral;

const CreateEvent = (event: LatLngLiteral) => {
  const [hourStart, setHourStart] = useState("");
  const [hourEnd, setHourEnd] = useState("");
  const [authUser, setAuthUser] = useState(null);
  const [eventCoordinates, setEventCoordinates] = useState<LatLngLiteral>();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        setAuthUser(user.uid);
        setEventCoordinates(event);
      } else {
        setAuthUser(null);
      }
    });
    return () => listen();
  }, []);

  const createEvent = async () => {
    await axios
      .post(`http://localhost:3333/create-event/${authUser}`, {
        hourStart: hourStart,
        hourEnd: hourEnd,
        latitude: eventCoordinates.lat,
        longitude: eventCoordinates.lng,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        window.location.reload();
      });
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>Add event?</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className=" bg-black/60 inset-0 fixed" />
        <Dialog.Content className="bg-gray-900 text-white fixed py-8 px-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg">
          <Dialog.Title className="text-3xl font-black">
            Create your event
          </Dialog.Title>
          <form onSubmit={createEvent}>
            <div>
              <label htmlFor="hourStart">
                Introduce the duration of the event:
              </label>
              <div className="text-black">
                <input
                  id="hourStart"
                  type="time"
                  placeholder="Start"
                  onChange={(e) => setHourStart(e.target.value)}
                  required
                ></input>
                <input
                  id="hourEnd"
                  type="time"
                  placeholder="End"
                  onChange={(e) => setHourEnd(e.target.value)}
                  required
                ></input>
              </div>
            </div>
            <footer>
              <Dialog.Close>Cancel</Dialog.Close>
              <button type="submit">Start Busking</button>
            </footer>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export default CreateEvent;
