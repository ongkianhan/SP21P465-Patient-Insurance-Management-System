import {GET_ONE_APPOINTMENT} from "../actions/types";

const initialState = {
    appointment: {}
}

export default function(state = initialState, action)
{
    switch (action.type)
    {
        case GET_APPOINTMENT:
            return {
                ...state,
                appointment: action.payload
            }
        default:
            return state;
    }
}