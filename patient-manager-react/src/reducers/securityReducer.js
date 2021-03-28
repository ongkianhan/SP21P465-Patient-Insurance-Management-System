import { SET_CURRENT_USER } from "../actions/types";

/**
 * Significant credit to Agile Intelligence: https://github.com/AgileIntelligence/AgileIntPPMTool/
 */

//Default state is not logged in
//so no token yet
const initialState = {
    validToken: false,
    user: {}
};

//Check if the payload exists
const booleanActionPayload = payload => {
    if (payload) {
        return true;
    }
    else {
        return false;
    }
};

export default function(state = initialState, action) 
{
    switch (action.type) 
    {
        case SET_CURRENT_USER:
            return {
                ...state,
                validToken: booleanActionPayload(action.payload),
                user: action.payload
            };

        default:
            return state;
    }
}