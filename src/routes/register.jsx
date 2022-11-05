import { useForm, useField, splitFormProps } from "react-form";
import NameInput from "../components/nameInput";
import { useAppContext } from "../store/store";
import { useNavigate } from "react-router-dom";
import PictureInput from "../components/pictureInput";
import StateInput from "../components/stateinput";

import style from "../components/register.module.css";

export default function Register() {
  const store = useAppContext();
  let navigate = useNavigate();
  const {
    Form,
    meta: { isSubmitting, canSubmit },
  } = useForm({
    onSubmit: async (values, instance) => {
      // onSubmit (and everything else in React Form)
      // has async support out-of-the-box
      //await sendToFakeServer(values);
      console.log("Huzzah!", values);
      const { name, picture, state } = values;
      const newItem = {
        id: crypto.randomUUID(),
        name,
        picture,
        state,
      };
      console.log("Hola");
      store.addNewItem(newItem);
      navigate("/");
    },
    debugForm: true,
  });

  function handleClick() {
    console.log("click");
  }
  return (
    <div className={style.formContainer}>
      <Form>
        <label>Name of Funko</label>
        <NameInput />
        <label>State of Funko</label>
        <StateInput />
        <label>Picture</label>
        <PictureInput />
        <input
          onClick={handleClick}
          className={style.btnSubmit}
          type="submit"
          value="Create"
        />
      </Form>
    </div>
  );
}
