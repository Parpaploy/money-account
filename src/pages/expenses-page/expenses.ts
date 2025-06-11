import Swal from "sweetalert2";
import { CreateExpense } from "../../global/api/firebase/service/expenses/expenses";

export const CreateExpenseHandler = async (
  uid: string,
  amount: string,
  category: string,
  expenseType: string,
  description: string,
  merchant: string,
  subject: string,
  dateTime: string,
  navigator: (path: string) => void,
  username: string,
  setAmount: (input: string) => void,
  setExpenseCategory: (category: string) => void,
  setExpenseType: (input: string) => void,
  setDescription: (input: string) => void,
  setMerchant: (input: string) => void,
  setSubject: (input: string) => void,
  setDateTime: (input: string) => void,
  expenseCategory: string
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

    Swal.fire({
      title: "Add Expense successfully!",
      icon: "success",
      draggable: true,
      confirmButtonText: "Continue",
    }).then(() => {
      setExpenseCategory(expenseCategory);
      setAmount("");
      setExpenseType("outcome");
      setDescription("");
      setMerchant("");
      setSubject("");
      setDateTime("");

      navigator(`/private/${username}/`);
    });

    return amountNumber;
  } else {
    Swal.fire({
      icon: "error",
      title: "Please provide the properly data",
      confirmButtonText: "Ok",
    });
  }
};
