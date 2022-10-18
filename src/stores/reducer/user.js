const initialState = {
  isLoading: false,
  isError: false,
  data: {},
  msg: "",
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER_BY_ID_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case "GET_USER_BY_ID_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data[0],
        msg: action.payload.data.msg,
      };
    }
    case "GET_USER_BY_ID_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: {},
        msg: action.payload.response.data.msg,
      };
    }
    case "UPDATE_PROFILE_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case "UPDATE_PROFILE_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };

    case "UPDATE_PROFILE_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data,
      };

    case "UPDATE_IMAGE_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case "UPDATE_IMAGE_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };

    case "UPDATE_IMAGE_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data,
      };
    case "LOGOUT_PENDING":
      return {
        ...state,
        isError: false,

        isLoading: true,
      };

    case "LOGOUT_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,

        data: [],
        msg: action.payload.data.msg,
      };

    case "LOGOUT_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
        pageInfo: {},
        msg: action.payload.response.data,
      };
    default: {
      return state;
    }
  }
};

export default user;
