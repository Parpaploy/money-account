import Swal from "sweetalert2";
import { CreateCategory } from "../../global/api/firebase/service/categories/categories";

export const CreateCategoryHandler = async (
  uid: string,
  id: string,
  color: string,
  priority: number,
  usageLimit: number,
  navigator: (path: string) => void,
  username: string,
  setCategoryId: (input: string) => void,
  setColor: (input: string) => void,
  setPriority: (input: string) => void,
  setUsageLimit: (input: string) => void
) => {
  if (id && color && priority && usageLimit) {
    CreateCategory(uid, id, color, priority, usageLimit);

    Swal.fire({
      title: "Add Category successfully!",
      icon: "success",
      draggable: true,
      confirmButtonText: "Continue",
    }).then(() => {
      setCategoryId("");
      setColor("#A9D0E7");
      setPriority("1");
      setUsageLimit("");

      navigator(`/private/${username}/`);
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Please provide the properly data",
      confirmButtonText: "Ok",
    });
  }
};
