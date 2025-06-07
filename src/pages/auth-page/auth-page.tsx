import { useState } from "react";

import AuthMenuButton from "./components/auth-menu-btn";
import LoginPage from "./components/login/login-page";
import RegisterPage from "./components/register-page/register-page";

export default function AuthPage() {
  const [menu, setMenu] = useState<string>("signin");

  return (
    <>
      <div className="w-full h-screen bg-[#1E1E1E] flex justify-center items-center text-[#E53C12]">
        <div
          className="bg-[#EBE9E2] rounded-xl flex flex-col justify-start items-center p-12 md:min-h-132 md:h-132 md:w-110 gap-5"
          style={{
            boxShadow:
              "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px",
          }}
        >
          <div className="flex border-2 border-[#E53C12] bg-[#dac3c3] rounded-md overflow-hidden text-[#F1B11F] text-2xl md:min-h-18 md:h-18 w-full">
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

          {menu === "signin" ? (
            <LoginPage />
          ) : (
            <RegisterPage setMenu={setMenu} />
          )}
        </div>
      </div>
    </>
  );
}
