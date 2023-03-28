import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "redux/hooks";

interface PrivateRouteProps {
  element: ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const currentUser = useAppSelector((state) => state.auth.user);

  return <>{currentUser ? element : <Navigate to="/" replace />}</>;
};

export default PrivateRoute;
