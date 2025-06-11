import Swal from "sweetalert2";

import {
  CheckRegisterUserExist,
  CreateUser,
} from "../../../../global/api/firebase/auth/auth";

const emailPattern =
  /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/;

export const RegisterHandler = async (
  name: string,
  email: string,
  password: string,
  rePassword: string,
  setNameInput: (input: string) => void,
  setEmailInput: (input: string) => void,
  setPasswordInput: (input: string) => void,
  setRePasswordInput: (input: string) => void,
  setMenu: (menu: string) => void
): Promise<any> => {
  try {
    if (name && email && password && rePassword) {
      const { existName, existEmail } = await CheckRegisterUserExist(
        name,
        email
      );
      // Wrong Email Pattern
      if (!email.match(emailPattern)) {
        Swal.fire({
          icon: "error",
          title: "Please provide the correct email",
          confirmButtonText: "Ok",
        }).then(() => {
          setEmailInput("");
        });
        return;
      }

      // Double Name
      if (existName) {
        Swal.fire({
          title: "This username is already used",
          icon: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        }).then(() => {
          setNameInput("");
        });
        return;
      }

      // Double Email
      if (existEmail) {
        Swal.fire({
          title: "This email is already used",
          icon: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        }).then(() => {
          setEmailInput("");
        });
        return;
      }

      // Wrong Password
      if (password !== rePassword) {
        Swal.fire({
          icon: "error",
          title: "Please provide the same password",
          confirmButtonText: "Ok",
        }).then(() => {
          setRePasswordInput("");
        });
        return;
      }

      // Success
      if (password == rePassword && email.match(emailPattern)) {
        if (!existName && !existEmail) {
          await CreateUser(name, email, rePassword);

          Swal.fire({
            title: "Create User successfully!",
            icon: "success",
            draggable: true,
            confirmButtonText: "Back to Sign In",
          }).then(() => {
            setNameInput("");
            setEmailInput("");
            setPasswordInput("");
            setRePasswordInput("");
            setMenu("signin");
          });
          return;
        }
      }
    }
    // Incomplete Input
    Swal.fire({
      icon: "error",
      title: "Please provide the properly data",
      confirmButtonText: "Ok",
    });
  } catch (error) {
    console.error("Error Register:", error);
    throw error;
  }
};
