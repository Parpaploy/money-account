import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
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

export const DeleteCategory = async (id: string, categoryId: string) => {
  try {
    const db = getFirestore();

    const categoryDocRef = doc(db, "users", id, "categories", categoryId);
    await deleteDoc(categoryDocRef);

    const expensesRef = collection(db, "users", id, "expenses");
    const q = query(expensesRef, where("category", "==", categoryId));
    const snapshot = await getDocs(q);

    const updatePromises = snapshot.docs.map((docSnap) =>
      updateDoc(docSnap.ref, { category: "uncategorized" })
    );
    await Promise.all(updatePromises);

    console.log(
      `Deleted category "${categoryId}" and updated related expenses.`
    );
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};
