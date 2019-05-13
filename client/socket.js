import io from 'socket.io-client';
import store, { addMessage, addChannel, loadGameThunk, updatePlayers, getChannels } from './store';
import {draw, clear, events as whiteboard} from './components/Canvas';
import { push } from 'react-router-redux'

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('I am now connected to the server!');
  // socket.emit('join-drawing', roomPath);

  socket.on('new-message', message => {
    store.dispatch(addMessage(message));
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
  clear();
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
});

socket.on('start-from-server', (game) => {
  store.dispatch(loadGameThunk(game));
});

socket.on('update-players', (players) => {
  store.dispatch(updatePlayers(players))
})

socket.on('clear-canvas', () => {
  
})

export default socket;
