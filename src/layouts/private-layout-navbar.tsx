import { Outlet } from "react-router-dom";
import PrivateNavbar from "../components/private-navbar";
import PrivateSidebar from "../components/private-sidebar";

export default function PrivateLayoutNavbar() {
  return (
    <div className="h-screen flex flex-col">
      <div className="w-full">
        <PrivateNavbar />
      </div>

      <div className="flex overflow-hidden">
        <PrivateSidebar />
        <main className="flex-1 overflow-y-auto bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
