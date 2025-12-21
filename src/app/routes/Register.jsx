import React from "react";
import {
  parseJWT,
  getAccessToken,
  getRole,
  isTokenExpired,
} from "../../lib/tokenService";

const Register = () => {
  const handleRequest = () => {
    const token = getAccessToken();
    console.log("Decoded JWT token: ", parseJWT(token));
    getRole();
    isTokenExpired();
  };

  return (
    <>
      <button onClick={handleRequest}>press me</button>
    </>
  );
};

export default Register;
