import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";

describe("Test", () => {
  beforeAll(() => {
    window.matchMedia = (query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    });
  });

  test("homepage shows", () => {
    render(<App />, { wrapper: MemoryRouter });

    // verify homepage
    const titleElement = screen.getByText(/Hugh's Pluto Screener/i);
    expect(titleElement).toBeInTheDocument();
  });
});
