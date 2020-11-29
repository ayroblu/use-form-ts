import React from "react";
import "./App.css";
import { NewForm } from "./forms/NewForm";

export function App() {
  return (
    <div className="App">
      <header>This is our basic form</header>
      <NewForm />
    </div>
  );
}
