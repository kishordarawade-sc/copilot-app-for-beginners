import React from "react";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import App from "../App";

afterEach(cleanup);

describe("Empty state", () => {
  it("explains no matching books and suggests changing filters, then disappears when matches return", async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.queryByRole("status")).toBeNull();

    const search = screen.getByRole("searchbox", { name: "Search" });
    await user.type(search, "no matching book");

    const emptyState = screen.getByRole("status");
    expect(
      within(emptyState).getByRole("heading", { name: "No matching books found" })
    ).toBeTruthy();
    expect(
      within(emptyState).getByText("Try a different search term, genre, or reading status.")
    ).toBeTruthy();
    expect(screen.getByRole("heading", { name: "0 books shown" })).toBeTruthy();

    await user.clear(search);

    expect(screen.queryByRole("status")).toBeNull();
    expect(screen.getByRole("heading", { name: "12 books shown" })).toBeTruthy();
  });
});
