import axios from 'axios';


// ACTION TYPES
const UPDATE_GAME_ROOM = 'UPDATE_GAME_ROOM';

// ACTION CREATORS

function updateRoom(roomPath) {
  const action = { type: UPDATE_GAME_ROOM, roomPath };
  return action;
}

export function updateCurrentRoom(roomPath) {
  return function thunk(dispatch) {
    console.log(roomPath)
    return axios.post('/api/room', {roomPath})
      .then(() => {
          dispatch(updateRoom(roomPath));
      })
  }
}

export function fetchGameRoom() {
  return function thunk(dispatch) {
    return axios.get('/api/room')
      .then((res) => {
          dispatch(updateRoom(res.data));
      })
  }
}

// REDUCER
export default function reducer(state = '', action) {

  switch (action.type) {

    case UPDATE_GAME_ROOM:
      return action.roomPath;

    default:
      return state;
  }

}
