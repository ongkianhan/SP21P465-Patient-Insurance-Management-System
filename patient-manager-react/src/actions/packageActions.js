import axios from "axios";
import { GET_MANY_PACKAGES, GET_ERRORS } from "./types";

//Get every insurance package from the database
export const getAllInsurancePackages = () => async dispatch => {
    const res = await axios.get(`/api/insurance/all-insurance-packages`);
    dispatch ({
        type: GET_MANY_PACKAGES,
        payload: res.data
    });
}

//Retrieve all packages created by the target insurer
export const getInsurancePackagesByInsurerId = (insurerId) => async dispatch => {
    const res = await axios.get(`/api/insurance/get-by-insurer/${insurerId}`);
    dispatch ({
        type: GET_MANY_PACKAGES,
        payload: res.data
    });
}

//Retrieve all packages (both recommendations and enrolled packages) held by the target patient
export const getInsurancePackagesByPatientId = (patientId) => async dispatch => {
    const res = await axios.get(`/api/insurance/get-by-patient/${patientId}`);
    dispatch ({
        type: GET_MANY_PACKAGES,
        payload: res.data
    });
}


//As an insurer, create an insurance package
export const createInsurancePackage = (insurancePackage, history) => async dispatch => 
{
    try 
    {
        await axios.post(`/api/insurance/create-insurance-package/`, insurancePackage);
        dispatch(
        {
            type: GET_ERRORS,
            payload: {} //Clear the errors
        });
    }
    catch (err)
    {
        dispatch(
        {
            type: GET_ERRORS,
            payload: err.response.data //Show the errors
        });
    }
};