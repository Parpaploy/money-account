import {
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";

export const GetCategories = async (uid: string): Promise<any> => {
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
};

export const CreateCategory = async (
  uid: string,
  id: string,
  color: string,
  priority: number,
  usageLimit: number
): Promise<any> => {
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
};
