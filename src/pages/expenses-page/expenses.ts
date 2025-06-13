import Swal from "sweetalert2";
import {
  CreateExpense,
  EditExpense,
} from "../../global/api/firebase/service/expenses/expenses";

export const CreateExpenseHandler = async (
  uid: string,
  amount: string,
  category: string,
  expenseType: string,
  description: string,
  merchant: string,
  subject: string,
  dateTime: string,
  setAmount: (input: string) => void,
  setExpenseCategory: (category: string) => void,
  setExpenseType: (input: string) => void,
  setDescription: (input: string) => void,
  setMerchant: (input: string) => void,
  setSubject: (input: string) => void,
  setDateTime: (input: string) => void,
  navigator: (path: string) => void,
  username: string
) => {
  try {
    if (amount && category && expenseType && dateTime && subject) {
      await CreateExpense(
        uid,
        amount,
        category,
        expenseType,
        description,
        merchant,
        subject,
        dateTime
      );

      Swal.fire({
        title: "Add Expense successfully!",
        icon: "success",
        draggable: true,
        confirmButtonText: "Continue",
      }).then(() => {
        setExpenseCategory(category);
        setAmount("");
        setExpenseType("outcome");
        setDescription("");
        setMerchant("");
        setSubject("");
        setDateTime("");

        navigator(`/private/${username}/`);
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Please provide the properly data",
        confirmButtonText: "Ok",
      });
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Failed to add expense",
      text: "Something went wrong. Please try again.",
    });
  }
};

export const EditExpenseHandler = async (
  uid: string,
  expenseId: string,
  amount: string,
  category: string,
  expenseType: string,
  description: string,
  merchant: string,
  subject: string,
  dateTime: string,
  setIsPopup: (isPopup: boolean) => void,
  setAmount: (input: string) => void,
  setExpenseType: (input: string) => void,
  setDescription: (input: string) => void,
  setMerchant: (input: string) => void,
  setSubject: (input: string) => void,
  setDateTime: (input: string) => void
): Promise<void> => {
  if (amount && category && expenseType && subject && dateTime) {
    await EditExpense(
      uid,
      expenseId,
      amount,
      category,
      expenseType,
      description,
      merchant,
      subject,
      dateTime
    );

    Swal.fire({
      title: "Edit Expense successfully!",
      icon: "success",
      draggable: true,
      confirmButtonText: "Continue",
    }).then(() => {
      setAmount(amount);
      setExpenseType(expenseType);
      setDescription(description);
      setMerchant(merchant);
      setSubject(subject);
      setDateTime(dateTime);

      setIsPopup(false);
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Please provide the properly data",
      confirmButtonText: "Ok",
    });
  }
};
