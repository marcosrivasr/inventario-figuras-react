import { useForm, useField, splitFormProps } from "react-form";

const options = [
  {
    id: "purchased",
    title: "Comprado",
  },
  {
    id: "whishlist",
    title: "Lista de deseos",
  },
];

export default function StateInput(props) {
  const [field, fieldOptions, { ...rest }] = splitFormProps(props);
  const {
    value = "",
    setValue,
    meta: { error, isTouched },
  } = useField("state", {
    validate: validateState,
  });

  const handleSelectChange = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };

  async function validateState(name, instance) {
    if (!name) {
      return "An state is required";
    }

    return instance.debounce(async () => {
      console.log("checking state");
      await new Promise((resolve) => setTimeout(resolve, 500));
      // All names are valid, so return a false error
      return false;
    }, 500);
  }

  return (
    <select name="state" {...rest} value={value} onChange={handleSelectChange}>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.title}
        </option>
      ))}
    </select>
  );
}
