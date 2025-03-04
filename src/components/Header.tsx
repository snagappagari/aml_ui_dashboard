import React from 'react';
import Logo from "../assets/Logo.svg";

interface HeaderProps {
  user: {
    name: string;
    role: string;
  };
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className="flex justify-between items-center px-5 py-3 bg-white shadow">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded flex items-center justify-center">
          {/* <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
            <path d="M3 8a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
          </svg> */}
          <img src={Logo} alt="Logo" className="w-6 h-6" />
        </div>
        <span className="font-semibold text-gray-800">Secure Connect</span>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gray-200 rounded-full overflow-hidden">
            <img src="/avatar.png" alt={user.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{user.name}</span>
            <span className="text-xs text-gray-500">{user.role}</span>
          </div>
        </div>
        <button className="text-gray-600 hover:text-gray-800">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        {/* <button className="text-gray-600 hover:text-gray-800">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button> */}
      </div>
    </header>
  );
};

export default Header;