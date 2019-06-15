import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from './Message';
import NewMessageEntry from './NewMessageEntry';
import { changeCurrentChannel } from '../store';
import Canvas from './Canvas';
import socket from '../socket';

function MessagesList(props) {

  const { channelId, messages, players, artist, setScrollPane, word, difficult, changeDifficult } = props;
  return (
    <div>
      <div>
        <div style={{ display: 'flex' }}>
          <Canvas style={{ flex: '1' }} />
          <div style={{ flex: 1 }}>
            <select  value={difficult} onChange={changeDifficult}>
              <option value="">All Random</option>
              <option value="0">Easy</option>
              <option value="1">Medium</option>
              <option value="2">Hard</option>
              <option value="3">Very Hard</option>
            </select>
            <ul>
              Players:
              {players.map((player, i) => {
                return <li key={i} style={{ display: 'inline' }}>{'\n'} {i + 1 + '. ' + player}</li>
              })}
            </ul>
            {artist && <p>{artist} is drawing... </p>}
          </div>
        </div>
      </div>
      <ul id='message-list' className="media-list" ref={el => { setScrollPane(el) }}>
        {messages.map((message, i) => <Message message={message} key={i} />)}
      </ul>
      <NewMessageEntry channelId={channelId} />
    </div>
  );
}

class MessagesListLoader extends Component {

  scrollToBottom = () => {
    let lastMessage = this.props.messages[this.props.messages.length - 1];
    if(lastMessage && lastMessage.name === this.props.name)
      this.scrollPane.scrollTop = this.scrollPane.scrollHeight;
  }

  setScrollPane = (scrollPane) => {
    this.scrollPane = scrollPane;
  }

  componentDidMount() {
    this.props.changeCurrentChannel(this.props.channel.name);
    socket.emit('fetch-messages', window.location.pathname);
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.channel.name !== this.props.channel.name) {
      this.props.changeCurrentChannel(nextProps.channel.name);
    }
  }

  render() {
    return (
      <MessagesList {...this.props} setScrollPane={this.setScrollPane} />
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
    players: state.game.players,
    difficult: state.game.difficult,
    word: state.game.word
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    changeCurrentChannel(channelName) {
      dispatch(changeCurrentChannel(channelName));
    },
    changeDifficult(event){
      socket.emit('change-difficult', window.location.pathname, event.target.value);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesListLoader);
