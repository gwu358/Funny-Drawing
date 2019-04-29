import io from 'socket.io-client';
import store, { getMessage, getChannel, loadGameThunk, updatePlayers, fetchNameThunk } from './store';
import {draw, events as whiteboard} from './components/Canvas';

const socket = io(window.location.origin);

const roomPath = window.location.pathname;

socket.on('connect', () => {
  console.log('I am now connected to the server!');
  socket.emit('join-drawing', roomPath);

  socket.on('new-message', message => {
    store.dispatch(getMessage(message));
  });

  socket.on('new-channel', channel => {
    store.dispatch(getChannel(channel));
  });

});

//drawing
socket.on('replay-drawing', (instructions, game) => {
  store.dispatch(loadGameThunk(game));
  store.dispatch(fetchNameThunk());
  instructions.forEach(instruction => draw(...instruction, false));
});

socket.on('draw-from-server', (start, end, color) => {
  draw(start, end, color, false);
});

whiteboard.on('draw', (start, end, color) => {
  socket.emit('draw-from-client', roomPath, start, end, color);
});


//game
socket.on('start-from-server', (game) => {
  store.dispatch(loadGameThunk(game));
});

socket.on('update-players', (players) => {
  store.dispatch(updatePlayers(players))
})

socket.on('clear-canvas', () => {
  
})

export default socket;
