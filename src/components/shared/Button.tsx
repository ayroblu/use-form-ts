import React from "react";

import styles from "./Button.module.css";

type Props = {
  onClick: () => void;
};
export const Button: React.FC<Props> = ({ onClick, children }) => (
  <button className={styles.button} onClick={onClick}>
    {children}
  </button>
);
type LinkButtonProps = {
  link: string;
  isNewTab?: boolean;
};
export const LinkButton: React.FC<LinkButtonProps> = ({
  children,
  link,
  isNewTab,
}) => (
  <a
    href={link}
    className={styles.button}
    rel="noopener noreferrer"
    target={isNewTab ? "_blank" : "_self"}
  >
    {children}
  </a>
);
