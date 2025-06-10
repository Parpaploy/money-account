import { useEffect, useState } from "react";
import { useToken } from "../../hooks/token-hook";
import InputBox from "../../components/input-box";
import { CreateCategoryHandler } from "./categories";
import { GetCategories } from "../../global/api/firebase/service/categories/categories";

export default function CreateCategoryPage() {
  const { getLocalToken } = useToken();

  const uid = getLocalToken();

  const [id, setId] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [color, setColor] = useState<string>("#A9D0E7");
  const [priority, setPriority] = useState<string>("");
  const [usageLimit, setUsageLimit] = useState<string>("");

  useEffect(() => {
    (async () => {
      if (uid) {
        setId(uid);
      }
      await GetCategories(uid as string);
      setCategoryId("");
      setColor("#A9D0E7");
      setPriority("");
      setUsageLimit("");
    })();
  }, []);

  return (
    <div className="w-full lg:h-[90svh] h-[92svh] overflow-y-auto bg-[#fef6ea] 2xl:px-30 2xl:py-20 lg:px-10 lg:py-8 px-7 py-6">
      <div className="flex flex-col rounded-xl 2xl:gap-5 md:gap-3 w-full text-[#ffaaaa] text-2xl">
        <div className="flex gap-10 justify-center items-center">
          <div className="flex flex-col gap-2 justify-center items-center w-36 md:p-5 rounded-3xl focus:outline-none focus:ring-transparent bg-[#ffaaaa] text-[#fff6c0]">
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
            >
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2 justify-center items-center p-5 rounded-full focus:outline-none focus:ring-transparent bg-[#ffaaaa] text-[#fff6c0]">
            <label
              htmlFor="color"
              className="w-10 h-10 border-2 border-[#fff6c0] rounded-full cursor-pointer flex items-center justify-center hover:cursor-pointer"
              style={{ backgroundColor: color }}
            ></label>
            <input
              type="color"
              id="color"
              name="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="hidden"
              required
            />
          </div>

          <InputBox
            header="Category Name"
            id="categoryId"
            type="text"
            value={categoryId}
            setValue={setCategoryId}
            font="bold"
            textSize="3xl"
            px="5"
            py="3"
            isRequire={true}
          />
        </div>

        <div className="flex flex-col gap-1">
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
          <p className="text-end text-sm">Please fill number only</p>
        </div>
      </div>

      <div className="w-full flex justify-center 2xl:mt-10 md:mt-5">
        <button
          className="w-[50%] hover:cursor-pointer bg-[#fd8b8b] hover:bg-[#f08484] rounded-lg lg:py-5 md:py-3 py-2 lg:text-3xl text-xl font-[500] text-[#fff6c0] hover:text-[#f4ecb8] mt-1 md:mt-2"
          style={{
            boxShadow: "rgba(17, 17, 26, 0.05) 1px 1px 2px",
          }}
          onClick={() => {
            CreateCategoryHandler(
              id,
              categoryId,
              color,
              Number(priority),
              Number(usageLimit)
            );
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}
