import {GET_MANY_DOCTORS, GET_ONE_DOCTOR, GET_ALL_SPECIALIZATIONS} from "../actions/types";

const initialState = {
    allDoctors: [],
    doctor: {},
    allSpecializations: []
}


export default function(state = initialState, action)
{
    switch (action.type)
    {
        case GET_MANY_DOCTORS:
            return {
                ...state,
                allDoctors: action.payload
            }
        case GET_ONE_DOCTOR:
            return {
                ...state,
                doctor: action.payload
            }
        case GET_ALL_SPECIALIZATIONS:
            return {
                ...state,
                allSpecializations: action.payload
            }
        default:
            return state;
    }
}