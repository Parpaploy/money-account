import type { IInputBox } from "../interfaces/component.interface";

export default function InputBox(props: IInputBox) {
  return (
    <div className="w-full h-full">
      <label
        className={`font-${props.font} 2xl:text-${props.textSize} lg:text-xl md:text-xl text-xl" htmlFor=${props.id}`}
      >
        {props.header}:
      </label>
      <input
        className={`w-full md:px-${props.px} px-2 py-1 md:py-${props.py} bg-white rounded-md`}
        type={props.type}
        name={props.id}
        value={props.value}
        onChange={(e) => {
          props.setValue(e.target.value);
        }}
        required={props.isRequire}
        style={{
          boxShadow: "rgba(17, 17, 26, 0.05) 1px 1px 2px",
        }}
      />
    </div>
  );
}
