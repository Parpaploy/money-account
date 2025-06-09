import { collection, getDocs, getFirestore } from "firebase/firestore";

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
