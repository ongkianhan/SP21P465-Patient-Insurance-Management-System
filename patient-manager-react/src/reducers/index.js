import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import doctorReducer from "./doctorReducer";
import patientReducer from "./patientReducer";
import currentUserReducer from "./currentUserReducer";
import appointmentReducer from "./appointmentReducer";
import packageReducer from "./packageReducer";
import securityReducer from "./securityReducer";
import chatReducer from "./chatReducer";

/**
 * Use this version of the index to manage Redux store variables
 */
export default combineReducers({
    errors: errorReducer,
    doctor: doctorReducer,
    patient: patientReducer,
    currentUser: currentUserReducer,
    appointment: appointmentReducer,
    package: packageReducer,
    conversation: chatReducer,
    security: securityReducer
});