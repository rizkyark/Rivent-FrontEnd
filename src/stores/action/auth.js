import axios from "../../utils/axios";

export const login = (form) => {
  return {
    type: "LOGIN",
    payload: axios.post(`api/auth/login`, form),
  };
};

export const logout = (refreshToken) => {
  return {
    type: "LOGOUT",
    payload: axios.post("api/auth/logout", { refreshToken }),
  };
};
