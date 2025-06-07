import {
  collection,
  doc,
  getDocs,
  getFirestore,
  or,
  query,
  setDoc,
  where,
} from "firebase/firestore";

// export const GetUsers = async (): Promise<any[]> => {
//   const usersCollection = collection(getFirestore(), "users");

//   const usersSnapshot = await getDocs(usersCollection);

//   const users = usersSnapshot.docs.map((user) => {
//     console.log("uid:", user.id, "userData:", user.data());
//   });

//   return users;
// };

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

  // Create new Doc in new Collection
  const categoryDoc = doc(collection(newUser, "categories"));
  // Create Document
  await setDoc(categoryDoc, {
    food: {
      color: "#F4327F",
      id: "food",
      name: "อาหาร",
      priority: 1,
      usageLimit: 1500,
    },
    utilities: {
      color: "#AFD65C",
      id: "utilities",
      name: "ของใช้",
      priority: 2,
      usageLimit: 2000,
    },
    travel: {
      color: "#45B9DA",
      id: "travel",
      name: "เดินทาง",
      priority: 3,
      usageLimit: 500,
    },
    fuel: {
      color: "#FBA535",
      id: "fuel",
      name: "น้ำมัน",
      priority: 4,
      usageLimit: 500,
    },
  });

  const expenseDoc = doc(collection(newUser, "expenses"));
  await setDoc(expenseDoc, {});
};

export const CheckRegisterUserExist = async (
  name: string,
  email: string
): Promise<{ existName: boolean; existEmail: boolean }> => {
  const usersCollection = collection(getFirestore(), "users");

  const nameQuery = query(usersCollection, where("name", "==", name));
  const existNames = await getDocs(nameQuery);

  const emailQuery = query(usersCollection, where("email", "==", email));
  const existEmails = await getDocs(emailQuery);

  return {
    existName: !existNames.empty,
    existEmail: !existEmails.empty,
  };
};

export const CheckLoginUserExist = async (
  identity: string,
  password: string
): Promise<{
  success: boolean;
  correctIdentity: boolean;
  correctPassword: boolean;
  username: string | null;
  uid: string | null;
}> => {
  const usersCollection = collection(getFirestore(), "users");

  const identityQuery = query(
    usersCollection,
    or(where("name", "==", identity), where("email", "==", identity))
  );
  const existIdentity = await getDocs(identityQuery);

  // No Identity
  if (existIdentity.empty) {
    return {
      success: false,
      correctIdentity: false,
      correctPassword: false,
      username: null,
      uid: null,
    };
  }

  const userDoc = existIdentity.docs[0];
  const userData = userDoc.data();

  // Wrong Password
  if (userData.password !== password) {
    return {
      success: false,
      correctIdentity: true,
      correctPassword: false,
      username: null,
      uid: null,
    };
  }
  // Success

  return {
    success: true,
    correctIdentity: true,
    correctPassword: true,
    username: userData.name,
    uid: userDoc.id,
  };
};
