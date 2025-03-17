import { Suspense, useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from '../src/Layout'; // Import the new Layout component
import './App.css';
import ProtectedRoute from './commonUtils/PretectedRoute';
import LoginPage from './components/LoginPage';
import routes from './routes';
import Loader from './commonUtils/Loader';

function App() {
  const loadScript = (src: any) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  });
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/data-processing" element={<ManualProcessing />} /> */}
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path} // No parent prefix needed
              element={
                <ProtectedRoute>
                  <Suspense fallback={<Loader />}>
                    <route.component />
                  </Suspense>
                </ProtectedRoute>
              }
            />
          ))}
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
