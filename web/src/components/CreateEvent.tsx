import * as Dialog from "@radix-ui/react-dialog";
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
  const [address, setAddress] = useState("");
  const GoogleApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        setAuthUser(user.uid);
        // setEventCoordinates(event);
      } else {
        setAuthUser(null);
      }
    });
    return unsubscribe;
  }, []);

  const createEvent = async (e: any) => {
    if (!authUser) {
      alert("Please login to create an event");
      e.preventDefault();
      return;
    } else {
      await axios
        .post(`http://localhost:3333/create-event/${authUser}`, {
          hourStart: hourStart,
          hourEnd: hourEnd,
          latitude: eventCoordinates?.lat,
          longitude: eventCoordinates?.lng,
          address: address,
        })
        .then(() => {
          alert("Event created successfully");
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const reverseGeocode = async () => {
    await axios(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${event.lat},${event.lng}&key=${GoogleApiKey}`
    )
      .then((response) =>
        setAddress(response.data.results[0].formatted_address)
      )
      .catch((error) => console.log(error));
    setEventCoordinates(event);
  };

  useEffect(() => {
    reverseGeocode();
  }, [event]);

  return (
    <Dialog.Root>
      <Dialog.Trigger>Add event?</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className=" bg-black/60 inset-0 fixed" />
        <Dialog.Content className="bg-gray-900 text-white fixed py-8 px-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg">
          <Dialog.Title className="text-3xl font-black">
            Create your event
          </Dialog.Title>
          <form>
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
              <Dialog.Close className="p-1">Cancel</Dialog.Close>
              <button onClick={(e) => createEvent(e)} className="p-1">
                Start Busking
              </button>
            </footer>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export default CreateEvent;
