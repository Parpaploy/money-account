import { collection, getDocs, getFirestore } from "firebase/firestore";

export const GetCategories = async (uid: string): Promise<any> => {
  const categoryCollection = collection(
    getFirestore(),
    "users",
    uid,
    "categories"
  );

  const categories = await getDocs(categoryCollection);

  console.log(
    categories.docs.map((category) => category.data()),
    "category"
  );
};
