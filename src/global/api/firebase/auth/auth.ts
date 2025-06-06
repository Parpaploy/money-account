import {
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";

export const GetUsers = async (): Promise<any> => {
  const usersCollection = collection(getFirestore(), "users");

  const users = await getDocs(usersCollection);

  users.docs.map((user) => {
    console.log("uid:", user.id, "userData:", user.data());
  });
};

export const CreateUser = async (
  name: string,
  email: string,
  password: string
): Promise<any> => {
  const usersCollection = collection(getFirestore(), "users");

  const newUser = doc(usersCollection);

  await setDoc(newUser, {
    name: name,
    uid: newUser.id,
    email: email,
    password: password,
  });
};
