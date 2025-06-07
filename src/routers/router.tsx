import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "../pages/register-page/register-page";
import LoginPage from "../pages/login/login-page";
import PrivateLayout from "../layouts/private-layout";
import Homepage from "../pages/homepage/homepage";
import PrivateLayoutNavbar from "../layouts/private-layout-navbar";

export const router = createBrowserRouter([
  {
    path: "",
    element: <LoginPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/private",
    element: <PrivateLayout />,
    children: [
      {
        path: "",
        element: <PrivateLayoutNavbar />,
        children: [
          {
            path: ":username/homepage",
            element: <Homepage />,
          },
        ],
      },
    ],
  },
]);
