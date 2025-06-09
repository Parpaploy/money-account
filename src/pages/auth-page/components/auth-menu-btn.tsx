import type { IAuthMenuButton } from "../../../interfaces/component.interface";

export default function AuthMenuButton(props: IAuthMenuButton) {
  return (
    <button
      className={`${
        props.menu === props.menuText
          ? "bg-[#F86D6E] text-[#F7EAA0]"
          : "bg-[#f5f0d3] hover:bg-[#f7caca] text-[#f9b6b6] hover:text-[#f5f0d3]"
      } 
        overflow-hidden md:px-10 md:py-3 py-2 text-center cursor-pointer w-full whitespace-nowrap font-md`}
      onClick={() => {
        props.setMenu(props.menuText);
      }}
    >
      {props.title}
    </button>
  );
}
