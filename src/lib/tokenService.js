const emailaddressURI = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress";
const nameidentifierURI = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
const roleURI="http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

export function saveAccessToken(accessToken){
    localStorage.setItem("accessToken", accessToken);
}

export function getAccessToken(){
    return localStorage.getItem("accessToken");
}

export function clearAccessToken(){
    localStorage.removeItem("accessToken")
}

export function decodeJWT(token){
    //tba
}

export function isTokenExpired(token){
    //tba
}

export function getRole(){
    //tba
}