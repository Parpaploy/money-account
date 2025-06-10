import { CreateCategory } from "../../global/api/firebase/service/categories/categories";

export const CreateCategoryHandler = async (
  uid: string,
  id: string,
  color: string,
  priority: number,
  usageLimit: number
) => {
  if (id && color && priority && usageLimit) {
    CreateCategory(uid, id, color, priority, usageLimit);
  }
};
