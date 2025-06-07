import type { IInputBox } from "../interfaces/component.inteface";

export default function InputBox(props: IInputBox) {
  return (
    <div className="w-full">
      <label className="font-bold text-md" htmlFor={props.id}>
        {props.header}:
      </label>
      <input
        className="w-full px-2.5 py-1.5 bg-white rounded-md"
        type={props.type}
        name={props.id}
        value={props.value}
        onChange={(e) => {
          props.setValue(e.target.value);
        }}
      />
    </div>
  );
}
