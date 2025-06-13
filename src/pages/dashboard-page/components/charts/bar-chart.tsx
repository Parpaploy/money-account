import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useData } from "../../../../hooks/data-hook";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export default function BarChart({ type, data }: { type: string; data: any }) {
  const { categories } = useData();

  return (
    <div
      className="w-full h-full rounded-3xl md:px-7 md:py-3 px-3 py-1"
      style={{
        boxShadow:
          "rgba(17, 17, 26, 0.05) 3px 3px 6px 0px inset,rgba(17, 17, 26, 0.05) -3px -3px 6px 1px inset",
      }}
    >
      {data.some((value: number) => value > 0) && data.length > 0 ? (
        <Bar
          data={{
            labels: categories.map((category) => category.id),
            datasets: [
              {
                label: type,
                data: data,
                backgroundColor: categories.map((category) => category.color),
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: type === "income" ? "Income" : "Outcome",
                align: "start",
                position: "top",
                color: "#242E68",
                font: {
                  size: 32,
                  weight: "bold",
                },
              },
              legend: {
                display: false,
              },
              tooltip: {
                bodyFont: {
                  size: 13,
                },
                titleFont: {
                  size: 14,
                },
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
              },
              y: {
                beginAtZero: true,
                grid: {
                  color: "#cccccc",
                  lineWidth: 1,
                },
              },
            },
          }}
        />
      ) : (
        <div className="w-full h-full">
          <div className="text-[#242E68] font-bold text-[32px]">
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </div>
          <div className="w-full h-[80%] flex justify-center items-center font-bold text-xl">
            No data
          </div>
        </div>
      )}
    </div>
  );
}
