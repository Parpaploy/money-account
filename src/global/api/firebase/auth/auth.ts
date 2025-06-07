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

  const categoriesRef = collection(newUser, "categories");

  const defaultCategories = [
    {
      id: "food",
      name: "อาหาร",
      color: "#F4327F",
      priority: 1,
      usageLimit: 1500,
    },
    {
      id: "utilities",
      name: "ของใช้",
      color: "#AFD65C",
      priority: 2,
      usageLimit: 2000,
    },
    {
      id: "travel",
      name: "เดินทาง",
      color: "#45B9DA",
      priority: 3,
      usageLimit: 500,
    },
    {
      id: "fuel",
      name: "น้ำมัน",
      color: "#FBA535",
      priority: 4,
      usageLimit: 500,
    },
  ];

  for (const category of defaultCategories) {
    const categoryDoc = doc(categoriesRef, category.id);
    await setDoc(categoryDoc, category);
  }

  collection(newUser, "expenses");
  // const expenseDoc = doc(expensesRef);
  // await setDoc(expenseDoc, {});
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

export const AddExpense = async (uid: string): Promise<any> => {
  const expenseCollection = collection(
    getFirestore(),
    "users",
    uid,
    "expenses"
  );

  const expenseDoc = doc(expenseCollection);
  await setDoc(expenseDoc, { title: "yo" });
  console.log("Document set done");
};
