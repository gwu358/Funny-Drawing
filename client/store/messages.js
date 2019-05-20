
// ACTION TYPES

const ADD_MESSAGE = 'ADD_MESSAGE';
const ADD_MESSAGES = 'ADD_MESSAGES';

// ACTION CREATORS

function addMessage (message) {
  const action = { type: ADD_MESSAGE, message };
  return action;
}

function addMessages (messages) {
  const action = { type: ADD_MESSAGES, messages };
  return action;
}

// THUNK CREATORS

export function postMessages(messages){
  return function(dispatch){
    dispatch(addMessages(messages));
  }
}

export function postMessage(message){
  return function(dispatch){
    dispatch(addMessage(message));
  }
}

// REDUCER

export default function reducer (state = [], action) {

  switch (action.type) {

    case ADD_MESSAGES:
      return action.messages;

    case ADD_MESSAGE:
      return [...state, action.message];

    default:
      return state;
  }

}
