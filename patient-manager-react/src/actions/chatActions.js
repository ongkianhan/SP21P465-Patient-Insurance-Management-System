import axios from "axios";
import { GET_MANY_CONVERSATIONS, GET_ONE_CONVERSATION, GET_ERRORS } from "./types";

export const createConversation = (senderId, recipientEmail) => async dispatch => 
{
    //Create a conversation between two people
    try 
    {
        const res = await axios.post(`/api/conversations/create-conversation/${senderId}&${recipientEmail}`, {});
        dispatch(
        {
            type: GET_ONE_CONVERSATION,
            payload: res.data
        });
        return true;
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
    //Validate the ID
    if (userId < 0 || userId == undefined) {
        return;
    }
    //Get every conversation this user is involved in
    const res = await axios.get(`/api/conversations/get-by-user/${userId}`);
    dispatch ({
        type: GET_MANY_CONVERSATIONS,
        payload: res.data
    });
}

export const getConversationById = (conversationId, viewerId) => async dispatch => {
    //Validate the ID
    if (conversationId < 0 || conversationId == undefined) {
        return;
    }
    //Retrieve the target conversation and clear its unread messages using the viewerId (i.e. userId)
    const res = await axios.get(`/api/conversations/view/${conversationId}/${viewerId}`);
    dispatch ({
        type: GET_ONE_CONVERSATION,
        payload: res.data
    });
}

export const addMessageToConversation = (senderId, conversationId, message) => async dispatch => 
{
    //Post the message to the conversation
    await axios.post(`/api/conversations/sender-${senderId}/conversation-${conversationId}`, message);
};

export const addUserToConversation = (senderId, conversationId, otherUserEmail) => async dispatch => 
{
    try
    {
        //Update the conversation with the new user
        const res = await axios.post(`/api/conversations/add-user-to-conversation/${conversationId}/${otherUserEmail}`);
        //Return the updated conversation
        dispatch(
        {
            type: GET_ONE_CONVERSATION,
            payload: res.data
        });
        return true;
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