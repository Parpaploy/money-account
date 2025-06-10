import { useNavigate, useParams } from "react-router-dom";
import { useToken } from "../hooks/token-hook";
import { RxHamburgerMenu } from "react-icons/rx";

export default function PrivateNavbar({
  isPopup,
  setIsPopup,
}: {
  isPopup: boolean;
  setIsPopup: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { username } = useParams();
  const { logOutCallBack } = useToken();

  const navigator = useNavigate();

  return (
    <div className="w-full lg:h-[10svh] h-[8svh] min-h-[8svh] lg:min-h-[10svh] bg-[#fd8b8b] md:px-5 px-3 flex justify-between items-center font-medium text-white">
      <h1 className="md:text-3xl text-xl">Welcome, {username}</h1>
      <button
        className="hidden lg:block hover:cursor-pointer bg-[#F7EAA0] hover:bg-[#f0e398] rounded-lg py-2 md:px-4 font-bold mt-1 md:mt-2 text-[#fd8b8b]"
        style={{
          boxShadow: "rgba(17, 17, 26, 0.05) 1px 1px 2px",
        }}
        onClick={() => {
          logOutCallBack(navigator);
        }}
      >
        Logout
      </button>

      <button
        className={`lg:hidden md:w-10 md:h-10 w-7 h-7 text-center hover:cursor-pointer text-md md:text-lg ${
          isPopup
            ? "bg-[#d6cb8b] text-[#d07272]"
            : "bg-[#F7EAA0] text-[#fd8b8b]"
        } rounded-full font-bold flex items-center justify-center`}
        style={{
          boxShadow: "rgba(17, 17, 26, 0.05) 1px 1px 2px",
        }}
        onClick={() => {
          setIsPopup(!isPopup);
        }}
      >
        <RxHamburgerMenu />
      </button>
    </div>
  );
}
