import axios from "../../utils/axios";

export const getUserById = (id) => {
  return {
    type: "GET_USER_BY_ID",
    payload: axios.get(`api/user/${id}`),
  };
};

export const updateProfile = (id, form) => {
  return {
    type: "UPDATE_PROFILE",
    payload: axios.patch(`api/user/profile/${id}`, form),
  };
};

export const updateImage = (id, form) => {
  return {
    type: "UPDATE_IMAGE",
    payload: axios.patch(`api/user/image/${id}`, form),
  };
};

export const logout = (refreshToken) => {
  return {
    type: "LOGOUT",
    payload: axios.post("api/auth/logout", { refreshToken }),
  };
};
