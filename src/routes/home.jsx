import { Link } from "react-router-dom";
import { useAppContext } from "../store/store";

export default function Home() {
  const store = useAppContext();

  return (
    <div>
      Home
      {store.items.map((item) => (
        <div>
          <Link to={"edit/" + item.id}>{item.name}</Link>
        </div>
      ))}
    </div>
  );
}
