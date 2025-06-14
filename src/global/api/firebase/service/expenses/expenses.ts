import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import type { IExpenseData } from "../../../../../interfaces/data.interface";

export const GetExpenses = async (uid: string): Promise<IExpenseData[]> => {
  try {
    const expenseCollection = collection(
      getFirestore(),
      "users",
      uid,
      "expenses"
    );

    const expensesSnapshot = await getDocs(expenseCollection);

    const expenses: IExpenseData[] = expensesSnapshot.docs.map((expense) => {
      const data = expense.data();
      return {
        id: expense.id,
        amount: data.amount ?? "",
        amountNumber: data.amountNumber ?? 0,
        category: data.category ?? "",
        dateTime: data.dateTime ?? "",
        description: data.description ?? "",
        expenseType: data.expenseType ?? "",
        merchant: data.merchant ?? "",
        subject: data.subject ?? "",
      };
    });

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

export const EditExpense = async (
  uid: string,
  expenseId: string,
  amount: string,
  category: string,
  expenseType: string,
  description: string,
  merchant: string,
  subject: string,
  dateTime: string
): Promise<void> => {
  try {
    const expenseDocRef = doc(
      getFirestore(),
      "users",
      uid,
      "expenses",
      expenseId
    );

    await updateDoc(expenseDocRef, {
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
    console.error("Error updating expense:", error);
    throw error;
  }
};

export const DeleteExpense = async (uid: string, id: string) => {
  try {
    const expenseDoc = doc(getFirestore(), "users", uid, "expenses", id);

    await deleteDoc(expenseDoc);
  } catch (error) {
    console.error("Error deleting expense:", error);
    throw error;
  }
};
