import React from 'react';
import { connect } from 'react-redux';
import { updateName, updateNameThunk } from '../store';

function NameEntry (props) {

  const { name, handleChange, handleSubmit } = props;

  return (
    <form className="form-inline" onSubmit={(evt) => handleSubmit(evt, name)}>
      <label htmlFor="name">Your name:</label>
      <input
        type="text"
        name="name"
        placeholder="Enter your name"
        className="form-control"
        onChange={handleChange}
        value={name}
      />
      <button type="submit">confirm</button>
    </form>
  );
}

const mapStateToProps = function (state) {
  return {
    name: state.name
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    handleChange (evt) {
      dispatch(updateName(evt.target.value));
    },
    handleSubmit(evt, name) {
      evt.preventDefault();
      console.log(name);
      dispatch(updateNameThunk(name));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NameEntry);
