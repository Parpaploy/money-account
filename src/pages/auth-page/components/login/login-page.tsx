import { useNavigate } from "react-router-dom";
import InputBox from "../../../../components/input-box";
import { useEffect, useState } from "react";
import { LoginHandler } from "./login";
import { useToken } from "../../../../hooks/token-hook";

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
    <div className="flex flex-col rounded-xl gap-4 md:gap-6 w-full">
      <InputBox
        header="Username or Email"
        id="identity"
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
        className="hover:cursor-pointer bg-[#F1B11F] rounded-lg py-3 font-bold mt-1 md:mt-2"
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
        Sign In
      </button>

      {/* <a
        className="hover:cursor-pointer underline"
        onClick={() => {
          navigator("/register");
        }}
      >
        Don't have an account? Sign Up
      </a> */}
    </div>
  );
}
