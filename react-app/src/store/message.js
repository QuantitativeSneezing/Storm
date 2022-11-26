const ADD_MESSAGE = 'messages/addMessage'
const LOAD_ONE = "messages/:messageId"
const LOAD_ALL = 'messages/all'
// const CURRENT_DM = "messages/current/dm"
// const CURRENT = "messages/current"
const EDIT_MESSAGE = 'messages/editCurrentMessage'
const DELETE_MESSAGE = 'messages/delete'


export const addMessage = (message) => {
    return {
        type: ADD_MESSAGE,
        message
    };
};

export const loadAll = (messages) => {
    return {
        type: LOAD_ALL,
        messages
    }
}


// export const current = (messages) => {
//     return {
//         type: CURRENT,
//         messages
//     }
// }
export const editMessage = (message) => {
    return {
        type: EDIT_MESSAGE,
        message
    };
};

export const deleteMessage = (id) => {
    return {
        type: DELETE_MESSAGE,
        id
    };
};
export const getAllMessages = () => async dispatch => {
    const response = await fetch(`/api/messages/all`);
    if (response.ok) {
      const messages = await response.json();
      console.log("THUNK MESSAGES :", messages)
      const result = dispatch(loadAll(messages.messages))
      //console.log("RESULT OF DISPATCHING :", result)
      return result
    }
  };



export const addOneMessage = (data) => async dispatch => {
    const { content } = data
    // console.log('thunk!!!!!', name, img, description)
    const response = await fetch(`/api/messages/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({content}),
    })
    if (response.ok) {
        const newMessage = await response.json();
        dispatch(addMessage(response))
        return newMessage
    }
}



export const editOneMessage = (data) => async dispatch => {
    const { messageId, name, img, description } = data;
    console.log(messageId, name, img, description)
    const response = await fetch(`/api/messages/${messageId}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, img, description }),
    })

    if (response.ok) {
        const editedMessage = await response.json();
        dispatch(editMessage(editedMessage));
        return editedMessage;
    }
}

export const deleteOneMessage = (messageId) => async dispatch => {
    const response = await fetch(`/api/messages/${messageId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        const toDelete = await response.json();
        console.log(toDelete)
        dispatch(deleteMessage(messageId));
    }
}


const messageReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        //separate loads for regular and dm messages
        case ADD_MESSAGE:
            // if there is a message already, skip this and go straight to overwriting it
            if (!state[action.message.id]) {
                newState = {
                    ...state,
                    [action.message.id]: action.message
                };
                const messageList = newState.messages.map(id => newState[id]);
                messageList.push(action.message);
                newState.messages = messageList;

                return newState;
            }
            return {
                ...state,
            };
        case DELETE_MESSAGE:
            const newMessages = state.messages.filter(message => message.id === action.messageId)
            newState = { ...state, messages: newMessages }
            return newState;
        default:
            return state;
    }
};
export default messageReducer;
