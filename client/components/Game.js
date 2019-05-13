import React from 'react';
import socket from '../socket'
import axios from 'axios';
import { connect } from 'react-redux';
import {updateCurrentRoom} from '../store/currentGameRoom';

class Game extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   time: 0,
    //   // start: 0,
    //   // isOn: false,
    //   joined: false
    // }
    // this.startGame = this.startGame.bind(this)
    // this.stopTimer = this.stopTimer.bind(this)
    // this.resetTimer = this.resetTimer.bind(this)
  }
  startGame() {
    socket.emit('start', window.location.pathname, Date.now());

    // this.setState({
    //   time: 5000,
      // start: Date.now() - this.state.time,
      // isOn: true
    // })
    // this.timer = setInterval(() => {
    //   this.setState({ time: this.state.time - 1000 });
    //   if (this.state.time === 0) clearInterval(this.timer);
    // }, 1000);
  }
  // stopTimer() {
  //   this.setState({ isOn: false })
  //   clearInterval(this.timer)
  // }
  // resetTimer() {
  //   this.setState({ time: 3000 })
  // }
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
    let start = (game.time == 0) ?
      <button onClick={() => this.startGame(5000)}>start</button> :
      null;
    // let stop = (this.state.isOn) ?
    //   <button onClick={this.stopTimer}>stop</button> :
    //   null;
    // let reset = (this.state.time != 0 && !this.state.isOn) ?
    //   <button onClick={this.resetTimer}>reset</button> :
    //   null;
    // let resume = (this.state.time != 0 && !this.state.isOn) ?
    //   <button onClick={this.startTimer}>resume</button> :
    //   null;
    let join = game.players.includes(name) ?
      <button onClick={() => this.leave(name)}>leave</button> :
      <button onClick={() => this.join(name)}>join</button>;
    return (
      <React.Fragment>
        timer: {game.time}
        {start}
        {/* {resume}
        {stop}
        {reset} */}
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