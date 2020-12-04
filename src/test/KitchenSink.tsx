import React from "react";

import { useForm } from "../useForm";

export const KitchenSink = () => {
  const [state, setState] = React.useState({ field: "" });
  const form = useForm({
    values: state,
    onChange: (value) => setState({ ...state, ...value }),
  });
  return (
    <div>
      {form.createFormItem("field", {
        adaptor: inputAdaptor,
        meta: { label: "Field" },
        required: true,
        validationMessages: {
          required: ({ meta: { label } }) => `Yo, ${label} is required`,
        },
        custom: (val) => (val === "3" ? "3 is not allowed!" : ""),
        customAsync: {
          validator: (val) =>
            wait().then(() => (val === "4" ? "4 is not allow async!" : "")),
          handleLoading: (val) => `loading for ${val}`,
          handleCatch: (err) => `err: ${err.message}`,
        },
        validation: {
          type: "whitespace",
        },
      })(({ meta: { label }, errorText, ...props }) => (
        <label>
          <span>{label}</span>
          <input {...props} />
          <span>{errorText}</span>
        </label>
      ))}
    </div>
  );
};
const inputAdaptor = (e: React.ChangeEvent<HTMLInputElement>) => e.target.value;
const wait = () => new Promise((y) => setTimeout(y));
