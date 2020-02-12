import jwtDecode from "jwt-decode";
import httpService from "./httpService";

const apiEndPoint = "/auth";
const apiEndGrapghql = "/graphql";
const tokenKey = "token";

httpService.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await httpService.post(apiEndPoint, {
    email,
    password
  });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export async function loginGraphQL(email, password) {
  const query = {
    query: `query{
                  login(username: "${email}", password:"${password}")
                }`,
    variables: null
  };
  const res = await httpService.post(apiEndGrapghql, JSON.stringify(query), {
    headers: { "Content-Type": "application/json" }
  });

  localStorage.setItem(tokenKey, res.data.data.login);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginGraphQL,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt
};
