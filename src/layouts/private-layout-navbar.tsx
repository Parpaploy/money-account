import { Outlet, useNavigate } from "react-router-dom";
import PrivateNavbar from "../components/private-navbar";
import { useEffect, useState } from "react";
import { useToken } from "../hooks/token-hook";

export default function PrivateLayoutNavbar() {
  const navigator = useNavigate();
  const { AuthHandler } = useToken();

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    AuthHandler(navigator, setToken);
  }, [token]);

  return (
    <>
      <PrivateNavbar />
      <Outlet />
    </>
  );
}
