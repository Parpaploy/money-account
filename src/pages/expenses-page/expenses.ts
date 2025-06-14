import Swal from "sweetalert2";
import {
  CreateExpense,
  DeleteExpense,
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

export const DeleteExpenseHandler = async (
  uid: string,
  id: string,
  subject: string
) => {
  if (uid && id) {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete expense "${subject}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await DeleteExpense(uid, id);
      await Swal.fire({
        title: "Deleted!",
        text: "The expense has been deleted.",
        icon: "success",
      });
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Failed to delete expense. Please try again later",
      confirmButtonText: "Ok",
    });
  }
};
