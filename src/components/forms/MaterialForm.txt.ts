export const materialForm = `import { TextField, Button } from "@material-ui/core";
import React from "react";
import { useForm } from "use-form-ts";

export const MaterialForm = () => {
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
    <form onSubmit={handleSubmit}>
      {form.createFormItem("firstname", {
        required: true,
        adaptor: (e: React.FocusEvent<HTMLInputElement>) => e.target.value,
        meta: {
          label: "First Name",
        },
      })(({ errorText, meta: { label }, ...props }) => (
        <TextField
          label={label}
          variant="outlined"
          {...props}
          {...(errorText ? { error: true, helperText: errorText } : {})}
        />
      ))}
      {form.createFormItem("lastname", {
        required: true,
        adaptor: (e: React.FocusEvent<HTMLInputElement>) => e.target.value,
        meta: {
          label: "Last Name",
        },
      })(({ errorText, meta: { label }, ...props }) => (
        <TextField
          label={label}
          variant="outlined"
          {...props}
          {...(errorText ? { error: true, helperText: errorText } : {})}
        />
      ))}
      <Button type="submit">Submit</Button>
      <section>
        {log.map((v, i) => (
          <p key={i}>{v}</p>
        ))}
      </section>
    </form>
  );
};
`