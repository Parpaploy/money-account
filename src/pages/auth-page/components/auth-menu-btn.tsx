import type { IAuthMenuButton } from "../../../interfaces/component.inteface";

export default function AuthMenuButton(props: IAuthMenuButton) {
  return (
    <button
      className={`${
        props.menu === props.menuText
          ? "bg-[#E53C12] text-[#F1B11F]"
          : "bg-[#dac3c3] text-[#de8068]"
      } rounded-sm overflow-hidden px-10 py-3 cursor-pointer w-full whitespace-nowrap font-md`}
      onClick={() => {
        props.setMenu(props.menuText);
      }}
    >
      {props.title}
    </button>
  );
}
