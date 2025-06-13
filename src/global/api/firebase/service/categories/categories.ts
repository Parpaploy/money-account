import {
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export const GetCategories = async (uid: string): Promise<any> => {
  try {
    const categoryCollection = collection(
      getFirestore(),
      "users",
      uid,
      "categories"
    );

    const categorySnapshot = await getDocs(categoryCollection);

    const categories = categorySnapshot.docs.map((category) => ({
      id: category.id,
      ...category.data(),
    }));

    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const CreateCategory = async (
  uid: string,
  id: string,
  color: string,
  priority: number,
  usageLimit: number
): Promise<void> => {
  try {
    const categoryCollection = collection(
      getFirestore(),
      "users",
      uid,
      "categories"
    );

    const categoryDoc = doc(categoryCollection, id);
    await setDoc(categoryDoc, {
      id: id,
      color: color,
      priority: priority,
      usageLimit: usageLimit,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const EditCategories = async (
  uid: string,
  id: string,
  color: string,
  priority: number,
  usageLimit: number
): Promise<void> => {
  try {
    const categoryDoc = doc(getFirestore(), "users", uid, "categories", id);

    await updateDoc(categoryDoc, {
      id,
      color,
      priority,
      usageLimit,
    });
  } catch (error) {
    console.error("Error editing category:", error);
    throw error;
  }
};
