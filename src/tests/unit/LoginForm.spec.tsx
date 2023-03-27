import { fireEvent, render, waitFor } from "@testing-library/react";
import LoginForm from "components/Navbar/LoginForm";
import { describe, expect, test } from "vitest";

const renderWrapperElement = () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  return render(<LoginForm handleSubmitForm={() => {}} />);
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

      expect(emailErrorMessage.textContent).toBe("Required");
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

  test("should validate password length", async () => {
    const wrapper = renderWrapperElement();

    const emailField = await wrapper.getByTestId("field-input-email");
    const passwordField = await wrapper.getByTestId("field-input-password");

    fireEvent.change(emailField, { target: { value: "abc@mail.com" } });
    fireEvent.change(passwordField, { target: { value: "123" } });

    fireEvent.blur(emailField);
    fireEvent.blur(passwordField);

    const loginCta = await wrapper.getByTestId("navbar-auth-login-register");
    fireEvent.click(loginCta);

    await waitFor(() => {
      const passwordErrorMessage = wrapper.getByTestId("error-message-password");

      expect(passwordErrorMessage.textContent).toBe("Minimum length is 6");
    });
  });
});
