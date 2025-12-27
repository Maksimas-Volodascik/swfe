import { Navigate, Outlet } from "react-router-dom";
import { getRole, isTokenExpired } from "./tokenService";

export function PublicAccess() {
  console.log("is token expired? ", isTokenExpired());
  if (!isTokenExpired()) {
    return <Navigate to="/register" replace />;
  }
  return <Outlet />;
}

export function PrivateAccess() {
  /*const role = getRole();
    if (!allowedRoles.includes(role)) {
    return <Navigate to="/login" />;
  }*/
  if (isTokenExpired()) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
