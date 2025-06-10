import { useNavigate } from "react-router-dom";
import { useToken } from "../hooks/token-hook";
import SidebarButton from "./sidebar-btn";
import Swal from "sweetalert2";

export default function PrivateSidebar({
  isPopup,
  setIsPopup,
}: {
  isPopup: boolean;
  setIsPopup: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { getLocalUsername } = useToken();
  const { logOutCallBack } = useToken();

  const username = getLocalUsername();
  const navigator = useNavigate();

  return isPopup ? (
    <div className="flex flex-col gap-5 w-full h-[92svh] min-h-[92svh] overflow-y-auto bg-[#A9D0E7] px-10 py-7 justify-start">
      <div className="flex flex-col gap-5">
        <SidebarButton
          path=""
          username={username as string}
          title="Dashboard"
          isMobile={true}
          setIsPopup={setIsPopup}
        />
        <SidebarButton
          path="addcategory"
          username={username as string}
          title="Add Category"
          isMobile={true}
          setIsPopup={setIsPopup}
        />
        <SidebarButton
          path="addexpense"
          username={username as string}
          title="Add Expense"
          isMobile={true}
          setIsPopup={setIsPopup}
        />
        {/* Logout Button */}
        <button
          className="hover:cursor-pointer bg-[#2B3E89] hover:bg-[#233370] rounded-lg py-3 text-3xl font-[500] mt-1 md:mt-2 text-white hover:text-[#d9d9e0]"
          style={{
            boxShadow: "rgba(17, 17, 26, 0.05) 1px 1px 2px",
          }}
          onClick={() => {
            Swal.fire({
              title: "Are you sure to Logout?",
              showConfirmButton: false,
              showDenyButton: true,
              showCancelButton: true,
              denyButtonText: `Yes, sure`,
            }).then((result) => {
              if (result.isDenied) {
                logOutCallBack(navigator);
              }
            });
          }}
        >
          Logout
        </button>
      </div>
    </div>
  ) : (
    <div className="hidden lg:flex lg:w-[35svh] h-[90svh] bg-[#A9D0E7] 2xl:px-10 2xl:py-18 px-7 py-6 flex-col gap-3">
      <SidebarButton
        path=""
        username={username as string}
        title="Dashboard"
        isMobile={false}
        setIsPopup={setIsPopup}
      />
      <SidebarButton
        path="addcategory"
        username={username as string}
        title="Add Category"
        isMobile={false}
        setIsPopup={setIsPopup}
      />
      <SidebarButton
        path="addexpense"
        username={username as string}
        title="Add Expense"
        isMobile={false}
        setIsPopup={setIsPopup}
      />
    </div>
  );
}
