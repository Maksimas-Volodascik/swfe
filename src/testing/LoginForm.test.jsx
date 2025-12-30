import React from "react";
import LoginForm from "../components/LoginForm";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";

describe("Login form", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("Renders title and subtitle", () => {
    expect(
      screen.getByText("Welcome to Student Gradebook")
    ).toBeInTheDocument();
    expect(screen.getByText("Please login to continue")).toBeInTheDocument();
  });

  it("Button is present", async () => {
    const buttons = screen.getAllByRole("button", { name: "Log in" });
    const visibleButton = buttons.find((btn) => btn.offsetParent !== null);
    await userEvent.click(visibleButton);
  });
});
