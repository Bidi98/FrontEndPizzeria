import axios from "axios";
import * as UserServices from "./UserServices.js";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    alert("unexpected error");
    console.log(error);
  }
});

export function setAuthorization() {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + UserServices.getJwt();
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
