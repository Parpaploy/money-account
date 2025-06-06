import Swal from "sweetalert2";
import {
  CheckUserExist,
  CreateUser,
  GetUsers,
} from "../../global/api/firebase/auth/auth";

const emailPattern =
  /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/;

export const RegisterHandler = async (
  name: string,
  email: string,
  password: string,
  rePassword: string
): Promise<{ success: boolean }> => {
  if (name && email && password && rePassword) {
    const { existName, existEmail } = await CheckUserExist(name, email);
    // Wrong Email Pattern
    if (!email.match(emailPattern)) {
      Swal.fire({
        icon: "error",
        title: "Please provide the same password",
        confirmButtonText: "Ok",
      });

      return { success: false };
    }

    // Double Name
    if (existName) {
      Swal.fire({
        title: "This username is already used",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
      });

      return { success: false };
    }

    // Double Email
    if (existEmail) {
      Swal.fire({
        title: "This email is already used",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
      });

      return { success: false };
    }

    // Wrong Password
    if (password !== rePassword) {
      Swal.fire({
        icon: "error",
        title: "Please provide the same password",
        confirmButtonText: "Ok",
      });

      return { success: false };
    }

    // Success
    if (password == rePassword && email.match(emailPattern)) {
      if (!existName && !existEmail) {
        await CreateUser(name, email, rePassword);
        await GetUsers();

        return { success: true };
      }
    }
  }
  // Incomplete Input
  Swal.fire({
    icon: "error",
    title: "Please provide the properly data",
    confirmButtonText: "Ok",
  });
  return { success: false };
};
