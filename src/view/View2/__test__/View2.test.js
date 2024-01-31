import React from "react";
import View2 from "../View2";
import ReactDOM from "react-dom";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
// afterEach(cleanup);
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<View2 />, div);
});

it("renders view2 correctly", () => {
  let { getByTestId } = render(<View2 />);
  expect(getByTestId("text")).toHaveTextContent("label.user_name");
});
