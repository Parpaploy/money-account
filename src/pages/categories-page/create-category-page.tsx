import { useEffect, useState } from "react";
import { useToken } from "../../hooks/token-hook";
import InputBox from "../../components/input-box";
import { CreateCategoryHandler } from "./categories";
import { GetCategories } from "../../global/api/firebase/service/categories/categories";
import { useNavigate } from "react-router-dom";

export default function CreateCategoryPage() {
  const { getLocalToken, getLocalUsername } = useToken();

  const uid = getLocalToken();
  const username = getLocalUsername();

  const navigate = useNavigate();

  const [id, setId] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [color, setColor] = useState<string>("#A9D0E7");
  const [priority, setPriority] = useState<string>("1");
  const [usageLimit, setUsageLimit] = useState<string>("");

  useEffect(() => {
    (async () => {
      if (uid) {
        setId(uid);
      }
      await GetCategories(uid as string);
      setCategoryId("");
      setColor("#A9D0E7");
      setPriority("1");
      setUsageLimit("");
    })();
  }, []);

  return (
    <div className="w-full h-[90svh] overflow-y-auto bg-[#fef6ea] 2xl:px-30 2xl:py-20 md:px-10 py-8 px-7">
      <div className="flex flex-col rounded-xl 2xl:gap-5 md:gap-3 w-full text-[#ffaaaa] text-2xl">
        <h1 className="lg:hidden text-[#fd8b8b] font-bold md:text-3xl text-2xl mb-9">
          New Category
        </h1>
        <div className="flex lg:flex-row flex-col gap-10 justify-center items-center lg:text-2xl text-lg">
          <div className="flex gap-10 lg:h-auto md:h-20 h-15">
            <div className="flex lg:flex-col flex-row gap-2 justify-center items-center w-36 lg:p-5 lg:px-5 px-26 rounded-3xl focus:outline-none focus:ring-transparent bg-[#ffaaaa] text-[#fff6c0]">
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

            <div className="relative flex flex-col gap-2 justify-center lg:w-30 md:w-20 w-15 items-center lg:p-5 md:p-4 p-3 rounded-full focus:outline-none focus:ring-transparent bg-[#ffaaaa] text-[#fff6c0]">
              <label
                htmlFor="color"
                className="lg:w-15 lg:h-15 md:w-12 w-9 h-20 border-2 border-[#fff6c0] rounded-full cursor-pointer flex items-center justify-center"
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
                className="absolute lg:top-5 2xl:top-5 2xl:right-64 lg:right-24 top-3 md:right-81 md:top-6 right-61 w-full h-full opacity-0 cursor-pointer"
                required
              />
            </div>
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

        <div className="flex flex-col gap-1 lg:text-2xl text-lg lg:mt-0 mt-5">
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

      <div className="w-full flex justify-center 2xl:mt-10 md:mt-5">
        <button
          className="w-[50%] hover:cursor-pointer bg-[#fd8b8b] hover:bg-[#f08484] rounded-lg lg:py-5 md:py-4 py-2 lg:text-3xl md:2xl text-xl font-[500] text-[#fff6c0] hover:text-[#f4ecb8] mt-8 md:mt-2"
          style={{
            boxShadow: "rgba(17, 17, 26, 0.05) 1px 1px 2px",
          }}
          onClick={() => {
            CreateCategoryHandler(
              id,
              categoryId,
              color,
              Number(priority),
              Number(usageLimit),
              navigate,
              username as string,
              setCategoryId,
              setColor,
              setPriority,
              setUsageLimit
            );
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}
