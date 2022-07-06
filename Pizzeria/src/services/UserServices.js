import http from "../services/HttpService";
import config from "../config.json";
import { staff } from "fontawesome";
import jwtDecode from "jwt-decode";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import { setAuthorization } from "../services/HttpService";

export async function register(user) {
  const req = JSON.stringify({
    Login: user.email,
    Password: user.password,
  });
  //console.log(req);
  await http.post(config.apiUrl + "register", req, {
    headers: {
      "Content-type": "application/json",
    },
  });
}

export async function refreshToken() {
  const response = await http.post(config.apiUrl + "refresh", {
    params: {
      token: getRefreshToken(),
    },
  });
  console.log(response.data);
  localStorage.setItem("userData", JSON.stringify(response.data));
  return response;
}

export async function login(user) {
  const req = JSON.stringify({
    Login: user.email,
    Password: user.password,
  });
  const response = await http.post(config.apiUrl + "login", req, {
    headers: {
      "Content-type": "application/json",
    },
  });
  console.log(response.data);
  localStorage.setItem("userData", JSON.stringify(response.data));
  setAuthorization();
  return response;
}

export function logout() {
  localStorage.removeItem("userData");
}

export function getCurrentUser() {
  try {
    const userData = localStorage.getItem("userData");
    return jwtDecode(userData);
  } catch (error) {
    return {};
  }
}

export function getJwt() {
  try {
    const userData = JSON.parse(localStorage.getItem("userData"));
    console.log(userData.accessToken);
    return userData.accessToken;
  } catch (error) {
    return {};
  }
}
export async function getUserData() {
  try {
    const response = await http.get(config.apiUrl + "userAddress", {
      headers: {
        "Content-type": "application/json",
      },
    });
    return response.data;
  } catch (error) {}
}

export function getRefreshToken() {
  try {
    const userData = JSON.parse(localStorage.getItem("userData"));
    return userData.refreshToken;
  } catch (error) {
    return {};
  }
}
