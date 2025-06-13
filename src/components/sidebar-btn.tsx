import { useLocation, useNavigate } from "react-router-dom";
import type { ISidebarButton } from "../interfaces/component.interface";

export default function SidebarButton(props: ISidebarButton) {
  const navigator = useNavigate();
  const currentPath = useLocation();

  const targetPath = `/private/${props.username}/${props.path}`;

  return (
    <button
      onClick={() => {
        navigator(targetPath);
        if (props.isMobile) {
          props.setIsPopup(false);
        }
      }}
      className={`w-full ${
        currentPath.pathname === targetPath
          ? "text-[#F7EAA0] bg-[#fd8b8b]"
          : "bg-[#F7EAA0] hover:bg-[#f0e398] text-[#fd8b8b] hover:text-[#f58585] hover:cursor-pointer"
      } rounded-lg 2xl:py-10 lg:py-8.5 md:py-6 py-3 text-3xl font-[500] mt-1 md:mt-2`}
      style={{
        boxShadow: "rgba(17, 17, 26, 0.05) 1px 1px 2px",
      }}
    >
      {props.title}
    </button>
  );
}
