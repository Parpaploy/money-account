import { createBrowserRouter } from "react-router-dom";
import PrivateLayout from "../layouts/private-layout";
import Homepage from "../pages/homepage/homepage";
import PrivateLayoutNavbar from "../layouts/private-layout-navbar";
import AuthPage from "../pages/auth-page/auth-page";

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
