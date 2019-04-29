import axios from 'axios';
import socket from '../socket';

const initialState = {
  time: 0,
  players: [],
  artist: ''
}
const roomPath = window.location.pathname;
// ACTION TYPES

const LOAD_GANE = 'LOAD_GANE';
const UPDATE_PLAYERS = 'UPDATE_PLAYERS';
const START_GAME = 'START_GAME';
// ACTION CREATORS

function loadGame(game) {
  const action = { type: LOAD_GANE, game };
  return action;
}

function startGame(game) {
  const action = { type: START_GAME, game };
  return action;
}

export function updatePlayers(players) {
  const action = { type: UPDATE_PLAYERS, players };
  return action;
}

//thunk
export function startGameThunk(game){
  game.players.forEach(player => {
    const gaming = setInterval(() => {
      socket.emit('update-drawing', roomPath, []);
      game.updateDrawing();
      if (game.time < 0) {
        clearInterval(gaming);
        return;
      }
      dispatch(drawing(game));
      game.time -= 1;   
    }, 1000);
  })
}

export function loadGameThunk(game) {
  if(game.startTime) game.time = Math.round((5000 - (Date.now() - game.startTime))/1000);
  else game.time = 0;
  return function thunk(dispatch) {
    const timer = setInterval(() => {
      if (game.time < 0) {
        clearInterval(timer);
        return;
      }
      dispatch(loadGame(game));
      game.time -= 1;
         
    }, 1000);
  }
}

// THUNK CREATORS

// export function fetchMessages () {

//   return function thunk (dispatch) {
//     return axios.get('/api/messages')
//       .then(res => res.data)
//       .then(messages => {
//         const action = getMessages(messages);
//         dispatch(action);
//       });
//   };
// }

// REDUCER

export default function reducer(state = initialState, action) {

  switch (action.type) {
    case LOAD_GANE:
      state = {...action.game};
      return state;
    case UPDATE_PLAYERS:
      state = {...state, players: action.players}
      return state;
    default:
      return state;
  }

}
