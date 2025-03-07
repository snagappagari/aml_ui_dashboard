import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Priority color mapping
const getPriorityColor = (priority: string) => {
  switch(priority.toUpperCase()) {
    case 'HIGH':
      return 'bg-red-600';
    case 'MEDIUM':
      return 'bg-orange-400';
    case 'LOW':
      return 'bg-green-500';
    case 'CRITICAL':
      return 'bg-purple-500';
    default:
      return 'bg-gray-500';
  }
};

interface IndiaMapProps {
  alertData: Array<{
    city: string;
    latitude: number;
    longitude: number;
    priority: string;
  }>;
}

const IndiaMap: React.FC<IndiaMapProps> = ({ alertData }) => {
  // Create a custom icon generator function
  const createPriorityIcon = (priority: string) => {
    return L.divIcon({
      className: 'custom-marker-icon',
      html: `
        <div class="relative w-8 h-8">
          <div class="${getPriorityColor(priority)} w-full h-full rounded-full opacity-75 animate-ping absolute"></div>
          <div class="${getPriorityColor(priority)} w-6 h-6 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-white shadow-lg"></div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });
  };

  if (!alertData || !Array.isArray(alertData)) {
    return (
      <div className="flex flex-col items-center justify-center h-48">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-blue-200 border-t-blue-500 animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-500 rounded-full animate-pulse opacity-70"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 right-0 transform translate-y-1/2 w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></div>
        </div>
        <p className="mt-4 text-blue-600 font-medium animate-pulse">Loading Alerts Map...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <MapContainer
        center={[37.0902, -95.7129]}
        zoom={4}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {alertData.map((city, index) => (
          <Marker 
            key={index} 
            position={[city.latitude, city.longitude]} 
            icon={createPriorityIcon(city.priority)}
          >
            <Popup>
              <div>
                <strong>{city.city}</strong>
                <p>Priority: {city.priority}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default IndiaMap;