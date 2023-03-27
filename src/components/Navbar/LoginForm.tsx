import { FC } from "react";
import Button from "components/ui/Button";
import FieldInput from "components/ui/FieldInput";
import { Form, Formik } from "formik";
import { VALIDATE_EMAIL_REGEX } from "assets/constants";
import { AuthSubmitData } from "types/Auth";

interface Props {
  handleSubmitForm?: (submitData: AuthSubmitData) => void;
  isLoggingIn?: boolean;
  isRegistering?: boolean;
}

const LoginForm: FC<Props> = ({ handleSubmitForm, isRegistering, isLoggingIn }) => {
  const initialValues: AuthSubmitData = {
    email: "",
    password: "",
  };

  const validateForm = ({ email, password }: AuthSubmitData) => {
    const errors: Record<string, string> = {};

    if (!email?.length) {
      errors.email = "Required";
    }

    if (!password?.length) {
      errors.password = "Required";

      return errors;
    }

    if (!VALIDATE_EMAIL_REGEX.test(email)) {
      errors.email = "Invalid email";
    }

    if (password.length < 6) {
      errors.password = "Minimum length is 6";
    }

    return errors;
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validateForm}
      onSubmit={(formData) => handleSubmitForm?.(formData)}
      enableReinitialize
    >
      {() => (
        <Form noValidate>
          <div className="flex">
            <FieldInput
              inputType="text"
              entityType="email"
              bordered
              placeholder="email"
              inputClasses="max-w-xs"
            />

            <FieldInput
              inputType="password"
              entityType="password"
              bordered
              placeholder="password"
              inputClasses="max-w-lg"
              className="ml-2"
            />

            <Button
              type="submit"
              outlined
              color="success"
              lowerCased
              loading={isLoggingIn || isRegistering}
              className="ml-2"
              dataTestId="navbar-auth-login-register"
            >
              login/register
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
