import "../styles/main.css";
import { useEffect, useState } from "react";
import { Spinner } from "phosphor-react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import axios from "axios";
import GetUsername from "./GetUsername";

type eventsFromDB = {
  eventId: string;
  ownerId: string;
  joinedId: string[];
  latitude: number;
  longitude: number;
  hourStart: number;
  hourEnd: number;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
  };
};

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
    const listen = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        setAuthUser(user.uid);
      } else {
        setAuthUser(null);
      }
    });
    return () => listen();
  }, []);

  const joinEvent = (eventId: string) => {
    axios
      .put(`http://localhost:3333/join-event/${eventId}`, {
        userId: authUser,
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
    <>
      {eventLoading ? (
        <Spinner />
      ) : (
        events.map((event) => (
          <div key={event.eventId}>
            <div className="break-inside relative flex flex-col justify-between space-y-3 text-sm rounded-xl p-4 mb-4 bg-slate-800 text-white">
              <div className="flex flex-row items-center space-x-3">
                <div className="flex flex-none items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="14 2 18 6 7 17 3 17 3 13 14 2" />
                    <line x1="3" y1="22" x2="21" y2="22" />
                  </svg>
                </div>
                <span className="text-base font-bold">
                  {`${event.user.firstName} ${event.user.lastName}`}
                </span>
              </div>
              <div>
                <span className="font-bold">Artist in the event:</span>
                <GetUsername {...event.joinedId} />
              </div>
              <div>
                <p className="font-bold">Latitude:</p> {event.latitude}
                <p className="font-bold">Longitude:</p> {event.longitude}
              </div>
              <div>
                <p className="font-bold">Date:</p> {event.createdAt}
              </div>
              <div>
                <p className="font-bold">Start at:</p> {event.hourStart}
                <p className="font-bold">Finish at:</p> {event.hourEnd}
              </div>
              <div className="flex justify-between items-center">
                <button
                  className="flex items-center justify-center text-xs font-medium rounded-full px-4 py-1 space-x-1 border-2 border-black bg-white hover:bg-black hover:text-white text-black dark:bg-slate-800 dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
                  onClick={() => joinEvent(event.eventId)}
                >
                  <span>Join busking</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h13M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default DisplayEvents;
