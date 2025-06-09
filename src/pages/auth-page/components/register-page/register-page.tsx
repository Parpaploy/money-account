import { useEffect, useState } from "react";
import { RegisterHandler } from "./register";
import InputBox from "../../../../components/input-box";

export default function RegisterPage({
  setMenu,
}: {
  setMenu: (menu: string) => void;
}) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");

  useEffect(() => {
    setName("");
    setEmail("");
    setPassword("");
    setRePassword("");
    // GetCategories("9zddISUamJXZmh7SPDhw");
  }, []);
  return (
    <div className="flex flex-col rounded-xl gap-1 md:gap-2 w-full">
      <InputBox
        header="Username"
        id="username"
        type="text"
        value={name}
        setValue={setName}
        font="medium"
        textSize="lg"
        px="2.5"
        py="1"
      />

      <InputBox
        header="Email"
        id="email"
        type="email"
        value={email}
        setValue={setEmail}
        font="medium"
        textSize="lg"
        px="2.5"
        py="1"
      />

      <InputBox
        header="Password"
        id="password"
        type="password"
        value={password}
        setValue={setPassword}
        font="medium"
        textSize="lg"
        px="2.5"
        py="1"
      />

      <InputBox
        header="Re-enter Password"
        id="re-password"
        type="password"
        value={rePassword}
        setValue={setRePassword}
        font="medium"
        textSize="lg"
        px="2.5"
        py="1"
      />

      <button
        className="hover:cursor-pointer bg-[#F7EAA0] hover:bg-[#f0e398] rounded-lg py-3 font-bold mt-5 md:mt-5"
        style={{
          boxShadow: "rgba(17, 17, 26, 0.05) 1px 1px 2px",
        }}
        onClick={async () => {
          await RegisterHandler(
            name,
            email,
            password,
            rePassword,
            setName,
            setEmail,
            setPassword,
            setRePassword,
            setMenu
          );
        }}
      >
        Sign Up
      </button>

      {/* <button
        className="hover:cursor-pointer"
        onClick={() => {
          navigator("/login");
        }}
      >
        go to Login
      </button> */}
    </div>
  );
}
