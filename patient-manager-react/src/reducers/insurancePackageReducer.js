import {GET_MANY_PACKAGES, GET_ONE_PACKAGE} from "../actions/types";

/**
 * This stores insurance packages held by the entire database
 * one specific insurer, or one specific patient.
 */

const initialState = {
    allPackages: [],
    insurancePackage: {}
}


export default function(state = initialState, action)
{
    switch (action.type)
    {
        case GET_MANY_PACKAGES:
            return {
                ...state,
                allPackages: action.payload
            }
        case GET_ONE_PACKAGE:
            return {
                ...state,
                insurancePackage: action.payload
            }
        default:
            return state;
    }
}