import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import NavbarAuth from "components/Navbar/NavbarAuth";
import { store } from "redux/store";
import { describe, expect, test } from "vitest";

const renderWrapperElement = () => {
  return render(
    <Provider store={store}>
      <NavbarAuth />
    </Provider>,
    { wrapper: BrowserRouter },
  );
};

describe("Login Form", () => {
  test("should display blank form fields on startup", async () => {
    const wrapper = renderWrapperElement();

    const emailField = await wrapper.getByTestId("field-input-email");
    const passwordField = await wrapper.getByTestId("field-input-password");

    expect(emailField.textContent).toBe("");
    expect(passwordField.textContent).toBe("");
  });

  test("should validate required fields", async () => {
    const wrapper = renderWrapperElement();

    const emailField = await wrapper.getByTestId("field-input-email");
    const passwordField = await wrapper.getByTestId("field-input-password");

    fireEvent.blur(emailField);
    fireEvent.blur(passwordField);

    const loginCta = await wrapper.getByTestId("navbar-auth-login-register");
    fireEvent.click(loginCta);

    await waitFor(() => {
      const emailErrorMessage = wrapper.getByTestId("error-message-email");
      const passwordErrorMessage = wrapper.getByTestId("error-message-password");

      expect(emailErrorMessage.textContent).toBe("Invalid email");
      expect(passwordErrorMessage.textContent).toBe("Required");
    });
  });

  test("should validate correct email pattern", async () => {
    const wrapper = renderWrapperElement();

    const emailField = await wrapper.getByTestId("field-input-email");
    const passwordField = await wrapper.getByTestId("field-input-password");

    fireEvent.change(emailField, { target: { value: "abc@" } });
    fireEvent.change(passwordField, { target: { value: "123456" } });

    fireEvent.blur(emailField);
    fireEvent.blur(passwordField);

    const loginCta = await wrapper.getByTestId("navbar-auth-login-register");
    fireEvent.click(loginCta);

    await waitFor(() => {
      const emailErrorMessage = wrapper.getByTestId("error-message-email");
      const passwordErrorMessage = wrapper.queryByTestId("error-message-password");

      expect(emailErrorMessage.textContent).toBe("Invalid email");
      expect(passwordErrorMessage).toBeNull();
    });
  });
});
