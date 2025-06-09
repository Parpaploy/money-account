import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useToken } from "../hooks/token-hook";

export default function PrivateLayout() {
  const navigator = useNavigate();

  const { AuthHandler } = useToken();

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    AuthHandler(navigator, setToken);
  }, []);

  // useEffect(() => {
  //   getLocalToken();
  //   const tusername = getLocalUsername();

  //   fetchToken(navigator, tusername as string, "");
  // }, []);

  return <Outlet />;
}
