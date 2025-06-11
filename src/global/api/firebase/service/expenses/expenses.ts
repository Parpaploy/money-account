import {
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";

export const GetExpenses = async (uid: string) => {
  try {
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
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return [];
  }
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
): Promise<void> => {
  try {
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
  } catch (error) {
    console.error("Error creating expense:", error);
    throw error;
  }
};
