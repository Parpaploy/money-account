import { useParams } from "react-router-dom";
import { useToken } from "../../hooks/token-hook";
import { GetCategories } from "../../global/api/firebase/service/categories/categories";
import BarChart from "./components/charts/bar-chart";
import { useData } from "../../hooks/data-hook";
import { useEffect } from "react";

export default function DashboardPage() {
  const { username } = useParams();
  const { getLocalToken } = useToken();
  const uid = getLocalToken();

  const { expenseByCategoryIncome, expenseByCategoryOutcome } = useData();

  useEffect(() => {
    GetCategories(uid as string);
  }, []);

  if (!username) {
    return <>Loading...</>;
  }
  return (
    <div className="w-full h-[90svh] bg-[#fef6ea] overflow-y-auto">
      <button
        onClick={() => {
          GetCategories(uid as string);
        }}
      >
        Click to get categories
      </button>

      <div className="flex flex-col w-[70%]">
        <BarChart type="income" data={expenseByCategoryIncome} />
      </div>
      <div className="flex flex-col w-[70%]">
        <BarChart type="outcome" data={expenseByCategoryOutcome} />
      </div>
    </div>
  );
}
