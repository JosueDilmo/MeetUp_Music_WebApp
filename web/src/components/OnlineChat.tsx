import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "../firebase/firebaseConfig";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  QueryDocumentSnapshot,
  query,
  addDoc,
} from "firebase/firestore";
import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";
import { Spinner } from "phosphor-react";

interface eventsFromDB {
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
}

interface messages {
  username: string;
  createdAt: Date;
  text: string;
}

interface userName {
  id: string;
  firstName: string;
  lastName: string;
}

const OnlineChat = (event: eventsFromDB) => {
  const [authUserId, setAuthUserId] = useState(null);
  const [authUserName, setAuthUserName] = useState<userName>();
  const [oldMessages, setOldMessagesData] = useState<messages[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const chatId = event.eventId;
  const joinedId = event?.joinedId;
  const ownerId = event.ownerId;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        setAuthUserId(user.uid);
        setLoading(false);
      } else {
        setAuthUserId(null);
      }
    });
    return unsubscribe;
  }, [authUserName]);

  const getUsername = async () => {
    await axios(`http://localhost:3333/user-name/${authUserId}`)
      .then((response) => {
        setAuthUserName(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openOnlineChat = (e: any) => {
    if (!authUserId) {
      alert("Please login to interact with the event");
      e.preventDefault();
      return;
    } else if (authUserId === ownerId) {
      return true;
    } else if (joinedId.includes(authUserId)) {
      return true;
    } else if (!joinedId.includes(authUserId)) {
      alert("Please join the event to interact with other users");
      e.preventDefault();
      return;
    }
  };

  const submitMessage = async (e: any) => {
    e.preventDefault();
    if (newMessage === "" || authUserName === undefined) {
      return;
    }

    const message: messages = {
      username: authUserName.firstName + " " + authUserName.lastName,
      createdAt: new Date(),
      text: newMessage,
    };

    try {
      await addDoc(collection(firestore, chatId), message);
    } catch (error) {
      console.log("error adding message: ", error);
    }

    setNewMessage("");
  };

  useEffect(() => {
    const orderedQuery = query(
      collection(firestore, chatId),
      orderBy("createdAt"),
      limit(50)
    );
    const unsubscribe = onSnapshot(orderedQuery, (snapshot) => {
      setOldMessagesData(
        snapshot.docs.map((doc: QueryDocumentSnapshot) => ({
          ...doc.data(),
          username: doc.data().username,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
        }))
      );
    });
    return unsubscribe;
  }, []);

  return (
    <Dialog.Root>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Dialog.Trigger
            type="button"
            className="mb-1 flex items-center justify-center text-xs font-medium rounded-full px-4 py-1 space-x-1 border-2 border-black bg-white hover:bg-black hover:text-white text-black dark:bg-slate-800 dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
            onClick={(e) => openOnlineChat(e)}
          >
            Chat
          </Dialog.Trigger>
          <Dialog.DialogPortal>
            <Dialog.Overlay className="bg-black/70 fixed inset-0" />
            <Dialog.Content className=" bg-gray-900 p-2 text-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl">
              <div className="h-[600px] w-auto overflow-auto no-scrollbar p-10 place-items-center ">
                {oldMessages.map((message: any, index) => (
                  <div className="p-2 border-2 rounded-xl mb-3" key={index}>
                    <span className="text-green-700">{message.username}:</span>
                    <span className="ml-4">{message.text}</span>
                  </div>
                ))}
              </div>
              <form className="flex m-1" onSubmit={submitMessage}>
                <input
                  className="w-full p-2 rounded-lg text-black"
                  type={"text"}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message here..."
                />
                <button
                  className="font-bold p-2 text-blue-500 hover:text-green-600"
                  onClick={getUsername}
                >
                  Send
                </button>
              </form>
            </Dialog.Content>
          </Dialog.DialogPortal>
        </>
      )}
    </Dialog.Root>
  );
};

export default OnlineChat;
