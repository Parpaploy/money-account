import { useNavigate } from "react-router-dom";
import InputBox from "../../components/input-box";
import { useEffect, useState } from "react";
import { LoginHandler } from "./login";
import { useToken } from "../../hooks/token-hook";

export default function LoginPage() {
  const navigator = useNavigate();

  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { storeToken, fetchToken, getLocalUsername, storeUsername } =
    useToken();

  useEffect(() => {
    setName("");
    setPassword("");
  }, []);

  useEffect(() => {
    const username = getLocalUsername();

    fetchToken(navigator, username as string);
  }, []);

  return (
    <div className="w-full h-screen bg-black flex justify-center items-center">
      <div className="bg-sky-400 w-[30%] flex flex-col">
        <InputBox
          header="Username"
          id="username"
          type="text"
          value={name}
          setValue={setName}
        />

        <InputBox
          header="Password"
          id="password"
          type="password"
          value={password}
          setValue={setPassword}
        />

        <button
          className="hover:cursor-pointer"
          onClick={() => {
            LoginHandler(
              name,
              password,
              navigator,
              setName,
              setPassword,
              storeToken,
              storeUsername
            );
          }}
        >
          Login
        </button>

        <button
          className="hover:cursor-pointer"
          onClick={() => {
            navigator("/register");
          }}
        >
          go to Register
        </button>
      </div>
    </div>
  );
}
