import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
// import CustomerManagement from "./pages/CustomerManagement";
// import TransactionMonitoring from "./pages/TransactionMonitoring";
// import CaseManagement from "./pages/CaseManagement";
// import Reports from "./pages/Reports";
import ManualProcessing from "./components/ManualProcessing";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      {/* <Route path="/customer" element={<CustomerManagement />} />
      <Route path="/transaction" element={<TransactionMonitoring />} />
      <Route path="/case" element={<CaseManagement />} />
      <Route path="/reports" element={<Reports />} /> */}
      <Route path="/data-processing" element={<ManualProcessing />} />
    </Routes>
  );
};

export default AppRoutes;
