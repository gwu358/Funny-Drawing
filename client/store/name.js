import axios from 'axios';


// ACTION TYPES
const FETCH_NAME = 'FETCH_NAME';
const UPDATE_NAME = 'UPDATE_NAME';

// ACTION CREATORS

export function updateName (name) {
  const action = { type: UPDATE_NAME, name };
  return action;
}

export function fetchNameThunk(){
  return function thunk(dispatch) {
    return axios.get('/api/name')
    .then((res) => {
      if(res.data)
      dispatch(updateName(res.data));
    })
  }
}

export function updateNameThunk (name) {
  return function thunk(dispatch) {
    return axios.post('/api/name', {name});
  }
}

// REDUCER
export default function reducer (state = '', action) {

  switch (action.type) {

    case UPDATE_NAME:
      return action.name;

    default:
      return state;
  }

}
