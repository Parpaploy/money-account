import { useNavigate, useParams } from "react-router-dom";
import { useToken } from "../hooks/token-hook";

export default function PrivateNavbar() {
  const { username } = useParams();
  const { logOutCallBack } = useToken();

  const navigator = useNavigate();

  return (
    <div className="w-full h-[10svh] min-h-[10svh] bg-[#E53C12] flex justify-between">
      <h1>Welcome, {username}</h1>
      <button
        onClick={() => {
          logOutCallBack(navigator);
        }}
      >
        Logout
      </button>
    </div>
  );
}
