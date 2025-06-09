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
      }}
      className={`w-full hover:cursor-pointer ${
        currentPath.pathname === targetPath
          ? "text-[#F7EAA0] hover:text-[#f0e398] bg-[#fd8b8b] hover:bg-[#f58585]"
          : "bg-[#F7EAA0] hover:bg-[#f0e398] text-[#fd8b8b] hover:text-[#f58585]"
      } rounded-lg py-10 text-3xl font-[500] mt-1 md:mt-2`}
      style={{
        boxShadow: "rgba(17, 17, 26, 0.05) 1px 1px 2px",
      }}
    >
      {props.title}
    </button>
  );
}
