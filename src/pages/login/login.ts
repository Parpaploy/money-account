import Swal from "sweetalert2";
import { CheckLoginUserExist } from "../../global/api/firebase/auth/auth";

export const LoginHandler = async (
  identity: string,
  password: string,
  navigator: (path: string) => void,
  setIdentityInput: (input: string) => void,
  setPasswordInput: (input: string) => void,
  storeToken: (token: string) => void,
  storeUsername: (username: string) => void
) => {
  if (identity && password) {
    const { success, correctIdentity, correctPassword, username, uid } =
      await CheckLoginUserExist(identity, password);
    // Success
    if (success) {
      if (username) {
        Swal.fire({
          title: "Login successfully!",
          icon: "success",
          draggable: true,
          confirmButtonText: "Continue",
        }).then(() => {
          if (uid && username) {
            storeToken(uid);
            storeUsername(username);
          }
          setIdentityInput("");
          setPasswordInput("");
          navigator(`/private/${username}/homepage`);
        });
      } else {
        Swal.fire({
          title: "User ID is missing. Please try again later",
          icon: "error",
          draggable: true,
          confirmButtonText: "Try again",
        }).then(() => {
          setIdentityInput("");
          setPasswordInput("");
        });
      }
    }
    // Wrong Identity
    else if (!correctIdentity) {
      Swal.fire({
        title: "Please provide the correct email or username",
        icon: "error",
        draggable: true,
        confirmButtonText: "Ok",
      }).then(() => {
        setIdentityInput("");
        setPasswordInput("");
      });
    }
    // Wrong Password
    else if (!correctPassword) {
      Swal.fire({
        title: "Please provide the correct password",
        icon: "error",
        draggable: true,
        confirmButtonText: "Ok",
      }).then(() => {
        setPasswordInput("");
      });
    }
  } else if (identity.trim() === "" || password.trim() === "") {
    // Incomplete Input
    Swal.fire({
      icon: "error",
      title: "Please provide the properly data",
      confirmButtonText: "Ok",
    });
  }
};
