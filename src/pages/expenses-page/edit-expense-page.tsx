import { useEffect, useRef, useState } from "react";
import InputBox from "../../components/input-box";
import { CreateExpenseHandler } from "./expenses";
import { useToken } from "../../hooks/token-hook";
import { useData } from "../../hooks/data-hook";
import { LuCalendar1 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export default function EditExpensePage() {
  const { getLocalToken, getLocalUsername } = useToken();
  const { categories } = useData();
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);

  const uid = getLocalToken();
  const username = getLocalUsername();

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
    <div className="w-full h-[90svh] overflow-y-auto bg-[#fef6ea] 2xl:px-30 2xl:py-20 md:px-10 py-8 px-7"></div>
  );
}
