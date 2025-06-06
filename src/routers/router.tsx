import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "../pages/register-page/register-page";
import LoginPage from "../pages/login/login-page";

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
]);
