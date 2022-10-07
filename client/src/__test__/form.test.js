import { render, fireEvent, screen } from "@testing-library/react";
import Form from "../components/form";

describe("form", () => {
  test("should render form", () => {
    render(<Form />);
  });
});
//click button
test("submit", async () => {
  render(<Form />);
});
