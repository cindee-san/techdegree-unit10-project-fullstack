import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { Outlet } from "react-router";
import { Context } from "../Context";

function PrivateRoute({ children }) {
  let context = useContext(Context);
  let auth = context.authenticatedUser;

// if there is an authenticated user, direct them to the protected route
  return auth ? (
    // <Outlet />
    children
// otherwise navigate them to the signin page
  ) : (
    <Navigate
      to={{
        pathname: "/signin",
      }}
    />
  );
}

export default PrivateRoute;
