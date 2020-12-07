import React from "react";

import styles from "./InputField.module.css";

type InputFieldProps = {
  name: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  errorText: string;
};
export const InputField: React.FC<InputFieldProps> = ({
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
