import "../../styles/main.css";
import logomMiniImg from "../../assets/min_logo.svg";
import SignIn from "../authentication/SignIn";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

const TopNavBar = () => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        setAuthUser(user.email);
        console.log(user.email);
      } else {
        setAuthUser(null);
      }
    });
    return () => listen();
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => console.log("Signed out"))
      .catch((error) => console.log(error));
  };

  return (
    <nav className="px-2 sm:px-4 py-2.5 bg-gray-900 ">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <a href="#" className="flex items-center">
          <img
            src={logomMiniImg}
            className="h-6 mr-3 sm:h-9"
            alt="IntMus Logo"
          />
        </a>
        <div className="w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col p-4 mt-4 border bg-gray-900 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-gray-900 dark:bg-gray-900 md:dark:bg-gray-900">
            <li className="text-white">
              {authUser ? (
                <>
                  {`Signed In as ${authUser}`}
                  <button
                    className=" hover:underline hover:text-white text-gray-400 ml-8"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <SignIn />
              )}
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-400 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Learn more
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-400 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-400 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                FAQ
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-400 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                About us
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default TopNavBar;
