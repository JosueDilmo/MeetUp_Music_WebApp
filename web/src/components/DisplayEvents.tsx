import "../styles/main.css";
import { useEffect, useState } from "react";
import { Spinner } from "phosphor-react";
import { onAuthStateChanged, reload } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import axios from "axios";
import GetUsername from "./utils/GetUsername";
import OnlineChat from "./OnlineChat";

interface eventsFromDB {
  eventId: string;
  ownerId: string;
  joinedId: string[];
  latitude: number;
  longitude: number;
  address: string;
  hourStart: number;
  hourEnd: number;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
  };
}

const DisplayEvents = () => {
  const [events, setEvents] = useState<eventsFromDB[]>([]);
  const [eventLoading, setEventLoading] = useState(true);
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    axios("http://localhost:3333/happening-now")
      .then((response) => {
        setEvents(response.data);
        setEventLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

  const joinEvent = (e: any, eventId: string) => {
    if (!authUser) {
      alert("Please login to join an event");
      e.preventDefault();
      return;
    } else {
      axios
        .put(`http://localhost:3333/join-event/${eventId}`, {
          userId: authUser,
        })
        .then(() => {
          alert("You have joined the event");
          window.location.reload();
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    }
  };

  return (
    <>
      {eventLoading ? (
        <Spinner />
      ) : (
        events.map((event) => (
          <div key={event.eventId} className="w-full rounded-xl mb-8">
            <div className="border-blue-700 border-2 w-full px-6 py-2 break-inside relative flex flex-col justify-between space-y-2 text-sm rounded-xl bg-slate-800 text-white">
              <span className="text-base font-bold">
                {`${event.user.firstName} ${event.user.lastName}`}
              </span>
              <div>
                <span className="font-bold">Artist in the event:</span>
                <div className="overflow-auto no-scrollbar h-[65px]">
                  <GetUsername {...event.joinedId} />
                </div>
              </div>
              <div>
                <p className="font-bold">Latitude:</p>{" "}
                {event.latitude.toFixed(5)}
                <p className="font-bold">Longitude:</p>{" "}
                {event.longitude.toFixed(5)}
              </div>
              <div>
                <span className="font-bold">
                  Location:{" "}
                  <span className="font-normal">
                    {event.address.split(",")[0] +
                      "," +
                      event.address.split(",")[1]}
                  </span>
                </span>
              </div>
              <div className="w-full">
                <div className="flex flex-col content-between justify-center">
                  <span className="font-bold">
                    Start at:
                    <span className="font-normal"> {event.hourStart}</span>
                  </span>
                  <span className="font-bold">
                    Finish at:
                    <span className="font-normal"> {event.hourEnd}</span>
                  </span>
                </div>
                <span className="font-bold ">Date:</span> {event.createdAt}
              </div>
              <div className="flex justify-between items-center w-full p-2 mr-2">
                <button
                  className="mb-1 flex items-center justify-center text-xs font-medium rounded-full px-4 py-1 space-x-1 border-2 border-black bg-white hover:bg-black hover:text-white text-black dark:bg-slate-800 dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
                  onClick={(e) => joinEvent(e, event.eventId)}
                >
                  <span>Join busking</span>
                </button>
                <OnlineChat {...event} />
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default DisplayEvents;
