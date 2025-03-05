import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [activeId, setActiveId] = React.useState("homepage");

  const navItems = [
    { id: "homepage", label: "Homepage", path: "/dashboard" },
    { id: "customer", label: "Customer Management", path: "/customer" },
    { id: "transaction", label: "Transaction Monitoring", path: "/transaction" },
    { id: "case", label: "Case Management", path: "/case" },
    { id: "reports", label: "Reports", path: "/reports" },
    { id: "manual", label: "Manual Processing", path: "/manualprocessing" },
  ];

  const handleNavigation = (id: string, path: string) => {
    setActiveId(id);
    navigate(path);
  };

  return (
    <div className="flex justify-center px-4 py-2">
      <nav className="bg-white max-w-4xl shadow-lg rounded-full">
        <div className="flex items-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id, item.path)}
              className={`px-4 py-2 text-xs font-medium rounded-full transition-colors focus:outline-none ${
                activeId === item.id
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
