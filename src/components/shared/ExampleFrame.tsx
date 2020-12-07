import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";


import { Button } from "./Button";
import styles from "./ExampleFrame.module.css";

import { cn } from "../../utils";

type Props = {
  sourceCode: string;
  headerText: string;
};
export const ExampleFrame: React.FC<Props> = ({
  children,
  sourceCode,
  headerText,
}) => {
  const [isShowSource, setIsShowSource] = React.useState(false);
  return (
    <section className={styles.exampleFrame}>
      <header className={styles.header}>
        <h4>{headerText}</h4>
        <Button onClick={() => setIsShowSource(!isShowSource)}>
          {isShowSource ? "Hide Source" : "Show Source"}
        </Button>
      </header>
      <section>{children}</section>
      <section
        className={cn(styles.code, isShowSource ? styles.show : styles.hidden)}
      >
        <SyntaxHighlighter language="tsx" style={solarizedlight}>
          {sourceCode}
        </SyntaxHighlighter>
      </section>
    </section>
  );
};
