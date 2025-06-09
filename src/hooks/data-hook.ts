import { useEffect, useState } from "react";
import { GetCategories } from "../global/api/firebase/service/categories/categories";
import { GetExpenses } from "../global/api/firebase/service/expenses/expenses";
import { useToken } from "./token-hook";
import type { ICategoryData, IExpenseData } from "../interfaces/data.interface";

export const useData = () => {
  const { getLocalToken } = useToken();
  const uid = getLocalToken();

  const fetchCategories = async (setCategories: (res: any) => void) => {
    const res = await GetCategories(uid as string);
    setCategories(res);
  };

  const fetchExpenses = async (setExpenses: (rees: any) => void) => {
    const res = await GetExpenses(uid as string);
    setExpenses(res);
  };

  useEffect(() => {
    (async () => {
      await fetchCategories(setCategories);
      await fetchExpenses(setExpenses);
    })();
  }, []);

  const [categories, setCategories] = useState<ICategoryData[]>([]);

  const [expenses, setExpenses] = useState<IExpenseData[]>([]);

  const expenseByCategoryIncome = categories.map((category) => {
    return expenses
      .filter(
        (exp) => exp.category === category.id && exp.expenseType === "income"
      )
      .reduce((sum, exp) => sum + exp.amountNumber, 0);
  });

  const expenseByCategoryOutcome = categories.map((category) => {
    return expenses
      .filter(
        (exp) => exp.category === category.id && exp.expenseType === "outcome"
      )
      .reduce((sum, exp) => sum + exp.amountNumber, 0);
  });

  return {
    fetchCategories,
    fetchExpenses,
    expenseByCategoryIncome,
    expenseByCategoryOutcome,
  };
};
