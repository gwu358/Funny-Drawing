import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux';

import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

/**
 * Each module exports its own sub-reducer by default.
 * We're giving them the same name as the field we want on state,
 * so that we can cleverly use the shorthand notation in the object we
 * send to combineReducers
 */
import channels from './channels';
import currentChannel from './currentChannel';
import messages from './messages';
import name from './name';
import currentGameRoom from './currentGameRoom';
import editingName from './editingName'
import showingScoreboard from './showingScoreboard'
import newChannelEntry from './newChannelEntry';
import newMessageEntry from './newMessageEntry';
import game from './game';

const reducer = combineReducers({
  channels,
  currentChannel,
  messages,
  name,
  currentGameRoom,
  editingName,
  showingScoreboard,
  newChannelEntry,
  newMessageEntry,
  game
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(
    thunkMiddleware
  ))
);

export default store;

// export action creators
export * from './channels';
export * from './currentChannel';
export * from './messages';
export * from './name';
export * from './currentGameRoom';
export * from './editingName';
export * from './showingScoreboard';
export * from './newChannelEntry';
export * from './newMessageEntry';
export * from './game';
