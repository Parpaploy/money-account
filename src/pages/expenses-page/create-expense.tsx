import { useEffect, useRef, useState } from "react";
import InputBox from "../../components/input-box";
import { CreateExpenseHandler } from "./expenses";
import { useToken } from "../../hooks/token-hook";
import { useData } from "../../hooks/data-hook";
import type { ICategoryData } from "../../interfaces/data.interface";
import { LuCalendar1 } from "react-icons/lu";

export default function CreateExpensePage() {
  const { getLocalToken } = useToken();
  const { fetchCategories } = useData();

  const inputRef = useRef<HTMLInputElement>(null);

  const uid = getLocalToken();

  const [id, setId] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [expenseCategory, setExpenseCategory] = useState<string>("");
  const [expenseType, setExpenseType] = useState<string>("outcome");
  const [description, setDescription] = useState<string>("");
  const [merchant, setMerchant] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [dateTime, setDateTime] = useState<string>("");

  useEffect(() => {
    if (uid) setId(uid);
  }, []);

  const [categories, setCategories] = useState<ICategoryData[]>([]);

  useEffect(() => {
    (async () => {
      await fetchCategories(setCategories);
    })();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      setExpenseCategory(categories[0].id);
    }
    setAmount("");
    setExpenseType("outcome");
    setDescription("");
    setMerchant("");
    setSubject("");
    setDateTime("");
  }, [categories]);

  return (
    <div className="w-full lg:h-[90svh] h-[92svh] overflow-y-auto bg-[#fef6ea] 2xl:px-30 2xl:py-20 lg:px-10 lg:py-8 px-7 py-6">
      <div className="flex lg:flex-row flex-col 2xl:gap-5 md:gap-7 gap-5 2xl:mb-10 md:mb-7 mb-5">
        <h1 className="lg:hidden text-[#fd8b8b] font-bold md:text-3xl text-2xl">
          New Expense
        </h1>
        <div className="w-full md:p-5 p-3 rounded-xl focus:outline-none focus:ring-transparent bg-[#ffaaaa] text-[#fff6c0]">
          <label className="md:text-xl text-md" htmlFor="Category">
            Category:
          </label>
          <select
            className="bg-[#fff6c0] text-[#ffaaaa] font-bold p-1 rounded-3xl ml-2 hover:cursor-pointer"
            id="category"
            name="category"
            value={expenseCategory}
            onChange={(e) => {
              setExpenseCategory(e.target.value);
            }}
            required
          >
            {categories.map((category) => {
              return (
                <option key={category.id} value={category.id}>
                  {category.id}
                </option>
              );
            })}
          </select>
        </div>

        <div className="w-full md:p-5 p-3 rounded-xl focus:outline-none focus:ring-transparent bg-[#ffaaaa] text-[#fff6c0]">
          <label className="md:text-xl text-md" htmlFor="ExpenseType">
            Expense Type:
          </label>
          <select
            className="bg-[#fff6c0] text-[#ffaaaa] font-bold p-1 rounded-3xl ml-2 hover:cursor-pointer"
            id="expensetype"
            name="expensetype"
            value={expenseType}
            onChange={(e) => {
              setExpenseType(e.target.value);
            }}
            required
          >
            <option value="outcome">Outcome</option>;
            <option value="income">Income</option>;
          </select>
        </div>

        <div className="relative w-full">
          <input
            ref={inputRef}
            className="md:text-xl text-md w-full h-full md:p-5 p-3 rounded-xl focus:outline-none focus:ring-transparent bg-[#ffaaaa] text-[#fff6c0]"
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            required
          />

          <div
            className="absolute bg-[#ffaaaa] text-[#fff6c0] text-xl lg:w-8 lg:h-8 text-center rounded-full lg:right-4 lg:top-5 top-3 right-3 hover:cursor-pointer flex items-center justify-center"
            onClick={() => inputRef.current?.showPicker?.()}
          >
            <LuCalendar1 />
          </div>
        </div>
      </div>

      <div className="flex flex-col rounded-xl 2xl:gap-5 lg:gap-3 md:gap-5 gap-4 w-full text-[#ffaaaa] lg:text-2xl text-lg">
        <div className="flex flex-col gap-1">
          <InputBox
            header="Amount"
            id="amount"
            type="number"
            value={amount}
            setValue={setAmount}
            font="bold"
            textSize="3xl"
            px="5"
            py="3"
            isRequire={true}
          />
          <p className="text-end lg:text-sm md:text-lg text-sm">
            Please fill number only
          </p>
        </div>

        <InputBox
          header="Description"
          id="description"
          type="text"
          value={description}
          setValue={setDescription}
          font="bold"
          textSize="3xl"
          px="5"
          py="3"
          isRequire={false}
        />
        <InputBox
          header="Merchant"
          id="merchant"
          type="text"
          value={merchant}
          setValue={setMerchant}
          font="bold"
          textSize="3xl"
          px="5"
          py="3"
          isRequire={false}
        />
        <InputBox
          header="Subject"
          id="subject"
          type="text"
          value={subject}
          setValue={setSubject}
          font="bold"
          textSize="3xl"
          px="5"
          py="3"
          isRequire={false}
        />
      </div>

      <div className="w-full flex justify-center 2xl:mt-10 lg:mt-5 mt-7">
        <button
          className="w-[50%] hover:cursor-pointer bg-[#fd8b8b] hover:bg-[#f08484] rounded-lg lg:py-5 md:py-3 py-2 lg:text-3xl text-xl font-[500] text-[#fff6c0] hover:text-[#f4ecb8] mt-1 md:mt-2"
          style={{
            boxShadow: "rgba(17, 17, 26, 0.05) 1px 1px 2px",
          }}
          onClick={async () => {
            await CreateExpenseHandler(
              id,
              amount,
              expenseCategory,
              expenseType,
              description,
              merchant,
              subject,
              dateTime
            );
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}
