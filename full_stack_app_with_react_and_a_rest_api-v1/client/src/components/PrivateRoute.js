import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { Outlet } from "react-router";
import { Context } from "../Context";

function PrivateRoute() {
  let context = useContext(Context);
  let auth = context.authenticatedUser;

  return auth ? (
    <Outlet />
  ) : (
    <Navigate
      to={{
        pathname: "/signin",
      }}
    />
  );
}

export default PrivateRoute;
