import io from 'socket.io-client';
import store, { addMessage, addChannel, startGameThunk, loadGameThunk, updatePlayers, getChannels, postMessage, postMessages } from './store';
import {draw, clearBoard, events as whiteboard} from './components/Canvas';
import {browserHistory} from 'react-router';

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('I am now connected to the server!');
  // socket.emit('join-drawing', roomPath);

  socket.on('post-messages', messages => {
    store.dispatch(postMessages(messages));
  });

  socket.on('new-message', message => {
    store.dispatch(postMessage(message));
  });

  socket.on('new-channel', channel => {
    store.dispatch(addChannel(channel));
    // if(channel.leader === store.getState().name){
    //   console.log('channel.leader, store.getState().name');
    //   store.dispatch(push('/'));
    // }
  });

  socket.emit('fetch-channels-from-client');
});

//drawing
socket.on('replay-drawing', (instructions, game) => {
  store.dispatch(loadGameThunk(game));
  // store.dispatch(fetchNameThunk());
  clearBoard();
  instructions.forEach(instruction => draw(...instruction, false));
});

socket.on('draw-from-server', (start, end, color) => {
  draw(start, end, color, false);
});

whiteboard.on('draw', (start, end, color) => {
  socket.emit('draw-from-client', window.location.pathname, start, end, color);
});


//game
socket.on('fetch-channels-from-server', (channels) => {
  store.dispatch(getChannels(channels));
  let path = window.location.pathname.split('/');
  if(path[1] === 'channels'){
    if(!(path[2] >= 1 && path[2] <= channels.length))
      console.log(document.location.replace('/'))
  }
});

socket.on('start-from-server', (game) => {
  store.dispatch(startGameThunk(game));
});

socket.on('update-players', (players) => {
  store.dispatch(updatePlayers(players))
})

socket.on('clear-canvas', () => {
  
})

export default socket;
