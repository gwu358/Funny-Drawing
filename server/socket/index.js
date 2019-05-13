const Message = require('../db/models/message');
const Channel = require('../db/models/channel');

// const drawings = {};
const rooms = {};
const games = {};

function createRoom(path) {
  
  if(!path) return;
  if (games[path] === undefined) {
    games[path] = {path, players: [], drawing: []};
  }
  return games[path];
}

// function getDrawing(roomPath) {
//   if (drawings[roomPath] === undefined) {
//     drawings[roomPath] = [];
//   }
//   return drawings[roomPath];
// }
function getRoomName(socket) {
  const urlArr = socket.request.headers.referer.split('/')
  const roomName = urlArr.pop() // grabbing just the last bit of the url for the room name
  /* roomName will equal "" for main room */
  return roomName
}

module.exports = io => {

  io.on('connection', socket => {
    console.log(`Connection from client ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`Client ${socket.id} has disconnected :(`);
    })

    //channel
    socket.on('new-message', message => {
      socket.broadcast.emit('new-message', message);
    });

    socket.on('fetch-channels-from-client', () => {
      console.log(games);
      const channdels = Object.keys(games).map((path, i) => ({path, name: games[path].name, leader:games[path].leader}));
      console.log(channdels);
      socket.emit('fetch-channels-from-server', channdels);
    })

    socket.on('new-channel', (name, leader) => {
      const id = Object.keys(games).length + 1;
      const game = createRoom('/channels/'+id);
      game.name = name;
      game.leader = leader;
      const channel = {path: game.path, name, leader};
      console.log(games)
      io.emit('new-channel', channel);
    });

    //game
    socket.on('start', (path, startTime)=> {
      const game = games[path];
      game.startTime = startTime;
      io.in(path).emit('start-from-server', game);
    })

    socket.on('join', (path, name) => {
      const game = games[path];
      game.players.push(name);
      io.in(path).emit('update-players', game.players);
    })

    socket.on('leave', (path, name) => {
      const game = games[path];
      const index = game.players.indexOf(name);
      game.players.splice(index, 1);
      io.in(path).emit('update-players', game.players);
    })

    //drawing
    socket.on('join-drawing', (path) => {
      socket.join(path);
      const game = games[path];
      if(!game) return;
      const drawing = game.drawing;
      socket.emit('replay-drawing', drawing, game);
      socket.emit('update-players', game.players);
    });

    socket.on('draw-from-client', (path, start, end, color) => {
      const game = games[path];
      const drawing = game.drawing;
      drawing.push([start, end, color,]);
      socket.broadcast.to(path).emit('draw-from-server', start, end, color);
    });

    // socket.on('update-drawing', (roomPath, drawing) => {
    //   socket.join(roomPath);
    //   const game = getGame(roomPath);
    //   const game.drawing = draw;
    //   socket.broadcast.to(roomPath).emit('replay-drawing', drawing, game);

    // });

    //room
    socket.on('drawing', (...payload) => {// REST - you have many arguments comma separated, but now they are all 1 (ONE) and named payload --> payload === array of all arguments sent in

      /* Playing with Rest and Spread
        // const payload = Array.from(arguments)
        console.log('DATA: ', ...payload) // SPREAD - I have an array and now I am spreading so that they are individual params 
        // console.log('DATA: ', payload[0], payload[1], payload[2], payload[payload.length-1])
      */

      /* WITHOUT ROOMS / NAMESPACES
        // send to all other connected clients 
        socket.broadcast.emit('someOneDrew', ...payload);
      */

      /* NEEDED for ROOM 
        Add drawing to our saved state for the room
        Then send drawing to all others in the room
      */
      const roomName = getRoomName(socket);
      rooms[roomName].push(payload);
      socket.to(roomName).emit('someOneDrew', payload)
    })
  });

};
