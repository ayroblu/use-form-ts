import React from "react";

import styles from "./Home.module.css";

import { DeclarativeForm } from "../forms/DeclarativeForm";
import { declarativeForm } from "../forms/DeclarativeForm.txt";
import { ExampleForm } from "../forms/ExampleForm";
import { exampleForm } from "../forms/ExampleForm.txt";
import { ExampleFrame } from "../shared/ExampleFrame";

export const Home: React.FC = () => (
  <section className={styles.home}>
    <header className={styles.header}>
      <h1 className={styles.title}>useForm</h1>
      <p>Lightweight useForm hook for creating basic forms with TypeScript</p>
      <p className={styles.terminal}>
        <pre>
          yarn add <span className={styles.highlight}>use-form-ts</span>
        </pre>
      </p>
      <p className={styles.terminal}>
        <pre>
          npm install --save{" "}
          <span className={styles.highlight}>use-form-ts</span>
        </pre>
      </p>
      <p>
        Checkout{" "}
        <a
          href="https://github.com/ayroblu/use-form-ts"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>{" "}
        for more details
      </p>
    </header>
    <section>
      <h2>useForm hook</h2>
      <p>
        The goal was to keep things simple, there are 3 things to worry about
      </p>
      <ul>
        <li>Values</li>
        <li>How they change</li>
        <li>Validation</li>
      </ul>
    </section>
    <section>
      <p>This example showcases a complete common use of useForm</p>
      <ExampleFrame sourceCode={exampleForm} headerText="Example">
        <ExampleForm />
      </ExampleFrame>
      <p>
        This example showcases a similar example but by predeclaring your form
        and using a generator
      </p>
      <ExampleFrame sourceCode={declarativeForm} headerText="Declarative Form">
        <DeclarativeForm />
      </ExampleFrame>
    </section>
  </section>
);