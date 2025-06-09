import { useState } from "react";

import AuthMenuButton from "./components/auth-menu-btn";
import LoginPage from "./components/login/login-page";
import RegisterPage from "./components/register-page/register-page";

export default function AuthPage() {
  const [menu, setMenu] = useState<string>("signin");

  return (
    <div className="w-full h-screen bg-[#A9D0E7] flex justify-center items-center text-[#F86D6E]">
      <div
        className="bg-[#f7f3f1] rounded-xl flex flex-col justify-start items-center p-8 md:p-12 min-h-108 md:min-h-132 md:h-132 md:w-110 w-[80%] gap-3 md:gap-5"
        style={{
          boxShadow:
            "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px",
        }}
      >
        <div className="flex border-2 border-[#F86D6E] bg-[#dac3c3] rounded-md overflow-hidden text-[#F7EAA0] md:text-2xl text-xl text-center md:min-h-18 md:h-18 w-full">
          <AuthMenuButton
            title="Sign In"
            menuText="signin"
            menu={menu}
            setMenu={setMenu}
          />
          <AuthMenuButton
            title="Sign Up"
            menuText="signup"
            menu={menu}
            setMenu={setMenu}
          />
        </div>

        {menu === "signin" ? <LoginPage /> : <RegisterPage setMenu={setMenu} />}
      </div>
    </div>
  );
}
