import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Button from "components/ui/Button";
import FieldInput from "components/ui/FieldInput";
import { Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { useGetUserInfoQuery, useLoginMutation, useRegisterMutation } from "redux/services/authApi";
import { logout, setToken, setUser } from "redux/slices/authSlice";
import { VALIDATE_EMAIL_REGEX } from "assets/constants";
import { AuthSubmitData, User } from "types/Auth";

const NavbarAuth = () => {
  const navigate = useNavigate();

  const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const [register, { isLoading: isRegistering }] = useRegisterMutation();
  const { data: fetchedUser } = useGetUserInfoQuery();

  const currentUser = useAppSelector<User | null>((state) => state.auth.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!fetchedUser?.email) {
      return;
    }

    dispatch(setUser(fetchedUser));
  }, [dispatch, fetchedUser]);

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
    }

    if (!VALIDATE_EMAIL_REGEX.test(email)) {
      errors.email = "Invalid email";
    }

    return errors;
  };

  const handleAfterLogin = (user: User, accessToken: string) => {
    toast.success(`Welcome, ${user.email}`);

    dispatch(setToken(accessToken));
    dispatch(setUser(user));
  };

  const handleSubmitForm = ({ email, password }: AuthSubmitData) => {
    login({ email, password })
      .unwrap()
      .then(({ accessToken, user }) => {
        handleAfterLogin(user, accessToken);
      })
      .catch((error) => {
        if (error.status === 400 && error.data === "Cannot find user") {
          register({ email, password })
            .unwrap()
            .then(({ accessToken, user }) => {
              handleAfterLogin(user, accessToken);
            })
            .catch((err) => toast.error(err.data ?? err.message));

          return;
        }
        toast.error(error.data ?? error.message);
      });
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleShare = () => {
    navigate("/share");
  };

  return (
    <>
      {currentUser ? (
        <div className="flex lg:gap-4 items-center">
          <span>Welcome, {currentUser?.email}</span>
          <div className="flex gap-2 lg:flex-row flex-col">
            <Button color="info" lowerCased outlined onClick={handleShare}>
              share a movie
            </Button>

            <Button color="error" lowerCased outlined onClick={handleLogout}>
              logout
            </Button>
          </div>
        </div>
      ) : (
        <Formik
          initialValues={initialValues}
          validate={validateForm}
          onSubmit={handleSubmitForm}
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
      )}
    </>
  );
};

export default NavbarAuth;
