import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Message from './Message';
import NewMessageEntry from './NewMessageEntry';
import { changeCurrentChannel } from '../store';
import Canvas from './Canvas';
import socket from '../socket';
import Lobby from './Lobby';

function MessagesList (props) {

  const { channelId, messages, players, artist } = props;
  return (
    <div>
      <div>
        <Canvas/>
        <div style={{flex:1}}>
          <ul>
            Players:
            { players.map((player, i) => {
              return <li key={i} style={{display:'inline'}}> {i+1+'. '+player}</li>
            }) }
          </ul>
          {artist && <p>{artist} is drawing... </p>}
        </div>
      </div>
      <ul id = 'message-list' className="media-list">
        { messages.map((message, i) => <Message message={message} key={i} />) }
      </ul>
      <NewMessageEntry channelId={channelId} />
    </div>
  );
}

class MessagesListLoader extends Component {

  componentDidMount () {
    this.props.changeCurrentChannel(this.props.channel.name);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.channel.name !== this.props.channel.name) {
      this.props.changeCurrentChannel(nextProps.channel.name);
    }
  }

  render () {
    // if(this.props.match.params.channelId !==
    //   this.props.match.params.channelId < 0 || 
    //   this.props.match.params.channelId > this.props.totalChannels)
    //   return <Redirect to='/' />
    // if(this.props.match.params.channelId > this.props.totalChannels) return <Redirect to="/"/>;
    return (
      <MessagesList {...this.props} />
    );
  }
}

const mapStateToProps = function (state, ownProps) {

  const channelId = Number(ownProps.match.params.channelId);

  return {
    totalChannels: state.channels.length,
    channels: state.channels,
    channel: state.channels.find(channel => channel.id === channelId) || { name: '' },
    messages: state.messages,
    channelId,
    name: state.name,
    artist: state.game.artist,
    players: state.game.players
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    changeCurrentChannel(channelName) {
      dispatch(changeCurrentChannel(channelName));
    },
    fetchMessages() {
      socket.emit('fetch-messages', window.location.pathname);
    }
  };
};

  export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesListLoader);
