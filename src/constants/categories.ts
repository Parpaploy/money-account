import type { ICategoryData } from "../interfaces/data.interface";

export const defaultCategorie: ICategoryData[] = [
  {
    id: "food",
    color: "#F86D6E",
    priority: 1,
    usageLimit: 1500,
  },
  {
    id: "utilities",
    color: "#FFBFCB",
    priority: 2,
    usageLimit: 2000,
  },
  {
    id: "travel",
    color: "#A9D0E7",
    priority: 3,
    usageLimit: 500,
  },
  {
    id: "fuel",
    color: "#F7EAA0",
    priority: 4,
    usageLimit: 500,
  },
];
