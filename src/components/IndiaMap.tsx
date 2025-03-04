import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface IndiaMapProps {
  alertData: any;
}

const IndiaMap: React.FC<IndiaMapProps> = ({ alertData }) => {
  // Ensure alertData is an array before mapping
  if (!alertData || !Array.isArray(alertData)) {
    return <p className="text-center">Loading Alert Map...</p>;
  }

  return (
    <div className="w-full">
      <MapContainer
        center={[37.0902, -95.7129]} // Center of United States
        zoom={4}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {alertData.map((city: any, index: number) => (
          <Marker key={index} position={[city.latitude, city.longitude]}>
            <Popup>{city.city}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default IndiaMap;
