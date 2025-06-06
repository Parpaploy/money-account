import { InitFirebase } from "./firebase";

export const MiddlewareInit = async () => {
  await InitFirebase();
};
