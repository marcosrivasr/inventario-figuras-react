import { useForm, useField, splitFormProps } from "react-form";
import NameInput from "../components/nameInput";
import { useAppContext } from "../store/store";
export default function Register() {
  const store = useAppContext();
  const {
    Form,
    meta: { isSubmitting, canSubmit },
  } = useForm({
    onSubmit: async (values, instance) => {
      // onSubmit (and everything else in React Form)
      // has async support out-of-the-box
      //await sendToFakeServer(values);
      console.log("Huzzah!", values);
      const { name } = values;
      const newItem = {
        id: crypto.randomUUID(),
        name,
        picture: "",
        state: "purchased",
      };
      store.addNewItem(newItem);
    },
    debugForm: false,
  });
  return (
    <div>
      <Form>
        <NameInput />
      </Form>
    </div>
  );
}
