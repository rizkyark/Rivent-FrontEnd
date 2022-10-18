import axios from "../../utils/axios";

export const getDataEvent = (page, limit, searchName, date) => {
  return {
    type: "GET_DATA_EVENT",
    payload: axios.get(
      `api/event?page=${page}&limit=${limit}&searchName=${searchName}&searchDateShow=${date}`
    ),
  };
};

export const postEvent = (form) => {
  return {
    type: "POST_EVENT",
    payload: axios.post("api/event", form),
  };
};

export const updateEvent = (id, form) => {
  return {
    type: "UPDATE_EVENT",
    payload: axios.patch(`api/event/${id}`, form),
  };
};

export const deleteEvent = (id) => {
  return {
    type: "DELETE_EVENT",
    payload: axios.delete(`api/event/${id}`),
  };
};
