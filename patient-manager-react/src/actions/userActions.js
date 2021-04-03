import axios from "axios";
import { GET_ERRORS, GET_MANY_DOCTORS, GET_ONE_DOCTOR, GET_CURRENT_USER, GET_ALL_SPECIALIZATIONS } from "./types";

export const getAllDoctors = () => async dispatch => {
    const res = await axios.get("/api/account/all-doctors");
    dispatch ({
        type: GET_MANY_DOCTORS,
        payload: res.data
    });
}


//Get doctor (used for AppointmentScheduler)
export const getDoctor = (id, history) => async dispatch => {
    try {
        const res = await axios.get(`/api/account/${id}`);
        dispatch({
            type: GET_ONE_DOCTOR,
            payload: res.data
        })
    } catch (error) {
        history.push("/dashboard");
    }
}

//Get current user's profile information
export const getCurrentUser = (id, history) => async dispatch => {
    try {
        const res = await axios.get(`/api/account/${id}`);
        dispatch({
            type: GET_CURRENT_USER,
            payload: res.data
        })
    } catch (error) {
        history.push("/dashboard");
    }
}

export const getAllSpecializations = () => async dispatch => {
    const res = await axios.get("/api/account/doctor-specializations");
    dispatch ({
        type: GET_ALL_SPECIALIZATIONS,
        payload: res.data
    });
}