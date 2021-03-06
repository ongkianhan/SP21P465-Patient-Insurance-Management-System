import axios from "axios";
import { GET_ERRORS, GET_MANY_DOCTORS, GET_ONE_DOCTOR } from "./types";

/*export const createDoctor = (doctor, history) => async dispatch => 
{
    try {
        await axios.post("/api/account/create-doctor", project);
        history.push("/dashboard");
        dispatch(
        {
            type: GET_ERRORS,
            //Clear the errors for the next use of the signup form
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
};*/

export const getAllDoctors = () => async dispatch => {
    console.log("Getting all doctors!");
    const res = await axios.get("/api/account/all-doctors");
    dispatch ({
        type: GET_MANY_DOCTORS,
        payload: res.data
    });
}


export const getDoctor = (id, history) => async dispatch => {
    try {
        console.log("Getting a doctor!");
        const res = await axios.get(`/api/account/${id}`);
        dispatch({
            type: GET_ONE_DOCTOR,
            payload: res.data
        })
    } catch (error) {
        history.push("/dashboard");
    }
}