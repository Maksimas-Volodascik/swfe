const emailaddressURI =
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress";
const nameidentifierURI =
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
const roleURI = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

export function saveAccessToken(accessToken) {
  localStorage.setItem("accessToken", accessToken);
}

export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

export function clearAccessToken() {
  localStorage.removeItem("accessToken");
}

export function parseJWT(token) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch (err) {
    console.error("Invalid token", err);
    return {};
  }
}
export function isTokenExpired() {
  const token = getAccessToken();
  if (token === null) {
    return true;
  }

  const parsedToken = parseJWT(getAccessToken());
  if (!parsedToken || !parsedToken.exp) return true;
  return parsedToken.exp < Date.now() / 1000;
}

export function getRole() {
  const token = getAccessToken();
  if (token === null) {
    return "none";
  }

  const parsedToken = parseJWT(getAccessToken());
  if (!parsedToken) return null;
  return parsedToken[roleURI];
}
