import { useCallback } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../store/store";
import style from "./funko.module.css";

export default function Funko({ item, index }) {
  const ref = useRef(null);
  const store = useAppContext();

  console.log(item.name, index);

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("dragstart", dragStart);
      ref.current.addEventListener("dragend", dragEnd);
      ref.current.addEventListener("drop", drop);
      ref.current.addEventListener("dragover", dragOver);
      ref.current.addEventListener("dragenter", dragEnter);
      ref.current.addEventListener("dragleave", dragLeave);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener("dragstart", dragStart);
        ref.current.removeEventListener("drop", drop);
      }
    };
  }, [index]);

  function dragStart(e) {
    console.log("drag start", index);
    e.dataTransfer.setData("text/plain", item.id);

    setTimeout(() => {
      ref.current.classList.add(style.hide);
    }, 0);
  }
  function dragEnd(e) {
    //console.log("drag end");
    setTimeout(() => {
      ref.current.classList.remove(style.hide);
    }, 0);
  }

  //const dropMemoized = useCallbac();
  function drop(e, dragElement) {
    e.preventDefault();
    const idI = e.dataTransfer.getData("text/plain");
    const idF = item.id;

    console.log(idI, idF);
    store.changeOrder(idI, idF);
    ref.current.classList.remove(style.shadow);
  }
  function dragOver(e) {
    e.preventDefault();
    //console.log("dragOver");
  }
  function dragEnter(e) {
    e.preventDefault();
    ref.current.classList.add(style.shadow);
    //console.log("dragEnter");
  }
  function dragLeave(e) {
    e.preventDefault();
    ref.current.classList.remove(style.shadow);
    //console.log("dragEnter");
  }
  return (
    <div className={style.container} draggable={true} ref={ref}>
      <Link to={"edit/" + item.id}>
        <img src={item.picture} height={355} alt="" />
      </Link>
    </div>
  );
}
