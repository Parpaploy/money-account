import { useEffect, useRef, useState } from "react";
import InputBox from "../../../components/input-box";
import { useData } from "../../../hooks/data-hook";
import { useToken } from "../../../hooks/token-hook";
import { EditExpenseHandler } from "../expenses";
import { LuCalendar1 } from "react-icons/lu";
import { IoCloseCircle } from "react-icons/io5";

export default function EditExpensePopup({
  setIsPopup,
  initialData,
}: {
  setIsPopup: (isPopup: boolean) => void;
  initialData: {
    id: string;
    amount: string;
    category: string;
    type: string;
    description: string;
    merchant: string;
    subject: string;
    dateTime: string;
  };
}) {
  const { getLocalToken } = useToken();
  const { categories } = useData();
  const inputRef = useRef<HTMLInputElement>(null);
  const uid = getLocalToken();

  const [id, setId] = useState<string>("");
  const [expenseId, setExpenseId] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [expenseCategory, setExpenseCategory] = useState<string>("");
  const [expenseType, setExpenseType] = useState<string>("outcome");
  const [description, setDescription] = useState<string>("");
  const [merchant, setMerchant] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [dateTime, setDateTime] = useState<string>("");

  const hasChanged =
    amount !== initialData.amount ||
    expenseCategory !== initialData.category ||
    expenseType !== initialData.type ||
    description !== initialData.description ||
    merchant !== initialData.merchant ||
    subject !== initialData.subject ||
    dateTime !== initialData.dateTime;

  useEffect(() => {
    if (uid) setId(uid);
    if (initialData) {
      setExpenseId(initialData.id);
      setAmount(initialData.amount);
      setExpenseCategory(initialData.category);
      setExpenseType(initialData.type);
      setDescription(initialData.description);
      setMerchant(initialData.merchant);
      setSubject(initialData.subject);
      setDateTime(initialData.dateTime);
    }
  }, [uid, initialData]);

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center z-50">
      <div className="w-[80%] md:w-[70%] 2xl:h-[85%] lg:w-[70%] 2xl:w-[60%] h-[80%] md:h-[70%] lg:h-[80%] bg-[#fef6ea] rounded-3xl relative shadow-md overflow-y-auto">
        <button
          onClick={() => setIsPopup(false)}
          className="sticky z-10 top-3 lg:left-[93%] md:left-[88.5%] left-[83%] text-4xl md:text-5xl bg-[#fef6ea] p-1 rounded-full 2xl:text-6xl text-[#fd8b8b] hover:text-[#f9b6b6] cursor-pointer"
        >
          <IoCloseCircle />
        </button>

        <div className="flex flex-col gap-6 md:gap-8 2xl:gap-10 px-6 md:px-10 lg:px-14 pt-0 pb-10 text-[#ffaaaa] text-xl md:text-2xl">
          <h1 className="text-[#fd8b8b] font-bold text-2xl md:text-3xl mb-3">
            Edit Category
          </h1>

          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Category */}
            <div className="w-full lg:w-[30%] bg-[#ffaaaa] text-[#fff6c0] p-4 rounded-xl">
              <label className="block text-lg mb-1">Category:</label>
              <select
                className="w-full bg-[#fff6c0] text-[#ffaaaa] font-bold p-2 rounded-2xl"
                value={expenseCategory}
                onChange={(e) => setExpenseCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.id}
                  </option>
                ))}
              </select>
            </div>

            {/* Expense Type */}
            <div className="w-full lg:w-[30%] bg-[#ffaaaa] text-[#fff6c0] p-4 rounded-xl">
              <label className="block text-lg mb-1">Expense Type:</label>
              <select
                className="w-full bg-[#fff6c0] text-[#ffaaaa] font-bold p-2 rounded-2xl"
                value={expenseType}
                onChange={(e) => setExpenseType(e.target.value)}
              >
                <option value="outcome">Outcome</option>
                <option value="income">Income</option>
              </select>
            </div>

            {/* Date Picker */}
            <div className="w-full lg:w-[40%] relative">
              <input
                ref={inputRef}
                className="w-full bg-[#ffaaaa] text-[#fff6c0] lg:p-9.5 rounded-xl lg:text-xl p-3"
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
              />
              <div
                className="absolute lg:top-9 lg:right-9 md:top-2.5 top-2 right-3 bg-[#ffaaaa] text-[#fff6c0] w-8 h-8 flex items-center justify-center rounded-full cursor-pointer"
                onClick={() => inputRef.current?.showPicker?.()}
              >
                <LuCalendar1 />
              </div>
            </div>
          </div>

          {/* Input Fields */}
          <div className="flex flex-col gap-5">
            <div>
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
              <p className="text-end text-sm">Please fill number only</p>
            </div>

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
          </div>

          {/* Submit Button */}
          <div className="w-full flex justify-center">
            <button
              disabled={!hasChanged}
              className={`
                w-[50%] rounded-lg mt-3
                text-lg md:text-xl lg:text-2xl 2xl:text-3xl
                py-2 md:py-3 lg:py-4 2xl:py-5 font-medium
                ${
                  !hasChanged
                    ? "bg-[#c16a6a] text-[#b7b18a]"
                    : "bg-[#fd8b8b] text-[#fff6c0] hover:bg-[#f08484] hover:text-[#f4ecb8] hover:cursor-pointer"
                }
              `}
              style={{
                boxShadow: "rgba(17, 17, 26, 0.05) 1px 1px 2px",
              }}
              onClick={async () => {
                await EditExpenseHandler(
                  uid as string,
                  expenseId,
                  amount,
                  expenseCategory,
                  expenseType,
                  description,
                  merchant,
                  subject,
                  dateTime,
                  setIsPopup,
                  setAmount,
                  setExpenseType,
                  setDescription,
                  setMerchant,
                  setSubject,
                  setDateTime
                );
              }}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
