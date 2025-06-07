import { useParams } from "react-router-dom";

export default function Homepage() {
  const { username } = useParams();

  if (!username) {
    return <>No Found</>;
  }
  return <>Hello {username}</>;
}
