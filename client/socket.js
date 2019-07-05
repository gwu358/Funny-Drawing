import io from 'socket.io-client';
import store, { addMessage, addChannel, startTurn, loadGameThunk, updatePlayers, 
  getChannels, postMessage, placeMessages, updateScoreboard, showScoreboard } from './store';
import Canvas, {draw, clearBoard, events as whiteboard} from './components/Canvas';

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('I am now connected to the server!');
  // socket.emit('join-drawing', roomPath);
  window.onbeforeunload = function(event) {
    event.preventDefault();
    if(store.getState().game.artist){
      socket.emit('disconnected-from-client', window.location.pathname, store.getState().name);
      socket.emit('new-message', window.location.pathname, { 
        name: '[system]', 
        content: `${store.getState().name} has been disconnected and he/she is removed from this game.`
      });
    }
      
};
  // socket.on('disconnected-from-server', () => {
  //   console.log('quit!')
  //   if(store.getState.game.artist)
  //   socket.emit('disconnected-from-client', window.location.pathname, store.getState.name);
  // })

  socket.on('place-messages', messages => {
    store.dispatch(placeMessages(messages));
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

socket.on('start-turn-from-server', (game) => {
  clearBoard();
  store.dispatch(startTurn(game));
});

socket.on('update-players', (players) => {
  store.dispatch(updatePlayers(players))
})

socket.on('scoreboard-from-server', (scoreboard)=> { 
  store.dispatch(updateScoreboard(scoreboard));
  store.dispatch(showScoreboard(true));
  setTimeout(function(){ 
    store.dispatch(showScoreboard(false));
    if(store.getState().game.artist === store.getState().name)
      socket.emit('nextTurn', window.location.pathname);
   }, 8000);
})

export default socket;
