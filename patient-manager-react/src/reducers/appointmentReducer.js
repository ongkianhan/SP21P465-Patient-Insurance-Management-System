import {GET_MANY_APPOINTMENTS, GET_ONE_APPOINTMENT} from "../actions/types";

const initialState = {
    allAppointment: [],
    appointment: {}
}


export default function(state = initialState, action)
{
    switch (action.type)
    {
        case GET_MANY_APPOINTMENTS:
            return {
                ...state,
                allAppointment: action.payload
            }
        case GET_ONE_APPOINTMENT:
            return {
                ...state,
                appointment: action.payload
            }
        default:
            return state;
    }
}