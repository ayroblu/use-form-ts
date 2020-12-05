import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import { KitchenSink, testIds } from "./KitchenSink";

describe("useForm", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("should render without errors", () => {
    render(<KitchenSink />);

    expect(screen.getByTestId(testIds.errorText)).toHaveTextContent("");
  });

  it("no errors for entering in '1'", async () => {
    render(<KitchenSink />);
    const domNode = screen.getByLabelText("Field") as HTMLInputElement;
    userEvent.type(domNode, "1");
    expect(domNode.value).toEqual("1");

    expect(screen.getByTestId(testIds.errorText)).toHaveTextContent("");

    // Check wait for loading
    expect(screen.queryByText(/Valid!/)).not.toBeTruthy();
    userEvent.click(screen.getByText("Submit"));
    expect(screen.queryByText(/Valid!/)).not.toBeTruthy();

    await act(async () => jest.runAllTimers());

    userEvent.click(screen.getByText("Submit"));
    expect(screen.getByText(/Valid!/)).toBeTruthy();
  });

  it("should error after entering and removing a character because required", async () => {
    render(<KitchenSink />);
    const domNode = screen.getByLabelText("Field") as HTMLInputElement;
    userEvent.type(domNode, "1");
    expect(domNode.value).toEqual("1");
    userEvent.type(domNode, "{backspace}");
    expect(domNode.value).toEqual("");

    expect(screen.getByTestId(testIds.errorText)).toHaveTextContent(
      "Yo, Field is required"
    );
    expect(screen.queryByText(/Valid!/)).not.toBeTruthy();
    userEvent.click(screen.getByText("Submit"));
    expect(screen.queryByText(/Valid!/)).not.toBeTruthy();

    await act(async () => jest.runAllTimers());

    userEvent.click(screen.getByText("Submit"));
    expect(screen.queryByText(/Valid!/)).not.toBeTruthy();
  });

  it("should show a custom error when entering '3'", async () => {
    render(<KitchenSink />);
    const domNode = screen.getByLabelText("Field") as HTMLInputElement;
    userEvent.type(domNode, "3");
    expect(domNode.value).toEqual("3");

    expect(screen.getByTestId(testIds.errorText)).toHaveTextContent(
      "3 is not allowed!"
    );
    expect(screen.queryByText(/Valid!/)).not.toBeTruthy();
    userEvent.click(screen.getByText("Submit"));
    expect(screen.queryByText(/Valid!/)).not.toBeTruthy();
  });

  describe("async", () => {
    it("should show an async custom error when entering '4'", async () => {
      render(<KitchenSink />);
      const domNode = screen.getByLabelText("Field") as HTMLInputElement;
      userEvent.type(domNode, "4");
      expect(domNode.value).toEqual("4");

      expect(screen.getByTestId(testIds.errorText)).toHaveTextContent("");
      expect(screen.getByTestId(testIds.loading)).toHaveTextContent(
        "...loading"
      );

      expect(screen.queryByText(/Valid!/)).not.toBeTruthy();
      userEvent.click(screen.getByText("Submit"));
      expect(screen.queryByText(/Valid!/)).not.toBeTruthy();

      await act(async () => jest.runAllTimers());

      expect(screen.getByTestId(testIds.errorText)).toHaveTextContent(
        "4 is not allowed async!"
      );
      expect(screen.queryByTestId(testIds.loading)).not.toBeTruthy();

      expect(screen.queryByText(/Valid!/)).not.toBeTruthy();
      userEvent.click(screen.getByText("Submit"));
      expect(screen.queryByText(/Valid!/)).not.toBeTruthy();
    });

    it("should not show errors when entering '45' before the timeout", async () => {
      render(<KitchenSink />);
      const domNode = screen.getByLabelText("Field") as HTMLInputElement;
      userEvent.type(domNode, "45");
      expect(domNode.value).toEqual("45");

      expect(screen.getByTestId(testIds.errorText)).toHaveTextContent("");
      expect(screen.getByTestId(testIds.loading)).toHaveTextContent(
        "...loading"
      );

      expect(screen.queryByText(/Valid!/)).not.toBeTruthy();
      userEvent.click(screen.getByText("Submit"));
      expect(screen.queryByText(/Valid!/)).not.toBeTruthy();

      await act(async () => jest.runAllTimers());

      expect(screen.getByTestId(testIds.errorText)).toHaveTextContent("");
      expect(screen.queryByTestId(testIds.loading)).not.toBeTruthy();

      expect(screen.queryByText(/Valid!/)).not.toBeTruthy();
      userEvent.click(screen.getByText("Submit"));
      expect(screen.getByText(/Valid!/)).toBeTruthy();
    });
  });
});
