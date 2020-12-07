export const materialForm = `import { TextField, Button } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import React from "react";
import { useForm } from "use-form-ts";

import styles from "./MaterialForm.module.css";

export const MaterialForm = () => {
  const [formState, setFormState] = React.useState({
    firstname: "",
    lastname: "",
  });
  const [log, setLog] = React.useState<string[]>([]);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const form = useForm({
    values: formState,
    onChange: (value) => setFormState({ ...formState, ...value }),
  });

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.validate())
      setLog(log.concat(\`Result: \${JSON.stringify(formState)}\`));
  };

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={handleSubmit} className={styles.form}>
        {form.createFormItem("firstname", {
          required: true,
          adaptor,
          meta: {
            label: "First Name",
          },
        })(({ errorText, meta: { label }, ...props }) => (
          <div>
            <TextField
              label={label}
              variant="outlined"
              {...props}
              {...(errorText ? { error: true, helperText: errorText } : {})}
            />
          </div>
        ))}
        {form.createFormItem("lastname", {
          required: true,
          adaptor,
          meta: {
            label: "Last Name",
          },
        })(({ errorText, meta: { label }, ...props }) => (
          <div>
            <TextField
              label={label}
              variant="outlined"
              {...props}
              {...(errorText ? { error: true, helperText: errorText } : {})}
            />
          </div>
        ))}
        <div>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </div>
        <section>
          {log.map((v, i) => (
            <p key={i}>{v}</p>
          ))}
        </section>
      </form>
    </ThemeProvider>
  );
};
const adaptor = (e: React.FocusEvent<HTMLInputElement>) => e.target.value;
`