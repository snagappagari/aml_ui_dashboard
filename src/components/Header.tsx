import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // If using React Router
import Logo from "../assets/Logo.svg";
import Avt from "../assets/Avt.svg";
import Logout from "../assets/Logout.svg";
import LoginService from "../Services/LoginService";
import { formatDate } from "../FormateDate";

interface HeaderProps {

}

const Header: React.FC<HeaderProps> = ({ }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<{ firstName: string; lastLogin: string }>({
    firstName: "",
    lastLogin: "",
  });
  const navigate = useNavigate(); // React Router navigation
  useEffect(() => {
    getLatestLogin();

  }, [])
  const getLatestLogin = () => {
    LoginService.getlatlogin().then((res) => {
      if (res && res.data) {
        setUser(res.data);
        console.log(res.data)
        sessionStorage.setItem("userLogin", JSON.stringify(res.data));
      }
    })
  }

  const handleLogout = () => {
    // Clear auth token from localStorage (or handle logout logic)
    localStorage.removeItem("authToken");

    // Redirect to login page
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center px-5 py-3 bg-white shadow relative">
      <div className="flex items-center gap-3">
        {/* <div className="w-8 h-8 rounded flex items-center justify-center">
          <img src={Logo} alt="Logo" className="w-6 h-6" />
        </div>
        <span className="text-gray-800">Secure Connect</span> */}
        <div className=" items-center flex mb-2">
          <img src={Logo} alt="Logo" className="w-8 h-8 mr-2" />
          <span className="font-semibold text-gray-800">Secure Connect</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          {/* Avatar Button */}
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 focus:outline-none">
            <div className="w-9 h-9 bg-gray-200 rounded-full overflow-hidden">
              <img src={Avt} alt={user.firstName} className="w-full h-full object-cover" />
            </div>
            <div className="hidden md:flex flex-col">
              <span className="text-sm font-medium text-left">{user.firstName}</span>
              <span className="text-xs text-gray-500">{formatDate(user.lastLogin)}</span>
            </div>
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg overflow-hidden z-5"
            >
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
              >
                <img
                  src={Logout}
                  alt="Logout Icon"
                  className="w-3 h-3 mr-2"
                />
                Logout
              </button>
            </div>
          )}

        </div>

        {/* Notification Icon */}
        <button className="text-gray-600 hover:text-gray-800">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
