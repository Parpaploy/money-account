import { useParams } from "react-router-dom";
import BarChart from "./components/charts/bar-chart";
import { useData } from "../../hooks/data-hook";
import { formatDate, isColorDark } from "./dashboard";
import { useEffect, useState } from "react";
import { GetCategories } from "../../global/api/firebase/service/categories/categories";
import EditExpensePopup from "../expenses-page/components/edit-expense-popup";
import { AiFillEdit } from "react-icons/ai";
import { useToken } from "../../hooks/token-hook";

export default function DashboardPage() {
  const { username } = useParams();
  const {
    categories,
    expenseByCategory,
    expenseByCategoryIncome,
    expenseByCategoryOutcome,
    expenseByCategoryNet,
    loadData,
  } = useData();
  const { getLocalToken } = useToken();

  const uid = getLocalToken();

  const [isPopup, setIsPopup] = useState<boolean>(false);
  const [selectedExpense, setSelectedExpense] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
      await GetCategories(uid as string);
      loadData();
      setIsPopup(false);
    })();
  }, []);

  if (!username) {
    return <>Loading...</>;
  }
  return (
    <div className="w-full h-[90svh] overflow-y-auto bg-[#fef6ea] flex flex-col relative">
      <div className="w-full h-full bg-[#fef6ea] 2xl:px-30 2xl:py-20 lg:px-10 md:px-6 lg:py-8 md:py-5 pt-[103%] px-3 flex lg:flex-row flex-col justify-center lg:gap-10 md:gap-3 gap-3">
        <div className="hidden lg:flex flex-col 2xl:justify-between w-[50%] h-full 2xl:gap-0 gap-3">
          <div className="w-full h-96">
            <BarChart type="income" data={expenseByCategoryIncome} />
          </div>
          <div className="w-full h-96">
            <BarChart type="outcome" data={expenseByCategoryOutcome} />
          </div>
        </div>
        <div
          className="lg:w-[50%] w-full lg:h-full md:min-h-[70%] min-h-[400%] bg-white rounded-3xl overflow-y-auto p-5 flex flex-col gap-7"
          style={{
            boxShadow:
              "rgba(17, 17, 26, 0.05) 3px 3px 6px 0px inset,rgba(17, 17, 26, 0.05) -3px -3px 6px 1px inset",
          }}
        >
          {categories.map((category, index) => {
            const expensesInCategory = expenseByCategory[index]
              .slice()
              .sort((a, b) => {
                return (
                  new Date(b.dateTime).getTime() -
                  new Date(a.dateTime).getTime()
                );
              });
            const netAmount = expenseByCategoryNet[index];

            return (
              <div key={category.id}>
                <h2
                  className="border-b-2 border-gray-200 md:text-2xl text-xl font-bold mb-2 flex justify-between items-center"
                  style={{ color: category.color }}
                >
                  <p>{category.id}:</p>
                  <p className="font-medium text-lg">
                    {netAmount.toLocaleString()} / {category.usageLimit}
                  </p>
                </h2>

                {expensesInCategory.length === 0 ? (
                  <p className="text-sm text-gray-500">No expenses</p>
                ) : (
                  <ul className="space-y-2 flex flex-col gap-3 overflow-y-auto">
                    {expensesInCategory.map((expense) => {
                      const isDark = isColorDark(category.color);
                      const textColorClass = isDark
                        ? "text-white"
                        : "text-black";

                      return (
                        <li
                          key={expense.id}
                          className={`px-3 py-2 text-lg font-medium rounded-lg min-h-25 h-25 ${textColorClass}`}
                          style={{ backgroundColor: category.color }}
                        >
                          <div className="flex justify-between items-start w-full h-full">
                            <div className="w-[75%] h-full">
                              <div className="font-medium truncate whitespace-nowrap">
                                {expense.subject}
                              </div>
                              <div className="text-sm opacity-90">
                                <p className="text-xs truncate whitespace-nowrap">
                                  {formatDate(expense.dateTime)}
                                </p>
                                <p className="truncate whitespace-nowrap">
                                  {expense.description}
                                </p>
                                <p className="truncate whitespace-nowrap">
                                  {expense.merchant}
                                </p>
                              </div>
                            </div>

                            <div className="w-[25%] h-full flex flex-col justify-between items-end">
                              <div className="text-xl whitespace-nowrap">
                                {expense.expenseType === "income" ? "+" : "-"}
                                {expense.amountNumber}
                              </div>
                              <button
                                onClick={() => {
                                  setSelectedExpense(expense);
                                  setIsPopup(true);
                                }}
                                className={`rounded-full p-1 hover:cursor-pointer ${
                                  textColorClass === "text-white"
                                    ? "hover:bg-white hover:text-black"
                                    : "hover:bg-black hover:text-white"
                                }`}
                              >
                                <AiFillEdit />
                              </button>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
        <div className="lg:hidden flex md:flex-row flex-col w-full h-full gap-3">
          <div className="w-full md:h-65 h-45">
            <BarChart type="income" data={expenseByCategoryIncome} />
          </div>
          <div className="w-full md:h-65 h-45">
            <BarChart type="outcome" data={expenseByCategoryOutcome} />
          </div>
        </div>
      </div>

      {isPopup && selectedExpense && (
        <EditExpensePopup
          setIsPopup={setIsPopup}
          initialData={{
            id: selectedExpense.id,
            amount: selectedExpense.amount,
            category: selectedExpense.category,
            type: selectedExpense.expenseType,
            description: selectedExpense.description,
            merchant: selectedExpense.merchant,
            subject: selectedExpense.subject,
            dateTime: selectedExpense.dateTime,
          }}
        />
      )}
    </div>
  );
}
