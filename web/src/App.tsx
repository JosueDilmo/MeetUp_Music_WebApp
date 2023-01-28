import "./styles/main.css";
import logoImg from "./assets/logo.svg";
import logomMiniImg from "./assets/min_logo.svg";

function App() {
  return (
    <div className="ml-6 mt-4">
      <img src={logomMiniImg} alt="" />

      <h1 className="text-8xl text-white font-bold mx-auto flex flex-col items-center mt-12 mb-2">
        IntMus
      </h1>
      <h2 className="text-4xl text-white font-light mx-auto flex flex-col items-center">
        Share your music
      </h2>
    </div>
  );
}

export default App;
