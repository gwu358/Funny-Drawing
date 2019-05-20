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

  const { channelId, messages, players } = props;
  return (
    <div>
      <div>
        <Canvas/>
        &nbsp;&nbsp;&nbsp;
        Players:
        <br />
        <br />
        <div style={{flex:1}}>
          <ul>
            { players.map((player, i) => {
              return <li key={i} style={{display:'inline'}}> {i+1+'. '+player}</li>
            }) }
          </ul>
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
    console.log(this.props.name)
    console.log(this.props.totalChannels)
    console.log(this.props.channels)
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
