import { useNavigate, useParams } from "react-router-dom";
import { useToken } from "../hooks/token-hook";

export default function PrivateNavbar() {
  const { username } = useParams();
  const { logOutCallBack } = useToken();

  const navigator = useNavigate();

  return (
    <div className="w-full h-[10svh] min-h-[10svh] bg-[#fd8b8b] px-5 flex justify-between items-center font-medium text-white">
      <h1 className="text-3xl">Welcome, {username}</h1>
      <button
        className="hover:cursor-pointer bg-[#F7EAA0] hover:bg-[#f0e398] rounded-lg py-2 md:px-4 font-bold mt-1 md:mt-2 text-[#fd8b8b]"
        style={{
          boxShadow: "rgba(17, 17, 26, 0.05) 1px 1px 2px",
        }}
        onClick={() => {
          logOutCallBack(navigator);
        }}
      >
        Logout
      </button>
    </div>
  );
}
