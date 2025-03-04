import React from 'react';

const Navbar: React.FC = () => {
  const navItems = [
    { id: 'homepage', label: 'Homepage', active: true },
    { id: 'customer', label: 'Customer Management', active: false },
    { id: 'transaction', label: 'Transaction Monitoring', active: false },
    { id: 'case', label: 'Case Management', active: false },
    { id: 'reports', label: 'Reports', active: false }
  ];

  return (
    <div className="flex justify-center px-4 py-2">
      <nav className="bg-white max-w-4xl shadow-lg rounded-full">
        <div className="flex items-center">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`px-4 py-2 text-xs font-medium rounded-full transition-colors ${
                item.active 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;