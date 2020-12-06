import React from "react";

import { useForm } from "../useForm";

export const KitchenSink = () => {
  const [state, setState] = React.useState({ sfield: "", field: "" });
  const [log, setLog] = React.useState<string[]>([]);
  const form = useForm({
    values: state,
    onChange: (value) => setState({ ...state, ...value }),
  });
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (form.validate()) setLog(log.concat(`Valid! ${JSON.stringify(state)}`));
  };
  // {form.createFormItem("sfield", {
  //   adaptor: inputAdaptor,
  //   meta: { label: "Field" },
  //   required: true,
  // })(({ meta: { label }, errorText, ...props }) => (
  //   <label>
  //     <span>{label}</span>
  //     <input {...props} />
  //     <span data-testid={testIds.errorText}>{errorText}</span>
  //   </label>
  // ))}
  return (
    <form onSubmit={handleSubmit}>
      {form.createFormItem("field", {
        adaptor: inputAdaptor,
        meta: { label: "Field" },
        required: true,
        validationMessages: {
          required: ({ meta: { label } }) => `Yo, ${label} is required`,
        },
        custom: (val) => (val === "3" ? "3 is not allowed!" : null),
        customAsync: (val) =>
          wait().then(() => (val === "4" ? "4 is not allowed async!" : null)),
        validation: {
          type: "whitespace",
        },
      })(({ meta: { label }, isLoading, errorText, ...props }) => (
        <label>
          <span>{label}</span>
          <input {...props} />
          {isLoading ? (
            <span data-testid={testIds.loading}>...loading</span>
          ) : null}
          <span data-testid={testIds.errorText}>{errorText}</span>
        </label>
      ))}
      <input type="submit" value="Submit" />
      {log.map((l, i) => (
        <div key={i}>{l}</div>
      ))}
    </form>
  );
};
const inputAdaptor = (e: React.ChangeEvent<HTMLInputElement>) => e.target.value;
const wait = () => new Promise((y) => setTimeout(y));

export const testIds = {
  errorText: "errorText",
  loading: "loading",
};
