import { getAccessToken } from "./tokenService";

export function PublicAccess(children) {
  const token = getAccessToken();
}

export function PrivateAccess(children) {}
