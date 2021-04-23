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


//As an patient, manually add an insurance package 
export const addInsurancePackageToPatient = (packageId, history) => async dispatch => 
{
    try 
    {
        await axios.post(`/api/insurance/add-insurance-package/package-${packageId}/`);
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


//As an insurer, recommend an insurance package to a patient
export const recommendInsurancePackageToPatient = (packageId, patientEmail, history) => async dispatch => 
{
    try 
    {
        await axios.post(`/api/insurance/recommend-insurance-package/package-${packageId}/patient-${patientEmail}/`);
        return "Successfully recommended the package";
    }
    catch (err)
    {
        return "The patient already has that package";
    }
};


//As an patient, decline an insurance package recommendation
export const declineInsurancePackageRecommendation = (packageId, history) => async dispatch => 
{
    console.log("Juju has declined your trade offer")
    try 
    {
        await axios.delete(`/api/insurance/decline-insurance-recommendation/package-${packageId}/`);
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


//As an patient, accept an insurance package recommendation
export const acceptInsurancePackageRecommendation = (packageId, history) => async dispatch => 
{
    console.log("Accept this gift of healing!")
    try 
    {
        await axios.patch(`/api/insurance/accept-insurance-recommendation/package-${packageId}/`);
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