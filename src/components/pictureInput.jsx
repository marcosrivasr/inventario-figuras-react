import { useEffect, useRef } from "react";
import { useForm, useField, splitFormProps } from "react-form";
import style from "./register.module.css";

async function validatePicture(picture, instance) {
  if (!picture) {
    return "A picture is required";
  }

  return instance.debounce(async () => {
    console.log("checking picture");
    await new Promise((resolve) => setTimeout(resolve, 500));
    // All names are valid, so return a false error
    return false;
  }, 500);
}

export default function PictureInput() {
  const imageRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {}, []);

  const {
    setValue,
    meta: { error, isTouched, isValidating },
    getInputProps,
  } = useField("picture", {
    validate: validatePicture,
  });

  function handleChange(e) {
    if (e.target.files.length === 1) {
      const fileReader = new FileReader();

      fileReader.onload = function (res) {
        console.log(res.target.result);
        imageRef.current.src = res.target.result;
        setValue(res.target.result);
      };

      fileReader.readAsDataURL(e.target.files[0]);
    }
  }

  function handleClick(e) {
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  return (
    <>
      <input
        ref={fileInputRef}
        name="picture"
        type={"file"}
        onChange={handleChange}
        style={{ display: "none" }}
      />
      <input
        style={{ display: "none" }}
        type="text"
        name="picture"
        {...getInputProps()}
      />
      <button className={style.btnPicture} onClick={handleClick}>
        Select image
      </button>
      {isValidating ? (
        <em>Validating...</em>
      ) : isTouched && error ? (
        <em>{error}</em>
      ) : null}
      <div className={style.preview}>
        <img ref={imageRef} src="" alt="" width="200" />
      </div>
    </>
  );
}
