import React from 'react';

const SubNavbar: React.FC = () => {
  const subNavItems = [
    { id: 'dashboard', label: 'Dashboard', active: true },
    { id: 'risk-overview', label: 'Risk Overview', active: false },
    { id: 'alerts-summary', label: 'Alerts Summary', active: false },
    { id: 'case-statistics', label: 'Case Statistics', active: false },
    { id: 'regulatory-reports', label: 'Regulatory Reports Status', active: false }
  ];

  return (
    <nav className="mt-2">
      <ul className="flex gap-1 border-b border-gray-200">
        {subNavItems.map((item) => (
          <li 
            key={item.id} 
            className={`relative ${item.active ? 'text-blue-500' : 'text-gray-600'}`}
          >
            <a 
              href={`#${item.id}`} 
              className="block px-3 py-2 text-xs font-medium hover:bg-gray-50 rounded-lg"
            >
              {item.label}
            </a>
            {item.active && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SubNavbar;