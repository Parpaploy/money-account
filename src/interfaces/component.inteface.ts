export interface IInputBox {
  header: string;
  id: string;
  type: string;
  value: string;
  setValue: (value: string) => void;
}

export interface IAuthMenuButton {
  title: string;
  menuText: string;
  menu: string;
  setMenu: (isSignIn: string) => void;
}
