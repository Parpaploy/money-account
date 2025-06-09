import { useEffect, useState } from "react";
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
import type { ICategoryData } from "../../../../interfaces/data.interface";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export default function BarChart({ type, data }: { type: string; data: any }) {
  const { fetchCategories } = useData();

  const [categories, setCategories] = useState<ICategoryData[]>([]);

  useEffect(() => {
    (async () => {
      await fetchCategories(setCategories);
    })();
  }, []);

  return (
    <div className="w-full h-full">
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
    </div>
  );
}
