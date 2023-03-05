import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { Spinner } from "phosphor-react";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebaseConfig";

interface userEvents {
  eventId: string;
  address: string;
  createdAt: string;
  hourStart: number;
  hourEnd: number;
}

export const UserProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profession, setProfession] = useState("");
  const [authUser, setAuthUser] = useState(null);
  const [authUserId, setAuthUserId] = useState(null);
  const [authUserEmail, setAuthUserEmail] = useState(null);
  const [userEvents, setUserEvents] = useState<userEvents[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        setAuthUserId(user.uid);
        setAuthUserEmail(user.email);
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (authUser) {
      getAllUserEvents();
    }
  }, [authUser]);

  const handleUpdate = async () => {
    await axios
      .put(`http://localhost:3333/update-user/${authUserId}`, {
        firstName,
        lastName,
        profession,
      })
      .then(() => {
        alert("Your details have been updated");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllUserEvents = async () => {
    await axios
      .get(`http://localhost:3333/user-events/${authUserId}`)
      .then((response) => {
        setUserEvents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = async (eventId: string) => {
    await axios
      .delete(`http://localhost:3333/delete-event/${eventId}`)
      .then(() => {
        alert("Your event has been deleted");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger className="hover:underline hover:text-white text-gray-400">
        Profile
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/70 fixed inset-0" />
        <Dialog.Content className=" bg-gray-900 p-2 text-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl">
          <div className="grid mt-3 h-1/2 place-items-center">
            <span className="text-3xl font-black">Profile</span>
            <span className="text-2xl my-2">{authUserEmail}</span>
            <div className="w-11/12 p-8 bg-white rounded-lg">
              <form className="" onSubmit={handleUpdate}>
                <div className="flex justify-between gap-3">
                  <span className="w-1/2">
                    <label
                      htmlFor="firstname"
                      className="block text-xs font-semibold text-gray-600 uppercase"
                    >
                      First Name
                    </label>
                    <input
                      id="firstname"
                      type="text"
                      name="firstname"
                      placeholder="John"
                      autoComplete="given-name"
                      className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                      required
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </span>
                  <span className="w-1/2">
                    <label
                      htmlFor="lastname"
                      className="block text-xs font-semibold text-gray-600 uppercase"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastname"
                      type="text"
                      name="lastname"
                      placeholder="Doe"
                      autoComplete="family-name"
                      className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                      required
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </span>
                </div>
                <span className="w-full">
                  <label
                    htmlFor="profession"
                    className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
                  >
                    Profession
                  </label>
                  <input
                    id="profession"
                    type="text"
                    name="profession"
                    placeholder="Guitarist"
                    autoComplete="profession"
                    className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                    required
                    onChange={(e) => setProfession(e.target.value)}
                  />
                </span>
                <button
                  type="submit"
                  className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-blue-700 hover:bg-blue-800 shadow-lg focus:outline-none hover:shadow-none"
                >
                  Update
                </button>
                <Dialog.Close className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-red-700 hover:bg-red-800 shadow-lg focus:outline-none hover:shadow-none">
                  Cancel
                </Dialog.Close>
              </form>
              <text className="my-2 text-black font-bold text-lg items-center flex flex-col">
                Your current events:
              </text>
              <div className="overflow-auto no-scrollbar h-40">
                {userEvents.map((event) => (
                  <div key={event.eventId} className="my-4 text-sm text-black">
                    <div className="flex flex-col content-between justify-center">
                      <span className="font-bold">
                        Location:{" "}
                        <span className="font-normal">{event.address}</span>
                      </span>
                      <span className="font-bold">
                        Duration:{" "}
                        <span className="font-normal">
                          {event.hourStart} - {event.hourEnd}
                        </span>
                      </span>
                      <span className="font-bold">
                        Date:{" "}
                        <span className="font-normal">{event.createdAt}</span>
                      </span>
                      <button
                        type="submit"
                        className="w-full py-3 mt-2 font-medium tracking-widest text-white uppercase bg-red-700 hover:bg-red-800 shadow-lg focus:outline-none hover:shadow-none"
                        onClick={() => handleDelete(event.eventId)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
