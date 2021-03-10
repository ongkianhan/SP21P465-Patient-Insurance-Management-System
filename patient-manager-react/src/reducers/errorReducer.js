import { GET_ERRORS } from "../actions/types";

const initialState = {};

/**
 * Significant credit to Agile Intelligence: https://github.com/AgileIntelligence/AgileIntPPMTool/
 */
export default function(state = initialState, action) {
    switch (action.type)
    {
        case GET_ERRORS:
            return action.payload;
        default:
            return state;
    }
}