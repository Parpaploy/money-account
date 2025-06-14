import { useData } from "../../hooks/data-hook";
import { useEffect, useRef, useState } from "react";
import EditExpensePopup from "../expenses-page/components/edit-expense-popup";
import { AiFillEdit } from "react-icons/ai";
import { useToken } from "../../hooks/token-hook";
import { formatDate, isColorDark } from "../dashboard-page/dashboard";
import { LuCalendar1 } from "react-icons/lu";
import { RiResetLeftLine } from "react-icons/ri";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { DeleteExpenseHandler } from "./expenses";
import { FaTrashCan } from "react-icons/fa6";

export default function EditExpensePage() {
  const { getLocalToken } = useToken();
  // รับ expenses ตรงๆ มาใช้ แทน expenseByCategory
  const { categories, expenses, loadData } = useData();

  const uid = getLocalToken();

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all");
  const [isPopup, setIsPopup] = useState<boolean>(false);
  const [selectedExpense, setSelectedExpense] = useState<any | null>(null);
  const [searchText, setSearchText] = useState<string>("");

  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(true);

  const startRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLInputElement>(null);

  const allExpenses = expenses;

  const filteredExpenses = allExpenses.filter((expense) => {
    const matchCategory =
      selectedCategoryId === "all" ||
      (selectedCategoryId === "uncategorized" &&
        (!expense.category || expense.category === "uncategorized")) ||
      expense.category === selectedCategoryId;

    const expenseDate = new Date(expense.dateTime);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    let matchDate = true;
    if (start && expenseDate < start) matchDate = false;
    if (end && expenseDate > end) matchDate = false;

    const matchSearch = expense.subject
      .toLowerCase()
      .includes(searchText.toLowerCase());

    return matchCategory && matchDate && matchSearch;
  });

  filteredExpenses.sort(
    (a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
  );

  console.log("Category ID Selected:", selectedCategoryId);
  console.log("Filtered:", filteredExpenses);

  return (
    <div className="w-full min-h-screen bg-[#fef6ea] relative">
      {/* Sticky Filter Bar */}
      <div
        className={`sticky top-0 z-10 bg-[#fef6ea] ${
          isFilterOpen ? "shadow-md" : "shadow-none h-0"
        }`}
        style={{
          left: 0,
          right: 0,
        }}
      >
        {/* Toggle Button on small screens */}
        <div className="flex justify-between items-center mb-4 lg:hidden bg-[#fef6ea] px-7 md:px-10 2xl:px-30 py-4 shadow-md sticky top-0 z-10">
          <h2 className="text-lg font-bold text-[#ffaaaa]">Filters</h2>
          <button
            className="text-[#ffaaaa] hover:text-[#ef9f9f] transition"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            aria-label="Toggle Filters"
          >
            {isFilterOpen ? (
              <BiChevronUp size={24} />
            ) : (
              <BiChevronDown size={24} />
            )}
          </button>
        </div>

        {/* Filter Controls */}
        <div
          className={`bg-[#fef6ea] lg:overflow-x-auto w-full flex flex-wrap gap-4 items-center transition-all duration-300 ease-in-out px-7 md:px-10 2xl:px-30 lg:py-8 pt-0 pb-3
      ${
        isFilterOpen
          ? "max-h-[1000px] opacity-100 pointer-events-auto visible"
          : "max-h-0 opacity-0 pointer-events-none invisible overflow-hidden"
      } lg:max-h-full lg:opacity-100 lg:flex-nowrap lg:overflow-x-auto`}
          style={{ maxWidth: "100vw" }}
        >
          {/* Category Filter - Desktop */}
          <div className="hidden lg:block bg-[#ffaaaa] text-[#fff6c0] p-4.5 rounded-xl">
            <label className="block text-lg mb-1 font-bold">Category: </label>
            <select
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              className="w-full bg-[#fff6c0] text-[#ffaaaa] cursor-pointer font-bold p-2 rounded-2xl"
            >
              <option value="all">All</option>
              <option value="uncategorized">(Uncategorized)</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.id}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter - Mobile */}
          <div className="lg:hidden flex w-full justify-start gap-7 items-center">
            <div className="bg-[#ffaaaa] text-[#fff6c0] p-4.5 rounded-xl">
              <label className="block text-lg mb-1 font-bold">Category: </label>
              <select
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
                className="w-full bg-[#fff6c0] text-[#ffaaaa] cursor-pointer font-bold p-2 rounded-2xl"
              >
                <option value="all">All</option>
                <option value="uncategorized">(Uncategorized)</option>
                {categories.map(
                  (
                    cat // **สำคัญ**: ไม่มี .filter((cat) => cat.id !== "uncategorized") แล้ว
                  ) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.id}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Reset Filters */}
            <button
              className="lg:hidden bg-[#fff6c0] text-[#ffaaaa] p-4 rounded-full cursor-pointer hover:bg-[#ebe3b1] hover:text-[#ef9f9f] "
              style={{
                boxShadow: "rgba(17, 17, 26, 0.05) 2px 2px 1px",
              }}
              onClick={() => {
                setSelectedCategoryId("all");
                setStartDate("");
                setEndDate("");
              }}
            >
              <RiResetLeftLine size={24} />
            </button>
          </div>

          {/* Search Input */}
          <div className="lg:min-w-[200px] bg-[#ffaaaa] text-[#fff6c0] p-4.5 rounded-xl">
            <label className="block text-lg mb-1 font-bold">
              Search Subject:
            </label>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search subject..."
              className="w-full bg-[#fff6c0] text-[#ffaaaa] font-bold p-2 rounded-2xl placeholder-[#ffaaaa]"
            />
          </div>

          {/* Start Date Filter */}
          <div className="relative bg-[#ffaaaa] text-[#fff6c0] p-4 rounded-xl">
            <label className="block mb-1 font-bold">Start Date:</label>
            <input
              ref={startRef}
              className="bg-[#ffaaaa] text-[#fff6c0] rounded-xl p-3 pr-10"
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <div
              className="absolute top-14 right-13 bg-[#ffaaaa] text-[#fff6c0] w-6 h-6 flex items-center justify-center rounded-full cursor-pointer"
              onClick={() => startRef.current?.showPicker?.()}
            >
              <LuCalendar1 size={16} />
            </div>
          </div>

          {/* End Date Filter */}
          <div className="relative bg-[#ffaaaa] text-[#fff6c0] p-4 rounded-xl">
            <label className="block mb-1 font-bold">End Date:</label>
            <input
              ref={endRef}
              className="bg-[#ffaaaa] text-[#fff6c0] rounded-xl p-3 pr-10"
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <div
              className="absolute top-14 right-13 bg-[#ffaaaa] text-[#fff6c0] w-6 h-6 flex items-center justify-center rounded-full cursor-pointer"
              onClick={() => endRef.current?.showPicker?.()}
            >
              <LuCalendar1 size={16} />
            </div>
          </div>

          {/* Reset Filters Desktop */}
          <button
            className="hidden lg:block bg-[#fff6c0] text-[#ffaaaa] p-4 rounded-full cursor-pointer hover:bg-[#ebe3b1] hover:text-[#ef9f9f] "
            style={{
              boxShadow: "rgba(17, 17, 26, 0.05) 2px 2px 1px",
            }}
            onClick={() => {
              setSelectedCategoryId("all");
              setStartDate("");
              setEndDate("");
            }}
          >
            <RiResetLeftLine size={24} />
          </button>
        </div>
      </div>

      {/* Expense List */}
      <div
        className={`2xl:px-30 md:px-10 px-7 ${
          isFilterOpen ? "pt-10" : "pt-25"
        }  pb-20`}
      >
        {filteredExpenses.length === 0 ? (
          <p className="text-sm text-gray-500">No expenses found</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {filteredExpenses.map((expense) => {
              const category = categories.find(
                (c) => c.id === expense.category
              );
              // ถ้าหา category ไม่เจอ หรือ category เป็น "uncategorized" ให้ใช้สีเทา
              const bgColor = category ? category.color : "#ccc";
              const isDark = category
                ? isColorDark(category.color)
                : isColorDark("#ccc"); // เช็คสีเทาด้วย
              const textColorClass = isDark ? "text-white" : "text-black";

              return (
                <li
                  key={expense.id}
                  className={`px-3 py-2 text-lg font-medium rounded-lg min-h-31 h-31 ${textColorClass}`}
                  style={{ backgroundColor: bgColor }}
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
                        <p className="truncate whitespace-nowrap">
                          Category:{" "}
                          {!expense.category ||
                          expense.category === "uncategorized" // ตรงนี้ใช้ logic เดิมได้
                            ? "(Uncategorized)"
                            : expense.category}
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
                            textColorClass === "text-white"
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
                            loadData(); // ให้ loadData() อัปเดตข้อมูลหลังลบ
                          }}
                          className={`rounded-full text-sm hover:cursor-pointer p-1.5 ${
                            textColorClass === "text-white"
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

      {/* Edit Popup */}
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
    </div>
  );
}
