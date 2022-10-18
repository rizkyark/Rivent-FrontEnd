import { combineReducers } from "redux";

import auth from "./auth";
import user from "./user";
import event from "./event";

export default combineReducers({
  auth,
  user,
  event,
});
