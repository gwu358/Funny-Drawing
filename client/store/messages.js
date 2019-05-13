import axios from 'axios';
import socket from '../socket';

// ACTION TYPES

const ADD_MESSAGE = 'ADD_MESSAGE';
const GET_MESSAGES = 'GET_MESSAGES';

// ACTION CREATORS

export function addMessage (message) {
  const action = { type: GET_MESSAGE, message };
  return action;
}

export function getMessages (messages) {
  const action = { type: GET_MESSAGES, messages };
  return action;
}

// THUNK CREATORS

export function fetchMessages () {

  return function thunk (dispatch) {
    return axios.get('/api/messages')
      .then(res => res.data)
      .then(messages => {
        const action = getMessages(messages);
        dispatch(action);
      });
  };
}

export function postMessage (message) {

  return function thunk (dispatch) {
    return axios.post('/api/messages', message)
      .then(res => res.data)
      .then(newMessage => {
        const action = getMessage(newMessage);
        dispatch(action);
        socket.emit('new-message', newMessage);
        //scroll the bar to the end
        const list = document.getElementById("message-list");
        list && (list.scrollTop = list.scrollHeight);
      });
  };
}

// REDUCER

export default function reducer (state = [], action) {

  switch (action.type) {

    case GET_MESSAGES:
      return action.messages;

    case ADD_MESSAGE:
      return [...state, action.message];

    default:
      return state;
  }

}
