import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "../pages/register-page/register-page";

export const router = createBrowserRouter([
  {
    path: "",
    element: <RegisterPage />,
  },
]);
