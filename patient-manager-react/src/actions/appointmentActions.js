import axios from "axios";
import { GET_MANY_APPOINTMENTS, GET_ERRORS } from "./types";

export const createAppointment = (appointment, doctorId, history) => async dispatch => 
{
    try {
        await axios.post(`/api/appointments/create-appointment/${doctorId}`, appointment);
        dispatch(
        {
            type: GET_ERRORS,
            //Clear the errors for the next use of the appointment scheduler
            payload: {} 
        });
    }
    catch (err)
    {
        dispatch(
        {
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

export const getAppointmentsByDoctorId = (doctorId) => async dispatch => {
    const res = await axios.get(`/api/appointments/get-by-doctor/${doctorId}`);
    dispatch ({
        type: GET_MANY_APPOINTMENTS,
        payload: res.data
    });
}

export const validateAppointment = (appointment) => {
    const errorOutput = {};
    //Check if date is blank
    if (appointment["date"] === null || appointment["date"] === "")
    {
        errorOutput["date"] = "Select a time from the table →";
    }
    //Check if the date is in the future
    return errorOutput;
}