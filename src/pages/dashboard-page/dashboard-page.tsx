import { useParams } from "react-router-dom";
import BarChart from "./components/charts/bar-chart";
import { useData } from "../../hooks/data-hook";
import { formatDate, isColorDark } from "./dashboard";
import { useEffect, useState } from "react";
import EditExpensePopup from "../expenses-page/components/edit-expense-popup";
import { AiFillEdit } from "react-icons/ai";
import { useToken } from "../../hooks/token-hook";
import EditCategoryPopup from "../categories-page/components/edit-category-popup";
import { FaTrashCan } from "react-icons/fa6";
import { DeleteCategoryHandler } from "../categories-page/categories";
import { DeleteExpenseHandler } from "../expenses-page/expenses";

export default function DashboardPage() {
  const { username } = useParams();
  const {
    categories,
    expenses,
    expenseByCategoryIncome,
    expenseByCategoryOutcome,
    expenseByCategoryNet,
    loadData,
  } = useData();
  const { getLocalToken } = useToken();

  const uid = getLocalToken();

  const [isPopup, setIsPopup] = useState<boolean>(false);
  const [isEditCategoryPopup, setIsEditCategoryPopup] =
    useState<boolean>(false);
  const [selectedExpense, setSelectedExpense] = useState<any | null>(null);
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(
    null
  );
  const [hoveredDeleteCategoryId, setHoveredDeleteCategoryId] = useState<
    string | null
  >(null);

  useEffect(() => {
    setIsPopup(false);
    setIsEditCategoryPopup(false);
  }, []);

  if (!username) {
    return <>Loading...</>;
  }

  return (
    <div className="w-full md:h-[90svh] md:min-h-[90svh] min-h-screen overflow-y-auto bg-[#fef6ea] flex flex-col relative pt-2 pb-3 md:pt-0 md:pb-0">
      <div className="w-full h-full bg-[#fef6ea] 2xl:px-30 2xl:py-20 lg:px-10 md:px-6 lg:py-8 md:py-5 px-3 flex lg:flex-row flex-col justify-end lg:gap-10 md:gap-3 gap-3">
        <div className="hidden lg:flex flex-col 2xl:justify-between w-[50%] h-full 2xl:gap-0 gap-3">
          <div className="w-full h-96">
            <BarChart type="income" data={expenseByCategoryIncome} />
          </div>
          <div className="w-full h-96">
            <BarChart type="outcome" data={expenseByCategoryOutcome} />
          </div>
        </div>

        <div
          className="lg:w-[50%] w-full lg:h-full lg:max-h-full md:min-h-[70%] md:max-h-full max-h-[55svh] bg-white rounded-3xl overflow-y-auto p-5 flex flex-col gap-7"
          style={{
            boxShadow:
              "rgba(17, 17, 26, 0.05) 3px 3px 6px 0px inset,rgba(17, 17, 26, 0.05) -3px -3px 6px 1px inset",
          }}
        >
          {categories.map((category, index) => {
            console.log("Processing Category:", category.id);
            const expensesInCategory = expenses
              .filter((exp) => {
                const isMatch =
                  category.id === "uncategorized"
                    ? !exp.category || exp.category === "uncategorized"
                    : exp.category === category.id;

                if (category.id === "uncategorized" && isMatch) {
                  console.log(
                    "Uncategorized expense found:",
                    exp.subject,
                    exp.category
                  );
                }
                return isMatch;
              })
              .slice()
              .sort((a, b) => {
                return (
                  new Date(b.dateTime).getTime() -
                  new Date(a.dateTime).getTime()
                );
              });

            const netAmount = expenseByCategoryNet[index];

            const isDark = isColorDark(category.color);
            const textColorClass = isDark ? "text-white" : "text-black";

            const isHovered = hoveredCategoryId === category.id;
            const isDeleteHovered = hoveredDeleteCategoryId === category.id;

            const isUncategorized = category.id === "uncategorized";

            return (
              <div key={category.id}>
                <h2
                  className="border-b-2 border-gray-200 md:text-2xl text-xl font-bold mb-2 flex justify-between items-center"
                  style={{ color: category.color }}
                >
                  <div className="flex justify-start items-center gap-2">
                    <div className="flex justify-center items-center">
                      {!isUncategorized && (
                        <button
                          onClick={async () => {
                            await DeleteCategoryHandler(
                              uid as string,
                              category.id
                            );
                            loadData();
                          }}
                          onMouseEnter={() =>
                            setHoveredDeleteCategoryId(category.id)
                          }
                          onMouseLeave={() => setHoveredDeleteCategoryId(null)}
                          className={`rounded-full hover:cursor-pointer text-lg p-2 ${
                            textColorClass === "text-white"
                              ? "hover:text-white"
                              : "hover:text-black"
                          }`}
                          style={{
                            backgroundColor: isDeleteHovered
                              ? category.color
                              : "",
                          }}
                        >
                          <FaTrashCan />
                        </button>
                      )}

                      {!isUncategorized && (
                        <button
                          onClick={() => {
                            setCurrentCategory(category.id);
                            setIsEditCategoryPopup(true);
                          }}
                          onMouseEnter={() => setHoveredCategoryId(category.id)}
                          onMouseLeave={() => setHoveredCategoryId(null)}
                          className={`rounded-full p-1 hover:cursor-pointer ${
                            textColorClass === "text-white"
                              ? "hover:text-white"
                              : "hover:text-black"
                          }`}
                          style={{
                            backgroundColor: isHovered ? category.color : "",
                          }}
                        >
                          <AiFillEdit />
                        </button>
                      )}
                    </div>

                    <p>{category.id}:</p>
                  </div>
                  <p className="font-medium text-lg">
                    {netAmount.toLocaleString()}{" "}
                    {category.usageLimit ? `/ ${category.usageLimit}` : ""}
                  </p>
                </h2>

                {expensesInCategory.length === 0 ? (
                  <p className="text-sm text-gray-500">No expenses</p>
                ) : (
                  <ul className="space-y-2 flex flex-col gap-3 overflow-y-auto">
                    {expensesInCategory.map((expense) => {
                      const itemBgColor = category.color;
                      const itemIsDark = isColorDark(itemBgColor);
                      const itemTextColorClass = itemIsDark
                        ? "text-white"
                        : "text-black";

                      return (
                        <li
                          key={expense.id}
                          className={`px-3 py-2 text-lg font-medium rounded-lg min-h-25 h-25 ${itemTextColorClass}`}
                          style={{ backgroundColor: itemBgColor }}
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
                              <div className="flex justify-center items-center">
                                <button
                                  onClick={() => {
                                    setSelectedExpense(expense);
                                    setIsPopup(true);
                                  }}
                                  className={`rounded-full p-1 hover:cursor-pointer ${
                                    itemTextColorClass === "text-white"
                                      ? "hover:bg-white hover:text-black"
                                      : "hover:bg-black hover:text-white"
                                  }`}
                                >
                                  <AiFillEdit />
                                </button>

                                <button
                                  onClick={async () => {
                                    await DeleteExpenseHandler(
                                      uid as string,
                                      expense.id,
                                      expense.subject
                                    );
                                    loadData();
                                  }}
                                  className={`rounded-full text-sm hover:cursor-pointer p-1.5 ${
                                    itemTextColorClass === "text-white"
                                      ? "hover:bg-white hover:text-black"
                                      : "hover:bg-black hover:text-white"
                                  }`}
                                >
                                  <FaTrashCan />
                                </button>
                              </div>
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
          loadData={loadData}
        />
      )}

      {isEditCategoryPopup && (
        <EditCategoryPopup
          setIsPopup={setIsEditCategoryPopup}
          currentCategory={currentCategory}
          categories={categories}
          reloadCategories={loadData}
        />
      )}
    </div>
  );
}
