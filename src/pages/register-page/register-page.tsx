import { useEffect, useState } from "react";
import { CreateUser, GetUsers } from "../../global/api/firebase/auth/auth";

export default function RegisterPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");

  const emailPattern =
    /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/;

  const RegisterHandler = () => {
    if (name && email && password && rePassword) {
      if (password == rePassword && email.match(emailPattern)) {
        CreateUser(name, email, rePassword);
        console.log("Creater success");
        GetUsers();
      }
    }
    return;
  };

  useEffect(() => {
    GetUsers();
    // GetCategories("9zddISUamJXZmh7SPDhw");
  }, []);
  return (
    <div className="w-full h-screen bg-black flex justify-center items-center">
      <div className="w-[30%] bg-sky-300 text-center">
        <label htmlFor="username">
          Username:
          <input
            className="w-full h-full bg-white"
            type="text"
            name="username"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            className="w-full h-full bg-white"
            type="text"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            className="w-full h-full bg-white"
            type="text"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <label htmlFor="re-password">
          Re-enter Password:
          <input
            className="w-full h-full bg-white"
            type="text"
            name="re-password"
            value={rePassword}
            onChange={(e) => {
              setRePassword(e.target.value);
            }}
          />
        </label>

        <button
          className="hover:cursor-pointer"
          onClick={() => {
            RegisterHandler();
          }}
        >
          Create User
        </button>
      </div>
    </div>
  );
}
