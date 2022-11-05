import Funko from "../components/funko";
import { useAppContext } from "../store/store";
import style from "./home.module.css";

export default function Home() {
  const store = useAppContext();

  return (
    <div>
      <div className={style.container}>
        {store.items.map((item, index) => (
          <Funko key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}
