import React from "react";

export const Home: React.FC = () => {
  return (
    <section>
      <header>
        <h1>use-form-ts</h1>
        <p>lightweight useForm hook for creating basic forms with TypeScript</p>
      </header>
      <section>
        <h2>Why another form library?</h2>
        <p>
          There are many form libraries out there, many do a lot more than what
          this provides. For many react developers, rolling your own form system
          for basic forms is easy to do, and generalisable, whereas others
          believe in using a library with the hope of reducing development
          overhead and reinventing the wheel.
        </p>
        <p>
          There are two types of form libraries that we want to focus on, one is
          the Formik style, which is basically a helper layer on common Form
          primitives, most people who have written lots of forms will see it as
          about the same amount of code, with the added cost of learning a new
          library, minus a few niceities of battle tested code.
        </p>
      </section>
    </section>
  );
};
