import { Navigate, Outlet } from "react-router-dom";
import { getRole, isTokenExpired } from "./tokenService";

export function PublicAccess() {
  console.log("is token expired? ", isTokenExpired());
  return isTokenExpired ? <Outlet /> : <Navigate to="/register" />;
}

export function PrivateAccess() {
  const role = getRole();

  if (isTokenExpired()) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
  /*if (!allowedRoles.includes(role)) {
    return <Navigate to="/login" />;
  }*/
}
