import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './components/Header'; 
import Navbar from './components/Navbar'; 

interface LayoutProps {
  children: React.ReactNode;
  user?: {
    name: string;
    role: string;
  };
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 

}) => {
  const location = useLocation();

  // Pages that should not have header and navbar
  const pagesWithoutLayout = ['/'];

  // Determine if current page should show layout
  const shouldShowLayout = !pagesWithoutLayout.includes(location.pathname);

  // Function to get page title based on current route
//   const getPageTitle = () => {
//     const pathToTitleMap: { [key: string]: string } = {
//       '/dashboard': 'Dashboard',
//       '/manualprocessing': 'Manual Processing'
//     };

//     return pathToTitleMap[location.pathname] || 'Application';
//   };

  // If it's the login page, just render children
  if (!shouldShowLayout) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 overflow-y-auto p-4">
      <Navbar />
        {children}
      </main>
    </div>
  );
};

export default Layout;