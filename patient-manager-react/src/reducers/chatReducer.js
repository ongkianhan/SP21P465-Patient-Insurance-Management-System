import {GET_MANY_CONVERSATIONS, GET_ONE_CONVERSATION} from "../actions/types";

const initialState = {
    allConversations: [],
    conversation: {}
}


export default function(state = initialState, action)
{
    switch (action.type)
    {
        case GET_MANY_CONVERSATIONS:
            return {
                ...state,
                allConversations: action.payload
            }
        case GET_ONE_CONVERSATION:
            return {
                ...state,
                conversation: action.payload
            }
        default:
            return state;
    }
}