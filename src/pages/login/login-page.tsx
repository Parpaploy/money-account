import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigator = useNavigate();

  return (
    <div>
      <button
        onClick={() => {
          navigator("/register");
        }}
      >
        Click Me
      </button>
    </div>
  );
}
