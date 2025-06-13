import { useParams } from "react-router-dom";
import BarChart from "./components/charts/bar-chart";
import { useData } from "../../hooks/data-hook";

export default function DashboardPage() {
  const { username } = useParams();
  const {
    categories,
    expenseByCategory,
    expenseByCategoryIncome,
    expenseByCategoryOutcome,
  } = useData();

  if (!username) {
    return <>Loading...</>;
  }
  return (
    <div className="w-full h-[90svh] overflow-y-auto bg-[#fef6ea] 2xl:px-30 2xl:py-20 md:px-10 py-8 px-7 flex justify-center gap-10">
      <div className="flex flex-col w-[50%] h-full gap-3">
        <div className="w-full h-96">
          <BarChart type="income" data={expenseByCategoryIncome} />
        </div>
        <div className="w-full h-96">
          <BarChart type="outcome" data={expenseByCategoryOutcome} />
        </div>
      </div>

      <div
        className="w-[50%] h-full bg-white rounded-3xl overflow-y-auto p-5"
        style={{
          boxShadow:
            "rgba(17, 17, 26, 0.05) 3px 3px 6px 0px inset,rgba(17, 17, 26, 0.05) -3px -3px 6px 1px inset",
        }}
      >
        {categories.map((category, index: number) => {
          const expensesInCategory = expenseByCategory[index];
          return (
            <div key={category.id}>
              <h2 className="text-lg font-bold mb-2">{category.id}</h2>
              {expensesInCategory.length === 0 ? (
                <p className="text-sm text-gray-500">No expenses</p>
              ) : (
                <ul className="space-y-2">
                  {expensesInCategory.map((expense) => (
                    <li
                      key={expense.id}
                      className="border border-gray-200 rounded-lg p-3 text-sm bg-gray-50"
                    >
                      <div className="font-medium">{expense.subject}</div>
                      <div className="text-xs text-gray-600">
                        <p className="text-[#a6a6a6]">{expense.dateTime}</p>
                        <p> {expense.description}</p>
                        <p>{expense.merchant}</p>
                        <p>{expense.amountNumber}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
