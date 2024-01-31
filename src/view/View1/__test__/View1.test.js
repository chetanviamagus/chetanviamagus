import React from "react";
import View1 from "../View1";
import ReactDOM from "react-dom";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
afterEach(cleanup);
it("renders view1 without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<View1 />, div);
});

it("check for button state", () => {
  let { findAllByLabelText } = render(<View1 />);
  // expect(getByTestId("text")).toHaveTextContent("label.user_name");
  // expect(findAllByLabelText("123213"));
});
