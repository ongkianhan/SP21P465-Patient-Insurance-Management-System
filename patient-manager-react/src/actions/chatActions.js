import axios from "axios";
import { GET_MANY_CONVERSATIONS, GET_ONE_CONVERSATION, GET_ERRORS } from "./types";

export const createConversation = (senderId, recipientEmail, history) => async dispatch => 
{
    try {
        await axios.post(`/api/conversations/create-conversation/${senderId}&${recipientEmail}`, {});
        dispatch(
        {
            type: GET_ERRORS,
            //Clear the errors for the next use of the appointment scheduler
            payload: {} 
        });
        return true; //signify success
    }
    catch (err)
    {
        dispatch(
        {
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

export const getConversationsByUserId = (userId) => async dispatch => {
    const res = await axios.get(`/api/conversations/get-by-user/${userId}`);
    console.log("res: "+res);
    dispatch ({
        type: GET_MANY_CONVERSATIONS,
        payload: res.data
    });
}