import React from "react";
import { useForm } from "use-form-ts";
import styles from "./NewForm.module.css";

type MyFormResp = {
  myRequired: string;
  myOptional: string;
  subForm: {
    subRequired: string;
    subOptional: string;
  };
  accept: boolean;
};
const initialValues: MyFormResp = {
  myRequired: "",
  myOptional: "",
  subForm: {
    subRequired: "",
    subOptional: "",
  },
  accept: false,
};
/**
 * Cases: Required (localvalidation), optional, async validation
 * local state, global state
 */
export const NewForm: React.FC = () => {
  const [formState, setFormState] = React.useState(initialValues);
  const form = useForm({
    values: formState,
    onChange: (value: Partial<MyFormResp>) =>
      setFormState({ ...formState, ...value }),
  });
  return (
    <section>
      <div>
        {form.createFormItem("myRequired", {
          required: true,
          adaptor: (e: React.ChangeEvent<HTMLInputElement>) => e.target.value,
        })(({ props, errorText }) => (
          <div className={styles.row}>
            <label htmlFor={props.name}>My Required*</label>
            <div className={styles.inputContainer}>
              <input id={props.name} {...props} />
              <div className={styles.error}>{errorText}&nbsp;</div>
            </div>
          </div>
        ))}
        {form.createFormItem("myOptional", {
          adaptor: (e: React.ChangeEvent<HTMLInputElement>) => e.target.value,
        })(({ props, errorText }) => (
          <div className={styles.row}>
            <label htmlFor={props.name}>My Optional</label>
            <div className={styles.inputContainer}>
              <input id={props.name} {...props} />
              <div className={styles.error}>{errorText}&nbsp;</div>
            </div>
          </div>
        ))}

        <h3>SubForm</h3>
        <SubForm
          values={formState.subForm}
          onChange={(subForm) => setFormState({ ...formState, subForm })}
        />
      </div>
    </section>
  );
};
type SubFormProps = {
  values: MyFormResp["subForm"];
  onChange: (value: MyFormResp["subForm"]) => void;
};
const SubForm: React.FC<SubFormProps> = ({ values, onChange }) => {
  const form = useForm({
    values,
    onChange: (value) => onChange({ ...values, ...value }),
  });
  return (
    <section>
      <div>
        {form.createFormItem("subRequired", {
          required: true,
          adaptor: (e: React.ChangeEvent<HTMLInputElement>) => e.target.value,
        })(({ props, errorText }) => (
          <div className={styles.row}>
            <label htmlFor={props.name}>My Required*</label>
            <div className={styles.inputContainer}>
              <input id={props.name} {...props} />
              <div className={styles.error}>{errorText}&nbsp;</div>
            </div>
          </div>
        ))}
        {form.createFormItem("subOptional", {
          adaptor: (e: React.ChangeEvent<HTMLInputElement>) => e.target.value,
        })(({ props, errorText }) => (
          <div className={styles.row}>
            <label htmlFor={props.name}>My Optional</label>
            <div className={styles.inputContainer}>
              <input id={props.name} {...props} />
              <div className={styles.error}>{errorText}&nbsp;</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
