import "./styles/main.css";
import TopNavBar from "./components/navigation/TopNavBar";
import Footer from "./components/navigation/Footer";
import DisplayMarkers from "./components/DisplayMarkers";
import DisplayEvents from "./components/DisplayEvents";
import SignUp from "./components/authentication/SignUp";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";

function App() {
  // Get all information from the database [events/users]
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        setAuthUser(user.email);
      } else {
        setAuthUser(null);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <div>
      <TopNavBar />
      <h1 className="text-8xl text-white font-bold mx-auto flex flex-col items-center mt-12 mb-2">
        MeetUp
      </h1>
      <h2 className="text-4xl text-white font-light mx-auto flex flex-col items-center">
        Integrate with your community
      </h2>
      <div className="mt-6 justify-center flex space-x-36">
        {authUser ? (
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-bold rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Learn more
          </button>
        ) : (
          <>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-bold rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Learn more
            </button>
            <SignUp />
          </>
        )}
      </div>
      <div className="flex">
        <div className="overflow-auto no-scrollbar h-[600px] w-auto mt-12 ml-auto flex items-center flex-col">
          <DisplayEvents />
        </div>
        <DisplayMarkers />
      </div>
      <Footer />
    </div>
  );
}

export default App;
