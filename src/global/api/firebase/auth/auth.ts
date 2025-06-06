import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export const GetUsers = async (): Promise<any> => {
  const usersCollection = collection(getFirestore(), "users");

  await getDocs(usersCollection);

  //   users.docs.map((user) => {
  //     console.log("uid:", user.id, "userData:", user.data());
  //   });
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

export const CheckUserExist = async (
  name: string,
  email: string
): Promise<{ existName: boolean; existEmail: boolean }> => {
  const usersCollection = collection(getFirestore(), "users");

  const nameQuery = query(usersCollection, where("name", "==", name));
  const existNames = await getDocs(nameQuery);

  const emailQuery = query(usersCollection, where("email", "==", email));
  const existEmails = await getDocs(emailQuery);

  return { existName: !existNames.empty, existEmail: !existEmails.empty };
};
