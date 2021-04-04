import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import doctorReducer from "./doctorReducer";
import currentUserReducer from "./currentUserReducer";
import appointmentReducer from "./appointmentReducer";
import securityReducer from "./securityReducer";
import chatReducer from "./chatReducer";

/**
 * Use this version of the index to manage Redux store variables
 */
export default combineReducers({
    errors: errorReducer,
    doctor: doctorReducer,
    currentUser: currentUserReducer,
    appointment: appointmentReducer,
    chat: chatReducer,
    security: securityReducer
});