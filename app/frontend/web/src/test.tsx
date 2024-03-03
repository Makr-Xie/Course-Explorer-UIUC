import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FirstPage from "./pages/Firstpage";
import { calculateCount } from "./utils/count";

/**
 * @jest-environment jsdom
 */
test("it renders the component", () => {
  render(<FirstPage />);
  expect(screen.getByText("Hello World!"));
});

test("it calculates the count", () => {
  expect(calculateCount(1)).toBe(2);
});
