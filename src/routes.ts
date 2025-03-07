import { lazy } from "react";

const Transactions = lazy(() => import("./components/Transactions/Transactions"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const ManualProcessing = lazy(()=> import('./components/ManualProcessing'))

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
];

const routes = [...coreRoutes];
export default routes;
