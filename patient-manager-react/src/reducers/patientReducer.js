import {GET_MANY_PATIENTS, GET_ONE_PATIENT} from "../actions/types";

/**
 * This reducer is used exclusively for PatientSearch
 */

const initialState = {
    allPatients: [],
    patient: {},
    allSpecializations: []
}


export default function(state = initialState, action)
{
    switch (action.type)
    {
        case GET_MANY_PATIENTS:
            return {
                ...state,
                allPatients: action.payload
            }
        case GET_ONE_PATIENT:
            return {
                ...state,
                patient: action.payload
            }
        default:
            return state;
    }
}