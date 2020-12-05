import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";

import { KitchenSink } from "./KitchenSink";

describe("useForm", () => {
  it("should render without errors", () => {
    render(<KitchenSink />);

    expect(screen.getByRole("heading")).toHaveTextContent("Welcome, John Doe");
  });
});
