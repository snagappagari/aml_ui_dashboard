import React from 'react';

const AlertsMap: React.FC = () => {
  return (
    <div className="w-96 bg-blue-900 rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-blue-800">
        <h3 className="text-white text-base font-medium">Alerts on Map</h3>
      </div>
      
      <div className="relative h-96 flex items-center justify-center">
        {/* SVG Map of India with alert points */}
        <svg viewBox="0 0 600 700" className="w-full h-full">
          {/* This is a simplified outline of India - in a real implementation you would use a detailed GeoJSON */}
          <path 
            d="M150,100 C200,50 300,50 350,100 C400,150 450,200 450,300 C450,400 400,500 350,550 C300,600 250,650 200,600 C150,550 100,500 100,400 C100,300 100,150 150,100 Z" 
            fill="none" 
            stroke="#29a3dc" 
            strokeWidth="2"
          />
          
          {/* Sample alert points across the map */}
          {Array(25).fill(null).map((_, index) => {
            // Random positions for demo purposes
            const x = 100 + Math.random() * 300;
            const y = 100 + Math.random() * 450;
            const radius = 3 + Math.random() * 8;
            
            // Different colors for different alert types
            const colors = ['#ff5252', '#ffbd3e', '#4caf50', '#2196f3'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            return (
              <circle 
                key={index}
                cx={x}
                cy={y}
                r={radius}
                fill={color}
                opacity={0.7}
                className="transition-all duration-300 hover:transform hover:scale-150 hover:opacity-100"
              />
            );
          })}
        </svg>
        
        {/* Donut chart for alert distribution */}
        <div className="absolute bottom-5 right-5">
          <svg width="120" height="120" viewBox="0 0 120 120" className="bg-black bg-opacity-30 rounded-full">
            {/* Donut chart segments */}
            <circle cx="60" cy="60" r="50" fill="transparent" stroke="#ff5252" strokeWidth="15" strokeDasharray="85 315" strokeDashoffset="0" />
            <circle cx="60" cy="60" r="50" fill="transparent" stroke="#4caf50" strokeWidth="15" strokeDasharray="150 250" strokeDashoffset="-85" />
            <circle cx="60" cy="60" r="50" fill="transparent" stroke="#2196f3" strokeWidth="15" strokeDasharray="125 275" strokeDashoffset="-235" />
            
            {/* Center of donut chart */}
            <circle cx="60" cy="60" r="40" fill="white" />
            
            {/* Legend */}
            <text x="85" y="35" fill="white" fontSize="10">● 1234</text>
            <text x="85" y="60" fill="white" fontSize="10">● 4398</text>
            <text x="85" y="85" fill="white" fontSize="10">● 2561</text>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AlertsMap;