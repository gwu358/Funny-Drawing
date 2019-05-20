import React from 'react';
import { connect } from 'react-redux';
import { newMessage, writeMessage } from '../store';
import socket from '../socket';

function NewMessageEntry (props) {

  const { name, newMessageEntry, handleChange, handleSubmit } = props;

  return (
    <form id="new-message-form" onSubmit={evt => handleSubmit(name, newMessageEntry, evt)}>
      <div className="input-group input-group-lg">
        <input
          className="form-control"
          type="text"
          name="content"
          value={newMessageEntry}
          onChange={handleChange}
          autoComplete="off"
          placeholder="Say something nice..."
        />
        <span className="input-group-btn">
          <button className="btn btn-default" type="submit">Send</button>
        </span>
      </div>
    </form>
  );
}

const mapStateToProps = function (state, ownProps) {
  return {
    newMessageEntry: state.newMessageEntry,
    name: state.name
  };
};

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    handleChange (evt) {
      dispatch(writeMessage(evt.target.value));
    },
    handleSubmit (name, content, evt) {
      evt.preventDefault();
      socket.emit('new-message', window.location.pathname, { name, content });
      dispatch(writeMessage(''));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewMessageEntry);
