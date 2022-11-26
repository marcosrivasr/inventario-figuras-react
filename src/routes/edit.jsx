import { useEffect } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { useAppContext } from "../store/store";
import { useForm, useField, splitFormProps } from "react-form";
import NameInput from "../components/nameInput";
import StateInput from "../components/stateinput";
import { useNavigate } from "react-router-dom";

import style from "./edit.module.css";
import common from "../components/common.module.css";

export default function Edit() {
  const params = useParams();
  const store = useAppContext();
  let navigate = useNavigate();

  const {
    Form,
    meta: { isSubmitting, canSubmit },
  } = useForm({
    onSubmit: async (values, instance) => {
      handleSubmit(values);
    },
    debugForm: false,
  });

  const item = store.getItem(params.id);

  function handleSubmit(values) {
    console.log("update!", values);
    const { name, state } = values;
    const item = store.getItem(params.id);
    item.name = name;
    item.state = state;
    store.updateItem(item);
  }

  function handleDelete(e) {
    e.preventDefault();

    const item = store.getItem(params.id);

    store.removeItem(item.id);
    navigate("/");
  }

  return (
    <div className={style.editContainer}>
      <div className={style.editImagePreview}>
        {item.picture && <img src={item.picture} alt="" width={300} />}
      </div>

      <div className={style.editInfoPreview}>
        <Form style={{ width: "100%" }}>
          <NameInput inputValue={item.name} />
          <StateInput inputValue={item.state} />
          <div className={style.actions}>
            <button type="submit" className={common.btnSubmit}>
              Update info
            </button>

            <button className={common.btnDelete} onClick={handleDelete}>
              Delete Funko
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
