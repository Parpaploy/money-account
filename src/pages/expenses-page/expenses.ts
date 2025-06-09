import { CreateExpense } from "../../global/api/firebase/service/expenses/expenses";

export const CreateExpenseHandler = async (
  uid: string,
  amount: string,
  category: string,
  expenseType: string,
  description: string,
  merchant: string,
  subject: string,
  dateTime: string
) => {
  if (amount && category && expenseType && dateTime) {
    CreateExpense(
      uid as string,
      amount,
      category,
      expenseType,
      description,
      merchant,
      subject,
      dateTime
    );
    const amountNumber = Number(amount);
    return amountNumber;
  }
};
