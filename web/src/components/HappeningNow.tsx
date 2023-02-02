import "../styles/main.css";
import NavigationBar from "./TopNavBar";
import Footer from "./MainFooter";
import Map from "./Map";
import DisplayEvents from "./DisplayEvents";

function HappeningNow() {
  return (
    <div>
      <NavigationBar />
      <DisplayEvents />
      <Map />
      <Footer />
    </div>
  );
}
export default HappeningNow;
