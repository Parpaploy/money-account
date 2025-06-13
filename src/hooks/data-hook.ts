import { useEffect, useState } from "react";
import { GetCategories } from "../global/api/firebase/service/categories/categories";
import { GetExpenses } from "../global/api/firebase/service/expenses/expenses";
import { useToken } from "./token-hook";
import type { ICategoryData, IExpenseData } from "../interfaces/data.interface";

export const useData = () => {
  const { getLocalToken } = useToken();
  const uid = getLocalToken();

  const [categories, setCategories] = useState<ICategoryData[]>([]);
  const [expenses, setExpenses] = useState<IExpenseData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!uid) return;
      const categoriesRes = await GetCategories(uid);
      const expensesRes: IExpenseData[] = await GetExpenses(uid);
      setCategories(
        categoriesRes.sort(
          (a: ICategoryData, b: ICategoryData) => a.priority - b.priority
        )
      );
      setExpenses(expensesRes);
      setLoading(false);
    })();
  }, [uid]);

  const expenseByCategory = categories.map((category) => {
    return expenses.filter((exp) => exp.category === category.id);
  });

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

  const loadData = async () => {
    if (!uid) return;
    setLoading(true);
    const categoriesRes = await GetCategories(uid);
    const expensesRes = await GetExpenses(uid);
    setCategories(
      categoriesRes.sort(
        (a: ICategoryData, b: ICategoryData) => a.priority - b.priority
      )
    );
    setExpenses(expensesRes);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [uid]);

  return {
    loading,
    categories,
    expenses,
    expenseByCategory,
    expenseByCategoryIncome,
    expenseByCategoryOutcome,
    loadData,
  };
};
