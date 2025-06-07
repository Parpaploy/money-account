import type { IInputBox } from "../interfaces/component.inteface";

export default function InputBox(props: IInputBox) {
  return (
    <label htmlFor={props.id}>
      {props.header}:
      <input
        className="w-full h-full bg-white"
        type={props.type}
        name={props.id}
        value={props.value}
        onChange={(e) => {
          props.setValue(e.target.value);
        }}
      />
    </label>
  );
}
