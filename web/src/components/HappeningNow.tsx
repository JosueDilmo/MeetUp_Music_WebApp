import "../styles/main.css";
import NavigationBar from "./TopNavBar";
import Footer from "./MainFooter";
import DisplayMarkers from "./DisplayMarkers";
import DisplayEvents from "./DisplayEvents";

function HappeningNow() {
  return (
    <div>
      <NavigationBar />
      <DisplayEvents />
      <DisplayMarkers />
      <Footer />
    </div>
  );
}
export default HappeningNow;
