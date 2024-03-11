import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Toast from "../../Components/Toast/Toast";

describe("Toast Component", () => {

  it("renders Error Toast with error classname", () => {
    render(<Toast type="error" variant="expanded" />);
    const element = screen.getByTestId("error-expand");
    const elementHtml = element.outerHTML;
    expect(elementHtml).toContain("error-msg");
  });

  it("closes Success Toast on button click", async () => {
    render(<Toast type="success" variant="expanded" />);
    
    const closeButton = screen.getByTestId("close-button");
    expect(closeButton).toBeDefined();
    
    fireEvent.click(closeButton);
    
    waitFor(() => {
      expect(screen.getByTestId("close-button")).toThrow();
    });
  });

  it("Render Success Message", () => {
    render(<Toast type="success" variant="expanded" />);
    const element = screen.getByTestId("success-expand");
    expect(element.textContent).toBe("Success");
  });

});