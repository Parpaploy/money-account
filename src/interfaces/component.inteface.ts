export interface IInputBox {
  header: string;
  id: string;
  type: string;
  value: string;
  setValue: (value: string) => void;
}
