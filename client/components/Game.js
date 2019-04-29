import React from 'react';
import socket from '../socket';
import { connect } from 'react-redux';

const roomPath = window.location.pathname;

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
    socket.emit('start', roomPath, Date.now());

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
    socket.emit('join', roomPath, name);
  }
  leave(name){
    socket.emit('leave', roomPath, name);
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
    name: state.name
  };
};

// const mapDispatchToProps = function (dispatch) {
//   return {
//     changeCurrentChannel(channelName) {
//       dispatch(changeCurrentChannel(channelName));
//     }
//   };
// };

  export default connect(mapStateToProps)(Game);