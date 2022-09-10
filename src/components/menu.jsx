import { Link } from "react-router-dom";
import style from "./menu.module.css";

export default function Menu() {
  return (
    <nav className={style.nav}>
      <ul>
        <li>
          <Link to="/" className={style.item}>
            Home
          </Link>
        </li>
        <li>
          <Link to="about" className={style.item}>
            Register
          </Link>
        </li>
      </ul>
    </nav>
  );
}
