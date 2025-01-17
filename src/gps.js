import "./scss/map.scss";
import { ToastContainer, toast } from "react-toastify";
import WrappedMap from "./components/location/Map";

const showToast = (message, type) => {
  console.log("Showing toast...");
  toast[type](message); // Use the 'type' argument to determine the toast type
};

const GPS = () => {
  const mapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyB1HsnCUe7p2CE8kgBjbnG-A8v8aLUFM1E`;

  return (
    <>
      <ToastContainer style={{ zIndex: 9999 }} /> {/* to show above all */}
      <div className="gps_page" style={{ paddingTop: "58px" }}>
        <div className="gps_map">
          <WrappedMap
            showToast={showToast}
            googleMapURL={mapURL}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div className="mapContainer" />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      </div>
    </>
  );
};
export default GPS;
