import axios from 'axios';
import socket from '../socket';

// ACTION TYPES
const ADD_CHANNEL = 'ADD_CHANNEL';
const GET_CHANNELS = 'GET_CHANNELS';

// ACTION CREATORS
export function addChannel (channel) {
  const action = { type: ADD_CHANNEL, channel };
  return action;
}

export function getChannels (channels) {
  const action = { type: GET_CHANNELS, channels };
  return action;
}

// THUNK CREATORS
export function fetchChannels (channels) {
  dispatch(getChannels(channels));
  // return function thunk (dispatch) {
  //   return axios.get('/api/channels')
  //     .then(res => res.data)
  //     .then(channels => {
  //       const action = getChannels(channels);
  //       dispatch(action);
  //     });
  // };
}

export function postChannel (channelName) {
  return function thunk (dispatch, getState) {
    socket.emit('new-channel', channelName, getState().name);
  };
  // return function thunk (dispatch) {
  //   return axios.post('/api/channels', channel)
  //     .then(res => res.data)
  //     .then(newChannel => {
  //       dispatch(getChannel(newChannel));
  //       socket.emit('new-channel', newChannel);
  //       history.push(`/channels/${newChannel.id}`);
  //     });
  // };
}

// REDUCER
export default function reducer (state = [], action) {

  switch (action.type) {

    case GET_CHANNELS:
      return action.channels;

    case ADD_CHANNEL:
      return [...state, action.channel];

    default:
      return state;
  }

}
