import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./routes/home";
import Register from "./routes/register";
import Store from "./store/store";
import Menu from "./components/menu";
import Edit from "./routes/edit";

function App() {
  return (
    <Store>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<Register />} />
        <Route path="edit/:id" element={<Edit />} />
      </Routes>
    </Store>
  );
}

export default App;
