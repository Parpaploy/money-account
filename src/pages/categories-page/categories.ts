import Swal from "sweetalert2";
import {
  CreateCategory,
  DeleteCategory,
  EditCategories,
} from "../../global/api/firebase/service/categories/categories";

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
  if (id && color && priority) {
    await CreateCategory(uid, id, color, priority, usageLimit);

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

export const EditCategoryHandler = async (
  uid: string,
  id: string,
  color: string,
  priority: number,
  usageLimit: number,
  setCategoryId: (input: string) => void,
  setColor: (input: string) => void,
  setPriority: (input: string) => void,
  setUsageLimit: (input: string) => void,
  setIsPopup: (isPopup: boolean) => void,
  reloadCategories: () => void
): Promise<any> => {
  if (id && color && priority) {
    await EditCategories(uid, id, color, priority, usageLimit);

    Swal.fire({
      title: "Edit Category successfully!",
      icon: "success",
      draggable: true,
      confirmButtonText: "Continue",
    }).then(() => {
      setCategoryId(id);
      setColor(color);
      setPriority(String(priority));
      setUsageLimit(String(usageLimit));

      setIsPopup(false);
      reloadCategories();
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Please provide the properly data",
      confirmButtonText: "Ok",
    });
  }
};

export const DeleteCategoryHandler = async (id: string, categoryId: string) => {
  if (id && categoryId) {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete category "${categoryId}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await DeleteCategory(id, categoryId);
      await Swal.fire({
        title: "Deleted!",
        text: "The category has been deleted.",
        icon: "success",
      });
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Failed to delete category. Please try again later",
      confirmButtonText: "Ok",
    });
  }
};
