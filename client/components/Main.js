import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Login from './Login';
import Scoreboard from './Scoreboard';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Lobby from './Lobby';
import MessagesList from './MessagesList';
import NewChannelEntry from './NewChannelEntry';
import store, { fetchMessages, fetchChannels, fetchNameThunk, fetchGameRoom } from '../store';

class Main extends Component {

  componentDidMount () {
    this.props.fetchName();
    store.dispatch(fetchGameRoom());
  }

  render () {
    const {name, showingScoreboard, scoreboard} = this.props;
    
    return (    
      <div>
        {(!this.props.name || this.props.editingName) && <Login />} 
        {showingScoreboard && <Scoreboard scoreboard = {scoreboard} />}
        {!this.props.players.includes(name) && <Sidebar />}
        {/\d/.test(this.props.location.pathname) && <Navbar />}
        <main>
          <Switch>
            {/* {this.props.path &&
            this.props.path !== this.props.location.pathname
               && <Redirect to={this.props.path} />} */}
            <Route exact path="/new-channel" component={NewChannelEntry} />
            <Route exact path="/channels/:channelId" component={MessagesList} />
            {/* <Redirect to="/channels/1" /> */}
            <Route path="/" component = {Lobby}/>
          </Switch>
        </main>
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    channels: state.channels,
    name: state.name,
    path: state.game.path,
    players: state.game.players,
    editingName: state.editingName,
    showingScoreboard: state.showingScoreboard,
    scoreboard: state.game.scoreboard
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    fetchName(){
      dispatch(fetchNameThunk())
    }
  } 
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Main));