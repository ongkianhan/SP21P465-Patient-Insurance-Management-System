
export const getConversationsByUserId = (userId) => async dispatch => {
    const res = await axios.get(`/api/conversations/get-by-user/${userId}`);
    dispatch ({
        type: GET_MANY_CONVERSATIONS,
        payload: res.data
    });
}