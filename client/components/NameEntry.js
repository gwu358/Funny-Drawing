import React from 'react';
import { connect } from 'react-redux';
import { editName } from '../store';

function NameEntry (props) {

  const { name, editName } = props;

  return (
    <div>
      <button onClick = {editName}> {name} </button>
    </div>
  );
}

const mapStateToProps = function (state) {
  return {
    name: state.name
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    editName () {
      dispatch(editName(true));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NameEntry);
