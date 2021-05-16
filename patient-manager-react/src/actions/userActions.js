import axios from "axios";
import { GET_ERRORS, GET_MANY_DOCTORS, GET_ONE_DOCTOR, GET_MANY_PATIENTS, GET_ONE_PATIENT, GET_CURRENT_USER, GET_ALL_SPECIALIZATIONS } from "./types";

export const getDoctorsByFilter = (filter) => async dispatch => {
    console.log(filter);
    try {
    const res = await axios.post("/api/account/search-doctors", filter);
    dispatch ({
        //Retrieve all packages created by the target insurer
        type: GET_MANY_DOCTORS,
        payload: res.data
    });
}
catch (error) {
    console.error(error.response);
}
}

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

export const getAllPatients = () => async dispatch => {
    const res = await axios.get("/api/account/all-patients");
    dispatch ({
        type: GET_MANY_PATIENTS,
        payload: res.data
    });
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


export const giveUserOnlineStatus = (userId) => async dispatch => 
{
    //Make the target user online
    if (userId != undefined)
        await axios.post(`/api/account/give-user-online-status/${userId}`);
};
export const giveUserOfflineStatus = (userId) => async dispatch => 
{
    console.log("Offline!")
    //Make the target user offline
    if (userId != undefined)
        await axios.post(`/api/account/give-user-offline-status/${userId}`);
};