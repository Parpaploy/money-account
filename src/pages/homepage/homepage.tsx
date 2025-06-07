import { useParams } from "react-router-dom";
import { AddExpense } from "../../global/api/firebase/auth/auth";
import { useToken } from "../../hooks/token-hook";

export default function Homepage() {
  const { username } = useParams();
  const { getLocalToken } = useToken();

  if (!username) {
    return <>No Found</>;
  }
  return (
    <>
      Hello {username}
      <button
        onClick={() => {
          const uid = getLocalToken();
          AddExpense(uid as string);
          console.log("Add expense");
        }}
      >
        Click to add Expense
      </button>
    </>
  );
}
