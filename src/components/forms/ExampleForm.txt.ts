export const exampleForm = `import React from "react";
import { useForm } from "use-form-ts";

import styles from "./ExampleForm.module.css";
import { InputField } from "./InputField";

export const ExampleForm = () => {
  const [formState, setFormState] = React.useState({
    firstname: "",
    lastname: "",
  });
  const [log, setLog] = React.useState<string[]>([]);

  const form = useForm({
    values: formState,
    onChange: (value) => setFormState({ ...formState, ...value }),
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.validate())
      setLog(log.concat(\`Result: \${JSON.stringify(formState)}\`));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {form.createFormItem("firstname", {
        required: true,
        adaptor: (e: React.ChangeEvent<HTMLInputElement>) => e.target.value,
        meta: {
          label: "First Name",
        },
      })(({ errorText, meta: { label }, ...props }) => (
        <InputField label={label} {...props} errorText={errorText || ""} />
      ))}
      {form.createFormItem("lastname", {
        required: true,
        adaptor: (e: React.ChangeEvent<HTMLInputElement>) => e.target.value,
        meta: {
          label: "Last Name",
        },
      })(({ errorText, meta: { label }, ...props }) => (
        <InputField label={label} {...props} errorText={errorText || ""} />
      ))}
      <input className={styles.submit} type="submit" value="Submit" />
      <section>
        {log.map((v, i) => (
          <p key={i}>{v}</p>
        ))}
      </section>
    </form>
  );
};
`