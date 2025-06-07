import { useEffect, useState } from "react";
import { RegisterHandler } from "./register";
import { useNavigate } from "react-router-dom";
import InputBox from "../../components/input-box";

export default function RegisterPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");

  const navigator = useNavigate();

  useEffect(() => {
    setName("");
    setEmail("");
    setPassword("");
    setRePassword("");
    // GetCategories("9zddISUamJXZmh7SPDhw");
  }, []);
  return (
    <div className="w-full h-screen bg-black flex justify-center items-center">
      <div className="w-[30%] bg-sky-300 flex flex-col">
        <InputBox
          header="Username"
          id="username"
          type="text"
          value={name}
          setValue={setName}
        />

        <InputBox
          header="Email"
          id="email"
          type="text"
          value={email}
          setValue={setEmail}
        />

        <InputBox
          header="Password"
          id="password"
          type="password"
          value={password}
          setValue={setPassword}
        />

        <InputBox
          header="Re-enter Password"
          id="re-password"
          type="password"
          value={rePassword}
          setValue={setRePassword}
        />

        <button
          className="hover:cursor-pointer"
          onClick={async () => {
            await RegisterHandler(
              name,
              email,
              password,
              rePassword,
              navigator,
              setName,
              setEmail,
              setPassword,
              setRePassword
            );
          }}
        >
          Create User
        </button>

        <button
          className="hover:cursor-pointer"
          onClick={() => {
            navigator("/login");
          }}
        >
          go to Login
        </button>
      </div>
    </div>
  );
}
