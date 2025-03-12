import { lazy } from "react";

const Transactions = lazy(() => import("./components/Transactions/Transactions"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const ManualProcessing = lazy(() => import('./components/ManualProcessing'))
const CustomerManagement = lazy(() => import("./components/CustomerManagement/CustomerMangement"))
const CaseManagement = lazy(() => import("./components/CaseManagemnet/CaseManagement"))
const Reports = lazy(() => import("./components/Reports/Reports"))

const coreRoutes = [
  {
    path: "/dashboard", // Removed dynamic 'partner' variable
    title: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/data-processing", // Removed dynamic 'partner' variable
    title: "ManualProcessing",
    component: ManualProcessing,
  },
  {
    path: "/transaction-monitoring", // Removed dynamic 'partner' variable
    title: "Transactions",
    component: Transactions,
  },
  {
    path: "/customer-management", // Removed dynamic 'partner' variable
    title: "CustomerManagement",
    component: CustomerManagement,
  },
  {
    path: "/case-management", // Removed dynamic 'partner' variable
    title: "CaseManagement",
    component: CaseManagement,
  },
  {
    path: "/reports", // Removed dynamic 'partner' variable
    title: "Reports",
    component: Reports,
  },
];

const routes = [...coreRoutes];
export default routes;
