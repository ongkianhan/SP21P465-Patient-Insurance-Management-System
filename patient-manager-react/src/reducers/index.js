import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import doctorReducer from "./doctorReducer";
import securityReducer from "./securityReducer";

/**
 * Use this version of the index to manage Redux store variables
 */
export default combineReducers({
    errors: errorReducer,
    doctor: doctorReducer,
    security: securityReducer
});