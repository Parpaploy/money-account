export interface IInputBox {
  header: string;
  id: string;
  type: string;
  value: string;
  setValue: (value: string) => void;
  font: string;
  textSize: string;
  px: string;
  py: string;
  isRequire: boolean;
}

export interface IAuthMenuButton {
  title: string;
  menuText: string;
  menu: string;
  setMenu: (isSignIn: string) => void;
}

export interface ISidebarButton {
  path: string;
  username: string;
  title: string;
  isMobile: boolean;
  setIsPopup: (isPopup: boolean) => void;
}
