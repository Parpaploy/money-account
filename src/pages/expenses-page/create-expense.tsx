import { useEffect, useState } from "react";
import InputBox from "../../components/input-box";
import { CreateExpenseHandler } from "./expenses";
import { useToken } from "../../hooks/token-hook";
import { useData } from "../../hooks/data-hook";
import type { ICategoryData } from "../../interfaces/data.interface";

export default function CreateExpensePage() {
  const { getLocalToken } = useToken();

  const uid = getLocalToken();

  const [id, setId] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [expenseCategory, setExpenseCategory] = useState<string>("");
  const [expenseType, setExpenseType] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [merchant, setMerchant] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [dateTime, setDateTime] = useState<string>("");

  const { fetchCategories } = useData();

  useEffect(() => {
    if (uid) setId(uid);
    console.log(uid);
  }, []);

  const [categories, setCategories] = useState<ICategoryData[]>([]);

  useEffect(() => {
    (async () => {
      await fetchCategories(setCategories);
    })();
  }, []);

  return (
    <div className="w-full h-[90svh] overflow-y-auto bg-[#fef6ea] 2xl:px-30 2xl:py-20 md:px-10 md:py-8">
      <div className="flex gap-5 2xl:mb-10 md:mb-5">
        <div className="w-full md:p-5 rounded-xl focus:outline-none focus:ring-transparent bg-[#ffaaaa] text-[#fff6c0]">
          <label htmlFor="Category">Category:</label>
          <select
            className="bg-[#fff6c0] text-[#ffaaaa] font-bold p-1 rounded-3xl ml-2"
            id="category"
            name="category"
            value={expenseCategory}
            onChange={(e) => {
              setExpenseCategory(e.target.value);
            }}
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

        <div className="w-full p-5 rounded-xl focus:outline-none focus:ring-transparent bg-[#ffaaaa] text-[#fff6c0]">
          <label htmlFor="ExpenseType">Expense Type:</label>
          <select
            className="bg-[#fff6c0] text-[#ffaaaa] font-bold p-1 rounded-3xl ml-2"
            id="expensetype"
            name="expensetype"
            value={expenseType}
            onChange={(e) => {
              setExpenseType(e.target.value);
            }}
          >
            <option value="outcome">Outcome</option>;
            <option value="income">Income</option>;
          </select>
        </div>

        <input
          className="w-full p-5 rounded-xl focus:outline-none focus:ring-transparent bg-[#ffaaaa] text-[#fff6c0]"
          type="datetime-local"
          value={dateTime}
          onChange={(e) => {
            setDateTime(e.target.value);
          }}
        />
      </div>

      <div className="flex flex-col rounded-xl 2xl:gap-5 md:gap-3 w-full text-[#fd8b8b] text-2xl">
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
          />
          <p className="text-end text-sm">Please fill number only</p>
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
        />
      </div>

      <div className="w-full flex justify-center 2xl:mt-10 md:mt-5">
        <button
          className="w-[50%] hover:cursor-pointer bg-[#fd8b8b] hover:bg-[#f08484] rounded-lg py-5 text-3xl font-[500] text-[#fff6c0] hover:text-[#f4ecb8] mt-1 md:mt-2"
          style={{
            boxShadow: "rgba(17, 17, 26, 0.05) 1px 1px 2px",
          }}
          onClick={() => {
            CreateExpenseHandler(
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
