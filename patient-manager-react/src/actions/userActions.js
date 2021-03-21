import axios from "axios";
import { GET_ERRORS, GET_MANY_DOCTORS, GET_ONE_DOCTOR } from "./types";

export const getAllDoctors = () => async dispatch => {
    const res = await axios.get("http://localhost:5000/api/account/all-doctors");
    dispatch ({
        type: GET_MANY_DOCTORS,
        payload: res.data
    });
}

export const getDoctor = (id, history) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:5000/api/account/${id}`);
        dispatch({
            type: GET_ONE_DOCTOR,
            payload: res.data
        })
    } catch (error) {
        history.push("/dashboard");
    }
}