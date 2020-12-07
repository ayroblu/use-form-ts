export const declarativeForm = `import React from "react";
import { CreateFormItem, useForm } from "use-form-ts";

import styles from "./ExampleForm.module.css";
import { InputField } from "./InputField";

type FormState = { firstname: string; middlename: string; lastname: string };
type FormItem<T extends {}> = {
  name: keyof T;
  type: "text";
  options: {
    required: boolean;
    adaptor: typeof adaptor;
    meta: { label: string };
  };
};

const initialState: FormState = {
  firstname: "",
  middlename: "",
  lastname: "",
};
const adaptor = (e: React.ChangeEvent<HTMLInputElement>) => e.target.value;

const declaredForm: FormItem<FormState>[] = [
  {
    name: "firstname",
    type: "text",
    options: {
      required: true,
      adaptor,
      meta: {
        label: "First Name",
      },
    },
  },
  {
    name: "middlename",
    type: "text",
    options: {
      required: false,
      adaptor,
      meta: {
        label: "Middle Name",
      },
    },
  },
  {
    name: "lastname",
    type: "text",
    options: {
      required: true,
      adaptor,
      meta: {
        label: "Last Name",
      },
    },
  },
];

const formItemCreatorFn = (form: {
  createFormItem: CreateFormItem<FormState>;
  validate: () => boolean;
}) => ({ name, type, options }: FormItem<FormState>) => {
  if (type === "text")
    return form.createFormItem(
      name,
      options
    )(({ errorText, meta: { label }, ...props }) => (
      <InputField label={label} {...props} errorText={errorText || ""} />
    ));

  return null;
};

export const DeclarativeForm = () => {
  const [formState, setFormState] = React.useState<FormState>(initialState);
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
  const formItemCreator = formItemCreatorFn(form);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {declaredForm.map(formItemCreator)}
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