import React from "react";
import { useForm } from "use-form-ts";

import styles from "./ExampleForm.module.css";

export const ExampleForm = () => {
  const [state, setState] = React.useState({
    form: { firstname: "", lastname: "" },
    log: [] as string[],
  });
  const form = useForm({
    values: state.form,
    onChange: (value) =>
      setState({ ...state, form: { ...state.form, ...value } }),
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.validate())
      setState({
        ...state,
        log: state.log.concat(`Result: ${JSON.stringify(state.form)}`),
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <h3>Example Form</h3>
      {form.createFormItem("firstname", {
        required: true,
        adaptor: (e: React.ChangeEvent<HTMLInputElement>) => e.target.value,
        meta: {
          label: "First Name",
        },
      })(({ errorText, meta: { label }, isLoading, ...props }) => (
        <InputField label={label} {...props} errorText={errorText || ""} />
      ))}
      {form.createFormItem("lastname", {
        required: true,
        adaptor: (e: React.ChangeEvent<HTMLInputElement>) => e.target.value,
        meta: {
          label: "Last Name",
        },
      })(({ errorText, meta: { label }, isLoading, ...props }) => (
        <InputField label={label} {...props} errorText={errorText || ""} />
      ))}
      <input className={styles.submit} type="submit" value="Submit" />
      <section>
        {state.log.map((v, i) => (
          <p key={i}>{v}</p>
        ))}
      </section>
    </form>
  );
};

type InputFieldProps = {
  name: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  errorText: string;
};
const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  errorText,
  ...inputProps
}) => (
  <label className={styles.input}>
    <span className={styles.inputLabel}>{label}</span>
    <input id={name} {...inputProps} />
    <div className={styles.error}>{errorText}</div>
  </label>
);
