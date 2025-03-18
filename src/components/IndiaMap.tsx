import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import AlertService from "../Services/AlertService"
import { AlertLocation } from "../commonUtils/Interface";

// Priority color mapping
const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'high':
      return 'bg-red-600';
    case 'medium':
      return 'bg-orange-400';
    case 'low':
      return 'bg-green-500';
    case 'critical':
      return 'bg-purple-500';
    default:
      return 'bg-gray-500';
  }
};


const IndiaMap: React.FC = () => {
  const [alertData, setAlertData] = useState<AlertLocation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlertData = async () => {
      try {
        setIsLoading(true);
        const data = await AlertService.getAlertByLocation();
        setAlertData(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching alert data:", err);
        setError("Failed to load alert data. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchAlertData();
  }, []);

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

  if (isLoading) {
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

  if (error) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Calculate map center based on data or default to a central position
  const mapCenter = alertData.length > 0
    ? [alertData[0].latitude, alertData[0].longitude]
    : [20, 78]; // Default center for India

  return (
    <div className="w-full">
      <MapContainer
        center={[mapCenter[0], mapCenter[1]] as [number, number]}
        zoom={2}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {alertData.map((location, index) => (
          <Marker
            key={index}
            position={[location.latitude, location.longitude]}
            icon={createPriorityIcon(location.priority)}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-lg">{location.city}</h3>
                <p><span className="font-semibold">Country:</span> {location.country}</p>
                <p><span className="font-semibold">Region:</span> {location.region}</p>
                <p><span className="font-semibold">Priority:</span> {location.priority}</p>
                <p><span className="font-semibold">Alert Count:</span> {location.count}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default IndiaMap;