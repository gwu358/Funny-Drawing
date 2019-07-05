import React from 'react';
import socket from '../socket'
import axios from 'axios';
import { connect } from 'react-redux';
import {updateCurrentRoom} from '../store/currentGameRoom';

class Game extends React.Component {
  constructor(props) {
    super(props)

  }
  startGame() {
    socket.emit('start', window.location.pathname);
  }

   join(name) {
    this.props.updateRoom(window.location.pathname);
    socket.emit('join', window.location.pathname, name)
  }
  leave(name){
    this.props.updateRoom('');
    socket.emit('leave', window.location.pathname, name);
  }
  render() {
    const {game, name} = this.props;
    if(!game) return (<div />);
    let start = !game.artist && game.players.length > 1 && game.players.includes(name)?
      <button onClick={() => this.startGame(5000)}>start</button> :
      null;
    let join = game.path && !game.artist && 
     (game.players.includes(name) ?
       <button onClick={() => this.leave(name)}>leave</button> :
    <button onClick={() => this.join(name)}>join</button>);
    return (
      <React.Fragment>
        timer: {game.time}
        {start}
        {join}
      </React.Fragment>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    game: state.game,
    name: state.name,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    updateRoom(roomPath){
      dispatch(updateCurrentRoom(roomPath));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);