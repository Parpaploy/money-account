import { useParams } from "react-router-dom";
import { useToken } from "../../hooks/token-hook";
import { GetCategories } from "../../global/api/firebase/service/categories/categories";
import BarChart from "./components/charts/bar-chart";
import { useData } from "../../hooks/data-hook";

export default function DashboardPage() {
  const { username } = useParams();
  const { getLocalToken } = useToken();
  const uid = getLocalToken();

  const { expenseByCategoryIncome, expenseByCategoryOutcome } = useData();

  if (!username) {
    return <>No Found</>;
  }
  return (
    <div className="w-full h-[90svh] bg-[#fef6ea]">
      <button
        onClick={() => {
          GetCategories(uid as string);
        }}
      >
        Click to get categories
      </button>

      <div className="flex">
        <BarChart type="income" data={expenseByCategoryIncome} />
        <BarChart type="outcome" data={expenseByCategoryOutcome} />
      </div>
    </div>
  );
}
