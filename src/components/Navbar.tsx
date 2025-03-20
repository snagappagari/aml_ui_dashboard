import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location, 'location')
  const [activeId, setActiveId] = React.useState(location?.pathname);

  const navItems = [
    { id: "homepage", label: "Homepage", path: "/dashboard" },
    { id: "customer", label: "Customer Management", path: "/customer-management" },
    { id: "transaction", label: "Transaction Monitoring", path: "/transaction-monitoring" },
    { id: "case", label: "Case Management", path: "/case-management" },
    { id: "reports", label: "Reports", path: "/reports" },
    { id: "manual", label: "Data Processing", path: "/data-processing" },
  ];
  useEffect(() => {
    setActiveId(location?.pathname)
  }, [location])
  useEffect(() => {
    if (location?.pathname === activeId) {
      document.body.classList.remove("loading-indicator");
    }

  }, [activeId])


  const handleNavigation = (id: string, path: string) => {
    document.body.classList.add("loading-indicator");
    setActiveId(id);
    navigate(path);
  };
  console.log(JSON.stringify(navItems), 'navItems')

  return (
    <div className="flex justify-center px-4 py-2">
      <nav className="bg-white max-w-4xl shadow-lg rounded-full">
        <div className="flex items-center">
          {navItems.map((item) => (

            < button
              key={item.id}
              onClick={() => handleNavigation(item.id, item.path)}
              className={`px-4 py-2 text-xs font-medium rounded-full transition-colors focus:outline-none ${activeId === item.path
                ? "bg-blue-500 text-white"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav >
    </div >
  );
};

export default Navbar;
