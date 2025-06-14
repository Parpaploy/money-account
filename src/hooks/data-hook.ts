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

  const processCategories = (fetchedCategories: ICategoryData[]) => {
    const uncategorizedCat: ICategoryData = {
      id: "uncategorized",
      name: "Uncategorized",
      color: "#CCCCCC",
      priority: 9999,
      usageLimit: 0,
    };

    const hasUncategorized = fetchedCategories.some(
      (cat) => cat.id === "uncategorized"
    );

    let finalCategories = [...fetchedCategories];
    if (!hasUncategorized) {
      finalCategories.push(uncategorizedCat);
    } else {
      finalCategories = finalCategories.map((cat) =>
        cat.id === "uncategorized" ? { ...cat, priority: 9999 } : cat
      );
    }

    return finalCategories.sort(
      (a: ICategoryData, b: ICategoryData) => a.priority - b.priority
    );
  };

  useEffect(() => {
    (async () => {
      if (!uid) {
        setLoading(false);
        return;
      }
      setLoading(true);
      const categoriesRes = await GetCategories(uid);
      const expensesRes: IExpenseData[] = await GetExpenses(uid);

      setCategories(processCategories(categoriesRes));
      setExpenses(expensesRes);
      setLoading(false);
    })();
  }, [uid]);

  const loadData = async () => {
    if (!uid) return;
    setLoading(true);
    const categoriesRes = await GetCategories(uid);
    const expensesRes = await GetExpenses(uid);

    setCategories(processCategories(categoriesRes));
    setExpenses(expensesRes);
    setLoading(false);
  };

  const expenseByCategory = categories.map((category) => {
    return expenses.filter((exp) =>
      category.id === "uncategorized"
        ? !exp.category || exp.category === "uncategorized"
        : exp.category === category.id
    );
  });

  const expenseByCategoryIncome = categories.map((category) => {
    return expenses
      .filter(
        (exp) =>
          (category.id === "uncategorized"
            ? !exp.category || exp.category === "uncategorized"
            : exp.category === category.id) && exp.expenseType === "income"
      )
      .reduce((sum, exp) => sum + exp.amountNumber, 0);
  });

  const expenseByCategoryOutcome = categories.map((category) => {
    return expenses
      .filter(
        (exp) =>
          (category.id === "uncategorized"
            ? !exp.category || exp.category === "uncategorized"
            : exp.category === category.id) && exp.expenseType === "outcome"
      )
      .reduce((sum, exp) => sum + exp.amountNumber, 0);
  });

  const expenseByCategoryNet = categories.map((category) => {
    const totalIncome = expenses
      .filter(
        (exp) =>
          (category.id === "uncategorized"
            ? !exp.category || exp.category === "uncategorized"
            : exp.category === category.id) && exp.expenseType === "income"
      )
      .reduce((sum, exp) => sum + exp.amountNumber, 0);

    const totalOutcome = expenses
      .filter(
        (exp) =>
          (category.id === "uncategorized"
            ? !exp.category || exp.category === "uncategorized"
            : exp.category === category.id) && exp.expenseType === "outcome"
      )
      .reduce((sum, exp) => sum + exp.amountNumber, 0);

    return totalIncome - totalOutcome;
  });

  return {
    loading,
    categories,
    expenses,
    expenseByCategory,
    expenseByCategoryIncome,
    expenseByCategoryOutcome,
    expenseByCategoryNet,
    loadData,
  };
};
