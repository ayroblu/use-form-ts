import React from "react";
import { ExampleForm } from "../forms/ExampleForm";
import { KitchenSink } from "../forms/KitchenSink";

export const Home: React.FC = () => {
  return (
    <section>
      <header>
        <h1>use-form-ts</h1>
        <p>lightweight useForm hook for creating basic forms with TypeScript</p>
      </header>
      <section>
        <h2>useForm.ts</h2>
        <p>
          Forms should be straight forward, just useForm and form.createFormItem
          to pass form state around.
        </p>
      </section>
      <section>Example:</section>
      <ExampleForm />
      <section>Kitchen Sink:</section>
      <KitchenSink />
    </section>
  );
};
