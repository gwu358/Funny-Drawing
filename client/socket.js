import io from 'socket.io-client';
import store, { getMessage, getChannel } from './store';
import {draw, events as whiteboard} from './components/Canvas';

const socket = io(window.location.origin);

const drawingName = window.location.pathname;

socket.on('connect', () => {
  console.log('I am now connected to the server!');
  socket.emit('join-drawing', drawingName);
  socket.on('new-message', message => {
    store.dispatch(getMessage(message));
  });

  socket.on('new-channel', channel => {
    store.dispatch(getChannel(channel));
  });

});

socket.on('replay-drawing', (instructions) => {
  instructions.forEach(instruction => draw(...instruction, false));
});

socket.on('draw-from-server', (start, end, color) => {
  draw(start, end, color, false);
});

whiteboard.on('draw', (start, end, color) => {
  socket.emit('draw-from-client', drawingName, start, end, color);
});

export default socket;
