import { IoCloseCircle } from "react-icons/io5";
import InputBox from "../../../components/input-box";
import { useEffect, useMemo, useState } from "react";
import { EditCategoryHandler } from "../categories";
import { useToken } from "../../../hooks/token-hook";
import type { ICategoryData } from "../../../interfaces/data.interface";

export default function EditCategoryPopup({
  setIsPopup,
  currentCategory,
  categories,
  reloadCategories,
}: {
  setIsPopup: (isPopup: boolean) => void;
  currentCategory: string;
  categories: ICategoryData[];
  reloadCategories: () => void;
}) {
  const { getLocalToken } = useToken();

  const uid = getLocalToken();

  const [id, setId] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [color, setColor] = useState<string>("#A9D0E7");
  const [priority, setPriority] = useState<string>("1");
  const [usageLimit, setUsageLimit] = useState<string>("");
  const [originalCategory, setOriginalCategory] =
    useState<ICategoryData | null>(null);

  useEffect(() => {
    if (uid) setId(uid);

    const theCategory = categories.find(
      (category) => category.id === currentCategory
    );

    if (theCategory) {
      setOriginalCategory(theCategory);
      setCategoryId(theCategory.id);
      setColor(theCategory.color);
      setPriority(theCategory.priority.toString());
      setUsageLimit(theCategory.usageLimit.toString());
    }
  }, [uid, currentCategory, categories]);

  const hasChanged = useMemo(() => {
    if (!originalCategory) return false;

    return (
      originalCategory.color !== color ||
      originalCategory.priority !== Number(priority) ||
      originalCategory.usageLimit !== Number(usageLimit)
    );
  }, [color, priority, usageLimit, originalCategory]);

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center z-50">
      <div
        className="2xl:w-[30%] lg:w-[40%] md:w-[70%] w-[80%] lg:h-[75%] md:h-[70%] h-[80%] bg-[#fef6ea] rounded-3xl relative"
        style={{
          boxShadow: "rgba(17, 17, 26, 0.05) 1px 1px 2px",
        }}
      >
        <button
          onClick={() => {
            setIsPopup(false);
          }}
          className="absolute top-3 right-3 2xl:text-6xl md:text-5xl text-4xl text-[#fd8b8b] hover:text-[#f9b6b6] cursor-pointer"
        >
          <IoCloseCircle />
        </button>

        <div className="flex flex-col rounded-xl 2xl:gap-10 md:gap-5 gap-[5%] w-full text-[#ffaaaa] text-2xl 2xl:px-15 lg:px-10 md:px-12 2xl:py-15 lg:py-10 md:py-12 py-[7%] p-8 overflow-y-auto">
          <h1 className="text-[#fd8b8b] font-bold md:text-3xl text-2xl mb-5">
            Edit Category
          </h1>
          <div className="flex gap-10 justify-center items-center lg:text-2xl text-lg">
            <div className="flex flex-col gap-5 lg:h-auto md:h-20 h-15 w-full">
              {/* Priority */}
              <div className="flex lg:flex-col flex-row gap-2 justify-center items-center w-full 2xl:py-3 lg:py-2 lg:px-5 md:py-3 py-3 px-26 rounded-3xl focus:outline-none focus:ring-transparent bg-[#ffaaaa] text-[#fff6c0]">
                <label className="text-2xl font-bold" htmlFor="Category">
                  Priority:
                </label>
                <select
                  className="bg-[#fff6c0] text-[#ffaaaa] font-bold p-1 rounded-3xl ml-2 hover:cursor-pointer"
                  id="category"
                  name="category"
                  value={priority}
                  onChange={(e) => {
                    setPriority(e.target.value);
                  }}
                  required
                  style={{
                    boxShadow: "rgba(17, 17, 26, 0.05) 1px 1px 2px",
                  }}
                >
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative flex flex-col gap-2 justify-center w-full items-center p-5 rounded-full focus:outline-none focus:ring-transparent bg-[#ffaaaa] text-[#fff6c0]">
                <label
                  htmlFor="color"
                  className="w-full lg:h-5 h-5 border-2 border-[#fff6c0] rounded-full cursor-pointer flex items-center justify-center"
                  style={{
                    boxShadow: "rgba(17, 17, 26, 0.05) 1px 1px 2px",
                    backgroundColor: color,
                  }}
                ></label>
                <input
                  type="color"
                  id="color"
                  name="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="absolute lg:top-3 2xl:left-28 lg:left-24 top-2 md:left-20 md:top-4 left-2 w-full h-full opacity-0 cursor-pointer"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1 lg:text-2xl text-lg lg:mt-0 md:mt-20 mt-20">
            <InputBox
              header="Usage Limit"
              id="usagelimit"
              type="number"
              value={usageLimit}
              setValue={setUsageLimit}
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
        </div>

        <div className="w-full flex justify-center">
          <button
            disabled={!hasChanged}
            className={`w-[50%] ${
              !hasChanged
                ? "bg-[#c16a6a] text-[#b7b18a]"
                : "bg-[#fd8b8b] hover:bg-[#f08484] hover:text-[#f4ecb8] text-[#fff6c0] hover:cursor-pointer"
            } rounded-lg 2xl:py-5 lg:py-2 md:py-3 py-2 lg:text-3xl md:2xl text-xl font-[500] md:mt-0 mt-3`}
            style={{
              boxShadow: "rgba(17, 17, 26, 0.05) 1px 1px 2px",
            }}
            onClick={() => {
              EditCategoryHandler(
                id,
                categoryId,
                color,
                Number(priority),
                Number(usageLimit),
                setCategoryId,
                setColor,
                setPriority,
                setUsageLimit,
                setIsPopup,
                reloadCategories
              );
            }}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
