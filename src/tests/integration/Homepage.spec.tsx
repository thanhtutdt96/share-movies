import { createMemoryRouter, RouterProvider } from "react-router";
import { waitFor } from "@testing-library/react";
import { setUser } from "redux/slices/authSlice";
import { store as setupStore } from "redux/store";
import { routes } from "router";
import { renderWithProviders } from "tests/utils/test-utils";
import { describe, expect, test } from "vitest";

const renderWrapperElement = () => {
  const store = setupStore();

  store.dispatch(
    setUser({
      id: 1,
      email: "thanhtutdt96@gmail.com",
    }),
  );

  const router = createMemoryRouter(routes, {
    initialEntries: ["/"],
  });

  return renderWithProviders(<RouterProvider router={router} />, { store });
};

describe("Homepage", () => {
  test("should display auth user info", async () => {
    const wrapper = renderWrapperElement();

    await waitFor(() => {
      const emailField = wrapper.queryByTestId("field-input-email");
      expect(emailField).toBeNull();
    });

    const authInfo = await wrapper.getByTestId("navbar-auth-user");

    expect(authInfo.textContent).toContain("thanhtutdt96@gmail.com");
  });

  test("should display shared movies", async () => {
    const wrapper = renderWrapperElement();

    await waitFor(() => {
      const movieItems = wrapper.queryAllByTestId("movie-item");

      expect(movieItems).toHaveLength(0);
    });
  });
});
