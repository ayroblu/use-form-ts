import React from "react";
import { useForm } from "use-form-ts";

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
        customAsync: (val) =>
          wait(1000).then(() =>
            val === "4" ? "Promise 4 is not allowed!" : null
          ),
        validation: {
          type: "whitespace",
        },
      })(({ meta: { label }, errorText, isLoading, ...props }) => (
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
const wait = (time: number) => new Promise((y) => setTimeout(y, time));
