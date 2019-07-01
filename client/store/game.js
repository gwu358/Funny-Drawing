import axios from 'axios';
import socket from '../socket';

import {clearBoard, enableDrawing, disableDrawing} from '../components/Canvas';

const initialState = {
  time: 0,
  players: [],
  artist: '',
  path: ''
}
const roomPath = window.location.pathname;
// ACTION TYPES

const LOAD_GANE = 'LOAD_GANE';
const UPDATE_PLAYERS = 'UPDATE_PLAYERS';
const START_GAME = 'START_GAME';
const JOIN_GAME = 'JOIN_GAME';
const LEAVE_GAME = 'LEAVE_GAME';

// ACTION CREATORS

function loadGame(game) {
  const action = { type: LOAD_GANE, game };
  return action;
}

function startGame(game) {
  const action = { type: START_GAME, game };
  return action;
}

export function updateGameRoom(path) {
  const action = { type: UPDATE_GAME_ROOM, path };
  return action;
}

// export function joinGame(name, roomPath){
//   socket
// }

// export function leaveGame(name, roomPath){

// }

export function updatePlayers(players) {
  const action = { type: UPDATE_PLAYERS, players };
  return action;
}

// THUNK CREATORS
// save the drawer's name to server, change listen to check the
// current drawer
// export function startTurn(game) {
//   return function thunk(dispatch, getState) {   
//     if(game.artist === getState().name) enableDrawing();
//     else disableDrawing();
//     game.time = 5;
//     const gaming = setInterval(() => {
//       if (game.time < 0) {
//         clearInterval(gaming);
//         return;
//       }
//       dispatch(loadGame(game));
//       game.time -= 1;
//     }, 1000);
//   }
// }   
export function startTurn(game) {
  
  return function thunk(dispatch, getState) {
    if(!game.artist){
      dispatch(loadGame(game));
      return;
    }
    game.time = Math.ceil((game.endTime - Date.now()) / 1000);
    const gaming = setInterval(() => {
      if (game.time < 0) {
        clearInterval(gaming);
        if(game.artist === getState().name)
          socket.emit('nextTurn', window.location.pathname);
        return;
      }
      dispatch(loadGame(game));
      game.time -= 1;
    }, 1000);
  }
}   

export function loadGameThunk(game) {
  if (game.startTime) game.time = Math.round((5000 - (Date.now() - game.startTime)) / 1000);
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

// REDUCER

export default function reducer(state = initialState, action) {

  switch (action.type) {
    case LOAD_GANE:
      state = { ...action.game };
      return state;
    case UPDATE_PLAYERS:
      state = { ...state, players: action.players }
      return state;
    default:
      return state;
  }

}
