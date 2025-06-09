import { useToken } from "../hooks/token-hook";
import SidebarButton from "./sidebar-btn";

export default function PrivateSidebar() {
  const { getLocalUsername } = useToken();

  const username = getLocalUsername();

  return (
    <div className="w-[35svh] h-[90svh] bg-[#A9D0E7] px-5 py-3 flex flex-col gap-3">
      <SidebarButton path="" username={username as string} title="Dashboard" />
      <SidebarButton
        path="addexpense"
        username={username as string}
        title="Add Expense"
      />
    </div>
  );
}
