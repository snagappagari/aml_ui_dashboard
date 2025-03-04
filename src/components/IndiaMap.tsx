import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const cities = [
  { name: "New Delhi", lat: 28.6139, lng: 77.209 },
  { name: "Mumbai", lat: 19.076, lng: 72.8777 },
  { name: "Bengaluru", lat: 12.9716, lng: 77.5946 },
  { name: "Chennai", lat: 13.0827, lng: 80.2707 },
  { name: "Kolkata", lat: 22.5726, lng: 88.3639 },
];

const IndiaMap = () => {
  return (
    <div className="w-full">
      <MapContainer
        center={[20.5937, 78.9629]} // Center of India
        zoom={3}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city, index) => (
          <Marker key={index} position={[city.lat, city.lng]}>
            <Popup>{city.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default IndiaMap;
