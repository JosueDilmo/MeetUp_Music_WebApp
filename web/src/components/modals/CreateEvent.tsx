import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebaseConfig";

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
          <form>
            <span className="text-3xl font-black flex justify-center">
              Create your event
            </span>
            <div className="p-2 ">
              {/* <span className="flex justify-center">
                Introduce the duration of the event
              </span> */}
              <div className="flex flex-col space-betwen justify-center p-4 ">
                <span className="text-white">Start at: </span>
                <input
                  className="text-black rounded-md p-1"
                  id="hourStart"
                  type="time"
                  placeholder="Start"
                  onChange={(e) => setHourStart(e.target.value)}
                  required
                ></input>
                <span className="text-white mt-4">Finish at:</span>
                <input
                  className="text-black rounded-md p-1"
                  id="hourEnd"
                  type="time"
                  placeholder="End"
                  onChange={(e) => setHourEnd(e.target.value)}
                  required
                ></input>
              </div>
              <div className="flex justify-between items-center">
                <Dialog.Close className="border-2 border-black p-1 rounded-lg bg-red-600 text-black font-bold">
                  Cancel
                </Dialog.Close>
                <button
                  onClick={(e) => createEvent(e)}
                  className="border-2 border-black p-1 rounded-lg bg-green-600 text-black font-bold"
                >
                  Start
                </button>
              </div>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export default CreateEvent;
