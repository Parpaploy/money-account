import { createBrowserRouter } from "react-router-dom";
import PrivateLayout from "../layouts/private-layout";
import PrivateLayoutNavbar from "../layouts/private-layout-navbar";
import AuthPage from "../pages/auth-page/auth-page";
import DashboardPage from "../pages/dashboard-page/dashboard-page";
import CreateExpensePage from "../pages/expenses-page/create-expense";

export const router = createBrowserRouter([
  {
    path: "",
    element: <AuthPage />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/private",
    element: <PrivateLayout />,
    children: [
      {
        path: ":username",
        element: <PrivateLayoutNavbar />,
        children: [
          {
            path: "",
            element: <DashboardPage />,
          },
          {
            path: "addexpense",
            element: <CreateExpensePage />,
          },
        ],
      },
    ],
  },
]);
