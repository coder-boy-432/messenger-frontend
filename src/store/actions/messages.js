import * as actionTypes from './actionTypes';

export const setMessages = (messages) => {
    return {
        type: actionTypes.SET_MESSAGES,
        messages: messages
    }
}