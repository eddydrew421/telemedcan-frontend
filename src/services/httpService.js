import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
//console.log(`api url: ${process.env.REACT_APP_API_URL} || ${axios.defaults.baseURL}`);

//bypass login by hand:
//axios.defaults.headers.common["Authorization"] = "token";

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    //console.log("Logging the error", error);
    toast("An unexpected error ocurred");
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  //axios.defaults.headers.common["x-auth-token"] = jwt;
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};
