import {
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";

export const GetExpenses = async (uid: string) => {
  const expenseCollection = collection(
    getFirestore(),
    "users",
    uid,
    "expenses"
  );

  const expensesSnapshot = await getDocs(expenseCollection);
  const expenses = expensesSnapshot.docs.map((expense) => ({
    id: expense.id,
    ...expense.data(),
  }));

  return expenses;
};

export const CreateExpense = async (
  uid: string,
  amount: string,
  category: string,
  expenseType: string,
  description: string,
  merchant: string,
  subject: string,
  dateTime: string
): Promise<any> => {
  const expenseCollection = collection(
    getFirestore(),
    "users",
    uid,
    "expenses"
  );

  const expenseDoc = doc(expenseCollection);
  await setDoc(expenseDoc, {
    amount: amount,
    amountNumber: Number(amount),
    category: category,
    expenseType: expenseType,
    description: description,
    merchant: merchant,
    subject: subject,
    dateTime: dateTime,
  });
};
