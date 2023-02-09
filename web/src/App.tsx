import "./styles/main.css";
import NavigationBar from "./components/TopNavBar";
import Footer from "./components/MainFooter";
import MapWithMarkers from "./components/DisplayMarkers";
import DisplayEvents from "./components/DisplayEvents";

function App() {
  return (
    <div>
      <NavigationBar />

      <h1 className="text-8xl text-white font-bold mx-auto flex flex-col items-center mt-12 mb-2">
        IntMus
      </h1>
      <h2 className="text-4xl text-white font-light mx-auto flex flex-col items-center">
        Share your music
      </h2>
      <div className="mt-6 space justify-center flex space-x-36">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-bold rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Learn more
        </button>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-bold rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Sign up
        </button>
      </div>
      <div className="flex">
        <DisplayEvents />
        <MapWithMarkers />
      </div>

      <Footer />
    </div>
  );
}

export default App;
