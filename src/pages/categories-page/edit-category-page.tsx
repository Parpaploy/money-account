import { useEffect, useState } from "react";
import { useToken } from "../../hooks/token-hook";
import { GetCategories } from "../../global/api/firebase/service/categories/categories";
import { useData } from "../../hooks/data-hook";
import { AiFillEdit } from "react-icons/ai";
import EditCategoryPopup from "./components/edit-category-popup";

export default function EditCategoryPage() {
  const { getLocalToken } = useToken();
  const { categories, loadData } = useData();

  const uid = getLocalToken();

  const [isPopup, setIsPopup] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<string>("");

  useEffect(() => {
    (async () => {
      await GetCategories(uid as string);
      loadData();
      setIsPopup(false);
    })();
  }, []);

  return (
    <div className="w-full h-[90svh] overflow-y-auto bg-[#fef6ea] 2xl:px-30 2xl:py-20 md:px-10 py-8 px-7 flex flex-col md:gap-7 gap-5 relative">
      {categories.map((category) => {
        return (
          <div
            key={category.id}
            className="flex justify-between items-center md:py-7 md:px-7 px-5 py-3 rounded-3xl text-[#242E68]"
            style={{
              boxShadow:
                "rgb(169, 208, 231, 0.3) 3px 3px 6px 0px inset,rgb(253, 139, 139,0.3) -3px -3px 6px 1px inset",
            }}
          >
            <div
              className="md:w-7 md:h-7 w-4 h-4 rounded-full"
              style={{
                backgroundColor: category.color,
              }}
            ></div>
            <h1 className="font-semibold md:text-2xl text-lg">{category.id}</h1>
            <div className="flex flex-col justify-center items-center">
              <p className="font-medium md:text-md text-sm">Usage Limit</p>
              <p className="font-semibold md:text-xl text-md">
                {category.usageLimit}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="font-medium md:text-md text-sm">Priority</p>
              <p className="font-semibold md:text-xl text-md">
                {category.priority}
              </p>
            </div>

            <button
              onClick={() => {
                setIsPopup(true);
                setCurrentCategory(category.id);
              }}
              className="md:text-2xl text-xl hover:bg-[#242E68] hover:text-white hover:cursor-pointer rounded-full p-1"
            >
              <AiFillEdit />
            </button>
          </div>
        );
      })}

      {isPopup && (
        <EditCategoryPopup
          setIsPopup={setIsPopup}
          currentCategory={currentCategory}
          categories={categories}
          reloadCategories={loadData}
        />
      )}
    </div>
  );
}
