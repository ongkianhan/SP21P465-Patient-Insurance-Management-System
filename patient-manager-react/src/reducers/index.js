import { combineReducers } from "redux";
//import errorReducer from "./errorReducer";
import userReducer from "./userReducer";

/**
 * Use this version of the index to manage Redux store variables
 */
export default combineReducers({
    /*errors: errorReducer,*/
    doctor: userReducer,
});