import { Outlet } from "react-router-dom";
import PrivateNavbar from "../components/private-navbar";
import PrivateSidebar from "../components/private-sidebar";
import { useEffect, useState } from "react";

export default function PrivateLayoutNavbar() {
  const [isPopup, setIsPopup] = useState<boolean>(false);

  useEffect(() => {
    setIsPopup(false);
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <div className="w-full">
        <PrivateNavbar isPopup={isPopup} setIsPopup={setIsPopup} />
      </div>

      <div className="flex overflow-hidden">
        <PrivateSidebar isPopup={isPopup} setIsPopup={setIsPopup} />
        <main className="flex-1 overflow-y-auto bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
