import { Link } from "react-router-dom";
import style from "./funko.module.css";

export default function Funko({ item }) {
  return (
    <div className={style.container}>
      <Link to={"edit/" + item.id}>
        {item.picture && <img src={item.picture} height={355} alt="" />}
      </Link>
    </div>
  );
}
