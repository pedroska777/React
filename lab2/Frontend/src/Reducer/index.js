import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import SignupReducer from "./SignupReducer";
import { reducer as formReducer } from "redux-form";
import ProfileReducer from "./ProfileReducer";

const rootReducer = combineReducers({
  login: LoginReducer,
  signup: SignupReducer,
  profile: ProfileReducer,
  form: formReducer
});

export default rootReducer;
