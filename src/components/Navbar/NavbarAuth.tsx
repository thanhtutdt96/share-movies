import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import LoginForm from "components/Navbar/LoginForm";
import Button from "components/ui/Button";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { useGetUserInfoQuery, useLoginMutation, useRegisterMutation } from "redux/services/authApi";
import { logout, setToken, setUser } from "redux/slices/authSlice";
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
          <span data-testid="navbar-auth-user">Welcome, {currentUser?.email}</span>
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
        <LoginForm
          handleSubmitForm={handleSubmitForm}
          isLoggingIn={isLoggingIn}
          isRegistering={isRegistering}
        />
      )}
    </>
  );
};

export default NavbarAuth;
