import { SIGNUP } from "../Action/loginActions";
import { AUTH_LOGIN_USER_PRESENT } from "../Action/loginActions";

var initialState = {
  duplicateUser: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SIGNUP:
      console.log("Inside Reducer", action.payload);
      return {
        ...state,
        result: action.payload
      };
    case AUTH_LOGIN_USER_PRESENT:
      console.log("Inside reducer AUTH_LOGIN_USER_PRESENT");
      return {
        ...state,
        duplicateUser: true
      };

    default:
      return state;
  }
}
